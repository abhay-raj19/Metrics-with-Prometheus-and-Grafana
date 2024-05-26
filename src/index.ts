import express  from "express";
import client from "prom-client";
import { requestCount } from "./monitoring/requestCount";
import { requestCountGauge } from "./monitoring/requestUserGauge";
import { totalHistogramData } from "./monitoring/totalHistogramdata";
const app = express();

app.use(requestCount);
app.use(requestCountGauge);
app.use(totalHistogramData);
app.get("/user",(req,res)=>{
    const starTime = Date.now();
    let user = {
        name:"aBHAY",
        age:"raj"
    }
    res.json({
        name:"abhay"
    })
    const endTime = Date.now();
    console.log("it took ",endTime-starTime,"ms");
})

app.post("/user",(req,res)=>{
    res.json({
        name:"abhay"
    })
})

app.get("/metrics",async(req,res)=>{
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})


app.listen(3000)