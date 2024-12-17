# CVE Management API

This repository contains the backend API developed to handle CVE data, filter, and retrieve CVE details based on various criteria like CVE ID, year, CVE score, and last modified date. The API serves as a backend solution for querying CVE data efficiently and presenting meaningful insights.

---

## Tech Stack Used

- **Node.js**: For server-side logic and API development.
- **Express.js**: A lightweight web framework for Node.js.
- **MongoDB**: NoSQL database for storing CVE data.
- **Mongoose**: ODM (Object Document Mapper) for MongoDB.
- **JavaScript**: The programming language for implementing the API.

---

## Problem Statement

This API aims to handle CVE data efficiently by providing filtering options based on the following criteria:

1. **CVE ID**: Retrieve CVEs by their unique ID.
2. **CVE Year**: Filter CVEs that belong to a specific year.
3. **CVE Score**: Filter CVEs by their CVSS base score.
4. **Last Modified in N Days**: Retrieve CVEs that have been modified within the last N days.

The goal is to streamline CVE data retrieval, ensuring the results are optimized based on user-defined filters.

---

## Approach

1. **Database Schema Design**: 
   - Created a `CVE` schema with fields like `id`, `published`, `lastModified`, `metrics`, etc.
   - Used Mongoose to model and interact with the schema.

2. **APIs**:
   - **/api/cves/:id**: Retrieve a CVE by its ID.
   - **/api/cves/year/:year**: Retrieve CVEs published in a specific year.
   - **/api/cves/score/:score**: Filter CVEs with a CVSS base score greater than or equal to the provided score.
   - **/api/cves/modified/:days**: Retrieve CVEs modified within the last N days.

3. **Query Filtering**:
   - Implemented MongoDB queries to filter based on regex for year, and numerical comparisons for CVSS score and last modified dates.
   - Ensured results are returned as expected based on user-defined filters.

---

## Code Example

### API for CVE Year Filter

```javascript
app.get('/api/cves/year/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const cves = await CVE.find({
            published: { $regex: new RegExp(`^${year}-`), $options: 'i' }
        });
        res.status(200).json({ cves });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
API for CVE Score Filter
javascript
Copy code
app.get('/api/cves/score/:score', async (req, res) => {
    try {
        const { score } = req.params;
        const cves = await CVE.find({ 
            "metrics[0].cvssData.baseScore": { $gte: parseFloat(score) } 
        });
        res.status(200).json({ cves, score: parseFloat(score) });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
API for Last Modified Date Filter
javascript
Copy code
app.get('/api/cves/modified/:days', async (req, res) => {
    try {
        const { days } = req.params;
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - parseInt(days));

        const cves = await CVE.find({ "lastModified": { $gte: dateLimit } });
        res.status(200).json({ cves, dateLimit });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
Input and Output
Input Example:
1. Filtering CVEs by Year
URL: http://localhost:3001/api/cves/year/2024

2. Filtering CVEs by Score
URL: http://localhost:3001/api/cves/score/7

3. Filtering CVEs by Last Modified Date
URL: http://localhost:3001/api/cves/modified/30

Output Example:
1. CVE Year Filter Output
json
Copy code
{
  "cves": [
    {
      "_id": "676057f632802a111a00978e",
      "id": "CVE-1999-0095",
      "published": "1988-10-01T04:00:00.000Z",
      "lastModified": "2024-11-20T23:27:50.607Z",
      "vulnStatus": "Modified",
      "metrics": [
        {
          "source": "nvd@nist.gov",
          "type": "Primary",
          "cvssData": {
            "version": "2.0",
            "baseScore": 10
          },
          "baseSeverity": "HIGH"
        }
      ]
    }
  ]
}
2. CVE Score Filter Output
json
Copy code
{
  "cves": [
    {
      "_id": "676057f632802a111a00978e",
      "id": "CVE-1999-0095",
      "published": "1988-10-01T04:00:00.000Z",
      "lastModified": "2024-11-20T23:27:50.607Z",
      "vulnStatus": "Modified",
      "metrics": [
        {
          "source": "nvd@nist.gov",
          "type": "Primary",
          "cvssData": {
            "version": "2.0",
            "baseScore": 10
          },
          "baseSeverity": "HIGH"
        }
      ]
    }
  ],
  "score": 7
}
3. CVE Modified Date Filter Output
json
Copy code
{
  "cves": [],
  "dateLimit": "2024-11-11T05:03:53.859Z"
}
Screenshot Examples:
Input Form Example

Output Example

How to Run Locally
Prerequisites
Node.js: Ensure Node.js is installed.
MongoDB: Install MongoDB and ensure it's running.
Installation
Clone this repository:

bash
Copy code
git clone https://github.com/your-username/cve-management-api.git
cd cve-management-api
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
node index.js
Access the API at http://localhost:3001.

Contribution
Contributions are welcome! If you encounter any issues or would like to contribute, please fork this repository and submit a pull request.
