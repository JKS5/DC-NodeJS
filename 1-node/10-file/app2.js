//파일 FS에 관하여
const fs = require('fs').promises;

//read a file 파일 읽기
fs.readFile('./text.txt', 'utf8')
  //첫번째:"경로와 이름", 두번째 인자 : 인코딩 방식, 세번째 인자: flag (읽기전용,쓰기전용 선택)
  .then((data) => console.log(data))
  .catch(console.error);

//파일 쓰기 writing a file
fs.writeFile('./file.txt', 'Hello, YO  Dream Coders! :)').catch(console.error);
// write File을 클릭해보면 Promise<void> 아무것도 반환 하지 않는다 그래서 then이나 아무것도 안써도 되지만,
// 그래도 에러 핸들링을 위해 .catch문을 써줘야 한다.
// 첫번째 인자를 바꾸면 파일을 덮어쓰게 된다. 만약 기존 파일에 추가하고 싶다면

// 파일 추가하기
fs.appendFile('./file.txt', '앞에 문장 이미 있는 상태에서 추가해줌').catch(
  console.error
);
// 파일 복사하기 copy
fs.copyFile('./text.txt', './file2.txt').catch(console.error);
// 만약 아무것도 보이지 않는다면 모든 위 절차가 비동기 적으로 작동 되기 때문에
// write를 하기도 전에 복사했을 수 있다. 그래서 그 부분을 해결 하려면

// 이런식으로 쓰면 된다.
// fs.appendFile('./file.txt', '앞에 문장 이미 있는 상태에서 추가해줌')
//   .then(() => {
//     //copy
//     fs.copyFile('./file.txt', './file2.txt').catch(console.error);
//   })
//   .catch(console.error);

//모든것은 비동기이기 때문에 순서대로 될 수 도 있고 안될 수도 있다.

//폴더 folder
fs.mkdir('sub-Folder').catch(console.error);
//현재 경로 읽어오기
fs.readdir('./').then(console.log).catch(console.error);
