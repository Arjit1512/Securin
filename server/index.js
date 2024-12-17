import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import CVE from './models/CVE.js';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
dotenv.config();

const fetchAndStoreCVE = async () => {
    try {
        const response = await axios.get('https://services.nvd.nist.gov/rest/json/cves/2.0');
        const vulnerabilities = response.data.vulnerabilities;

        for (const vulnerability of vulnerabilities) {
            const cveData = {
                id: vulnerability.cve.id,
                published: vulnerability.cve.published,
                lastModified: vulnerability.cve.lastModified,
                vulnStatus: vulnerability.cve.vulnStatus,
                descriptions: vulnerability.cve.descriptions.map(desc => desc.value), 
                metrics: vulnerability.cve.metrics.cvssMetricV2 || [],
                configurations: vulnerability.cve.configurations,
                references: vulnerability.cve.references.map(ref => ref.url), 
            };

            await CVE.create(cveData);
        }
        console.log('Data stored successfully!');
    } catch (error) {
        console.error('Error fetching/storing data:', error);
    }
};


app.get('/api/cves', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalRecords = await CVE.countDocuments();

        const cves = await CVE.find()
            .skip(skip)
            .limit(limit)
            .select('id identifier published lastModified vulnStatus metrics');

        res.json({ cves, totalRecords, currentPage: page, totalPages: Math.ceil(totalRecords / limit) });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching CVEs', error });
    }
});

app.get('/api/cves/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cve = await CVE.findOne({ id });
        if (!cve)
            return res.status(404).json({ error: 'CVE not found' });
        res.json(cve);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/cves/year/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const cves = await CVE.find({
            published: { $regex: new RegExp(`^${year}-`), $options: 'i' }
        });
        res.status(200).json(cves);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/cves/score/:score', async (req, res) => {
    try {
        const { score } = req.params;
        const cves = await CVE.find({ "metrics.cvssData.baseScore": { $gte: parseFloat(score) } });

        res.status(200).json({ cves, score: parseFloat(score) });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/cves/modified/:days', async (req, res) => {
    try {
        const { days } = req.params;

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - parseInt(days));

        const dateLimit = currentDate.toISOString().slice(0, -1);

        const cves = await CVE.find({ "lastModified": { $gte: String(dateLimit) } });

        res.status(200).json({ cves, dateLimit });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




//calling only once
fetchAndStoreCVE();

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on Port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error: ', error);
    })

