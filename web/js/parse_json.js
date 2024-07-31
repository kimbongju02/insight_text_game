const fs = require('fs');
//import fs from 'fs';
const path = require('path');
//import path from 'path';

function load_novel_data() {
    const datasetFile_path = path.join(__dirname, '../../dataset', 'novel_data.json');
    try {
        const data = fs.readFileSync(datasetFile_path, 'utf8');
        const parsed_json = JSON.parse(data);
        console.log('정상적으로 파일을 읽었습니다');
        return parsed_json;
    } catch (err) {
        console.error('파일을 읽는 중 오류가 발생했습니다:', err);
        return null;
    }
}

module.exports = load_novel_data;