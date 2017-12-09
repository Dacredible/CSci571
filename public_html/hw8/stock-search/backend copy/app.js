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

function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

app.get('/', function (req, res) {
    res.send("hello");
});

api.get('/ios/test', function (req, res) {
    res.send("hello, you made it here");

});

api.get('/ios/pricetable', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                //Table data
                var stockSymbol = json['Meta Data']['2. Symbol'];
                dates = Object.keys(json["Time Series (Daily)"]);
                today = dates[0];
                var lastRefresh = json['Meta Data']['3. Last Refreshed'];
                if (lastRefresh.includes(' ')) {
                    timestamp = lastRefresh + " EST";
                } else {
                    timestamp = today + " 16:00:00 EST";
                }
                today_close = parseFloat(json['Time Series (Daily)'][today]['4. close']).toFixed(2);
                previous_close = parseFloat(json['Time Series (Daily)'][dates[1]]['4. close']).toFixed(2);
                open = parseFloat(json['Time Series (Daily)'][today]['1. open']).toFixed(2);
                low = parseFloat(json['Time Series (Daily)'][today]['3. low']).toFixed(2);
                high = parseFloat(json['Time Series (Daily)'][today]['2. high']).toFixed(2);
                range = low - high;
                var volumeTemp = json['Time Series (Daily)'][today]['5. volume'];
                volume = numberWithCommas(volumeTemp);
                change = (parseFloat(today_close) - parseFloat(previous_close)).toFixed(2);
                change_percent = ((parseFloat(change) / parseFloat(previous_close)) * 100).toFixed(2);


                formatJson = {
                    "Stock Ticker Symbol": stockSymbol,
                    "Last Price": today_close,
                    "Change": change + " (" + change_percent + "%)",
                    "Timestamp": timestamp,
                    "Open": open,
                    "Close": previous_close,
                    "Day's Range": low + "-" + high,
                    "Volume": volume,
                }

                res.send(formatJson);
            }
        } else {
            res.send(errorMessage);
        }
    });//getprice
    // res.send(test);
});

api.get('/ios/pricechart', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                var stockSymbol = json['Meta Data']['2. Symbol'];
                dates = Object.keys(json["Time Series (Daily)"]);
                priceArr = new Array();
                volumeArr = new Array();
                daysArr = new Array();

                for (var i = 0; i < 130; i++) {
                    priceArr.push(json['Time Series (Daily)'][dates[i]]['4. close']);
                    volumeArr.push(json['Time Series (Daily)'][dates[i]]['5. volume']);
                }
                var datesTemp = new Array();
                for (var i = 0; i < 130; i++) {
                    datesTemp[i] = dates[i].replace(/-/g, "/"); //warnning! this will change dates format, every process relevant to original format should run before this step
                    var x = new Date(datesTemp[i]);
                    var y = (x.getMonth() < 9 ? "0" : "") + (x.getMonth() + 1) + "/" + (x.getDate() < 10 ? "0" : "") + (x.getDate());
                    daysArr.push(y);
                }

                priceArr.reverse();
                priceArr.reverse();
                daysArr.reverse();

                priceArr = priceArr.map(Number);
                volumeArr = volumeArr.map(Number);

                var maxValue = Math.max.apply(null, priceArr);
                var minValue = Math.min.apply(null, priceArr) - 10;
                var maxVolume = Math.max.apply(null, volumeArr) * 2;

                var options = {
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: symbol + " Stock Price and Volume"
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },

                    yAxis: [{//0
                        title: {
                            text: 'Stock Price'
                        },
                        tickInterval: 5,
                        max: maxValue,
                        min: minValue
                    }, {
                        title: {//1
                            text: 'Volume'
                        },
                        max: maxVolume,
                        min: 0,
                        tickInterval: 50000000,
                        opposite: true
                    }],
                    xAxis: {
                        tickInterval: 25,
                        categories: daysArr,
                        tickPositioner: function () {
                            let res = [];
                            for (let i = 0; i < this.categories.length; i++) {
                                if (i % 5 == 0) res.push(this.categories.length - 1 - i);
                            }
                            return res;
                        },
                        rotation: -45

                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            }
                        }
                    },
                    tooltip: {
                        pointFormat: symbol + ":{point.y:.2f}"
                    },
                    series: [{
                        yAxis: 0,
                        name: 'Price',
                        type: 'area',
                        color: '#2276e5',
                        marker: {
                            enabled: false
                        },
                        data: priceArr
                    }, {
                        yAxis: 1,
                        type: 'column',
                        name: ' volume',
                        color: 'red',
                        data: volumeArr
                    }],
                };

                formatJson = { "options": options }
                res.send(formatJson);
            }
        } else {

        }
    });


});

