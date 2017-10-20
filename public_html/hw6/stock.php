<?php 
    if(isset($_POST['Search'])){
        $symbol = $_POST["stockSymbol"];
    }else
        $symbol = "";
?>
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="CSci571 homework6 homepage">
        <script src="https://code.highcharts.com/highcharts.src.js"></script>
        <script src="http://code.highcharts.com/modules/exporting.js"></script>
        <script type="text/javascript">
            window.onload = function(){
                prepareEventHandlers();
            };
            function prepareEventHandlers(){
                if(document.getElementById("stockText").value == ""){
                    document.getElementById("resultDiv").style.display = "none";
                }
                document.getElementById("searchForm").onsubmit = function(){
                    console.log("you click btn");
                    if(document.getElementById("stockText").value == ""){
                        alert("Please enter a symbol");
                        return false;
                    }
                }
            };
            function clearAll(){
                document.getElementById("stockText").value = "";
                document.getElementById("resultDiv").innerHTML = "";
            }
        </script>
        <title>Homework 6</title>
        <style>
            .searchForm{
                width: 400px;
                padding: 4px;
                text-align: center;
                margin: auto;
                border: solid 1px #d6d6d6;
                background-color: #F5F5F5;
            }
            h1{
                text-align: center;
                font-weight: 600;
                font-style: italic;
                margin: 0;
            }
            .btns{
                text-align: right;
                padding-right: 82px;
            }
            input[type=submit], input[type=button]{
                display: inline-block;
            }
            hr{
                background-color: #d6d6d6;
                height: 1px;
                border: 0;
                margin: 0;
            }
            form{
                text-align: left;
                margin: 15px 0;
            }
            p{
                margin-top: 0;
                font-style: italic;
            }
            table{
                border-collapse: collapse;
                border: 2px solid #d6d6d6;
                width: 1400px;
                margin: 10px auto 5px;
                font-family: Helvetica, Arial, sans-serif;
                font-size: 1em;
            }
            th, td{
                border: 1px solid #d6d6d6;
                padding: 3px;
            }
            th{
                text-align: left;
                background-color: #f5f5f5;
                font-weight: 500;
                width: 30%;
            }
            td{
                text-align: center;
                background-color: #fbfbfb;
                font-weight: 300;
                width: 70%;
            }
            .news{
                text-align: left;
            }
            #highChartsFigure,#highIndicator{
                width: 1400px;
                height: 400px;
                margin: 10px auto 5px;
                border: solid 1px #d6d6d6;
            }
            #newsTableDiv{
                margin: auto;
                text-align: center;
            }
            #newsTable td{
                width:1400px;
            }
            span{
                color: blue;
            }
            a{
                color: blue;
                text-decoration: none;
            }
            #newsTable span{
                color: black;
            }
            #errorTable td{
                width: 1400px;
            }
        </style>
    </head>
    
    <body>
        <div class="searchForm">
            <h1>Stock Search</h1>
            <hr>
            <form class="" id="searchForm" method="post" action="stock.php">
                Enter Stock Ticker Symbol:* 
                <input type="text" name="stockSymbol" id="stockText" value="<?php echo htmlspecialchars($symbol); ?>" maxlength="225">
                <br>
                <div class="btns">
                <input type="submit" name="Search" id="searchBtn" value="Search">
                <input type="button" name="Reset" id="resetBtn" value="Clear" onclick="clearAll()">
                </div>
                <p>*- Mandatory fields.</p>
            </form>
        </div>
        <?php
                   $html = <<< HTML
                   <table id="errorTable" style="display:none">
                    <tr>
                        <th>Error</th>
                        <td>Error: NO recored has been found, please enter a valid symbol</td>
                    </tr>
                    </table>
HTML;
                   echo $html;
        ?>
        <div class="result" id="resultDiv" style="display:block">
           <div class="stockTable">
            <?php
