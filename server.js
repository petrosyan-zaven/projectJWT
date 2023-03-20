const express = require('express');
const app = express();
const PORT = require('./index').PORT;
const db = require('./index').db;
const { usersTable } = require('./models/users_schema');
const { productsTable } = require('./models/product_schema');
const { user_route } = require('./routes/user_routes');
const { product_route } = require('./routes/product_routes');
const { products_route } = require('./routes/products_route');
// const { products }= require('./controllers/products_contraller');

app.use(express.json());


usersTable(db);
productsTable(db);

app.get('/', (req, res) => {
    res.send('products')
})

product_route(app);
products_route(app);
user_route(app);


app.listen(PORT)