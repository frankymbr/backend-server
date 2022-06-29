const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

      //await mongoose.connect('mongodb+srv://frank:MongoDB123.@cluster0.sybzufe.mongodb.net/hospitaldb', {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            //userUnifiedTopology: true,
            //useCreateIndex: true
        });

        console.log('DB OnLine');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');
    }
 
}

module.exports = {
    dbConnection
}