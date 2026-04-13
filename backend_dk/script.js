import express from "express";
const app = express();
//for handling sessions and cookies , fe backend connection things

//humne bheja tha plain text par server ko mila blob mei jo ki deriectly readable nhi hai ,ab is cheez ko handle krna pdega taaki hum usko waapis readable kr ske , usko krne ke liye ye app.use(express.json()) app.use(express.urlencoded({extended : true})) use kri hai


app.use(express.json());
app.use(express.urlencoded({extended : true}));

//middlewares app.use wale
app.use((req,res,next)=>{
    console.log("middleware")
    next();
})

app.get("/home", (req,res,next) => {
    
    res.send("hello home");
    
  
  
});

//error handling 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
