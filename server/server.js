const express=require('express');
const app=express();
 require('dotenv').config();
const cors=require('cors');

const {Configuration,OpenAIApi} =require('openai');

//console.log(process.env.OPEN_API_KEY);
const configuration=new Configuration({
    apiKey:process.env.OPEN_API_KEY,
});

const openai=new OpenAIApi(configuration);


app.use(cors());
app.use(express.json());
// console.log('1');

app.get('/',(req,res)=>{
     console.log(req);
    res.status(200).json({
        message:'Hello from Codex'
    })
});


app.post('/',async(req,res)=>{
    try{
const prompt=req.body.prompt;
const response=await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    temperature: 0,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
})
res.status(200).send({
    bot:response.data.choices[0].text
})
    }
    catch(e)
    {
        console.log(e);
        res.status(500).send({e});
    }
})

app.listen(5000,()=>{
    console.log('server running on PORT 5000')
})