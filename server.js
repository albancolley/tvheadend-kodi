const express = require('express');

const axios = require("axios");
const loki = require("lokijs");



const app = express();
const port = process.env.PORT || 5000;

var db = new loki('loki.json')

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

	app.get('/api/recordings', function(req, res) { 
  	axios
  .get("http://192.168.1.247:9981/api/dvr/entry/grid_finished?sort=disp_title")
  .then(response => {
	  
	  res.json(response.data); 
  })
  .catch(error => {
    console.log(error);
  });
});


app.get('/api/load', (req, res) => {
	axios
  .get("http://192.168.1.247:9981/api/dvr/entry/grid_finished?sort=disp_title")
  .then(response => {
	  db.removeCollection('recordings')
	  recordings = db.addCollection('recordings')
	  recordings.insert(response.data.entries);
	  var rows = recordings.where(function(obj) {
		  return obj.disp_title.startsWith("A");
		});
	  var results=
	  {
		  data : rows,
		  total : rows.count
	  }
	  res.json(results); 
  })
  .catch(error => {
    console.log(error);
  });
});
	 
app.listen(port, () => console.log(`Listening on port ${port}`));