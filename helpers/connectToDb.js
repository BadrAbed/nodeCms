const mongoose = require('mongoose');
const ConnectToDb=mongoose.connect('mongodb://localhost:27017/cms',{useMongoClient:true}).then(res=>{console.log('connection made')}).catch(err=>{console.log('not connected')});
// mongoose.connection
// .once('open', () => console.log('connect'))
// .on('error', (err) => {
//     console.log('not connect', err)
// });
module.exports=ConnectToDb;