const mongoose = require('mongoose'),
    Schema = require('mongoose').Schema;

// If I had more time, create a database of products and access it in routes, to then supply to the Product Components' list
// Products' Mongoose Model
var productSchema = new mongoose.Schema({
    productname: {
        type: String,
        index: true,
        required: true
    },
    cost: {
        type: String,
        default: '$0',
    },
    category: {
        type: String,
        default: "Uncategorized"
    },
    upvotes: {
        type: Number,
        default: 0
    },
    imageURL: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectID
    }
});

module.exports = mongoose.model('Product', productSchema);