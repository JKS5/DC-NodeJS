const fs = require('fs');
const os = require('os');
const path = require('path');
const porcess = require('process');

// 1. 먼저 argv로 원하는 데이터를 받는다.
const folderName = process.argv[2];
const folderDir = path.join(os.homedir(), 'pictures', folderName);
if (!folderName | !fs.existsSync(folderDir)) {
  console.info('Please make the folder and Name');
  return;
}
// 2. 폴더를 만든다.
const videoDir = path.join(folderDir, 'videoDir');
const duplicateDir = path.join(folderDir, 'duplicateDir');
const capturedDir = path.join(folderDir, 'capturedDir');
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(duplicateDir) && fs.mkdirSync(duplicateDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);

//3. 파일을 서로 구분하고 분류한다.
fs.promises
  .readdir(folderDir) //
  .then(Sorting)
  .catch(console.error);

function Sorting(files) {
  files.forEach((file) => {
    if (isVideo(file)) {
      move(file, videoDir);
    } else if (isCaptured(file)) {
      move(file, duplicateDir);
    } else if (isDuplicated(files, file)) {
      move(file, capturedDir);
    }
  });
}
// 판별 함수들
function isVideo(file) {
  const regExp = RegExp(/(mov|mp4)$/gm);
  const match = file.match(regExp);
  return !!match;
}
function isCaptured(file) {
  const regExp = RegExp(/(png|aee)$/gm);
  const match = file.match(regExp);
  return !!match;
}
function isDuplicated(files, file) {
  //IMG_XXX , IMG_EXXX
  //IMG_E 아닌 파일만 날림 => IMG_E만 찾아서 그값으로 원본 찾아
  // 원본을 복제폴더(duplicated)에 넣기
  if (!file.startsWith('IMG_E')) {
    return false;
  }
  const OG = 'IMG_' + file.split('E')[1];
  const found = files.includes(OG);
  return found;
  // const found = files.find((e) => e === `${OG}`);
  // return !!found;
}
function move(file, targetDir) {
  const oldPath = path.join(folderDir, file);
  const newPath = path.join(targetDir, file);
  fs.promises.rename(oldPath, newPath).catch(console.log);
}
