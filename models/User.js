var mongoose = require('mongoose');
var schema = mongoose.Schema({
    firstName: {
        type: String,
        required: {
            values: true,
            message: 'الاسم الاول مطلوب'
        },
    },
    lastName: {
        type: String,
        required: {
            values: true,
            message: 'الاسم الثانى مطلوب'
        },

    },
    email: {
        type: String,
        required: {
            values: true,
            message: 'الاميل مطلوب'
        },
        unique:  {
            values: true,
            message: 'الاميل موجود بالفعل'
        },

    },
    password: {
        type: String,
        required: {
            values: true,
            message: 'كلمة المرور مطلوب'
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
schema.methods.test=function () {
    console.log('badr');
}
const User = mongoose.model('users',schema);
module.exports = User;