
let fs = require('fs');
let path = require('path')
const files = {
    deletFiles : (nameFile) =>{
     let file = path.join(__dirname,'..','uploads',nameFile)
    fs.unlink(file, err =>{
        if(err) throw err
        console.log("Arquivo deletado com sucesso!");
    })
    }
}


module.exports = files
