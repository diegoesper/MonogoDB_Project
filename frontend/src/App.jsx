import React, { useState, useEffect } from 'react';
import axios from 'axios';

// URL limpa e direta da API do Back-end corporativo
const API_URL = 'http://localhost:5000/api/tarefas';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. READ - Buscar todas as tarefas ao carregar a tela
  const buscarTarefas = async () => {
    try {
      const response = await axios.get(API_URL);
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarTarefas();
  }, []);

  // 2. CREATE - Criar nova tarefa (Com cabeçalho JSON forçado contra erro 400)
  const criarTarefa = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    try {
      const dadosTarefa = { 
        titulo: titulo.trim(), 
        descricao: descricao.trim() 
      };

      const response = await axios.post(API_URL, dadosTarefa, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setTarefas([...tarefas, response.data]);
      setTitulo('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error.message);
    }
  };

  // 3. DELETE - Deletar tarefa por ID
  const deletarTarefa = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTarefas(tarefas.filter(tarefa => tarefa._id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* FORMULÁRIO DE CADASTRO (COLUNA ESQUERDA) */}
        <div className="md:col-span-1 bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 h-fit">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Nova Tarefa</h2>
          <form onSubmit={criarTarefa} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Título *</label>
              <input 
                type="text" 
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Testar API Full Stack" 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Descrição</label>
              <textarea 
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Detalhes do backlog..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none text-white"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-blue-600/20">
              Adicionar ao Backlog
            </button>
          </form>
        </div>

        {/* PAINEL DE CONTROLE DE BACKLOG (COLUNA DIREITA) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-black tracking-tight text-white">📋 Controle de Backlog</h1>
            <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-bold border border-slate-700 text-slate-400">
              {tarefas.length} {tarefas.length === 1 ? 'tarefa' : 'tarefas'}
            </span>
          </div>

          {loading ? (
            <p className="text-center text-slate-500 text-sm italic py-8">Conectando ao servidor...</p>
          ) : tarefas.length === 0 ? (
            <div className="bg-slate-800/40 border border-dashed border-slate-700 p-8 rounded-2xl text-center">
              <p className="text-sm text-slate-400">Nenhuma tarefa encontrada na sprint atual.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tarefas.map((tarefa) => (
                <div key={tarefa._id} className="bg-slate-800 border border-slate-700/60 p-5 rounded-2xl shadow-md flex justify-between items-start hover:border-slate-600 transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-lg">{tarefa.titulo}</h3>
                    {tarefa.descricao && <p className="text-sm text-slate-400">{tarefa.descricao}</p>}
                    <div className="pt-2">
                      <span className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-md font-semibold border border-blue-500/20">
                        {tarefa.status || 'Pendente'}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deletarTarefa(tarefa._id)}
                    className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
