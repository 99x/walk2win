require('dotenv').config();
const app = require('./app');
const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log(`API/Server is listening to  port ${port}`);
});