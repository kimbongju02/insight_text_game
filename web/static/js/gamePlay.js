const chat_div = document.querySelector('.chat');
const options = document.querySelector('.options');
const historyLogs = document.querySelector('.history-logs');
const historyLogsSidebar = document.querySelector('.history-logs-sidebar');
const background_container = document.querySelector('.container');
const mainContainer = document.querySelector('.container');
const homeImage = document.querySelector('.home-button .icon');
const homeText = document.querySelector(".home-button .home-text");
const logo_a = document.getElementById('logo-a');
const settings = document.querySelector('.settings');
const chatContainer = document.querySelector('.chat-container');
const historyWrapper = document.querySelector('.history-wrapper');
const story_id = background_container.id;
let data = {}

var part_cnt = 0;
const data_history = {};
const choice_history = {};
var option_cnt=0;

// history 영역 포커스 아래 고정
window.onload = function() {
    try{
        data = JSON.parse(localStorage.getItem("data"));
        localStorage.removeItem('data');
    }catch(e){
        console.log('error code : ', e);
    }
    
    //load_image_ofstory(story_id);
    //load_start_story(story_id);
    load_next_story();

    var historyContainer = document.querySelector('.history-text');
    historyContainer.scrollTop = historyContainer.scrollHeight;
    
};

// chat 영역 포커스 아래 고정
document.addEventListener('DOMContentLoaded', function() {
    var chatContainer = document.querySelector('.chat');
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    const observer = new MutationObserver(scrollToBottom);
    observer.observe(chatContainer, { childList: true, subtree: true });
});

// 게임을 시작할 때 첫 스토리 설명 생성 함수
function load_start_story(id){
    fetch('/generate/init/'+id)
    .then(response => response.json())
    .then(data => {
        create_chat_div(data);
    })
    .catch(error => console.error('Error:', error));
}

function load_image_ofstory(id){
    fetch('/load/image/story/'+id)
    .then(response => response.text())
    .then(data => {
        background_container.style.backgroundImage='url("/img/background-shadow.png"), '+"url("+data+")";
    })
    .catch(error => console.error('Error:', error));
}

// 사용자가 선택지 클릭 시 다음 스토리 생성을 요청
function load_next_story(){
    fetch("/generate/story", {
        method: 'POST',
        body: JSON.stringify({
            data: JSON.stringify(data_history[part_cnt]),
            choice: choice_history[part_cnt],
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        create_chat_div(data);
    })
    .catch(error => {
        console.error('error occur:', error);
    });
}

// 스토리를 생성할 때 스토리마다 div 영역을 생성하여 추가
async function create_chat_div(data) {
    await deact_history_log();
    const part_container = document.createElement('div');
    part_container.id = 'part-' + part_cnt;
    part_container.setAttribute('data-value', part_cnt);
    chat_div.appendChild(part_container);
    await add_story(part_container, data['story']);
    await add_dialogue(part_container, data['dialogue']);
    await add_option(data['choice1'], data['choice2'], data['choice3']);
    
    selectButton_event(part_container);
    save_data_history(data);
    act_history_log();
}

// 클릭을 막는 이벤트 리스너
function preventClick(event) {
    event.stopPropagation();
    event.preventDefault();
}

// create_chat_div 함수에 생성된 스토리 영역을 추가
function add_story(part, story) {
    return new Promise((resolve) => {
        const story_element = document.createElement('div');
        story_element.classList.add('story');
        part.appendChild(story_element);
        one_word_one_time(story_element, story).then(resolve);
    });
}

// create_chat_div 함수에 생성된 대화 영역을 추가
function add_dialogue(select_part_container, dialogue){
    return new Promise(async (resolve) => {
        for (const item of dialogue) {
            const dialogue_element = document.createElement('div');
            dialogue_element.classList.add('content');
            const profile_element = document.createElement('div');
            profile_element.classList.add('profile');
            const profile_p_element = document.createElement('p');
            profile_p_element.classList.add('profile_p');
            const content1_element = document.createElement('div');
            content1_element.classList.add('content1');
            const content1_p_element = document.createElement('p');
            content1_p_element.classList.add('content1_p');

            content1_element.appendChild(content1_p_element)
            dialogue_element.appendChild(profile_element);
            profile_element.appendChild(profile_p_element);
            dialogue_element.appendChild(content1_element);
            select_part_container.appendChild(dialogue_element);

            await one_word_one_time(content1_p_element, item.content);
            await one_word_one_time(profile_p_element, item.name);
        }
        resolve();
    });
}

// create_chat_div 함수에 생성된 선택지 영역을 추가
function add_option(choice1, choice2, choice3){
    return new Promise((resolve) => {
        const option1_element = document.createElement('button');
        const option2_element = document.createElement('button');
        const option3_element = document.createElement('button');

        option1_element.id = 'option_1';
        option2_element.id = 'option_2';
        option3_element.id = 'option_3';
        if(choice1 != null)
            options.appendChild(option1_element);
        if(choice2 != null)
            options.appendChild(option2_element);
        if(choice3 != null)
            options.appendChild(option3_element);

        option1_element.textContent = choice1;
        option2_element.textContent = choice2;
        option3_element.textContent = choice3;

        resolve();
    });
}

// 사용자가 선택지 버튼 클릭 시 수행
// 선택한 선택지를 분기 영역에 추가 및 create_chat_div 영역에도 추가
function selectButton_event(select_part_container){
    return new Promise((resolve) => {
        const buttons = document.querySelectorAll('.options button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const click_button = document.getElementById(this.id);
                const my_select_option = document.createElement('div');
                my_select_option.classList.add('my-chat');
                const select_button_text = click_button.textContent;
                const my_select_option_p_tag = document.createElement('p');
                my_select_option_p_tag.textContent = select_button_text;
                
                my_select_option.appendChild(my_select_option_p_tag);
                select_part_container.appendChild(my_select_option);

                // 사용자가 선택지 클릭 시 분기 영역에 선택지 추가
                add_history(select_button_text);

                load_next_story();
                part_cnt += 1;

                options.innerHTML = ''; 
            });
        });
    });
}

