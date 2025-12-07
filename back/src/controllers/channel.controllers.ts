import { Request, Response } from "express";
import Channel from "../models/Channel";
import { channel } from "diagnostics_channel";

export const getChannels = async (_req: Request, res: Response) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
export const createChannels=async(req:Request,res:Response)=>{
    try{
        const {name}=req.body;
        if(!name || name.trim()===""){
            return res.status(400).json({message:"Channel name is required"});
        }
        const existing=await Channel.findOne({name});
        if(existing){
            return res.status(400).json({message:"Channel exits"})
        }
        const channel=await Channel.create({name});
        return res.status(201).json(channel);
    }catch(err:any){
        res.status(500).json({error:err.message});
    }
}