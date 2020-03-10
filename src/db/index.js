const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://wesley:23111988@cluster0-vm7cz.mongodb.net/noderest?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.Promise = global.Promise

module.exports = mongoose