const fs = require('fs');
const path = require('path');

function load_all_novel_data() {
    const datasetFilePath = path.join(__dirname, '../../../dataset', 'novel_data.json');
    try {
        const data = fs.readFileSync(datasetFilePath, 'utf8');
        const parsedJson = JSON.parse(data);
        return parsedJson;
    } catch (err) {
        return null;
    }
}

function load_novel_data(idx) {
    const datasetFilePath = path.join(__dirname, '../../../dataset', 'novel_data.json');
    try {
        const data = fs.readFileSync(datasetFilePath, 'utf8');
        const parsedJson = JSON.parse(data);
        return parsedJson[idx];
    } catch (err) {
        return null;
    }
}

module.exports = {
    load_all_novel_data,
    load_novel_data
};