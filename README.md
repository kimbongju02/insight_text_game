# insight_text_game

  Project Folder
  ├── dataset
  │   └── novel_data.json / local novel dataset
  │
  └── web
      ├── html
      │   ├── createStory.html / 스토리 생성 페이지
      │   ├── detailStory.html / 로컬 스토리 정보 페이지
      │   ├── gamePage.html / 게임 수행 페이지
      │   ├── mainPage.html
      │   └── storyList.html / 스토리 목록 페이지
      │
      ├── python
      │   ├── func / router 이외의 처리 
      │   │   ├── createGame.py / 게임 플레이 페이지에서 딕셔너리 전달
      │   │   └── loadStory.py / 로컬 스토리 정보 전달
      │   ├── router
      │   │   ├── createStoryR.py
      │   │   ├── detailStoryR.py
      │   │   ├── playGameR.py
      │   │   └── storyListR.py
      │   ├── server.py
      │
      └── static
          ├── css
          │   ├── createStoryPage.css 
          │   ├── detailStory.css
          │   ├── gamePage.css
          │   ├── mainPage.css
          │   └── storyList.css
          │
          ├── img
          │   └── *.png
          │
          └── js
              ├── createStory.js
              ├── detailStory.js
              ├── gamePage.js
              ├── move_rink.js
              └── storyList.js