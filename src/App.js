import React, { useState } from "react";
import CadastroLivro from './components/Cadastro';
import ConsultaLivro from './components/Consulta';
import EmprestimoLivro from './components/Emprestimo';
import DevolucaoLivro from './components/Devolucao';
import ExcluirLivro from './components/Excluir';
import "./App.css";

function App() {
  const [livros, setLivros] = useState([]);

  const adicionarLivro = (livro) => {
    setLivros([...livros, { ...livro, emprestado: 0 }]);
  };

  const realizarEmprestimo = (isbn, usuario) => {
    setLivros(
      livros.map((livro) => {
        if (livro.isbn === isbn) {
          if (livro.emprestado < livro.quantidade) {
            return { ...livro, emprestado: livro.emprestado + 1 };
          } else {
            alert("Todos os exemplares deste livro já estão emprestados.");
            return livro;
          }
        }
        return livro;
      })
    );
  };

  const realizarDevolucao = (isbn) => {
    setLivros(
      livros.map((livro) =>
        livro.isbn === isbn && livro.emprestado > 0
          ? { ...livro, emprestado: livro.emprestado - 1 }
          : livro
      )
    );
  };

  const realizarExclusao = (isbn, quantidade) => {
    setLivros(
      livros.map((livro) => {
        if (livro.isbn === isbn) {
          const novaQuantidade = livro.quantidade - quantidade;
          if (novaQuantidade > 0) {
            return { ...livro, quantidade: novaQuantidade };
          } else {
            return null; // Se quantidade chegar a 0, remover o livro
          }
        }
        return livro;
      }).filter((livro) => livro !== null)
    );
  };

  return (
    <div>
      <h1>Gerenciador de Biblioteca</h1>
      <CadastroLivro adicionarLivro={adicionarLivro} />
      <ConsultaLivro livros={livros} />
      <EmprestimoLivro livros={livros} realizarEmprestimo={realizarEmprestimo} />
      <DevolucaoLivro livros={livros} realizarDevolucao={realizarDevolucao} />
      <ExcluirLivro livros={livros} realizarExclusao={realizarExclusao} />
    </div>
  );
}

export default App;
