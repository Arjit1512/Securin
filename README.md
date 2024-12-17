CVE Management API
This repository contains the backend API developed to handle CVE data, filter, and retrieve CVE details based on various criteria like CVE ID, year, CVE score, and last modified date. The API serves as a backend solution for querying CVE data efficiently and presenting meaningful insights.
Tech Stack Used
* Node.js: For server-side logic and API development.
* Express.js: A lightweight web framework for Node.js.
* MongoDB: NoSQL database for storing CVE data.
* Mongoose: ODM (Object Document Mapper) for MongoDB.
* JavaScript: The programming language for implementing the API.
Problem Statement
This API aims to handle CVE data efficiently by providing filtering options based on the following criteria:
1. CVE ID: Retrieve CVEs by their unique ID.
2. CVE Year: Filter CVEs that belong to a specific year.
3. CVE Score: Filter CVEs by their CVSS base score.
4. Last Modified in N Days: Retrieve CVEs that have been modified within the last N days.
The goal is to streamline CVE data retrieval, ensuring the results are optimized based on user-defined filters.
Approach
1. Database Schema Design:
   * Created a CVE schema with fields like id, published, lastModified, metrics, etc.
   * Used Mongoose to model and interact with the schema.
2. APIs:
   * /api/cves/:id: Retrieve a CVE by its ID.
   * /api/cves/year/:year: Retrieve CVEs published in a specific year.
   * /api/cves/score/:score: Filter CVEs with a CVSS base score greater than or equal to the provided score.
   * /api/cves/modified/:days: Retrieve CVEs modified within the last N days.
3. Query Filtering:
   * Implemented MongoDB queries to filter based on regex for year, and numerical comparisons for CVSS score and last modified dates.
   * Ensured results are returned as expected based on user-defined filters.
Input and Output
Input Example:
* API Endpoint: /api/cves/year/2024
* URL: http://localhost:3001/api/cves/year/2024
* Parameter: year=2024
Output Example:


Copy
json
Copy code
{ "cves": [ { "_id": "676057f632802a111a00978e", "id": "CVE-1999-0095", "published": "1988-10-01T04:00:00.000Z", "lastModified": "2024-11-20T23:27:50.607Z", "vulnStatus": "Modified", "metrics": [ { "source": "nvd@nist.gov", "type": "Primary", "cvssData": { "version": "2.0", "baseScore": 10 }, "baseSeverity": "HIGH" } ] } ], "dateLimit": "2024-11-11T05:03:53.859Z" }
Screenshot Examples:
Input Form Example:

Output Example:

How to Run Locally
Prerequisites
1. Node.js: Ensure Node.js is installed.
2. MongoDB: Install MongoDB and ensure it's running.
Installation
1. Clone this repository:


Copy
bash
Copy code
git clone https://github.com/your-repo/cve-management-api.git cd cve-management-api
2. Install dependencies:


Copy
bash
Copy code
npm install
3. Start the server:


Copy
bash
Copy code
node index.js
4. Access the API at http://localhost:3001.
Contribution
Contributions are welcome! If you encounter any issues or would like to contribute, please fork this repository and submit a pull request.

GIVE ME THE PERFECT README CODE FOR THIS THAT DIAPLYS MY README LIEK THIS


I'll help you create a professional README.md for your CVE Management API project:

markdown

Copy
# CVE Management API

## Overview

This repository contains a backend API for efficiently managing and retrieving CVE (Common Vulnerabilities and Exposures) data. The API provides robust filtering capabilities to query CVE information based on various criteria.

## 🚀 Features

- **CVE ID Retrieval**: Fetch specific CVEs by their unique identifier
- **Year-based Filtering**: Retrieve CVEs published in a specific year
- **Score-based Filtering**: Filter CVEs by CVSS base score
- **Recent Modifications**: Get CVEs modified within a specified time frame

## 🛠 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- **Backend**: Node.js
- **Web Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose

## 📋 API Endpoints

|
 Endpoint 
|
 Description 
|
 Example 
|
|
----------
|
-------------
|
---------
|
|
`/api/cves/:id`
|
 Retrieve CVE by ID 
|
`http://localhost:3001/api/cves/CVE-2024-0001`
|
|
`/api/cves/year/:year`
|
 Filter CVEs by publication year 
|
`http://localhost:3001/api/cves/year/2024`
|
|
`/api/cves/score/:score`
|
 Filter CVEs by CVSS base score 
|
`http://localhost:3001/api/cves/score/7.5`
|
|
`/api/cves/modified/:days`
|
 Get recently modified CVEs 
|
`http://localhost:3001/api/cves/modified/30`
|

## 🔧 Prerequisites

- Node.js (v18.x or later)
- MongoDB

## 🏁 Local Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/cve-management-api.git
cd cve-management-api
Install dependencies
bash

Copy
npm install
Start the server
bash

Copy
node index.js
Access the API at http://localhost:3001
📦 Project Structure

Copy
cve-management-api/
│
├── models/
│   └── CVE.js          # Mongoose schema
├── routes/
│   └── cveRoutes.js    # API route handlers
├── controllers/
│   └── cveController.js# Business logic
├── index.js            # Main server file
└── README.md
🌟 Sample Response
json

Copy
{
  "cves": [
    {
      "id": "CVE-2024-0001",
      "published": "2024-01-15T00:00:00Z",
      "lastModified": "2024-01-20T00:00:00Z",
      "metrics": {
        "baseScore": 7.5,
        "severity": "HIGH"
      }
    }
  ]
}
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
[Specify your license, e.g., MIT License]

📞 Contact
[Your Name] - [Your Email]

Project Link: https://github.com/your-username/cve-management-api

