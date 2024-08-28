const contentsContainer = document.querySelector('.contents');
const contentClassList = ['left','mid','right'];

window.onload = async function(){
    request_storyList();
}

async function create_story(storyList, position, i){
    const storyListIdx1 = storyList[i*2];
    const storyListIdx2 = storyList[i*2+1];
    const positionContainer = document.querySelector(`.${position}`);
    const result = 
        `<div class="down-box" id="${storyListIdx1.id}"\n`+
        common_html(storyListIdx1)+
        "\n"+
        `<div class="down-box" id="${storyListIdx2.id}"\n`+
        common_html(storyListIdx2)+
        "\n</div>";
    
    positionContainer.innerHTML += result;
}

function common_html(story){
    const result = `style="background-image: url(${story.image})"\n`+
        `onclick="window.location.href = '/detail/story/${story.id}'" style="cursor:pointer;">\n`+
        '<div class="box-background"></div>\n'+
        '<div class="box-content">\n'+
        `<div class="box-title">${story.title}</div>\n`+
        '</div>\n'+
        '</div>';
    return result;
}

function custom_box(position, id, type){
    const positionContainer = document.querySelector(`.${position}`);
    if (type ==="load"){
        text = '이야기 불러오기';
        url = '/load/story';
    }else{
        text = '이야기 만들기';
        url = '/create/story';
    }
    result = `<div class="down-box" id="${id}"\n`+
        `onclick="window.location.href = '${url}'"`+
        `style="cursor:pointer; background:#ADA5A5;">\n`+
        '<div class="box-background"></div>\n'+
        '<div class="box-content">\n'+
        `<div class="box-title">${text}</div>\n`+
        '</div>\n'+
        '</div>';
    positionContainer.innerHTML += result;
}

async function create_storyList(storyList){
    for(let i=0; i<3; i++){
        await create_story(storyList, contentClassList[i], i)
    }
    custom_box('left', 6, 'load');
    custom_box('mid', 7, 'create');
}

async function request_storyList(){
    fetch('/list/get_story_list')
    .then(response => response.json())
    .then(data => {
        create_storyList(data['data']);
    })
    .catch(error =>{
        console.error('Error:', error);
    });
}