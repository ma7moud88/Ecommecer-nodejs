import express  from "express";
import dotenv from "dotenv";
import morgan from "morgan";


dotenv.config({path:"config.env"});

const app=express();

if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'));
    console.log(`mode:${process.env.NODE_ENV}`);
}


app.get("/",(req,res)=>{
    res.send("welcome")
})






const PORT=process.env.PORT ||4000 ;
app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}...)`);
})