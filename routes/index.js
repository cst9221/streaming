var express = require('express');
var router = express.Router();
const fs = require('fs');
const hls = require('hls-server');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
  // res.json({ error: err})
});

router.get('/video', (req, res) => {
  return res.status(200).sendFile(`index.html`);
});

router.get('/documents/:id', (req,res) => {
  res.json({id: req.params.id});
});

module.exports = router;