//                $pattern = "/^\d{4}-\d{2}-\d{2}/";
                $rawJsonData = "";
                $error = 0;
                function getJsonFromAlpha($sybl){
                            $targetURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$sybl."&outputsize=full&apikey=R6KZAOUATD10VMEQ";
                            return json_decode(file_get_contents($targetURL),true);
                }
                
                function makeTable($JD){
                    global $pattern;
                    //get the date array
                    $days = array_keys($JD['Time Series (Daily)']);
//                    print_r($days);
                    $today = $days[0];
//                        //regex get the date from date+time, deprecated since I found a better way
//                    $today = $JD['Meta Data']['3. Last Refreshed'];
//                    preg_match($pattern,$today,$match);
//                    $today = $match[0];
//                    echo $today;
//                    echo $JD['Meta Data']['2. Symbol'];
                    $today_close = $JD['Time Series (Daily)'][$today]['4. close'];
                    $previous_close = $JD['Time Series (Daily)'][$days[1]]['4. close'];
                    $change = $today_close - $previous_close;
                    $change_percent = $change / $previous_close;
                    $change_percent = number_format($change_percent*100,2);

                    if($change>0){
                    $html = <<<HTML
                    <table class="stockTable">
                    <tr>
                        <th>Stock Ticker Symbol</th>
                        <td>{$JD['Meta Data']['2. Symbol']}</td>
                    </tr>
                    <tr>
                        <th>Close</th>
                        <td>{$today_close}</td>
                    </tr>
                    <tr>
                        <th>Open</th>
                        <td>{$JD['Time Series (Daily)'][$today]['1. open']}</td>
                    </tr>
                    <tr>
                        <th>Previous Close</th>
                        <td>{$previous_close}</td>
                    </tr>
                    <tr>
                        <th>Change</th>
                        <td>{$change}<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png" width="15px" height="15px"></td>
                    </tr>
                    <tr>
                        <th>Change Percent</th>
                        <td>{$change_percent}%<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png" width="15px" height="15px"></td>
                    </tr>
                    <tr>
                        <th>Day's Range</th>
                        <td>{$JD['Time Series (Daily)'][$today]['3. low']}-{$JD['Time Series (Daily)'][$today]['2. high']}</td>
                    </tr>
                    <tr>
                        <th>Volume</th>
                        <td>{$JD['Time Series (Daily)'][$today]['5. volume']}</td>
                    </tr>
                    <tr>
                        <th>Timestamp</th>
                        <td>$today</td>
                    </tr>
                    <tr>
                        <th>Indicators</th>
                        <td>
                        <span id="Price" onClick="showFigure(this.id)">Price</span>&nbsp;&nbsp;
                        <span id="SMA" onClick="showFigure(this.id)">SMA</span>&nbsp;&nbsp;
                        <span id="EMA" onClick="showFigure(this.id)">EMA</span>&nbsp;&nbsp;
                        <span id="STOCH" onClick="showFigure(this.id)">STOCH</span>&nbsp;&nbsp;
                        <span id="RSI" onClick="showFigure(this.id)">RSI</span>&nbsp;&nbsp;
                        <span id="ADX" onClick="showFigure(this.id)">ADX</span>&nbsp;&nbsp;
                        <span id="CCI" onClick="showFigure(this.id)">CCI</span>&nbsp;&nbsp;
                        <span id="BBANDS" onClick="showFigure(this.id)">BBANDS</span>&nbsp;&nbsp;
                        <span id="MACD" onClick="showFigure(this.id)">MACD</span>
                        </td>
                    </tr>
                    </table>
HTML;
                    }else{
                    $html = <<<HTML
                    <table class="stockTable">
                    <tr>
                        <th>Stock Ticker Symbol</th>
                        <td>{$JD['Meta Data']['2. Symbol']}</td>
                    </tr>
                    <tr>
                        <th>Close</th>
                        <td>{$today_close}</td>
                    </tr>
                    <tr>
                        <th>Open</th>
                        <td>{$JD['Time Series (Daily)'][$today]['1. open']}</td>
                    </tr>
                    <tr>
                        <th>Previous Close</th>
                        <td>{$previous_close}</td>
                    </tr>
                    <tr>
                        <th>Change</th>
                        <td>{$change}<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png" width="15px" height="15px"></td>
                    </tr>
                    <tr>
                        <th>Change Percent</th>
                        <td>{$change_percent}%<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png" width="15px" height="15px"></td>
                    </tr>
                    <tr>
                        <th>Day's Range</th>
                        <td>{$JD['Time Series (Daily)'][$today]['3. low']}-{$JD['Time Series (Daily)'][$today]['2. high']}</td>
                    </tr>
                    <tr>
                        <th>Volume</th>
                        <td>{$JD['Time Series (Daily)'][$today]['5. volume']}</td>
                    </tr>
                    <tr>
                        <th>Timestamp</th>
                        <td>$today</td>
                    </tr>
                    <tr>
                        <th>Indicators</th>
                        <td>
                        <span id="Price" onClick="showFigure(this.id)">Price</span>&nbsp;&nbsp;
                        <span id="SMA" onClick="showFigure(this.id)">SMA</span>&nbsp;&nbsp;
                        <span id="EMA" onClick="showFigure(this.id)">EMA</span>&nbsp;&nbsp;
                        <span id="STOCH" onClick="showFigure(this.id)">STOCH</span>&nbsp;&nbsp;
                        <span id="RSI" onClick="showFigure(this.id)">RSI</span>&nbsp;&nbsp;
                        <span id="ADX" onClick="showFigure(this.id)">ADX</span>&nbsp;&nbsp;
                        <span id="CCI" onClick="showFigure(this.id)">CCI</span>&nbsp;&nbsp;
                        <span id="BBANDS" onClick="showFigure(this.id)">BBANDS</span>&nbsp;&nbsp;
                        <span id="MACD" onClick="showFigure(this.id)">MACD</span>
                        </td>
                    </tr>
                    </table>
HTML;
                    }
                    echo $html;
                }

               
            ?>
            <?php
               //print error table
                if($symbol != ""){
                $rawJsonData = getJsonFromAlpha($symbol);
                if(!array_key_exists("Error Message",$rawJsonData)){
                    makeTable($rawJsonData);
                    echo '<script>document.getElementById("errorTable").style.display = "none";</script>';
                    $error = 0;
                }else{
                    $error = 1;
                    echo '<script>document.getElementById("errorTable").style.display = "block";
                    document.getElementById("resultDiv").style.display = "none";
                    console("hide result");</script>';
                }
                }
            
            ?>
            </div>
            <div id="highChartsFigure">
                <?php
                if($symbol != "" && $error == 0){
                    if( ! ini_get('date.timezone') )
                    {
                        date_default_timezone_set('GMT');
                    }
                    //cut 20 years data to 6months
                    $dates = array_keys($rawJsonData['Time Series (Daily)']);
                    $dates = array_slice($dates,0,140);
                    $jsonData = array_slice($rawJsonData['Time Series (Daily)'],0,140);
                    //get price and volume
                    $price = array();
                    $volume = array();
                    for($i=0;$i<140;$i++){
                        array_push($price,$jsonData[$dates[$i]]['4. close']);
//                        $price[$i] = number_format($price[$i],2);
                    }
                    for($i=0;$i<140;$i++){
                        array_push($volume,$jsonData[$dates[$i]]['5. volume']);
                    }
                    $today = $dates[0];
                    for($i=0;$i<140;$i++){
                        $dates[$i] = date('m/d',strtotime($dates[$i]));
                    }
                    //reverse data
                    $dates = array_reverse($dates);
                    $price = array_reverse($price);
                    $volume = array_reverse($volume);
                }
                ?>
                <script type="text/javascript">
                    // Get Max value from array
                    function getMaxOfArray(numArray) {
                        return Math.max.apply(null, numArray);
                    }

                    // Get Min value from array
                    function getMinOfArray(numArray) {
                        return Math.min.apply(null, numArray);
                    }
                    var metaData = <?php echo json_encode($rawJsonData['Meta Data']);?>;
                    var jsonData = <?php echo json_encode($jsonData); ?>;
                    var dates = <?php echo json_encode($dates); ?>;
                    var price = <?php echo json_encode($price); ?>;
                    var volume = <?php echo json_encode($volume); ?>;
                    var today = <?php echo json_encode(date('m/d/Y', strtotime($today))); ?>;
                    price = price.map(Number);
                    volume = volume.map(Number);
                    var chart1;
