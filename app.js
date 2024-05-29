import express from 'express';
import { getFoods, getFood } from './database.js';

const app = express();

// READ food list 
app.get("/food", async (req, res) => {
    const foodlist = await getFoods();
    res.send(foodlist);
});

// READ food by id
app.get("/food/:id", async (req, res) => {
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
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});