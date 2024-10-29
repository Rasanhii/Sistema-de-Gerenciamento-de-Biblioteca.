import React, { useState } from "react";

function ExcluirLivro({ livros, realizarExclusao }) {
  const [isbn, setIsbn] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const livro = livros.find((livro) => livro.isbn === isbn);
    if (!livro) {
      alert("Livro não encontrado.");
      return;
    }
    if (quantidade > livro.quantidade) {
      alert("Quantidade de exclusão maior do que a disponível no estoque.");
      return;
    }
    realizarExclusao(isbn, quantidade);
    setIsbn("");
    setQuantidade(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Excluir Exemplares de Livro</h2>
      <input
        type="text"
        placeholder="ISBN do livro"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(parseInt(e.target.value))}
        min="1"
        required
        className="input-quantidade" // Reutiliza a classe de estilo para quantidade
      />
      <button type="submit">Excluir</button>
    </form>
  );
}

export default ExcluirLivro;