//                    console.log(metaData);
//                    console.log(jsonData);
//                    console.log(volume);
//                    console.log(dates);
//                    console.log(price);
//                    console.log(today);
                    
                    var maxValue = getMaxOfArray(price);
                    var minValue = getMinOfArray(price);
                    console.log(maxValue,minValue);
                    function drawChart(){
                        var chart1 = Highcharts.chart('highChartsFigure', {
                                        title: {
                                            text: 'Stock Price('+today+')'
                                        },

                                        subtitle: {
                                            text: '<a href=" https://www.alphavantage.co/">Source: Alpha Vantage</a>',
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
                                        },{
                                            title: {//1
                                                text: 'Volume'
                                            },
                                            tickInterval: 50000000,
                                            opposite: true
                                        }],
                                        xAxis: {
                                            tickInterval:5,
                                            categories:dates  
                                        },
                                        legend: {
                                            layout: 'vertical',
                                            align: 'right',
                                            verticalAlign: 'middle'
                                        },

                                        plotOptions: {
                                            series: {
                                                label: {
                                                    connectorAllowed: false
                                                }
                                            }
                                        },

                                        series: [{
                                            yAxis: 0,
                                            name: metaData['2. Symbol'],
                                            type:'area',
                                            color: '#eb4d47',
                                            marker: {
                                                enabled: false
                                            },
                                            data: price
                                        },{
                                            yAxis: 1,
                                            type: 'column',
                                            name: 'volume',
                                            color: 'white',
                                            data: volume
                                        }],
                            });                     
                    }
                    drawChart();
                </script>
                <script type="text/javascript">
                    var jsonObj;
                    var indicatorMetaData;
                    var TYPE;
                    var symbol = metaData['2. Symbol'];
                    function getJson(type){
                        const url = "https://www.alphavantage.co/query?function="+type+"&symbol="+symbol+"&interval=daily&time_period=10&series_type=close&apikey=R6KZAOUATD10VMEQ";
                       
                        if(window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
                        xhr = new XMLHttpRequest();
                        }else{// code for IE6, IE5
                        xhr=new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        if(xhr){
                            xhr.open("GET", url, true);
                            xhr.send();
                            xhr.onreadystatechange = processChange;
                        }
                }
                    function processChange(){
                        if (xhr.readyState == 4) {
                        // only if "OK"
                            if (xhr.status == 200) {
                            // processing statements xhr.responseText // for JSON
                                jsonObj = JSON.parse(xhr.responseText);
                                console.warn("YOU GOT JSON");
                                drawChart(jsonObj,TYPE);
                                
                            } else {
                                alert("There was a problem retrieving the data:\n" + xhr.statusText);
                            } 
                        }
                    }
                    
                    function showFigure(type){     
                        TYPE = type;
                        console.log("You click: "+type);
                        if(type === 'Price'){
                            document.getElementById("highIndicator").style.display = "none";
                            document.getElementById("highChartsFigure").style.display = "block";
                        }else{
                            document.getElementById("highIndicator").style.display = "block";
                            document.getElementById("highChartsFigure").style.display = "none"; 
                        getJson(type);
                        }
                    }
                    function drawChart(data,type){
                        //title = indicatorMetaData['2: Indicator'];
                        //symbol = indicatorMetaData['1: Symbol'];
                        indicatorMetaData = data['Meta Data'];
                        console.log(indicatorMetaData['2: Indicator']);
                        var dataArrays = Object.values(data['Technical Analysis: '+TYPE]);
                                console.log(dataArrays);
                        var dates = Object.keys(data['Technical Analysis: '+TYPE]);
                        //set days for xAxis
                        var days = new Array();
                        for(var i =0;i<140;i++){
                            dates[i] = dates[i].replace(/-/g,"/");
                            var x = new Date(dates[i]);
                            console.log
                            var y = (x.getMonth()<9?"0":"")+(x.getMonth()+1)+"/"+(x.getDate()<10?"0":"")+(x.getDate()); 
                            days.push(y);
                        }
                        days.reverse();
                        if(type=='STOCH'){
                            var slowD = new Array();
                            var slowK = new Array();
                            for(var i = 0;i<140;i++){
                                slowD.push(dataArrays[i]['SlowD']);
                                slowK.push(dataArrays[i]['SlowK']);
                            }
                            slowD = slowD.map(Number);
                            slowK = slowK.map(Number);
                            slowD.reverse();
                            slowK.reverse();
                            //draw chart
                            drawSTOCH(days,slowD,slowK);
                        }else if(type == 'BBANDS'){
                            var lowerBand = new Array();
                            var middleBand = new Array();
                            var upperBand = new Array();
                            for(var i =0;i<140;i++){
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
                            //draw chart
                            drawBBANDS(days,lowerBand,middleBand,upperBand);
                        }else if(type == 'MACD'){
                            var macd = new Array();
                            var macdHist = new Array();
                            var macdSignal = new Array();
                            for(var i=0;i<140;i++){
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
                            //draw chart
                            drawMACD(days,macd,macdHist,macdSignal);
                        }else{
                            var indicatorData = new Array();
                                for(var i = 0;i<140;i++){
                                    indicatorData.push(dataArrays[i][TYPE]);
                                }
                            indicatorData = indicatorData.map(Number);
                            indicatorData.reverse();
                            //draw char
                            drawOneLine(days,indicatorData);
                        }                 
                    }
                    function drawOneLine(xData,yData){
                        console.log(xData);
                        console.log(yData);
                        Highcharts.chart('highIndicator', {
                    chart:{
                        type:'line'
                    },
                    title: {
                        text: indicatorMetaData['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/">Source: Alpha Vantage</a>',
                                            style: {
                                                color: "blue"
                                            }
                    },

                    yAxis: { 
                        title: {
                            text: TYPE
                        }
                    }, 
                    xAxis: {
                        categories:xData,
                        tickInterval: 5
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
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
                        name: symbol,
                        data: yData
                    }]

                });
                    }
                    
                    function drawSTOCH(xData,yData1,yData2){
                        console.log(xData);
                        console.log(yData1);
                        console.log(yData2);
                        Highcharts.chart('highIndicator', {
                    chart:{
                        type:'line'
                    },
                    title: {
                        text: indicatorMetaData['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/">Source: Alpha Vantage</a>',
                                            style: {
                                                color: "blue"
                                            }
                    },

                    yAxis: { 
                        title: {
                            text: TYPE
                        }
                    }, 
                    xAxis: {
                        categories:xData,
                        tickInterval: 5
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
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
                        name: 'slowD',
                        data: yData1
                    },{
                        name: 'slowK',
                        data: yData2
                    }]

                });
                    }
                    
                    function drawBBANDS(xData,yData1,yData2,yData3){
                        console.log(xData);
                        console.log(yData1);
                        console.log(yData2);
                        console.log(yData3);
                        Highcharts.chart('highIndicator', {
                    chart:{
                        type:'line'
                    },
                    title: {
                        text: indicatorMetaData['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/">Source: Alpha Vantage</a>',
                                            style: {
                                                color: "blue"
                                            }
                    },

                    yAxis: { 
                        title: {
                            text: TYPE
                        }
                    }, 
                    xAxis: {
                        categories:xData,
                        tickInterval: 5
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
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
                        name: 'Real Lower Band',
                        data: yData1
                    },{
                        name: 'Real Middle Band',
                        data: yData2
                    },{
                        name: 'Real Upper Band',
                        data: yData3
                    }]

                });
                    }
                    function drawMACD(xData,yData1,yData2,yData3){
                        console.log(xData);
                        console.log(yData1);
                        console.log(yData2);
                        console.log(yData3);
                        Highcharts.chart('highIndicator', {
                    chart:{
                        type:'line'
                    },
                    title: {
                        text: indicatorMetaData['2: Indicator']
                    },

                    subtitle: {
                        text: '<a href=" https://www.alphavantage.co/">Source: Alpha Vantage</a>',
                                            style: {
                                                color: "blue"
                                            }
                    },

                    yAxis: { 
                        title: {
                            text: TYPE
                        }
                    }, 
                    xAxis: {
                        categories:xData,
                        tickInterval: 5
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
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
                        name: 'MACD',
                        data: yData1
                    },{
                        name: 'MACD_Hist',
                        data: yData2
                    },{
                        name: 'MACD_Signal',
                        data: yData3
                    }]

                });
                    }
                </script>
            </div>
            <div id="highIndicator" style="display:none">
            
            </div>
            <div id="newsTableDiv">
                <div onClick="toggle()" id="toggleSwitch">
                    <p id="toggleWords">Click to show stock news<p>
                    <img id="toggleImg" src="http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png" alt="arrow" style="width:30px;height:15px;">
                </div>
                <?php
                $xmlData = simplexml_load_file("https://seekingalpha.com/api/sa/combined/".$symbol.".xml") or die ("feed not loading");
                
                ?>
                <script type="text/javascript">
                 var newstemp = <?php echo json_encode($xmlData); ?>;
                 var newsData = new Array();
                newsData = newstemp.channel.item;
                 var news = new Array();
                    for(var i=0;i<newsData.length;i++){
                        if(newsData[i].link.includes('article')){
                            news.push(newsData[i]);
                        }
                        if(news.length >= 5) break;
                    }
                    console.log(news);
                    
                    
                    //draw news table
                    
                var html_text = "<table id='newsTable' style='display:none;'>";
                for(var i = 0; i<5;i++){
                    html_text += "<tr>";
                    html_text += "<td class='news'><a href='"+news[i].link+"' target='_blank'>"+news[i].title+"</a><span>&nbsp;&nbsp;&nbsp;Publicated Time:"+news[i].pubDate.substring(0,news[i].pubDate.indexOf('-'))+"</span></td>";
                    html_text += "</tr>";
                }

                html_text += "</table>"
                document.write(html_text);
                    
                    function toggle(){
                        var table = document.getElementById("newsTable");
                        var image = document.getElementById("toggleImg");
                        var words = document.getElementById("toggleWords");
                        if(table.style.display === "none"){
                            table.style.display = "block";
                            image.src = "http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Up.png";
                            words.innerHTML = "Click to hide stock news";
                        }else{
                            table.style.display = "none";
                            image.src = "http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png";
                            words.innerHTML = "Click to show stock news";
                        }
                    }
                </script>
            </div>
                <pre>
                    <?php 
//                        print_r($xmlData);
//                        print_r($jsonData);
//                        print_r($dates);
                    ?>
                </pre>
        </div>
        

    </body>
</html>