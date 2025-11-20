import { Request, Response } from "express";
import Channel from "../models/Channel";

export const getChannels = async (req: Request, res: Response) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
