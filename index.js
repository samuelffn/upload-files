const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const { name, ext } = path.parse(file.originalname);
        
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});
const upload = multer({ storage }); 

app.use(express.static('public'));
app.post('/upload', upload.single('file'), (req, res) => {
    return res.send('Upload feito com sucesso!!!');
});

app.listen(3000);


/* O MESMO CÓDIGO COMENTADO COM INFORMAÇÕES PARA POSSÍVEIS DÚVIDAS: */
/*
const express = require('express');
const multer = require('multer');
const path = require('path'); //Para poder extrair informações do arquivo

const app = express();

const storage = multer.diskStorage({
    //cb: É o cow back do arquivo, pode ser qualquer nome. Ex.: meuAmor
    destination: (req, file, cb) => { //O destino onde o arquivo será upado, em uploads mesmo
        cb(null, './uploads'); //O ./ é referente ao caminho relativo
    },
    filename: (req, file, cb) => { //Informações do nome do arquivo
        const { name, ext } = path.parse(file.originalname); //Extraindo informações do nome do arquivo
        
        //Fazendo uma junção de valores para criar o novo nome do arquivo
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});

//Aponta para onde os nossos arquivos ficarão salvos
const upload = multer({ storage }); 

app.use(express.static('public')); //Aponta para o html que está na pasta public

//Definindo um rota utilizando o método post do http
//A rota apontando para local definido na action no html
//E informando o arquivo que foi definido como file no name do input no html 
app.post('/upload', upload.single('file'), (req, res) => {
    return res.send('Upload feito com sucesso!!!');
});

app.listen(3000);
*/

