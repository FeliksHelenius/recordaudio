const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const upload = multer();
const port = 3000;
app.use(cors());
app.use(express.json());

app.post('/', cors(), upload.single('file'), (req, res) => {
	res.sendStatus(200);
	console.log(req.file);
});

app.listen(port, () => console.log('port is open uwu'));