api.get('/ios/histchart', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                var stockSymbol = json['Meta Data']['2. Symbol'];
                dates = Object.keys(json["Time Series (Daily)"]);

                var historyData = new Array();

                var length = dates.length;

                for (var i = 0; i < length; i++) {
                    if (i >= 1000) {
                        break;
                    }
                    historyData[i] = new Array();
                    var d = new Date(dates[i]);
                    historyData[i][0] = d.getTime() - 0;
                    historyData[i][1] = json["Time Series (Daily)"][dates[i]]['4. close'] - 0;

                }

                var histOptions = {
                    rangeSelector: {
                        buttons: [{
                            type: 'month',
                            count: 1,
                            text: '1m'
                        }, {
                            type: 'month',
                            count: 3,
                            text: '3m'
                        }, {
                            type: 'month',
                            count: 6,
                            text: '6m'
                        }, {
                            type: 'year',
                            count: 1,
                            text: '1y'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],
                        selected: 0
                    },
                    title: {
                        text: stockSymbol + " Stock Value"
                    },
                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },
                    series: [{
                        name: symbol,
                        data: historyData.reverse(),
                        type: 'area',
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                };

                formatJson = { "options": histOptions }
                res.send(formatJson);
                // res.send(historyData.reverse())
            }
        } else {

        }
    });

});

api.get('/ios/sma', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=SMA&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                var dataArrays = Object.keys(json['Technical Analysis: SMA']).map((k) => json['Technical Analysis: SMA'][k]);
                var dates = Object.keys(json['Technical Analysis: SMA']);
                //set days for xAxis
                var days = new Array();
                for (var i = 0; i < 130; i++) {
                    dates[i] = dates[i].replace(/-/g, "/");
                    var x = new Date(dates[i]);
                    var y = (x.getMonth() < 9 ? "0" : "") + (x.getMonth() + 1) + "/" + (x.getDate() < 10 ? "0" : "") + (x.getDate());
                    days.push(y);
                }
                days.reverse();

                var indicatorData = new Array();
                for (var i = 0; i < 130; i++) {
                    indicatorData.push(dataArrays[i]['SMA']);
                }
                indicatorData = indicatorData.map(Number);
                indicatorData.reverse();

                options = {
                    chart: {
                        type: 'line',
                        zoomType: 'x'
                    },
                    title: {
                        text: json['Meta Data']['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },

                    yAxis: {
                        title: {
                            text: "SMA"
                        }
                    },
                    xAxis: {
                        categories: days,
                        tickInterval: 5
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },

                    series: [{
                        color: '#eb4d47',
                        name: json['Meta Data']['1: Symbol'],
                        data: indicatorData
                    }]
                }

                formatJson = {
                    "options": options
                };


                res.send(formatJson);
            }
        } else {
            res.send(errorMessage);
        }
    });//getSMA
});

api.get('/ios/ema', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=EMA&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                var dataArrays = Object.keys(json['Technical Analysis: EMA']).map((k) => json['Technical Analysis: EMA'][k]);
                var dates = Object.keys(json['Technical Analysis: EMA']);
                //set days for xAxis
                var days = new Array();
                for (var i = 0; i < 130; i++) {
                    dates[i] = dates[i].replace(/-/g, "/");
                    var x = new Date(dates[i]);
                    var y = (x.getMonth() < 9 ? "0" : "") + (x.getMonth() + 1) + "/" + (x.getDate() < 10 ? "0" : "") + (x.getDate());
                    days.push(y);
                }
                days.reverse();

                var indicatorData = new Array();
                for (var i = 0; i < 130; i++) {
                    indicatorData.push(dataArrays[i]['EMA']);
                }
                indicatorData = indicatorData.map(Number);
                indicatorData.reverse();

                options = {
                    chart: {
                        type: 'line',
                        zoomType: 'x'
                    },
                    title: {
                        text: json['Meta Data']['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },

                    yAxis: {
                        title: {
                            text: "EMA"
                        }
                    },
                    xAxis: {
                        categories: days,
                        tickInterval: 5
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },

                    series: [{
                        color: '#eb4d47',
                        name: json['Meta Data']['1: Symbol'],
                        data: indicatorData
                    }]
                }

                formatJson = {
                    "options": options
                };


                res.send(formatJson);
            }
        } else {
            res.send(errorMessage);
        }
    });//getEMA
});

