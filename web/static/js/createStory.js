const inputField = document.querySelector('.name');
const characterContainer = document.querySelector('#character-container');
const contentContainer = document.querySelector('.content-container');
const mainContainer = document.querySelector('.main-container');
const addButtonElement = document.querySelector('.add-button');
const startElement = document.querySelector('.start');

inputField.addEventListener('input', function() {
    let value = inputField.value;

    // 연속된 공백을 하나로 축소
    value = value.replace(/\s\s+/g, ' ');

    // 공백을 제외한 글자 수 계산
    const charCount = value.replace(/\s/g, '').length;

    // 공백 제외한 10자 초과하지 않도록 제한
    if (charCount > 10) {
        value = value.substring(0, value.length - 1);
    }

    inputField.value = value;
});

function add_button_click(){
    const characters = document.querySelectorAll('.character');
    const character_cnt = characters.length;
    if (character_cnt < 10) {
        const newCharacterElement = document.createElement('div');
        newCharacterElement.className = "character";
        newCharacterElement.innerHTML = charater_input_html();

        characterContainer.appendChild(newCharacterElement);
        scrollToBottom();
    }
    else{
        addButtonElement.onclick = null;
        addButtonElement.classList.add("disabled");
        addButtonElement.style.width = "30vh";
        addButtonElement.textContent = "최대 10명까지 가능합니다.";
    }
}

function charater_input_html(){
    return `<input type="text" class="name" placeholder="이름 입력" maxlength="10" id="input-field"/>`+
    `<textarea class="feature" placeholder="등장인물의 성격, 특징 등 인물의 정보를 적어주세요.&#10;미입력 시 랜덤하게 적용됩니다." maxlength="500vh"></textarea>`+
    `<div class="remove-button"></div>`;
}

function scrollToBottom() {
    if (contentContainer) {
        requestAnimationFrame(() => {
            contentContainer.scrollTop = contentContainer.scrollHeight;
        });
    } else {
        console.error('Element with class "content-container" not found.');
    }
}

document.getElementById('character-container').addEventListener('click', function(event) {
    // 클릭된 요소가 .remove-button인지 확인
    if (event.target.classList.contains('remove-button')) {
        const characters = document.querySelectorAll('.character');
        const character_cnt = characters.length;

        if (character_cnt > 1) {
            // 가장 가까운 .character 부모 요소 찾기
            const parent = event.target.closest('.character');
            if (parent) {
                parent.remove();
                console.log("Parent removed:", parent);
            } else {
                console.error('Parent with class "character" not found.');
            }
        } else {
            console.log("Only one character left, no removal.");
        }
    }
});

function load_data(){
    const characters = document.querySelectorAll('.character');
    const storyline = document.querySelector('.storyline');
    const data = {};
    characters.forEach((character) => {
        const name = character.querySelector('.name').value;
        const feature = character.querySelector('.feature').value;
        data[name] = feature;
    });
    data['storyline'] = storyline.value;
    console.log(data);
    return data;
}

startElement.addEventListener('click', () =>{
   const data = load_data();
   localStorage.setItem('data', JSON.stringify(data));
   window.location.href = "/user/story"
});