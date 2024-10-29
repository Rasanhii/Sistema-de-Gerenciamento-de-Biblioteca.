import React, { useState } from "react";

function CadastroLivro({ adicionarLivro }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarLivro({ titulo, autor, isbn });
    setTitulo("");
    setAutor("");
    setIsbn("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Livro</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroLivro;