api.get('/ios/rsi', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=RSI&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                var dataArrays = Object.keys(json['Technical Analysis: RSI']).map((k) => json['Technical Analysis: RSI'][k]);
                var dates = Object.keys(json['Technical Analysis: RSI']);
                //set days for xAxis
                var days = new Array();
                for (var i = 0; i < 130; i++) {
                    dates[i] = dates[i].replace(/-/g, "/");
                    var x = new Date(dates[i]);
                    var y = (x.getMonth() < 9 ? "0" : "") + (x.getMonth() + 1) + "/" + (x.getDate() < 10 ? "0" : "") + (x.getDate());
                    days.push(y);
                }
                days.reverse();

                var indicatorData = new Array();
                for (var i = 0; i < 130; i++) {
                    indicatorData.push(dataArrays[i]['RSI']);
                }
                indicatorData = indicatorData.map(Number);
                indicatorData.reverse();

                options = {
                    chart: {
                        type: 'line',
                        zoomType: 'x'
                    },
                    title: {
                        text: json['Meta Data']['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },

                    yAxis: {
                        title: {
                            text: "RSI"
                        }
                    },
                    xAxis: {
                        categories: days,
                        tickInterval: 5
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },

                    series: [{
                        color: '#eb4d47',
                        name: json['Meta Data']['1: Symbol'],
                        data: indicatorData
                    }]
                }

                formatJson = {
                    "options": options
                };


                res.send(formatJson);
            }
        } else {
            res.send(errorMessage);
        }
    });//getRSI
});

api.get('/ios/stoch', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=STOCH&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send('error')
            } else {
                var dataArrays = Object.keys(json['Technical Analysis: STOCH']).map((k) => json['Technical Analysis: STOCH'][k]);
                var dates = Object.keys(json['Technical Analysis: STOCH']);
                //set days for xAxis
                var days = new Array();
                for (var i = 0; i < 130; i++) {
                    dates[i] = dates[i].replace(/-/g, "/");
                    var x = new Date(dates[i]);
                    var y = (x.getMonth() < 9 ? "0" : "") + (x.getMonth() + 1) + "/" + (x.getDate() < 10 ? "0" : "") + (x.getDate());
                    days.push(y);
                }
                days.reverse();

                var slowD = new Array();
                var slowK = new Array();
                for (var i = 0; i < 130; i++) {
                    slowD.push(dataArrays[i]['SlowD']);
                    slowK.push(dataArrays[i]['SlowK']);
                }
                slowD = slowD.map(Number);
                slowK = slowK.map(Number);
                slowD.reverse();
                slowK.reverse();

                options = {
                    chart: {
                        type: 'line',
                        zoomType: 'x'
                    },
                    title: {
                        text: json['Meta Data']['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },

                    yAxis: {
                        title: {
                            text: 'STOCH'
                        }
                    },
                    xAxis: {
                        categories: days,
                        tickInterval: 5
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },

                    series: [{
                        color: '#eb4d47',
                        name: json['Meta Data']['1: Symbol'] + ' slowD',
                        data: slowD
                    }, {
                        name: json['Meta Data']['1: Symbol'] + ' slowK',
                        data: slowK
                    }]

                }

                formatJson = {
                    "options": options
                };

                res.send(formatJson);
            }

        } else {
            res.send(errorMessage);
        }
    });//getSTOCH
});

