function productsTable(db) {
    db.run('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, image TEXT, name TEXT, price INTEGER, description TEXTz)');
}

module.exports = { productsTable } 