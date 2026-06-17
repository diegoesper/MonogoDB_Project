//Acrecentando um comentário aleatório para teste
// 1. Ativação de segurança para Node antigo v18
global.crypto = require('crypto'); 

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 2. CONFIGURAÇÃO DE SEGURANÇA E CORS (Libera a comunicação com o React na porta 5173)
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// 3. ATIVAÇÃO DO LEITOR DE JSON (Obrigatório vir antes das rotas)
app.use(express.json());

// 4. VINCULAÇÃO DAS ROTAS DA API
const rotasTarefas = require('./routes/tarefas');
app.use('/api/tarefas', rotasTarefas);

console.log("💾 [Sistema] Rodando em modo de contingência direto na memória RAM (Zero Disco)!");

// 5. ROTA RAIZ DE TESTE DO SERVIDOR
app.get('/', (req, res) => {
    res.json({ mensagem: "API do Gerenciador de Tarefas online, protegida e rodando na RAM!" });
});

// 6. INICIALIZAÇÃO DO SERVIDOR HTTP
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 [Servidor] Rodando com sucesso na porta ${PORT}`);
});