api.get('/ios/adx', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=ADX&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                var dataArrays = Object.keys(json['Technical Analysis: ADX']).map((k) => json['Technical Analysis: ADX'][k]);
                var dates = Object.keys(json['Technical Analysis: ADX']);
                //set days for xAxis
                var days = new Array();
                for (var i = 0; i < 130; i++) {
                    dates[i] = dates[i].replace(/-/g, "/");
                    var x = new Date(dates[i]);
                    var y = (x.getMonth() < 9 ? "0" : "") + (x.getMonth() + 1) + "/" + (x.getDate() < 10 ? "0" : "") + (x.getDate());
                    days.push(y);
                }
                days.reverse();

                var indicatorData = new Array();
                for (var i = 0; i < 130; i++) {
                    indicatorData.push(dataArrays[i]['ADX']);
                }
                indicatorData = indicatorData.map(Number);
                indicatorData.reverse();

                options = {
                    chart: {
                        type: 'line',
                        zoomType: 'x'
                    },
                    title: {
                        text: json['Meta Data']['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },

                    yAxis: {
                        title: {
                            text: "ADX"
                        }
                    },
                    xAxis: {
                        categories: days,
                        tickInterval: 5
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },

                    series: [{
                        color: '#eb4d47',
                        name: json['Meta Data']['1: Symbol'],
                        data: indicatorData
                    }]
                }

                formatJson = {
                    "options": options
                };


                res.send(formatJson);
            }
        } else {
            res.send(errorMessage);
        }
    });//getADX
});

api.get('/ios/cci', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=CCI&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                var dataArrays = Object.keys(json['Technical Analysis: CCI']).map((k) => json['Technical Analysis: CCI'][k]);
                var dates = Object.keys(json['Technical Analysis: CCI']);
                //set days for xAxis
                var days = new Array();
                for (var i = 0; i < 130; i++) {
                    dates[i] = dates[i].replace(/-/g, "/");
                    var x = new Date(dates[i]);
                    var y = (x.getMonth() < 9 ? "0" : "") + (x.getMonth() + 1) + "/" + (x.getDate() < 10 ? "0" : "") + (x.getDate());
                    days.push(y);
                }
                days.reverse();

                var indicatorData = new Array();
                for (var i = 0; i < 130; i++) {
                    indicatorData.push(dataArrays[i]['CCI']);
                }
                indicatorData = indicatorData.map(Number);
                indicatorData.reverse();

                options = {
                    chart: {
                        type: 'line',
                        zoomType: 'x'
                    },
                    title: {
                        text: json['Meta Data']['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },

                    yAxis: {
                        title: {
                            text: "CCI"
                        }
                    },
                    xAxis: {
                        categories: days,
                        tickInterval: 5
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },

                    series: [{
                        color: '#eb4d47',
                        name: json['Meta Data']['1: Symbol'],
                        data: indicatorData
                    }]
                }

                formatJson = {
                    "options": options
                };


                res.send(formatJson);
            }
        } else {
            res.send(errorMessage);
        }
    });//getCCI
});

api.get('/ios/bbands', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=BBANDS&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                var dataArrays = Object.keys(json['Technical Analysis: BBANDS']).map((k) => json['Technical Analysis: BBANDS'][k]);
                var dates = Object.keys(json['Technical Analysis: BBANDS']);
                //set days for xAxis
                var days = new Array();
                for (var i = 0; i < 130; i++) {
                    dates[i] = dates[i].replace(/-/g, "/");
                    var x = new Date(dates[i]);
                    var y = (x.getMonth() < 9 ? "0" : "") + (x.getMonth() + 1) + "/" + (x.getDate() < 10 ? "0" : "") + (x.getDate());
                    days.push(y);
                }
                days.reverse();
                //bbands
                var lowerBand = new Array();
                var middleBand = new Array();
                var upperBand = new Array();
                for (var i = 0; i < 130; i++) {
                    lowerBand.push(dataArrays[i]['Real Lower Band']);
                    middleBand.push(dataArrays[i]['Real Middle Band']);
                    upperBand.push(dataArrays[i]['Real Upper Band']);
                }
                lowerBand = lowerBand.map(Number);
                middleBand = middleBand.map(Number);
                upperBand = upperBand.map(Number);
                lowerBand.reverse();
                middleBand.reverse();
                upperBand.reverse();

                options = {
                    chart: {
                        type: 'line',
                        zoomType: 'x'
                    },
                    title: {
                        text: json['Meta Data']['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },

                    yAxis: {
                        title: {
                            text: 'BBANDS'
                        }
                    },
                    xAxis: {
                        categories: days,
                        tickInterval: 5
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },

                    series: [{
                        color: '#eb4d47',
                        name: json['Meta Data']['1: Symbol'] + ' Real Lower Band',
                        data: lowerBand
                    }, {
                        name: json['Meta Data']['1: Symbol'] + ' Real Middle Band',
                        data: middleBand
                    }, {
                        name: json['Meta Data']['1: Symbol'] + ' Real Upper Band',
                        data: upperBand
                    }]
                };

                formatJson = {
                    "options": options
                };

                res.send(formatJson);
            }
        } else {
            res.send(errorMessage);
        }
    });//getBBANDS
});

