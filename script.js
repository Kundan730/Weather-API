const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

app.get('/', (req, res) => {

  const url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=45807daff0e4cc1174d6e6bf69a97839&units=metric";

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

      const temperature = weatherData.weather[0].id;

      console.log(temperature);

      // console.log(d.toString());
      // process.stdout.write(d);
    });

  });

  res.send('Hello, weather');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});