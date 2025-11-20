import { Request, Response } from "express";
import Message from "../models/Message";

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { channelId } = req.params;

        const messages = await Message.find({ channel: channelId })
                                      .sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
