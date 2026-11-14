const { execFileSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///C:/Users/rb152/OneDrive/Documents/B-Tech/6th%20sem%20PYQ/EndSem/dist/index.html';

const args = [
  '--headless=new',
  '--allow-file-access-from-files',
  '--no-sandbox',
  '--disable-gpu',
  '--dump-dom',
  fileUrl
];

const output = execFileSync(chromePath, args, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
console.log('DOM length:', output.length);
console.log('Includes id="root":', output.includes('id="root"'));
console.log('Sample root content:', output.slice(output.indexOf('id="root"'), output.indexOf('id="root"') + 500));

