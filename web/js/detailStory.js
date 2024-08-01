
let story;

window.onload = funciton(){

}

function story_html(){
    request_story(idx);
}
//어떻게 idx값을 가져와서 보낼 수가 있을까?
function request_story(idx){
    fetch('/story_info/'+idx)
    .then(response => response.json())
    .then(data=>{
        story = data;
    })
    .catch(error=>{
        console.error('Error:', error);
    })
}

function story_content_html(story){
    const charaters = story.charater;
    let result =
    `<div class="left">\n`+
    `<div class="title">${story.title}<div>\n`+
    `<div class="charater">등장인물: `

    charaters.forEach(element => {
        result += element.name + ', ';
    });

    result +=
    `<div class="story">\n`+
    `<div class="story-text">${story.summary}</div>`+
    `</div>\n </div>`;

    return result;
}

function story_image_html(story){
    let result = 
    `<div class="right">\n`+
    `<div class="img-box">\n`+
    `<img class="img" src=${story.image_char}\n`+
    `</div>\n`+
    `<div class="start" onclick="window.location.href=/story/${story.id};" style="cursor:pointer;>시작</div>\n`+
    `</div>`;
}