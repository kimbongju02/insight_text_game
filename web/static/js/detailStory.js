const contentsContainer = document.querySelector('.contents');
const container = document.querySelector('.container');
const selectId = (window.location.pathname).split('/').pop();

window.onload = function(){
    request_story(selectId);
}

async function story_html(story){
    const contentsHtml = story_content_html(story) + story_image_html(story);
    console.log(contentsHtml);
    contentsContainer.innerHTML = contentsHtml;
    
    container.style = `
  background-image: url('/img/background-shadow.png'), url('${story.image}');`;

}

//어떻게 idx값을 가져와서 보낼 수가 있을까?
function request_story(idx){
    fetch('/detail/info/'+idx)
    .then(response => response.json())
    .then(data=>{
        console.log(data['data']);
        story_html(data['data']);
    })
    .catch(error=>{
        console.error('Error:', error);
    })
}

function story_content_html(story){
    const char = story.character;
    let result =
    `<div class="left">\n`+
    `<div class="title">${story.title}</div>\n`+
    `<div class="charater">등장인물: `

    char.forEach(element => {
        result += element.name + ', ';
    });

    result +=
    `</div>\n<div class="story">\n`+
    `<div class="story-text">${story.summary}</div>`+
    `</div>\n </div>`;

    return result;
}

function story_image_html(story){
    let result = 
    `<div class="right">\n`+
    `<div class="img-box">\n`+
    `<img class="img" src=${story.image_char}>\n`+
    `</div>\n`+
    `<div class="start" onclick="window.location.href='/local/story/${story.id}'" style="cursor:pointer;">시작 버튼</div>\n`+
    `</div>`;
    return result;
}