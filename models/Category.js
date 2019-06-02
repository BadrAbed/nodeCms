var mongoose = require('mongoose');

const Category = mongoose.model('categories', {
    name: {
        type: String,
        require: {
            value: true,
            message: 'اسم التصنيف مطلوب'
        },
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Category;