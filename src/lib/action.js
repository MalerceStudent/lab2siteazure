// pages/api/get-data.js
import { getData } from "./storage";

export default async function handler(req, res) {
    try {
        const data = await getData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
}
