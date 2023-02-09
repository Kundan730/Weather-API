const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post("/", (req, res) => {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = '45807daff0e4cc1174d6e6bf69a97839';
  const unit = 'metric';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    response.on('data', (d) => {
      const weatherData = JSON.parse(d);
      console.log(weatherData);

      // const object = {
      //   weather: 30,
      //   city: "Flash"
      // }
      // console.log(JSON.stringify(object));

      const main = weatherData.weather[0].main;
      const temperature = weatherData.main.temp;

      res.write(`<p>The Weather in ${query} is currently ${temperature} degree celcius.</p>`);

      res.write(`<h1>The main is ${main}</h1>`);

      const icon = weatherData.weather[0].icon;

      const image = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png">`;

      res.write(image);

      res.send();

      console.log(main);

      // console.log(d.toString());
      // process.stdout.write(d);
    });
  });
})

// const query = 'Ranchi';
// const apiKey = '45807daff0e4cc1174d6e6bf69a97839';
// const unit = 'metric';

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

// https.get(url, (response) => {
//   console.log('statusCode:', response.statusCode);
//   console.log('headers:', response.headers);

//   response.on('data', (d) => {
//     const weatherData = JSON.parse(d);
//     console.log(weatherData);

//     // const object = {
//     //   weather: 30,
//     //   city: "Flash"
//     // }
//     // console.log(JSON.stringify(object));

//     const main = weatherData.weather[0].main;
//     const temperature = weatherData.main.temp;

//     res.write(`<p>The Weather is currently ${temperature} degree celcius.</p>`);

//     res.write(`<h1>The main is ${main}</h1>`);

//     const icon = weatherData.weather[0].icon;

//     const image = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png">`;

//     res.write(image);

//     res.send();

//     console.log(main);

//     // console.log(d.toString());
//     // process.stdout.write(d);
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});