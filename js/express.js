const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const score = require('leaderboardScore'); // Import your Mongoose model

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// ...

app.post('/submit', async (req, res) => {
    try {
        // Extract data from the form submission
        const { playerName, score } = req.body;

        // Create a new PlayerScore document
        const newScore = new PlayerScore({
            playerName,
            score,
            date: new Date(),
        });

        // Save the document to the database
        await newScore.save();

        // Redirect or send a response back to the client
        res.redirect('/success.html'); // Redirect to a success page
    } catch (error) {
        console.error('Error saving to the database:', error);
        res.status(500).send('Internal Server Error');
    }
});