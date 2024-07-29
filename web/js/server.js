const express = require('express');
const port = 5500;

const app = express();
const path = require('path');

app.use(express.static('../public'));
app.use(express.static('../js'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/mainPage.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/storyList.html'));
});

app.get('/detail_story/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/detailStory.html'));
});

app.listen(port, () => {
    console.log(__dirname);
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});