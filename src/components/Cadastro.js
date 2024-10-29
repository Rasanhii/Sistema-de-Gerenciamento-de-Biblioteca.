import React, { useState } from "react";

function CadastroLivro({ adicionarLivro }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarLivro({ titulo, autor, isbn, quantidade: parseInt(quantidade) });
    setTitulo("");
    setAutor("");
    setIsbn("");
    setQuantidade(1);
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
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        min="1"
        required
        className="input-quantidade" // Adiciona uma classe para estilização
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroLivro;
