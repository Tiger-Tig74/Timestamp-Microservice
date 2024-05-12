// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp microservice routes
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;

  // Function to format date to UTC string
  const formatDate = (dateObj) => {
    return dateObj.toUTCString();
  };

  // If no date provided, use current time
  if (!date) {
    const currentTime = new Date();
    res.json({
      unix: currentTime.getTime(),
      utc: formatDate(currentTime)
    });
    return;
  }

  // Try parsing the provided date
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    // If invalid date, return error
    res.json({ error: "Invalid Date" });
    return;
  }

  // If date is valid, return Unix timestamp and UTC string
  res.json({
    unix: parsedDate.getTime(),
    utc: formatDate(parsedDate)
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
