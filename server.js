const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Example user data (replace with your actual data)
const user = {
    fullName: "Divyansh Chaturvedi",  
    dob: "05032002",       
    email: "divyanshpersonal2021@gmail.com", 
    rollNumber: "21BCE10128"  
};

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid data format'
        });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    res.status(200).json({
        is_success: true,
        user_id: `${user.fullName.split(' ').join('_').toLowerCase()}_${user.dob}`,
        email: user.email,
        roll_number: user.rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
