//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
app.use(express.static(__dirname + '/public/'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
let items =['Buy Food', 'Cook Food', 'Eat Food'] ;
let workItems = [];
app.get('/', function(req,res){
    let today = new Date(); 
    let options = {
        weekday : 'long',
        day:'numeric',
        month: 'long'
    }
    let day = today.toLocaleDateString("en-US", options);
    res.render('list', { ListTitle: day, newListItems: items});
    });
app.post('/', function(req,res){
    let item = req.body.newItem;
    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work')
    } else{
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', function(req,res){
    res.render('list', { ListTitle: 'Work List', newListItems: workItems});
});

app.listen(3000, function(){
    console.log('server running on port 3000');
    
})