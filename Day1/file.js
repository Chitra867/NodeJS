// File handling
const fs=require('fs');

// fs.writeFileSync('./test.txt','Hey there')

// console.log("1")
// const result = fs.readFileSync('./contact.txt', "utf-8")
// console.log(result)
// console.log("2")

console.log("1")
const result=fs.readFile('./contact.txt',"utf-8",(err,result) =>{
    if(err){
        console.log("error", err);
    }else{
    console.log(result);}
})
console.log("2")



// console.log(result);