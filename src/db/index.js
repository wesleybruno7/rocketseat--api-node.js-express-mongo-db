const mongoose = require('mongoose')

// adicionado para resolver warning  DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
//mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://wesley:23111988@cluster0-vm7cz.mongodb.net/noderest?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false // adicionado para resolver warning  DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
})

mongoose.Promise = global.Promise

module.exports = mongoose