const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter a description!"]
    },
    price: {
        type: Number,
        required: [true, "Please enter a price value!"],
        maxLength: [8, "Price must not exceed 8 figures"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        require: [true, 'Please enter your stock quantity!'],
    },
    stock: {
        type: Number,
        require: [true, 'Please enter your stock quantity!'],
        maxlength: [4, 'Your stock must not exceed 4 figures!'],
        default: 1
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    Reviews: [{
        user:{
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
         },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true
          },
          comment: {
            type: String,
          }
    }],
    user:{
         type: mongoose.Schema.ObjectId,
         ref: 'User',
         required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product',ProductSchema)