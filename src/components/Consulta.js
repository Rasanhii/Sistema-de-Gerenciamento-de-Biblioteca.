import React, { useState } from "react";

function ConsultaLivros({ livros, excluirLivro }) {
  const [termoBusca, setTermoBusca] = useState("");

  const livrosFiltrados = livros.filter(
    (livro) =>
      livro.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
      livro.autor.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div>
      <h2>Consultar Livros</h2>
      <input
        type="text"
        placeholder="Buscar por título ou autor"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
      />
      <ul>
        {livrosFiltrados.map((livro) => (
          <li key={livro.isbn}>
            {livro.titulo} - {livro.autor} (ISBN: {livro.isbn}){" "}
            {livro.emprestado < livro.quantidade ? "Disponível" : "Indisponível"} 
            - {livro.emprestado}/{livro.quantidade} emprestados
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConsultaLivros;
