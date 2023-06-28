//파일 시스템에 접근할때 주로 쓰는 module
const path = require('path');

//POSIX (Unix:Mac, Linux): 'Users/temp/myfile.html'
//Windows: 'C:\\temp\\myfile.html'

console.log(__dirname);
console.log(__filename);

// 운영체제마다 경로가 다르기 때문에 순수하게 경로를 작성하지 않고 path를 쓴다.
// Mac운영체제인데 코드가 "C:\\temp\\myfile.html"이라고 작성하면 인식하지 못한다.
// 그래서 path를 사용한다. 운영체제가 달라져도 잘 동작할 수 있도록

console.log(path.sep); //경로 구분자 window : \  , Mac : /
console.log(path.delimiter); //환경 변수 구분자 window : ; , Mac : :

//basename
console.log(path.basename(__filename)); // 파일 이름과 확장자 출력
console.log(path.basename(__filename, '.js')); //확장자를 제거하고 싶다면 파일이름만 출력

//dirname : 디렉토리 (폴더) 경로
console.log(path.dirname(__filename));

//extension :확장자만
console.log(path.extname(__filename));

//parse
const parsed = path.parse(__filename);
console.log(parsed);
// {
//   root: 'C:\\',  :루트디렉토리는 어디인지
//   dir: 'C:\\Coding\\DreamCoding\\Node.JS\\9-path', :디렉토리 절대 경로
//   base: 'app.js', :base
//   ext: '.js', :확장자
//   name: 'app' :이름
// }

// obj 형태를 string 형태로 변환 가능
//C:\Coding\DreamCoding\Node.JS\9-path\app.js
const str = path.format(parsed);
console.log(str);

//절대 경로인지 아니면 현재 경로에서 상대적 경로인지 확인
// isAbsolute

console.log('isAbsolute?', path.isAbsolute(__dirname));
console.log('isAbsolute?', path.isAbsolute(__filename));
