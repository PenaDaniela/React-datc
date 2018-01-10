var express = require('express');

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

var data = 
    [
        {
            "date": "23321",
            "temperature": -2,
            "humidity"   : "10%",
            "pressure"   : 30,
            "latitude"   : 45.664252,
            "longitude"  : 21.375004
        },
        {
            "date": "23321",
            "temperature": 5,
            "humidity"   : "15%",
            "pressure"   : 31,
            "latitude"   : 46.689980,
            "longitude"  : 23.493046
        },
        {
            "date": "23321",
            "temperature": 1,
            "humidity"   : "20%",
            "pressure"   : 32,
            "latitude"   : 47.049889,
            "longitude"  : 27.398568
        },
        {
            "date": "23321",
            "temperature": -8,
            "humidity"   : "25%",
            "pressure"   : 33,
            "latitude"   : 44.427346,
            "longitude"  : 26.174267
        },
        {
            "date": "23321",
            "temperature": 3,
            "humidity"   : "30%",
            "pressure"   : 34,
            "latitude"   : 44.339849,
            "longitude"  : 28.598384
        },
    ]


app.get('/', function(req, res) {
    return res.render('index');
});

app.get('/giveMeData', function(req, res){
    
    data[1].temperature=data[1].temperature+1;
    if( data[1].temperature == 200 ) data[1].temperature=0;
    res.json(data);
});

app.listen(process.env.PORT || 3000, function(){
    console.log("App is live!");
});