// 생성된 스토리가 한글자 씩 출력되도록 설정
function one_word_one_time(div, story){
    return new Promise((resolve) => {
        let index = 0;
        const interval = 0;
        try {
            if (story === null) {
                throw new TypeError();
            }
            const intervalId = setInterval(() => {
                if (index < story.length) {
                    div.textContent += story[index];
                    index++;
                } else {
                    clearInterval(intervalId);
                    resolve();
                }
            }, interval);
        } catch (TypeError) {
            console.log("load story error")
        }
        
    });
}

// 사용자가 선택지 클릭 시 분기 영역에 선택지 추가
function add_history(select_button_text) {

    const history_text_num = (part_cnt + 1) + '번 선택';
    const history_text = (part_cnt + 1) + '번 선택: ' + select_button_text;
    save_choice_history(select_button_text);

    history_logs = add_log(history_text_num, null);
    history_logs_sidebar = add_log(history_text, "sidebar");

    historyLogs.appendChild(history_logs);
    historyLogsSidebar.appendChild(history_logs_sidebar);

    function add_log(text, con){
        const element = document.createElement('div');
        if(con!=="sidebar"){

        }
        
        if (part_cnt == 0) {
            element.classList.add('history-log-start');
            var p_tag = document.createElement('p'); // 수정된 부분
            p_tag.textContent = text;
            const circle_element = document.createElement('div');
            circle_element.classList.add('circle');
            
            element.appendChild(p_tag);
            element.appendChild(circle_element);
        } else {
            element.classList.add('history-log');
            var p_tag = document.createElement('p'); // 수정된 부분
            p_tag.textContent = text;
            const circle_element = document.createElement('div');
            circle_element.classList.add('circle');
            const line_element = document.createElement('div');
            line_element.classList.add('line');
            
            element.appendChild(p_tag);
            element.appendChild(circle_element);
            element.appendChild(line_element);
        }
        
        if(con==="sidebar"){
            element.id = "history-sidebar-" + part_cnt;
            element.setAttribute('data-value', part_cnt);
            element.addEventListener('click', function() {
                confirmGoBack(element, history_text); // 수정된 부분
            });
        }else{
            element.id = "history-logs-" + part_cnt;
        }
        
        return element;
    }
}

