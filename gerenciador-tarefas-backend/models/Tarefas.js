const mongoose = require('mongoose');

const SchemaTarefa = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'O título da tarefa é obrigatório.'],
        trim: true
    },
    descricao: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pendente', 'Em progresso', 'Concluído'],
        default: 'Pendente'
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tarefa', SchemaTarefa);
