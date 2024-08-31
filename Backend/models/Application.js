const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    image: 
    {
        type:String,
        required:true
    },
    name: 
    {
        type:String,
        required:true
    },
    
    description:
    {
        type:String,
        required:true
    },
    releaseDate:
     {
        type:Date,
        required:true
    },
    version: 
    {
        type:String,
        required:true
    },
    ratings: 
    {
        type:Number,
        required:true
    },
    genre: 
    {
        type:String,
        required:true
    },
    category: 
    {
        type:String,
        required:true
    },
    visibility: 
    { 
        type: Boolean, 
        default: true 
    },
    downloads:
    { 
        type: Number,
        default: 0 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true},

    createdAt: { type: Date, default: Date.now },
    
});
module.exports = mongoose.model('Application', applicationSchema);

