console.log('hi');
console.log('hi');
console.log('hey');
// package.json에서
// 일반적인 명령어를 사용하고 싶다면

// 내가 node.js에서 제공하는 command (ex: start) 라면
// npm 'command'

// 내가 원하는 custome command를 작성한후 실행하고 싶다면 'run'을 적어줘야함
// npm run '나의command'를 치기

// package.json의 license들 검색
//보통은 ISC License를 많이 사용
//https://spdx.org/licenses/
// https://www.olis.or.kr/license/Detailselect.do?lType=spdx&lId=1074

// npm ls
// npm ll :설치된 리스트
// npm ll -g :global하게 설치된 라이브러리 리스트
// npm view underscore :underscore에 대한 최신 정보, 혹은 npm 사이트에서 직접가서 확인 가능
// npm uninstall '이름' , npm un '이름' : 해당 '이름'라이브러리 삭제하는 커맨드
// npm outdate :오래된 버젼 확인, underscore: "^1.13.1" 해당 ^ 버젼 설정에 따라 보여지는 업데이트 가능한 버젼을 보여주는 것이 다르다.
// npm update : 버젼 업데이트
// npm install nodemon --save-dev : nodemon 개발모드로 설치
// package.json에서 nodemon으로 설정하기.  "scripts": {"start": "nodemon app",}
