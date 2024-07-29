const load_novel_data = require('./parse_json');
//import {load_novel_data} from './parse_json.js';

function create_story(position, idx1, idx2){
    const story_list = load_novel_data();
    const story_list_idx1 = story_list[idx1];
    const story_list_idx2 = story_list[idx2];
    const result = `<div class="${position}">\n`+
        `<div class="up-box" th:id="${story_list_idx1.id}"\n`+
        common_html(story_list_idx1)+
        "\n"+
        `<div class="down-box" th:id="${story_list_idx2.id}"\n`+
        common_html(story_list_idx2);
    return result;
}

function common_html(story){
    const result = `th:style="'background-image: url(' + ${story.image} + ')'"\n`+
        `th:onclick="window.location.href = '/detail_story/${story.id}'" style="cursor:pointer;">\n`+
        `<div class="box-background"></div>\n`+
        `<div class="box-content">\n`+
        `<div class="box-title" th:text="${story.title}"></div>\n`+
        `</div>\n`+
        `</div>`;
    return result;
}

module.exports = create_story;