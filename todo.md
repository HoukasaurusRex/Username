# TODO

* [ ] Automate favorite sites
* [x] Add gif banner
* [ ] Automate publishes https://github.com/simonw/simonw
* [ ] Automate releases 

## Notes

- new blog publishes
- github releases
- Twitter latest
- Waka data
- https://github.com/anuraghazra/github-readme-stats
- https://github.com/anmol098/anmol098 inspiration
- https://github.com/WaylonWalker/WaylonWalker inspiration

```yaml
name: README build

on:
  push:
    branches:
      - master
  schedule:
    - cron: '0 */3 * * *'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: checkout
        uses: actions/checkout@v1
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: '13.x'
      - name: cache
        uses: actions/cache@v1
        with:
          path: node_modules
          key: ${{ runner.os }}-js-${{ hashFiles('package-lock.json') }}
      - name: Install dependencies
        run: npm install
      - name: Generate README file
        run: node index.js
        env:
          OPEN_WEATHER_MAP_KEY: ${{secrets.OPEN_WEATHER_MAP_KEY}}
      - name: Push new README.md
        uses: mikeal/publish-to-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

```js
equire('dotenv').config();
const Mustache = require('mustache');
const fetch = require('node-fetch');
const fs = require('fs');
const puppeteerService = require('./services/puppeteer.service');

const MUSTACHE_MAIN_DIR = './main.mustache';

let DATA = {
  refresh_date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Stockholm',
  }),
};

async function setWeatherInformation() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
  )
    .then(r => r.json())
    .then(r => {
      DATA.city_temperature = Math.round(r.main.temp);
      DATA.city_weather = r.weather[0].description;
      DATA.city_weather_icon = r.weather[0].icon;
      DATA.sun_rise = new Date(r.sys.sunrise * 1000).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm',
      });
      DATA.sun_set = new Date(r.sys.sunset * 1000).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm',
      });
    });
}

async function setInstagramPosts() {
  const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount('visitstockholm', 3);
  DATA.img1 = instagramImages[0];
  DATA.img2 = instagramImages[1];
  DATA.img3 = instagramImages[2];
}

async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {
  /**
   * Fetch Weather
   */
  await setWeatherInformation();

  /**
   * Get pictures
   */
  await setInstagramPosts();

  /**
   * Generate README
   */
  await generateReadMe();

  /**
   * Fermeture de la boutique 👋
   */
  await puppeteerService.close();
}

action();
```