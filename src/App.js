import React, { useState, useEffect } from "react";
import CadastroLivro from './components/Cadastro';
import ConsultaLivro from './components/Consulta';
import EmprestimoLivro from './components/Emprestimo';
import DevolucaoLivro from './components/Devolucao';
import "./App.css";

function App() {
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("sucesso");

  const adicionarLivro = (livro) => {
    setLivros([...livros, { ...livro, emprestado: false }]);
    setMensagem("Livro cadastrado com sucesso.");
    setTipoMensagem("sucesso");
  };

  const realizarEmprestimo = (isbn, usuario) => {
    const livro = livros.find((livro) => livro.isbn === isbn);
    if (livro) {
      if (livro.emprestado) {
        setMensagem(`Erro: Livro "${livro.titulo}" já está emprestado para ${livro.emprestado}.`);
        setTipoMensagem("erro");
        return false;
      } else {
        setLivros(
          livros.map((livro) =>
            livro.isbn === isbn ? { ...livro, emprestado: usuario } : livro
          )
        );
        setEmprestimos([...emprestimos, { isbn, usuario }]);
        setMensagem(`Livro "${livro.titulo}" emprestado para ${usuario}.`);
        setTipoMensagem("sucesso");
        return true;
      }
    } else {
      setMensagem("Erro: Livro não encontrado.");
      setTipoMensagem("erro");
      return false;
    }
  };

  const realizarDevolucao = (isbn) => {
    setLivros(
      livros.map((livro) =>
        livro.isbn === isbn ? { ...livro, emprestado: false } : livro
      )
    );
    setEmprestimos(emprestimos.filter((emp) => emp.isbn !== isbn));
    setMensagem(`Livro com ISBN ${isbn} devolvido com sucesso.`);
    setTipoMensagem("sucesso");
  };

  // Limpar a mensagem automaticamente após 5 segundos
  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        setMensagem("");
      }, 5000); // Tempo de exibição do balão em milissegundos

      return () => clearTimeout(timer); // Limpar o timer se o componente for desmontado
    }
  }, [mensagem]);

  return (
    <div>
      <h1>Gerenciador de Biblioteca</h1>
      <CadastroLivro adicionarLivro={adicionarLivro} />
      <ConsultaLivro livros={livros} />
      <EmprestimoLivro livros={livros} realizarEmprestimo={realizarEmprestimo} mensagem={mensagem} />
      <DevolucaoLivro livros={livros} realizarDevolucao={realizarDevolucao} />
      
      {/* Exibir o balão de mensagem com a classe apropriada */}
      {mensagem && <div className={`mensagem-balao ${tipoMensagem}`}>{mensagem}</div>}
    </div>
  );
}

export default App;
