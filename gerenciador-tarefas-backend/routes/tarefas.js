const express = require('express');
const router = express.Router();

// Nossa lista de tarefas virtual salva direto na memória RAM (Zero dependência de disco)
let bancoDadosVirtual = [];

// 1. CREATE - Criar tarefa
router.post('/', (req, res) => {
    try {
        const { titulo, descricao } = req.body;
        
        // Verifica se o título realmente chegou no servidor
        if (!titulo || titulo.trim() === "") {
            return res.status(400).json({ mensagem: 'O título da tarefa é obrigatório.' });
        }

        // Cria a tarefa gerando um ID automático sem usar o Mongoose
        const novaTarefa = {
            _id: Math.random().toString(36).substring(2, 11), 
            titulo: titulo.trim(),
            descricao: descricao ? descricao.trim() : '',
            status: 'Pendente',
            dataCriacao: new Date()
        };

        bancoDadosVirtual.push(novaTarefa);
        res.status(201).json(novaTarefa);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
});

// 2. READ - Buscar todas
router.get('/', (req, res) => {
    res.json(bancoDadosVirtual);
});

// 3. DELETE - Deletar por ID
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        bancoDadosVirtual = bancoDadosVirtual.filter(t => t._id !== id);
        res.json({ mensagem: 'Tarefa deletada com sucesso!' });
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
});

// 4. UPDATE - Atualizar status por ID
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const tarefa = bancoDadosVirtual.find(t => t._id === id);
        if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
        
        if (req.body.status) tarefa.status = req.body.status;
        res.json(tarefa);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
});

module.exports = router;
