var category = require('../models/Category');

module.exports = {
    save: function (name) {
        let newCategory = new category;
        newCategory.name = name;
        return newCategory.save().then(res => {
            return res;
        }).catch(err => {
            return err;
        })
    },
    allCategories: function () {
        return category.find({}).then(res => {
            return res;
        }).catch(err => {
            return err;
        })
    },
    editCate: function (id, name) {
        return category.findOne({_id: id}).then(res => {
            res.name = name;
            res.save();
            return res;
        })

    },
    deleteCate: function (id) {
        category.findByIdAndRemove({_id: id}).then(res => {
            return res;
        });

    }

};