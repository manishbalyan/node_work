let fs = require('fs');
let data = '';
let data1 = "kkkkkkkkkkkk";
let zlib = require('zlib');


// read stream
let readerStream = fs.createReadStream('input.txt');
readerStream.setEncoding('UTF8');

readerStream.on('data', function(chuck){
    data += chuck;

});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});



// write stream
let writerStream = fs.createWriteStream('output.txt');

// writerStream.write(data1,'UTF8');
// writerStream.end();


writerStream.on('finish', function() {
    console.log("Write completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});


readerStream.pipe(writerStream);


// compress file
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));



// decompress file
// fs.createReadStream('input.txt.gz')
//    .pipe(zlib.createGunzip())
//    .pipe(fs.createWriteStream('input.txt'));