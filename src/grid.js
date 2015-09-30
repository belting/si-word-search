import fs from 'fs';

let grid = fs.readFileSync('./WordSearch.txt', 'utf8').toString().split('\n')
  .map(row => row.replace(/\n|\r/g, '').split(''))
  .filter(row => row.length > 0);

export default grid;
