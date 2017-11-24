const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/Views/partial');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n')
    next();
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    //res.send('<h1>hello express!</h1>');
    res.render('home.hbs',{
    pageTitle:'Home page',
    message:'Welcome to our website',
})
});
//     res.send({
//     name:'Abheet',
//     likes:[
//         'biking',
//         'csgo'
//     ]
// })


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
});
});

app.get('/bad',(req,res)=>{
    res.send({
    errorMessage:'unable to handle request'
});
});

app.listen(3000,()=>{
    console.log('server is up on port 3000');
});