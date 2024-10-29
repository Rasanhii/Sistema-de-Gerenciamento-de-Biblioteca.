# Sistema de Gerenciamento de Biblioteca 📚

![biblioteca](https://github.com/user-attachments/assets/2aafe9bc-0b67-4db4-9f1b-64c01cb3bf4a)

## Sumário
1. [Estrutura da Aplicação com Padrão MVC](#1-estrutura-da-aplicação-com-padrão-mvc)
2. [Definição das Classes do Modelo, Visão e Controlador](#2-definição-das-classes-do-modelo-visão-e-controlador)
3. [Fluxo de Eventos da Aplicação](#3-fluxo-de-eventos-da-aplicação)
4. [Diagrama de Sequência UML (PlantText)](#4-diagrama-de-sequência-uml-planttext)



## 1. Estrutura da Aplicação com Padrão MVC

No padrão MVC (Model-View-Controller):

- Model (Modelo): Define as classes de dados (Livro e Empréstimo) e mantém a lógica de negócios.
- View (Visão): Fornece a interface com o usuário, onde se insere informações e visualiza os resultados (no caso, simulada através de uma aplicação de linha de comando).
- Controller (Controlador): Manipula a entrada do usuário e chama os métodos apropriados no modelo.

## 2. Definição das Classes do Modelo, Visão e Controlador

Aqui está a definição das principais classes:

Modelo
```Javascript
class Livro:
    def __init__(self, titulo, autor, isbn):
        self.titulo = titulo
        self.autor = autor
        self.isbn = isbn
        self.emprestado = False

class Emprestimo:
    def __init__(self, isbn, usuario):
        self.isbn = isbn
        self.usuario = usuario
```

Controlador
```javascript
class BibliotecaController:
    def __init__(self):
        self.livros = []
        self.emprestimos = []

    def cadastrar_livro(self, titulo, autor, isbn):
        livro = Livro(titulo, autor, isbn)
        self.livros.append(livro)

    def consultar_livros(self, termo_busca):
        return [livro for livro in self.livros 
                if termo_busca.lower() in livro.titulo.lower() or termo_busca.lower() in livro.autor.lower()]

    def realizar_emprestimo(self, isbn, usuario):
        for livro in self.livros:
            if livro.isbn == isbn and not livro.emprestado:
                livro.emprestado = usuario
                self.emprestimos.append(Emprestimo(isbn, usuario))
                return f"Livro '{livro.titulo}' emprestado para {usuario}"
        return "Livro indisponível ou não encontrado."

    def realizar_devolucao(self, isbn):
        for livro in self.livros:
            if livro.isbn == isbn and livro.emprestado:
                livro.emprestado = False
                self.emprestimos = [emp for emp in self.emprestimos if emp.isbn != isbn]
                return f"Livro '{livro.titulo}' devolvido com sucesso."
        return "Livro não encontrado ou não está emprestado."
```

## 3. Fluxo de Eventos da Aplicação

**Cadastro de Livro**

1) O usuário informa título, autor e ISBN.
2) A visão captura os dados e envia para o controlador.
3) O controlador chama cadastrar_livro() do modelo, que cria o objeto Livro e o armazena.

**Consulta de Livro**

1) O usuário insere um termo de busca (título ou autor).
2) A visão captura o termo e chama o controlador.
3) O controlador executa consultar_livros() e retorna a lista de livros que correspondem ao termo de busca.

**Empréstimo de Livro**

1) O usuário informa o ISBN e o nome.
2) A visão captura os dados e envia para o controlador.
3) O controlador executa realizar_emprestimo(), atualizando o status do livro e registrando o empréstimo.

**Devolução de Livro**

1) O usuário informa o ISBN.
2) A visão captura o ISBN e envia para o controlador.
3) O controlador executa realizar_devolucao(), alterando o status do livro e removendo o empréstimo.

## 4. Diagrama de Sequência UML (PlantText)


![DiagramaUML](https://github.com/user-attachments/assets/9f4e83ee-f3ab-4886-8af6-9606a4951681)


```UML
@startuml
!theme black-knight
title Diagrama de Sequência - Sistema de Biblioteca

actor Usuario

Usuario -> BibliotecaView: Solicita cadastro de livro
BibliotecaView -> BibliotecaController: cadastrar_livro(titulo, autor, isbn, quantidade)
BibliotecaController -> Livro: Cria instância de Livro com quantidade
BibliotecaController -> livros: Adiciona o livro na lista

Usuario -> BibliotecaView: Solicita consulta de livros
BibliotecaView -> BibliotecaController: consultar_livros(termo_busca)
BibliotecaController -> livros: Filtra livros por título/autor
BibliotecaController --> BibliotecaView: Retorna lista de livros

Usuario -> BibliotecaView: Solicita empréstimo de livro
BibliotecaView -> BibliotecaController: realizar_emprestimo(isbn, usuario)
BibliotecaController -> livros: Verifica disponibilidade do livro
BibliotecaController -> Emprestimo: Cria instância de Emprestimo
BibliotecaController -> emprestimos: Adiciona o empréstimo na lista

Usuario -> BibliotecaView: Solicita devolução de livro
BibliotecaView -> BibliotecaController: realizar_devolucao(isbn)
BibliotecaController -> livros: Atualiza status do livro para "disponível"
BibliotecaController -> emprestimos: Remove registro do empréstimo

Usuario -> BibliotecaView: Solicita exclusão de livro
BibliotecaView -> BibliotecaController: realizar_exclusao(isbn, quantidade)
BibliotecaController -> livros: Encontra o livro por ISBN
alt Se livro não encontrado
    BibliotecaController --> BibliotecaView: Retorna mensagem "Livro não encontrado"
else Se quantidade solicitada maior que a disponível
    BibliotecaController --> BibliotecaView: Retorna mensagem "Quantidade de exclusão maior do que a disponível"
else Se quantidade válida
    BibliotecaController -> Livro: Atualiza a quantidade disponível
    BibliotecaController --> BibliotecaView: Retorna mensagem de sucesso
end

@enduml

```
