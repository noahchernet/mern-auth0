import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors());

// Parse requests of content-type -application/json
app.use(express.json());

// Parse requests of content type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Sample route
app.get("/", (req, res) => {
    res.json({message: "Welcome!🥳"});
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});
