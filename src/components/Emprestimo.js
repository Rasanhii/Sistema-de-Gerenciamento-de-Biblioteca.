import React, { useState, useEffect } from "react";

function EmprestimoLivro({ livros, realizarEmprestimo }) {
  const [isbn, setIsbn] = useState("");
  const [usuario, setUsuario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("sucesso");

  const handleSubmit = (e) => {
    e.preventDefault();
    const sucesso = realizarEmprestimo(isbn, usuario);
    
    if (sucesso) {
      setMensagem(`Livro emprestado para ${usuario}.`);
      setTipoMensagem("sucesso");
    } else {
      setMensagem(`Erro: o livro já está emprestado ou não foi encontrado.`);
      setTipoMensagem("erro");
    }

    setIsbn("");
    setUsuario("");
  };

  // Limpar a mensagem após 10 segundos
  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => setMensagem(""), 10000);
      return () => clearTimeout(timer); // Limpar o timer ao desmontar o componente
    }
  }, [mensagem]);

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

      {/* Exibir a mensagem persistente abaixo do botão */}
      {mensagem && (
        <div className={`mensagem-persistente ${tipoMensagem}`}>
          {mensagem}
        </div>
      )}
    </form>
  );
}

export default EmprestimoLivro;
