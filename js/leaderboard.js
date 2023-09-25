const mongoose = require('mongoose');
const DATABASE_URL = 'mongodb+srv://gjmattia:things@student-cluster.wwaszhn.mongodb.net/clickHero?retryWrites=true&w=majority';
const Schema = mongoose.Schema;

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


const scoreSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Score', scoreSchema);