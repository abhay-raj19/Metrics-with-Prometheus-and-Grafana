import { NextFunction, Request, Response } from "express";
import client from "prom-client";
const requestCounter = new client.Counter({
    name:"requestCount",
    help:"total request count",
    labelNames: ["method","route","status_code"]
})


export function requestCount(req:Request,res:Response,next:NextFunction){

    requestCounter.inc({
        method:req.method,
        route:req.path,
    });

    next();


}