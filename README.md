# jQuery Inflation Calculator

![inflated dollar](https://s3-us-west-2.amazonaws.com/web-dev-readme-photos/js/inflation.jpg)

## Note

This lab uses both Capybara and Jasmine tests. To run the Jasmine tests, type `learn` or `learn -b`. To run the Capybara tests, type `rspec`. Get all the Jasmine tests to pass before running the Capybara suite.

## Background

In economics, [inflation](http://en.wikipedia.org/wiki/Inflation) can be defined as a general increase in prices and fall in the purchasing value of money.

## Objective

You'll be using JavaScript to make an inflation calculator. It will use jQuery to fetch the user's input in the three input fields (start date, end date, start price), and using those values, query an API using jQuery's `getJSON` method. You will then add this value to the input with an id of `endPrice`.

Right click on the link below and select "Save link as..." to see a video of how your calculator should behave.

[inflation calc vid](https://s3-us-west-2.amazonaws.com/web-dev-readme-photos/js/inflation-calc.mp4)

## jQuery's `getJSON` function

jQuery's [getJSON](http://api.jquery.com/jquery.getjson/) funtion is just a shorthand for it's [ajax](http://api.jquery.com/jquery.ajax/) function.

Let's take a look at using `getJSON` to fetch today's weather predictions from [Open Weather Map](http://openweathermap.org/current). 

```javascript
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?";

$.getJSON(apiUrl, {
  q: 'New York',
  units: 'imperial'
}).done(function (data) {
  var weather = data.weather[0].description;
  console.log(weather);
});
```

The above JavaScript queries OpenWeather for the today's weather report for New York City and wants the measurements in imperial units. After fetching the data, it would then log "broken clouds" to the console on a slightly cloudy day or "sunny" and a cloudless summer's day. 

## Inflation API

In this lab, you'll be hitting [Stat Bureau's Inflation API](https://www.statbureau.org/en/inflation-api). Take a look at its [docs](https://www.statbureau.org/en/inflation-api). 

## Instructions

You'll be modifying only two files:

1. `public/javascripts/inflation-calculator.js`
2. `public/javascripts/on-click.js`

You'll put all the functions you write in `inflation-calculator.js` and all the code that must happen within a jQuery [.ready()](https://api.jquery.com/ready/) function inside `on-click.js` (hint: it might be an `.on("click", ...)` event handler function)

## Testing

As noted at the top, this lab uses both Capybara and Jasmine to test the JavaScript. Start by passing all the Jasmine tests (run your testing suite using `learn` or `learn -b`). Then run `rspec` to run the Capybara tests. Get all Jasmine tests passing before you run the Capybara tests.

## Resources

* [jQuery API - getJSON](http://api.jquery.com/jquery.getjson/)
* [jQuery API - Selectors](http://api.jquery.com/category/selectors/)
* [jQuery API - .text()](http://api.jquery.com/text/)
* [jQuery API - .val()](https://api.jquery.com/val/)
* [jQuery API - Events - Click](http://api.jquery.com/click/)
