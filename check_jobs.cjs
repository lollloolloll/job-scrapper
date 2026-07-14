const fs = require('fs');
const jobsData = JSON.parse(fs.readFileSync('data/jobs.json', 'utf8'));
const analysisData = JSON.parse(fs.readFileSync('data/analysis.json', 'utf8'));
const jobs = Array.isArray(jobsData) ? jobsData : (jobsData.jobs || []);

const targets = jobs.filter(j => {
  return j.status !== 'expired' &&
         j.is_new === true &&
         j.is_deferred !== true &&
         !analysisData[j.id];
});

console.log(JSON.stringify(targets, null, 2));
