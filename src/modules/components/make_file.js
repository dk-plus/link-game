/**
 * Make some same name file quickly.
 * @author dkplus<dkplus.js@gmail.com>
 * 
 * Usage:
 * node make_file.js ${fileName}
 */
const fs = require('fs');
const process = require('process');

const _NAME = process.argv.slice(2);
let fileType = [
  '.tpl',
  '.less',
  '.js'
];

fs.mkdir(`./${_NAME}`, (err) => {

  if (err) {
    console.error(`✘ Something wrong was happened:${err}`);
    return;
  }

  console.log(`folder is made:\n ✔ [./${ _NAME }]`);
  fileType.forEach((type, index, arr) => {
    let prefix = '├';
    if (index === arr.length - 1) prefix = '└';

    fs.appendFile(`./${_NAME}/${_NAME}${type}`, '', function (err) {
      if (err) return;
      console.log(` ${prefix} ✔ [./${_NAME}/${_NAME}${type}]\t has been made.`);
    });
  });

});

console.log('The script will start soon:');