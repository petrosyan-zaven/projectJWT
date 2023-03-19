const {authenticateToken} = require("../jwt/authenticate")
function products_route(app){
    const products_controller = require('../controllers/products_contraller')
    
    app.get('/products', products_controller.allProducts);
    app.post('/createProduct', authenticateToken, products_controller.createProduct);
    app.put('/updateProduct/:id', authenticateToken, products_controller.updateProduct);
    app.delete('/deleteProduct/:id', authenticateToken, products_controller.deleteProduct);
}

module.exports = { products_route }