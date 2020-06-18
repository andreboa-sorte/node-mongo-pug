var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var produtoSchema = new Schema({
    distance: { type: String, Required: 'A Distacia não pode ficar em branco.' },
    consume: { type: String, Required: 'O Consumo não pode ficar em branco.' },
    speed: { type: String, Required: 'A Velocidade não pode ficar em branco' },
    temp_inside: { type: String, Required: 'O Tempo Dentro não pode ficar em branco' },
    temp_outside: { type: String, Required: 'O Tempo Fora não pode ficar em branco' },
    specials: { type: String,Required: 'O specials não pode ficar em branco' }
});
module.exports = mongoose.model('Produto', produtoSchema);

