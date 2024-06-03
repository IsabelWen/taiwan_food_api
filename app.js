import express from 'express';
import cors from 'cors';
import { getFoodlist, getFood } from './database.js';

const app = express();
app.use(cors({
    origin: ['http://localhost:3306', 'http://localhost:1234', 'https://isabelwen.github.io']
}));

// READ food list 
app.get("/foodlist", async (req, res) => {
    getFoodlist()
        .then(foodlist => res.send(foodlist))
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ food by id
app.get("/foodlist/:id", async (req, res) => {
    const id = req.params.id;
    getFood(id)
        .then(food => res.send(food))
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong.')
});

// Listen for request
app.listen(8080, () => { // Wider ändern zu 3306!
    console.log('Server is running on port 3306');
});