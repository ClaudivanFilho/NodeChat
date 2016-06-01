var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  titulo : String,
  autores : String,
  descricao : String,
  capa : String,
  preco : Number,
  comentarios : [{
    _id : String,
    nome : String,
    texto : String
  }]
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
