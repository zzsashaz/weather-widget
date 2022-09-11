## Project setup
```
yarn install
```

## Project build
```
yarn build
```

## Widget basic usage

```html
<weather-widget></weather-widget>
<script src="dist/js/app.js" data-api-key="YOUR_OPEN_WEATHER_MAP_API_KEY"></script>
```

## Widget attributes you can use

* Init language (default = ```en```)
```html
<weather-widget></weather-widget>
<script
        src="dist/js/app.js"
        data-api-key="YOUR_OPEN_WEATHER_MAP_API_KEY"
        data-lang="ru|en"
></script>
```

* selector of tag for widget (default = ```weather-widget```)
```html
<my-own-widget></my-own-widget>
<script
        src="dist/js/app.js"
        data-api-key="YOUR_OPEN_WEATHER_MAP_API_KEY"
        data-widget-selector="my-own-widget"
></script>
```
