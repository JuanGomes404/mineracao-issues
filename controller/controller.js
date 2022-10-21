const axios = require('axios');
const lda = require('lda');
const { response } = require('express');
const tag = 'feature'
const topic = "npm";

const api = 'https://api.github.com/search/issues?'
function exibirResposta(resJson){

    let resJSON_aux = JSON.stringify(resJson.data);    
    let resOBJ = JSON.parse(resJSON_aux);

    let res  = Object.values(resOBJ);
    let resObjects = Object.values(res[2]);
    let arrIssueText = resObjects.map(item => item["body"]);
    
    getTopicsLda(arrIssueText);
    
}
function getTopicsLda(arrText){
    let text = arrText[1];
    console.log(text);
    let docs = text.match( /[^\.!\?]+[\.!\?]+/g );

    let r = lda(docs, 2, 3);

    for(let i  in r ){
        let row = r[i];
        console.log("Tópico: "+ (parseInt(i)+ 1));

        for(let j in row){
            let term = row[j];
            console.log(term.term + ' (' + term.probability + '%)');
        }
        console.log('');
    }
}
module.exports = {
    async searchIssueGithub(_, res){
        
     await axios.get(api + 
        `q=${topic}+label:${tag}+state:open&sort=created&order=desc`).then(function(resposta){
            exibirResposta(resposta);

        })
        
    }
    
}