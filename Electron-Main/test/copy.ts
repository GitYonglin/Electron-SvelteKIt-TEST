import { pathExists,copy } from "fs-extra"

const filePath = './dev/electron/loading.html';

const p = {
  filePath: 'H:\\LQ\\ElectronApp\\electron-main/dev/electron/loading.html',
  htmlfile: 'H:\\LQ\\ElectronApp\\electron-main/loading.html'
}
pathExists(filePath).then(t => {
  console.log(t);
  if (t) {
  } else {
    copy(p.htmlfile, p.filePath)
  }
}).catch(r => {
  console.log('rrrrr', r)
})
