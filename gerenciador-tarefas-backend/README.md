# 🚀 API Gerenciador de Tarefas

Back-end empresarial desenvolvido em Node.js e Express, utilizando Mongoose para persistência de dados. O projeto conta com arquitetura híbrida de banco de dados, preparada para desenvolvimento offline e produção na nuvem.

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v18+)
- **Express** (Framework HTTP)
- **Mongoose** (Modelagem do MongoDB)
- **MongoDB Memory Server** (Banco embutido em memória para desenvolvimento)
- **Cors** & **Dotenv** (Segurança e variáveis de ambiente)

## 🔐 Configuração do Ambiente

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI="sua_string_do_mongodb_atlas"
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   node server.js
   ```

## 🌐 Rotas da API (Endpoints)

Todas as requisições devem utilizar o prefixo: `http://localhost:5000/api/tarefas`

| Método | Rota | Descrição | Corpo (JSON) | Status Esperado |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/` | Criar nova tarefa | `titulo`, `descricao` | **201 Created** |
| **GET** | `/` | Listar todas as tarefas | Nenhum | **200 OK** |
| **GET** | `/:id` | Buscar tarefa por ID | Nenhum | **200 OK** / **404** |
| **PUT** | `/:id` | Atualizar tarefa por ID | `status`, `titulo` | **200 OK** / **400** |
| **DELETE**| `/:id` | Remover tarefa por ID | Nenhum | **200 OK** / **404** |
