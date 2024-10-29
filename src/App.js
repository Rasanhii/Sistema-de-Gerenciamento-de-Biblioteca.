import React, { useState } from "react";
import CadastroLivro from './components/Cadastro';
import ConsultaLivro from './components/Consulta';
import EmprestimoLivro from './components/Emprestimo';
import DevolucaoLivro from './components/Devolucao';
import "./App.css";



function App() {
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);

  const adicionarLivro = (livro) => {
    setLivros([...livros, { ...livro, emprestado: false }]);
  };

  const realizarEmprestimo = (isbn, usuario) => {
    setLivros(
      livros.map((livro) =>
        livro.isbn === isbn ? { ...livro, emprestado: usuario } : livro
      )
    );
    setEmprestimos([...emprestimos, { isbn, usuario }]);
  };

  const realizarDevolucao = (isbn) => {
    setLivros(
      livros.map((livro) =>
        livro.isbn === isbn ? { ...livro, emprestado: false } : livro
      )
    );
    setEmprestimos(emprestimos.filter((emp) => emp.isbn !== isbn));
  };

  return (
    <div>
      <h1>Gerenciador de Biblioteca</h1>
      <CadastroLivro adicionarLivro={adicionarLivro} />
      <ConsultaLivro livros={livros} />
      <EmprestimoLivro livros={livros} realizarEmprestimo={realizarEmprestimo} />
      <DevolucaoLivro livros={livros} realizarDevolucao={realizarDevolucao} />
    </div>
  );
}

export default App;
