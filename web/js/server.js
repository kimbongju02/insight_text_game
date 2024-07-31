//const express = require('express');
import express from 'express';
const port = 5500;
const app = express();

import fs from 'fs';
//const path = require('path');
import path from 'path';
const __dirname = path.resolve();

app.use(express.static('../public'));
app.use(express.static('../js'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/mainPage.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/storyList.html'));
    //res.sendFile(path.join(__dirname, '../public/html/test.html'));
});
app.get('/get_story_list', (req, res) => {
    res.json(load_novel_data());
})

app.get('/detail_story/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/detailStory.html'));
});

app.listen(port, () => {
    console.log(__dirname);
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

function load_novel_data() {
    const datasetFile_path = path.join(__dirname, '../../dataset', 'novel_data.json');
    console.log(datasetFile_path);
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