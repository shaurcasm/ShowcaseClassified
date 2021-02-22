const Products = require('../database/Products.js')

function addProducts(details, done) {
    var {owner, productname, cost, category, image} = details || undefined;
    
    if(!owner) {
        return done("Error: Owner ID wasn't passed in argument.");
    }

    if(!productname) {
        return done("Error: No Product name passed in argument.")
    }

    // Save image and save its path to database.
    var imageURL;

    // Create a product and save to database
    var product = new Products({
        'productname': productname,
        'cost': cost,
        'category': category,
        'imageURL': imageURL,
        'owner': owner
    });

    product.save(function(err, savedProduct) {
        if(err) return done(err);

        // callback success
        return done(null, 'Success!');
    });
}

