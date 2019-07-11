require('dotenv').config();
const app = require('./app');
const port = 3003;

const server = app.listen(port, () => {
    console.log(`Server is listening to  port ${port}`);
});