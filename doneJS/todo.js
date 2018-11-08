const fs=require('fs')
const readline = require('readline')

fs.writeFileSync('G:/javascript/一些小脚本/todo.txt', 'Hello Node');


//控制台的操作
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('What do you think of Node.js? ', (answer) => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${answer}`);
  
    rl.close();
  });