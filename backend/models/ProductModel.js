const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 200,
            unique: true
        },
        slug: {
            type: String,
            maxlength: 200,
            unique: true
        },
        short_description: {
            type: String
        },
        long_description: {
            type: String
        },
        original_price: {
            type: Number,
            default: 1
        },
        discount_percentage: {
            type: Number,
            default: 0
        },
        finel_price: {
            type: Number,
            default: 1
        },
        category_id: {
            type: mongoose.Schema.ObjectId,
            ref: "categories"
        },
        colors: [{
            type: mongoose.Schema.ObjectId,
            ref: "colors"
        }],
        main_img: {
            type: String,
            default: null
        },
        other_img: [
            {
                type: String
            }
        ],
        stock: {
            type: Boolean,
            default: true
        },
        top_selling: {
            type: Boolean,
            default: false 
        },
        status: {
            type: Boolean,
            default: true
        }
    }, 
    {
        timestamps: true
    }
)

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;