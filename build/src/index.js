'use strict';
var Alexa = require('alexa-sdk');
var request=require('request');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Mexican Peso';


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        // this.emit(':tell', 'Hi');
        this.emit('GetPrice');
    },
    'GetCurrentPriceIntent': function () {
        this.emit('GetPrice');
    },
    'GetPrice': function () {
        // Get price
        var currentPrice = getPriceUsd();
        var currentPriceMx = getPriceMxn();


        // Create speech output
        var speechOutput = "The current price of the Mexican Peso is "+ currentPrice + " <say-as interpret-as=\"spell-out\">US</say-as> Dollars. Or "+ currentPriceMx + " Mexican Pesos."

        this.emit(':tellWithCard', speechOutput)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say what is the current price? or How much is the peso?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Adios!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Adios!');
    }
};


function getPriceMxn() {
    var url = "http://api.fixer.io/latest?base=USD&symbols=MXN";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
    // return 20.241;

    
    


    // var price = getPrice();
    // return price;
    // return price_mx;
};

function getPriceUsd() {
    return 0.049405;
}


function getPrice() {
    // var url = "http://api.fixer.io/latest?base=USD&symbols=MXN";
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", url, false ); // false for synchronous request
    // xmlHttp.send( null );
    // return xmlHttp.responseText;
    // return 20.241;

    

    // var json = '{"result":true,"count":1}',
    // obj = JSON.parse(json);

    // alert(obj.count);
    return 20.241;

}









// -- NOTES --

// http://api.fixer.io/latest?base=USD&symbols=MXN
// {"base":"USD","date":"2016-12-12","rates":{"MXN":20.241}}

// http://api.fixer.io/latest?base=MXN&symbols=USD
// {"base":"MXN","date":"2016-12-12","rates":{"USD":0.049405}}



