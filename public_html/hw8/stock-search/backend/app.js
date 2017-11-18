var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');
var xml2js = require('xml2js');
var app = express();
var api = express.Router();
var parser = xml2js.parseString;

app.set('port', process.env.PORT || 3000);

const exportUrl = 'http://export.highcharts.com/';

const errorMessage = {
    'Error Message':'Unable to get message'
}
app.use(bodyParser.json());

app.use(cors());

app.get('/', function(req, res){
    res.send("hello");
})

api.get('/price', function(req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error){
        json = JSON.parse(body);
        res.send(json);
        } else {
            res.send(errorMessage);
        }
    });//getprice
    // res.send(test);
});

api.get('/sma', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=SMA&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
        json = JSON.parse(body);
        res.send(json);
        } else {
            res.send(errorMessage);
        }
    });//getSMA
});

api.get('/ema', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=EMA&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
        json = JSON.parse(body);
        res.send(json);
        } else {
            res.send(errorMessage);
        }
    });//getEMA
});

api.get('/stoch', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=STOCH&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
        json = JSON.parse(body);
        res.send(json);
        } else {
            res.send(errorMessage);
        }
    });//getSTOCH
});

api.get('/rsi', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=RSI&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
        json = JSON.parse(body);
        res.send(json);
        } else {
            res.send(errorMessage);
        }
    });//getRSI
});

api.get('/adx', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=ADX&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
        json = JSON.parse(body);
        res.send(json);
        } else {
            res.send(errorMessage);
        }
    });//getADX
});

api.get('/cci', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=CCI&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
        json = JSON.parse(body);
        res.send(json);
        } else {
            res.send(errorMessage);
        }
    });//getCCI
});

api.get('/bbands', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=BBANDS&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
        json = JSON.parse(body);
        res.send(json);
        } else {
            res.send(errorMessage);
        }
    });//getBBANDS
});

api.get('/macd', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=MACD&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
        json = JSON.parse(body);
        res.send(json);
        } else {
            res.send(errorMessage);
        }
    });//getMACD
});

api.get('/news', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://seekingalpha.com/api/sa/combined/" + symbol + ".xml";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error){
        parser(body, function (err, result) {
            // console.log(result);
            res.json(result);
        });
        } else {
            res.send(errorMessage);
        }
    });//getnews with error handling
});

api.get('/complete', function (req, res){
    var symbol = req.query.stockSymbol;
    const url = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + symbol;
    request.get(url, function (error, response, body) {
        if(response.statusCode === 200){
            json = JSON.parse(body);
            res.send(json);
        } else {
            //error handling
        }

    });
});

api.post('/highchart', function(req, res){

    request.post({
        header:{},
        url:exportUrl,
        form:req.body
    }, 
        function(error, response, body){
        if (response.statusCode == 200 && !error){
            var picUrl = exportUrl + body;
            res.send(picUrl);
        } else {
            console.log("error");
        }
    })
})
app.use('/api', api);
app.listen(app.get('port'));
console.log("app running on port: " + app.get('port'))