// 분기 클릭시 대화상자 이벤트
function confirmGoBack(history_element, select_button_text) {
    select_change_modal(select_button_text); // 모달 생성 시 선택지 텍스트를 전달

    // 모달 엘리먼트 가져오기
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const submitBtn = document.getElementById("submitBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    // 제출 버튼 클릭 시
    submitBtn.onclick = function() {
        modal.style.display = "none";
        const select_part_num = parseInt(history_element.getAttribute('data-value'));
        const prev_data = data_history[select_part_num];
        console.log("select_part_num: " + select_part_num + " part_cnt: " + part_cnt);

        document.querySelectorAll('.options button').forEach(button => button.remove());
        for (let i = part_cnt; i >= select_part_num; i--) {
            console.log("delete part_cnt: " + i);
            const part_container = document.getElementById('part-' + i);
            const history_logs = document.getElementById('history-logs-' + i);
            const history_sidebar = document.getElementById('history-sidebar-' + i);
            
            if (part_container) {
                part_container.remove();
            }
            if (history_logs) {
                history_logs.remove();
            }
            if (history_sidebar) {
                history_sidebar.remove();
            }
            delete_data_history(i);
            delete_choice_history(i);
        }
        part_cnt = select_part_num;
        create_chat_div(prev_data);
    }

    // 취소 버튼 클릭 시
    cancelBtn.onclick = function() {
        modal.style.display = "none";
    }

    // 모달 바깥을 클릭하면 모달을 닫음
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // <span> 엘리먼트를 클릭하면 모달을 닫음
    span.onclick = function() {
        modal.style.display = "none";
    }
}

// 모달을 동적으로 생성하는 함수
function select_change_modal(text) {
    // 기존 모달을 제거
    const existingModal = document.getElementById("myModal");
    if (existingModal) {
        existingModal.remove();
    }

    const modalHtml = `
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>${text}의 선택지를 변경하시겠습니까?</p>
                <div class="button-container">
                    <button id="submitBtn">확인</button>
                    <button id="cancelBtn">취소</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // 모달 엘리먼트 가져오기
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const submitBtn = document.getElementById("submitBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    modal.style.display = "flex";
}

// 메인화면으로 이동 모달 생성
function goMain_modal() {
    // 기존 모달을 제거
    const existingModal = document.getElementById("myModal");
    if (existingModal) {
        existingModal.remove();
    }

    const modalHtml = `
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>메인화면으로 이동하시겠습니까?</p>
                <div class="button-container">
                    <button id="homeSubmitBtn">확인</button>
                    <button id="homeCancelBtn">취소</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // 모달 엘리먼트 가져오기
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const homeSubmitBtn = document.getElementById("homeSubmitBtn");
    const homeCancelBtn = document.getElementById("homeCancelBtn");

    modal.style.display = "flex";

    // 확인 버튼 클릭 시
    homeSubmitBtn.onclick = function() {
        modal.style.display = "none";
        window.location.href = '/list';
    }

    // 취소 버튼 클릭 시
    homeCancelBtn.onclick = function() {
        modal.style.display = "none";
    }

    // 모달 바깥을 클릭하면 모달을 닫음
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // <span> 엘리먼트를 클릭하면 모달을 닫음
    span.onclick = function() {
        modal.style.display = "none";
    }
}

// 스토리 생성 중에 클릭을 막는 함수
function deact_history_log() {
    const history_paragraphs = document.querySelectorAll('.history-log-start, .history-log');
    history_paragraphs.forEach(function(history) {
        history.addEventListener('click', preventClick, true);
        history.style.pointerEvents = 'none';
    });
}

// 스토리 생성 후 클릭을 허용하는 함수
function act_history_log() {
    const history_paragraphs = document.querySelectorAll('.history-log-start, .history-log');
    history_paragraphs.forEach(function(history) {
        history.removeEventListener('click', preventClick, true);
        history.style.pointerEvents = 'auto';
    });
}


function deact_options_button(){
    const buttons = document.querySelectorAll('.options button');
        buttons.forEach(button => {
            button.disabled = true;
        });
}

function act_options_button(){
    const buttons = document.querySelectorAll('.options button');
        buttons.forEach(button => {
            button.disabled = false;
        });
}

// 분기를 클릭하여 돌아갈 때 스토리 전달을 위해 사용하는 함수들
function save_data_history(data){
    data_history[part_cnt] = data;
    console.log(data_history);
}

function delete_data_history(part_cnt){
    delete data_history[part_cnt];
    console.log(data_history);
}

function save_choice_history(choice){
    choice_history[part_cnt] = choice;
    console.log(choice_history);
}

function delete_choice_history(part_cnt){
    delete choice_history[part_cnt];
    console.log(choice_history);
}

// 햄버거 버튼 클릭 시 동작
document.getElementById('hamburger').addEventListener('change', function() {
    const isChecked = this.checked;
    
    if (isChecked) {
        use_setting()
        deact_history_log();
        historyWrapper.style.opacity = '0.2';
    } else {
        disuse_setting();
        act_history_log();
        historyWrapper.style.opacity = '1';
    }
})

document.querySelector('.history-container').addEventListener('mouseover', function() {
    use_setting();
    settings.style.opacity = '0.2';
})
document.querySelector('.history-container').addEventListener('mouseleave', function() {
    disuse_setting();
    settings.style.opacity = '1';
})

function use_setting(){
    logo_a.style.opacity = '0.2';
    chatContainer.style.opacity = '0.2';
    options.style.opacity = '0.2';
    deact_options_button();
}

function disuse_setting(){
    logo_a.style.opacity = '1';
    chatContainer.style.opacity = '1';
    options.style.opacity = '1';
    act_options_button();
}

function goBack() {
    window.history.back();
};