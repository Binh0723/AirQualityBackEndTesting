const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const queryRouter = require('./controllers/query')

const app = express();
const PORT = process.env.PORT|| 5000;


app.use(cors());
app.use(bodyParser.json());
app.use('/api/query',queryRouter);
// app.get("/", (req,res)=>{
//     res.json("Hello world");
// });


app.listen(PORT, ()=>{
    console.log(`successfully is running on port ${PORT}`);
})