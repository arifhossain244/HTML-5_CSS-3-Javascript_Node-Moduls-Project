const express = require('express');
const formidable= require('formidable');
const fs = require('fs');
const path = require('path');

const app = express();
//folder
var folderPath = path.join(__dirname, "uploads");

app.use(express.static(__dirname));

app.post('/submit', (req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,async function (err, flds, files) {
        var data = {n:flds.name, c: flds.city, d: flds.dof, t:flds.tof};
        //console.log(files.pic);
        fs.copyFile(files.pic.path, path.join(folderPath, files.pic.name),(err)=>{
            if(err) return console.log(err);
            data.p = `/uploads/${files.pic.name}`;
            res.json(data);
            res.end();
        });
       
    });
   
});
app.listen(9191);
console.log("Server running at port 9191...");