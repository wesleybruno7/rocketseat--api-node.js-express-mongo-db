const fs = require('fs') // permite trabalhar com o file-system (carregar arquivos)
const path = require('path') // trabalhar com caminhos e pastas

module.exports = app => {
    fs
        .readdirSync(__dirname)
        .filter( file => ( ( file.indexOf('.') ) !== 0 && (file !== "index.js") ) )
        .forEach( file => require(path.resolve(__dirname, file) )(app) )
}