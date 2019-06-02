//
// var mysql = require("mysql");
//
// var pool = mysql.createPool({
//     connectionLimit : 100,
//     host     : '35.168.48.209',
//     port     :  3306,
//     user     : 'kalemon.net',
//     password : '*******',
//     database : '*******',
// });
//
// exports.getConnection = function(callback) {
//     pool.getConnection(function(err, conn) {
//         if(err) {
//             return callback(err);
//         }
//         callback(err, conn);
//     });
// };

const mongoose = require('mongoose');
const ConnectToDb=mongoose.connect('mongodb://localhost:27017/cms').then(res=>{console.log('connected made')}).catch(err=>{console.log('not connected')});
// mongoose.connection
// .once('open', () => console.log('connect'))
// .on('error', (err) => {
//     console.log('not connect', err)
// });
module.exports=ConnectToDb;