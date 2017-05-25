let fs = require('fs')


// let data = fs.readFileSync('input.txt');
let datafile=fs.readFile('input.txt',function(err,data){
    if(err){
        return console.log("error found");
    }
    else{
        return console.log(data.toString());
    }
})

console.log('jjjjjjj')