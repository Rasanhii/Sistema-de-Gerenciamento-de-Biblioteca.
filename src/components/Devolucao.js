import React, { useState } from "react";

function DevolucaoLivro({ livros, realizarDevolucao }) {
  const [isbn, setIsbn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    realizarDevolucao(isbn);
    setIsbn("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Devolver Livro</h2>
      <input
        type="text"
        placeholder="ISBN do livro"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        required
      />
      <button type="submit">Devolver</button>
    </form>
  );
}

export default DevolucaoLivro;
