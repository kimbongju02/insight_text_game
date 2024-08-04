const express = require('express');
const router = express.Router();

const path = require('path');

const load_data = require('./loadDataR');

router.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/storyList.html'));
});
router.get('/get_story_list', (req, res) => {
    const data = load_data.load_all_novel_data();
    res.json(data);
})

module.exports = router;