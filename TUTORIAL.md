##Inflation Calculator

###Objectives: 
- Implement an api call with `getJson`.
- Understand when and why callbacks are used in JavaScript.

###Overview: 
- Step 1: Capture user input from the page using jQuery.
- Step 2: Make an ajax call with that information.
- Step 3: Display the new information

####Note* Make sure to set up your event click handler in `on-click.js`, this is what makes your code execute.

Our inflation calculator is going to accept a start date, end date and a price. We want our calculate button to be listening for a user action, in this case a click. When the user clicks, it will trigger an asynchronous call that uses jQuery to fetch the user's input in the three input fields (start date, end date, start price), and using those values, query an API using jQuery's getJSON method. You will then add this value to the input with an id of endPrice.

###Get User Input
The first thing we should do is inspect our form on `index.html`. It looks like we have the id's `#startDate`, `#endDate` and `#startPrice`. Using jQuery, let's build a method that accesses the values associated to those id's.

```
function fetchUserInput(){
  return{
    start:  $('#startDate').val(),
    end:    $('#endDate').val(),
    amount: $('#startPrice').val()
  }
}
```
###Make Ajax Request
Now that we have a way to obtain user input, we need to build a function that sends an ajax request, has it manipulated (gives us the inflated price) and returns it to us. Let's call this method `fetchUserInput`. 

```
function fetchEndPrice(){
  debugger;
  //make ajax request and get info back
}
```

So we are ready to make an ajax call to the api, but what information are we going to send? Let's put a debugger in our `fetchEndPrice` method (as seen above)  and see what we have available to us. 

Since we built a `fetchUserInput` method before, let's type that into our JavaScript console to see what is returned.

```
fetchUserInput();
Object {start: "2012/11/27", end: "2012/12/04", amount: "200"}
```
Great, it looks like we have our user input! Let's set that method to a variable in our `fetchEndPrice` method to give us access to our user input.

```
function fetchEndPrice(){
  var options = fetchOptions();
}
```
Let's go into our debugger and test this out.

```
fetchUserInput();
Object {start: "2012/12/04", end: "2012/11/30", amount: "200"}
var options = fetchUserInput();
undefined
options.start
"2012/12/04"
options.end
"2012/11/30"
options.amount
"200"
```
By setting an `options` variable, we can now call `options.start`, `options.end` and `options.amount` to obtain our user data.

###Pass data to the api

Now that we have our user data, we need to create a variable that points to the api url endpoint that we want to access. Take a look at the api docs that we are using <a href="https://www.statbureau.org/en/inflation-api">here</a>. 

Next we are going to use jQuery's <a href="http://api.jquery.com/jquery.getjson/">getJson</a> function to make our ajax call. Using the api docs again, we  can see we need a country, start, end and amount. We can access this data via our `options` variable, so `options.start` for example. 

After our method executes, we call `.done` so we can chain on our callback, in this case our `addPriceTopage` method. 

To summarize, our `fetchEndPrice` will send our user input to the api, manipulate it, then call our `addPriceToPage` method (a callback which we will build next) to display the new price to our user.


```
function fetchEndPrice(addPriceToPage){
  var options = fetchOptions();
  var apiUrl = 'http://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';
  $.getJSON(apiUrl, {
    country: 'united-states',
    start: options.start,
    end: options.end,
    amount: options.amount,
    format: true
  }).done(addPriceToPage)
}
```
#####Note* `fetchEndPrice` will implicitly return a price value from the api call that will be passed into our `addPriceToPage` callback.

###Add Price To Page

Let's put a debugger into our method to see what we are working with.

```
function addPriceToPage(endPrice){
  debugger;
}
```
Type `price` into your JavaScript console, if everything is working correctly it should be return to you.

```
price
"$299.19"
```
Now that we have our price, let's fill in the body of our `addPriceToPage` method.

```
function addPriceToPage(price){
  var finalPrice = price.substring(1);
  $('#endPrice').val(finalPrice);
  return price;
}
```
In order to remove the $ sign from the return value, we use the <a href="http://www.jquerybyexample.net/2012/03/how-to-substring-in-jquery.html">substring</a> method. We then explicitly return `price`.

