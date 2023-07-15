const path = require('path');
const os = require('os');
const fs = require('fs');
// 계획
// 1. 사용자가 원하는 폴더이름을 받아온다.
const folderName = process.argv[2];
const workingDir = path.join(os.homedir(), 'pictures', folderName);
console.log(workingDir);
if (!folderName || !fs.existsSync(workingDir)) {
  console.error('please! enter Folder name in pictures');
  // return;
}
// 2. 그 폴더에 video, captured, duplicated 폴더를 만든다.
const videoDir = path.join(workingDir, 'videoDir');
const capturedDir = path.join(workingDir, 'capturedDir');
const duplicateDir = path.join(workingDir, 'duplicateDir');

console.log(videoDir);
console.log(capturedDir);
console.log(duplicateDir);
// 폴더를 먼저 만들고 파일을 만들어야 하기 때문에 동기적 Sync로 폴더 먼저 만든다.
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicateDir) && fs.mkdirSync(duplicateDir);
// 3. 폴더안에 있는 파일들을 다 돌면서 해당하는
// mp4|mov 는 video, png|aae는 image, IMG_1234는

fs.promises
  .readdir(workingDir) //
  .then(processFiles)
  .catch(console.errror);

function processFiles(files) {
  files.forEach((file) => {
    if (isVideoFile(file)) {
      move(file, videoDir);
    } else if (isCapturedFile(file)) {
      move(file, capturedDir);
    } else if (isDuplicatedFile(files, file)) {
      move(file, duplicateDir);
    }
  });
}

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match;
}
function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}
function isDuplicatedFile(files, file) {
  // IMG_XXX -> IMG_EXXX
  //E(수정된 파일이)있는 파일들중 E가 없는 원본만 찾기
  if (!file.startsWith('IMG') || file.startsWith('IMG_E')) {
    return false;
  }
  const edited = 'IMG_E' + file.split('_')[1];
  console.log(`edited임:${edited}`);
  // const found = files.find((f) => f.includes(edited));
  const found = files.includes(edited);

  return !!found;
}

function move(file, targetDir) {
  console.info(`move ${file} to ${targetDir}`);
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);
  fs.promises.rename(oldPath, newPath).catch(console.log);
}
