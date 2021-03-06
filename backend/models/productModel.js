mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [ true, 'Please enter product name'],
        trim : true,
        maxlength : [100, 'Product name can not exceed 100 characters']
    },
    price : {
        type : Number,
        required : [ true, 'Please enter product price'],
        maxlength : [5, 'Product price can not exceed 5 characters'],
        default : 0.0,
    },
    description : {
        type : String,
        required : [ true, 'Please enter product description'],
    },
    images : [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category : {
        type : String,
        required : [ true, 'Please enter a category for the product'],
        enum : {
            values : [
                'Detective / Thriller',
                'Romance',
                'Fantasy / Science-fiction',
                'Practical Life / Leisure',
                'Religion',
                'Economics / Law',
                'Humanities / Social Sciences',
                'Science / Technology'],
            message : 'Please select a correct category for this product'
        }
    },
    ratings : {
        type : Number,
        default : 0,
    },
    seller : {
        type : String,
        required : [ true, 'Please enter the seller of this product'],
    },
    stock : {
        type : Number,
        required : [ true, 'Please enter product stock'],
        maxlength : [5, 'Product stock can not exceed 5 characters'],
        default: 0,
    },
    reviews : [
        {
            user: {
                type : mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name : {
                type: String,
                required : true,
            },
            rating : {
                type: Number,
                required : true,
            },
            comment : {
                type: String,
                required : true,
            },
        }
    ],
    numOfReviews : {
        type : Number,
        default : 0,
    },
    sizes : [{
        type : String,
    }],
    colors : [{
        type : String,
    }],
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt : {
        type : Date,
        default: Date.now
    },
    
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;