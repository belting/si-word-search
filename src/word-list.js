'use strict';

import fs from 'fs';

let list = fs.readFileSync('./WordList.txt', 'utf8').toString().split('\n')
  .map(word => word.replace(/\n|\r/g, ''))
  .filter(word => word.length > 0);

export default list;
