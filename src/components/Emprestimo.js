import React, { useState } from "react";

function EmprestimoLivro({ livros, realizarEmprestimo }) {
  const [isbn, setIsbn] = useState("");
  const [usuario, setUsuario] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    realizarEmprestimo(isbn, usuario);
    setIsbn("");
    setUsuario("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Emprestar Livro</h2>
      <input
        type="text"
        placeholder="ISBN do livro"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome do Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />
      <button type="submit">Emprestar</button>
    </form>
  );
}

export default EmprestimoLivro;
