/* tut 88
 dance website db connectivity        
*/
// render and send is same
const  express=require("express");
const path=require("path");
//4
const bodyparser=require("body-parser");
const app=express(); 

// tut 88 start here
//--------------------------------------------------------------------------------------
//1
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true,useUnifiedTopology: true});
const port=8000;

//2
//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  //3
const Contact = mongoose.model('Contact', contactSchema);
//created contact module


//--------------------------------------------------------------------------------------

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); //for serving static file
app.use(express.urlencoded());//middlewere helps to get forms data to express 

//PUG SPECIFIC STUFF
app.set('view engine','pug');//step 1 set template engine as pug 
app.set('views',path.join(__dirname,'views'));//step 2 set views directory

app.get("/demo",(req,res)=>{ 
    res.status(200).render('demo', { title: 'Hey harry', message: 'Hello there! i am sid and thanks for pug ' })
});
//ENDPOINTS 
app.get('/',(req,res)=>{
    const con="this is the best content on the internet";
    const params={};
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const con="this is the best content on the internet";
    const params={};
    res.status(200).render('contact.pug',params);
});
//-------------------------------------------------------------------------------------
//5
//post request for db coonect
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("item was not saved to database");
    });
    // res.status(200).render('contact.pug');
});

//-------------------------------------------------------------------------------------
//START THE SERVER
app.listen(port,()=>{ //listen app
    console.log(`the appliaction started succcessfully on port ${port}`);
});