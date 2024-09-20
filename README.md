# insight_text_game

<br>  Project Folder
<br>  ├── dataset
<br>  │   └── novel_data.json / local novel dataset
<br>  │
<br>  └── web
<br>      ├── html
<br>      │   ├── createStory.html / 스토리 생성 페이지
<br>      │   ├── detailStory.html / 로컬 스토리 정보 페이지
<br>      │   ├── gamePage.html / 게임 수행 페이지
<br>      │   ├── mainPage.html
<br>      │   └── storyList.html / 스토리 목록 페이지
<br>      │
<br>      ├── python
<br>      │   ├── func / router 이외의 처리 
<br>      │   │   ├── createGame.py / 게임 플레이 페이지에서 딕셔너리 전달
<br>      │   │   └── loadStory.py / 로컬 스토리 정보 전달
<br>      │   ├── router
<br>      │   │   ├── createStoryR.py
<br>      │   │   ├── detailStoryR.py
<br>      │   │   ├── playGameR.py
<br>      │   │   └── storyListR.py
<br>      │   ├── server.py
<br>      │
<br>      └── static
<br>          ├── css
<br>          │   ├── createStoryPage.css 
<br>          │   ├── detailStory.css
<br>          │   ├── gamePage.css
<br>          │   ├── mainPage.css
<br>          │   └── storyList.css
<br>          │
<br>          ├── img
<br>          │   └── *.png
<br>          │
<br>          └── js
<br>              ├── createStory.js
<br>              ├── detailStory.js
<br>              ├── gamePage.js
<br>              ├── move_rink.js
<br>              └── storyList.js