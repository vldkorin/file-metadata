var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  const {filename, mimetype, size} = req.file;
  console.log(req.file);
  res.json({
    name: filename,
    type: mimetype,
    size: size
  });
});

// {
//   fieldname: 'upfile',
//   originalname: 'Ð»Ð°Ð± 2 Ð¾Ð±Ñ\x94Ð´Ð½Ð°Ð½Ñ\x96 Ñ\x80Ð°Ð½Ð³Ð¸.docx',
//   encoding: '7bit',
//   mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//   destination: 'uploads/',
//   filename: '9486b7add93f3f5951b39270bbe58389',
//   path: 'uploads/9486b7add93f3f5951b39270bbe58389',
//   size: 19333
// }

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
