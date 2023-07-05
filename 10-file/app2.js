//파일 FS에 관하여
const fs = require('fs').promises;

//read a file 파일 읽기
fs.readFile('./text.txt', 'utf8')
  //첫번째:"경로와 이름", 두번째 인자 : 인코딩 방식, 세번째 인자: flag (읽기전용,쓰기전용 선택)
  .then((data) => console.log(data))
  .catch(console.error);

// writing a file
fs.writeFile('./file.txt', 'Hello, YO  Dream Coders! :)').catch(console.error);
// write File을 클릭해보면 Promise<void> 아무것도 반환 하지 않는다 그래서 then이나 아무것도 안써도 되지만,
// 그래도 에러 핸들링을 위해 .catch문을 써줘야 한다.
// 첫번째 인자를 바꾸면 파일을 덮어쓰게 된다. 만약 기존 파일에 추가하고 싶다면
fs.appendFile('./file.txt', '앞에 문장 이미 있는 상태에서 추가해줌').catch(
  console.error
);
