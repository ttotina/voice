const http = require('http');
const fs = require('fs');

http.createServer(reqRes).listen('3000',()=>console.log('run 3000'));
function reqRes(req,res){
    if(req.url=='/'){
        fs.readFile('voice.html',(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write(data);
            res.end();
        })
    }else if(req.url=='/inset'){
        fs.readFile('inset.html',(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write(data);
            res.end();
        })
    }else if(req.url=='/post'){
        req.on('data',(el)=>{
            const formdata = JSON.parse(el.toString());
            const fobj = Object.keys(formdata);
            if(fs.existsSync('file.json')){
                fs.readFile('file.json','utf-8',(err,data)=>{
                    const filedata = JSON.parse(data)
                    const key = Object.keys(filedata)
                    const findkey = key.find(r=>r==fobj)
                    if(findkey==undefined){
                        filedata[fobj] = formdata[fobj]
                        fs.writeFile('file.json',JSON.stringify(filedata),()=>{
                            res.end('suxessfull');
                        })  
                    }else{
                        res.end('allreday exist')
                    }
                })
            }else{
                fs.writeFile('file.json',JSON.stringify(formdata),()=>{
                    res.end('suxessfull');
                })
            }
            
        })
    }else if(req.url=='/json'){
        if(fs.existsSync('file.json')){
            fs.readFile('file.json','utf-8',(err,data)=>{
                res.end(data);
            })
        }else{
            res.end('file not exist');
        }
    }
}