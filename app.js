var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var imgSchema = require('./model.js');
var fs = require('fs');
var path = require('path');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
.then(console.log("DB Connected"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname+ Date.now());
	}
});

var upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res, next) => {
	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/jpg'
		}
	}

    let resultdata = new imgSchema(obj);
    resultdata.save().then(item => {
        return res.json({
			message:"user added",
            data: item
		})
    }).catch((err) => {
        res.json({
			message:"user not added"
		})
	
    })
    console.log(resultdata);
});

var port = process.env.PORT || '3000'


app.get("/get", async(req,res)=>{

let hh=await imgSchema.find({})

    res.send(hh)
})

app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})

