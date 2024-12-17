import mongoose from "mongoose";

const cveSchema = new mongoose.Schema({
    id: String,
    published: String,
    lastModified: String,
    vulnStatus: String,
    descriptions: [String],
    metrics: Object,
    configurations: [Object],
    references: [String],
});

const CVE = mongoose.model('CVE', cveSchema);
export default CVE;
