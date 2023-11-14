import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import userController from './controllers/user.mjs';

const app = express();
const port = process.env.PORT || 123;
const uri = process.env.URI;
app.use(express.json());
app.use(cors());



app.post('/users', userController.post)

app.get('/usersHere', userController.get)




app.listen(port, ()=>{
    console.log(`The app is listening at the PORT: ${port}`);
})