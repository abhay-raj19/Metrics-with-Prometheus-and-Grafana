import { NextFunction, Request, Response } from "express";
import client from "prom-client";

const requestUserGauge = new client.Gauge({
    name:"active_users",
    help:"Total no of active users on the platform",
    labelNames: ["method","route","status_code"]
})

export function requestCountGauge(req:Request,res:Response,next:NextFunction){

    requestUserGauge.inc({
        method:req.method,
        route:req.path,
    })


    res.on("finish",()=>{
        requestUserGauge.dec();
    })
    next();


}