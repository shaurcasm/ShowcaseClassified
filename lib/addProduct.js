const Products = require('../database/Products.js');

function addProduct(details, done) {
    var {owner, productname, cost, category, imagePath} = details || undefined;
    
    if(!owner) {
        return done("Error: Owner ID wasn't passed in argument.");
    }

    if(!productname) {
        return done("Error: No Product name passed in argument.")
    }

    // Save image and save its path to database.

    // Create a product and save to database
    var product = new Products({
        'productname': productname,
        'cost': cost,
        'category': category,
        'imageURL': imagePath,
        'owner': owner
    });

    product.save(function(err, savedProduct) {
        if(err) return done(err);

        // callback success
        return done(null, 'Success!');
    });
}

module.exports = addProduct;