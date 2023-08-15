import { app } from './app.js';

// connecting to the database
import { connectDB } from './data/db.js';
connectDB();

app.listen(5000, () => console.log("Server Is Running ... "));