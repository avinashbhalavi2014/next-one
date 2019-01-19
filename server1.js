//Rendering templates engine-let u render html page but do in a dynamic way
//where u can inject value like username inside template
//can create reusable markup like -reusable header and footer
//template -handle bar
// handle bar view engine bar for express

const express=require('express');
const fs =require('fs');
//const hbs=require('express-handlebars');
const app= express();

app.set('view engine', 'ejs');
//app.engine('hbs',require('hbs')._express);
app.set('views','./views');
app.use(express.static(__dirname+'/public'));

//helper
app.use((req,res,next)=>{
  var now =new Date().toString();//
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFile('serverlog.txt',log+'\n',(err)=>{
    if(err)
    console.log('unable to appendFile to serverlog');
  });
  console.log(log);//display time at which sb send req
  //sb login
next();
});
//what this middleware will do
// app.use((req,res,next)=>{//by pass all then redirect to maintenance page
//    res.render('maintenance');
//    //not calling next();  it means rest code neve gonna run
// });
app.get('/',(req,res)=>{
  res.render('home',{
    title:'my title'
  });
})
app.get('/about',(req,res)=>{
  res.render('about.ejs',{
    pageTitle:'About PAGE',
    currentYear:new Date().getFullYear()
  });
})
//want to render hello.html
//routing /hello.html write in url then page will render
app.listen(4000,()=>{
  console.log('server running at port:4000');
});
