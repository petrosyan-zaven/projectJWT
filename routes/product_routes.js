function product_route(app) {
    const product_conttroller = require('../controllers/product_controller');
    app.get('./products/:id', product_conttroller.singleProduct);
}



module.exports = { product_route }