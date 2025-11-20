import jwt from "jsonwebtoken"
import {Request, Response, NextFunction} from "express"

export const protect = (req:Request, res: Response, next: NextFunction ) =>{
    const token = req.headers.authorization?.split("")[1];

    if (!token)
        return res.status(401).json({messsage: "Not authorized"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECTRET);
        req.user = decoded.id;
        next();
    }
    catch(e){
        return res.status(401).json({message : "Token failed"} );
    }
};