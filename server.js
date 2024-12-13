const express = require('express');
require('./config/config');
const cors = require('cors');
require('dotenv').config();

const app = express();
const schoolRouter = require('./src/school/routes');
const studentRouter = require('./src/student/routes');
// const adminRouter = require('./routers/adminRouter');
// const depositeRouter = require('./routers/depositeRoute');

app.use(cors());
app.use(express.json());


app.use('/student', studentRouter);
app.use('/school', schoolRouter);
// app.use(adminRouter);
// app.use(depositeRouter)
// app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Welcome to your API!');
  });

const port = process.env.port;

app.listen(port, () => {
  console.log(`This server is listening on port: ${port}`);
});
