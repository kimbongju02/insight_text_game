const express = require('express');
const router = express.Router();

const path = require('path');

const load_data = require('./loadDataR');

router.get('/detail_story/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/detailStory.html'));
});

router.get('/story_info/:id',(req, res)=>{
    const id = req.params.id;
    const story = load_data.load_novel_data(id);
    if(story === null)
        console.log('No story');
    res.send(story);
})

module.exports = router;