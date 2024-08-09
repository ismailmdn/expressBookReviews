// index.js

const express = require('express');
const bodyParser = require('body-parser');
const customer_routes = require('./router/auth_users').authenticated;
const genl_routes = require('./router/general').general;

const app = express();
const port = 5000;

app.use(bodyParser.json()); // Middleware to parse JSON request bodies

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
