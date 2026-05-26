const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: String,

        price: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            enum: ["Vegetables", "Rice", "Crops", "Nuts"],
            default: "Vegetables"
        },

        image: {
            type: String,
            required: true
        },

        cloudinaryid: {
            type: String,
        },

        createdAt: {
            type: Date,
            default: Date.now
        }

    },
    {
        versionKey: false
    }
);


const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;