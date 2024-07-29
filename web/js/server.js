const express = require('express');
//import express from 'express';
const port = 5500;

const app = express();
const path = require('path');
//import path from 'path';
//const __dirname = path.resolve();

const create_story = require('./story_list')

app.use(express.static('../public'));
app.use(express.static('../js'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/mainPage.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/storyList.html'));
    const create_story_list = create_story('left',1,2);
    const contentsContainer = document.createElement('.contents');
    contentsContainer.innerHTML = create_story_list;
});

app.get('/detail_story/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/detailStory.html'));
});

app.listen(port, () => {
    console.log(__dirname);
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});