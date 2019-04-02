const mongoose = require('mongoose');

const uri = `mongodb+srv://react-native-app:${process.env.MONGO_PASSWORD}@cluster0-3cslz.mongodb.net/gymTracker?retryWrites=true`;


mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.once('open', function(){
    console.log("Mongo connection made")
}).on('error', function(err){
    console.log("Error with connection", err)
})

module.exports = mongoose;
