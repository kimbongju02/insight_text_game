require('dotenv').config();
const env = {
    PORT: process.env.PORT
}

const express = require('express');

const app = express();

const path = require('path');

app.use(express.static('../public'));
app.use(express.static('../js'));

const storyList = require('./router/storyListR');
const detailStory = require('./router/detailStoryR');

app.use('/', storyList);
app.use('/', detailStory);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/mainPage.html'));
});

app.listen(env.PORT, () => {
    console.log(__dirname);
    console.log(`서버가 http://localhost:${env.PORT} 에서 실행 중입니다.`);
});