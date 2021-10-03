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
        maxlength : [5, 'Product name can not exceed 5 characters'],
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
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
            ],
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
    createdAt : {
        type : Date,
        default: Date.now
    },
    sizes : [{
        type : Number,
    }],
    colors : [{
        type : String,
    }]
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;