var
express = require("express"),
app = express(),
path = require("path");
// require('dotenv').load();


app.use('/css',express.static(path.join(__dirname, '../../client/css')));
app.use('/js',express.static(path.join(__dirname, '../../client/js')));
app.use('/partials',express.static(path.join(__dirname, '../../client/partials')));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

app.listen(3000, function () {
  console.log("running on 3000");
});