api.get('/ios/macd', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://www.alphavantage.co/query?function=MACD&symbol=" + symbol + "&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
            json = JSON.parse(body);
            if (json.hasOwnProperty('Error Message') || isEmpty(json)) {
                res.send(errorMessage);
            } else {
                var dataArrays = Object.keys(json['Technical Analysis: MACD']).map((k) => json['Technical Analysis: MACD'][k]);
                var dates = Object.keys(json['Technical Analysis: MACD']);
                //set days for xAxis
                var days = new Array();
                for (var i = 0; i < 130; i++) {
                    dates[i] = dates[i].replace(/-/g, "/");
                    var x = new Date(dates[i]);
                    var y = (x.getMonth() < 9 ? "0" : "") + (x.getMonth() + 1) + "/" + (x.getDate() < 10 ? "0" : "") + (x.getDate());
                    days.push(y);
                }
                days.reverse();

                //macd
                var macd = new Array();
                var macdHist = new Array();
                var macdSignal = new Array();
                for (var i = 0; i < 130; i++) {
                    macd.push(dataArrays[i]['MACD']);
                    macdHist.push(dataArrays[i]['MACD_Hist']);
                    macdSignal.push(dataArrays[i]['MACD_Signal']);
                }
                macd = macd.map(Number);
                macdHist = macdHist.map(Number);
                macdSignal = macdSignal.map(Number);
                macd.reverse();
                macdHist.reverse();
                macdSignal.reverse();

                options = {
                    chart: {
                        type: 'line',
                        zoomType: 'x'
                    },
                    title: {
                        text: json['Meta Data']['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/" target="_blank">Source: Alpha Vantage</a>',
                        useHTML: true,
                        style: {
                            color: "blue"
                        }
                    },

                    yAxis: {
                        title: {
                            text: 'MACD'
                        }
                    },
                    xAxis: {
                        categories: days,
                        tickInterval: 5
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },

                    series: [{
                        color: '#eb4d47',
                        name: json['Meta Data']['1: Symbol'] + ' MACD',
                        data: macd
                    }, {
                        name: json['Meta Data']['1: Symbol'] + ' MACD_Hist',
                        data: macdHist
                    }, {
                        name: json['Meta Data']['1: Symbol'] + ' MACD_Signal',
                        data: macdSignal
                    }]

                };
                formatJson = {
                    "options": options
                };

                res.send(formatJson);
            }
        } else {
            res.send(errorMessage);
        }
    });//getMACD
});

api.get('/ios/news', function (req, res) {
    var symbol = req.query.stockSymbol;
    const url = "https://seekingalpha.com/api/sa/combined/" + symbol + ".xml";
    request.get(url, function (error, response, body) {
        if (response.statusCode == 200 && !error) {
            parser(body, function (err, result) {
                // console.log(result);
                result = result.rss.channel[0].item;

                var news = new Array();
                for (let i = 0; i < result.length; i++) {
                    if (result[i].link[0].includes('article')) {
                        news.push(result[i]);
                    }
                    // if (news.length >= 5) break;

                }

                for (let i = 0; i < news.length; i++) {
                    news[i].pubDate[0] = news[i].pubDate[0].substring(0, news[i].pubDate[0].indexOf('-'));
                    news[i].pubDate[0] += " EST";
                }

                var formatJson = new Array();
                for (let i = 0; i < news.length; i++) {
                    formatJson.push(new Object());
                    formatJson[i].title = news[i].title[0];
                    formatJson[i].author = news[i]['sa:author_name'][0];
                    formatJson[i].pubDate = news[i].pubDate[0];
                    formatJson[i].link = news[i].link[0];
                }
                res.send(formatJson);
            });
        } else {
            res.send(errorMessage);
        }
    });//getnews with error handling
});


api.post('/ios/fbpost', function (req, res) {

    console.log(req.body)
    request.post({
        header: {},
        url: exportUrl,
        form: req.body
    },
        function (error, response, body) {
            if (response.statusCode == 200 && !error) {
                var picUrl = exportUrl + body;
                res.send(picUrl);
            } else {
                console.log("error");
                res.send("error")
            }
        })
})

api.post('/', function (req, res) {
    res.send("post here")
    
})
app.use('/api', api);
app.listen(app.get('port'));
console.log("app running on port: " + app.get('port'))