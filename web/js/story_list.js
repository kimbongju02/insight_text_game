const contentsContainer = document.querySelector('.contents');


window.onload = async function(){
    request_story_list();
}

function create_story(story_list, position, idx1, idx2){
    console.log(story_list);
    const story_list_idx1 = story_list[idx1];
    const story_list_idx2 = story_list[idx2];
    const result = `<div class="${position}">\n`+
        `<div class="up-box" id="${story_list_idx1.id}"\n`+
        common_html(story_list_idx1)+
        "\n"+
        `<div class="down-box" id="${story_list_idx2.id}"\n`+
        common_html(story_list_idx2);
    return result;
}

function common_html(story){
    const result = `style="background-image: url(${story.image})"\n`+
        `onclick="window.location.href = '/detail_story/${story.id}'" style="cursor:pointer;">\n`+
        `<div class="box-background"></div>\n`+
        `<div class="box-content">\n`+
        `<div class="box-title">${story.title}</div>\n`+
        `</div>\n`+
        `</div>`;
    return result;
}

function create_story_list(story_list){
    const create_story_list = create_story(story_list, 'left',1,2);
    console.log(create_story_list);
    contentsContainer.innerHTML = create_story_list;
}

async function request_story_list(){
    fetch('/get_story_list')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        create_story_list(data);
    })
    .catch(error =>{
        console.error('Error:', error);
    });
}