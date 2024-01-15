const  { Configuration, OpenAIApi } =require("openai");
const express=require("express");
const bodyParser=require('body-parser')
const cors=require('cors')
const configuration = new Configuration({
    organization: "org-WmGwpvOZLydRIoh7xV3g3soH",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//add body parser and cors to express


//const response = await openai.listEngines();





//creating a simple express api that calls a function

const app=express()
app.use(bodyParser.json())
app.use(cors())


const port=3080;
app.post("/",async(req,res)=>{
    const {message}=req.body;  
    console.log(message,"message");
    
    const response = await openai.createCompletion({   // it is the completion of the api 
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
    //console.log(response.data.choices[0].text)  //printing data that comes back
     res.json({
       // data:response.data,
        message:response.data.choices[0].text,
     })
});

app.listen(port,()=>{
    console.log(`app listening at port at localhost ${port}`)
});
