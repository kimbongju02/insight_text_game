const contentsContainer = document.querySelector('.contents');
var storyList;

window.onload = async function(){
    request_storyList();
}

function create_story(position, idx1, idx2){
    const storyListIdx1 = storyList[idx1];
    const storyListIdx2 = storyList[idx2];
    const result = `<div class="${position}">\n`+
        `<div class="up-box" id="${storyListIdx1.id}"\n`+
        common_html(storyListIdx1)+
        "\n"+
        `<div class="down-box" id="${storyListIdx2.id}"\n`+
        common_html(storyListIdx2)+
        "\n</div>";
    return result;
}

function common_html(story){
    const result = `style="background-image: url(${story.image})"\n`+
        `onclick="window.location.href = '/detail_story/${story.id}'" style="cursor:pointer;">\n`+
        '<div class="box-background"></div>\n'+
        '<div class="box-content">\n'+
        `<div class="box-title">${story.title}</div>\n`+
        '</div>\n'+
        '</div>';
    return result;
}

async function create_storyList(){
    const contentsClassList = ['left','mid','right'];
    let storyListHtml = "";
    for(let i=0; i<3; i++){
        storyListHtml += create_story(contentsClassList[i], i*2, i*2+1)
    }
    console.log(storyListHtml);
    contentsContainer.innerHTML = storyListHtml;
}

async function request_storyList(){
    fetch('/get_story_list')
    .then(response => response.json())
    .then(data => {
        storyList = data;
        create_storyList();
    })
    .catch(error =>{
        console.error('Error:', error);
    });
}