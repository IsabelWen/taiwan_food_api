import express from 'express';
import cors from 'cors';
import { getFoodlist, getFood } from './database.js';

const app = express();
app.use(cors({
    origin: ['http://localhost:3306', 'http://localhost:1234', 'https://isabelwen.github.io']
}));

// READ food list 
app.get("/foodlist", async (req, res) => {
    const foodlist = await getFoodlist();
    res.send(foodlist);
});

// READ food by id
app.get("/foodlist/:id", async (req, res) => {
    const id = req.params.id;
    const food = await getFood(id);
    res.send(food);
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong.')
});

// Listen for request
app.listen(3306, () => {
    console.log('Server is running on port 3306');
});