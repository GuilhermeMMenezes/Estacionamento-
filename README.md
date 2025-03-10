# Documentação do Projeto

Este projeto é um sistema de cadastro, edição e exclusão de veículos, permitindo também a busca de veículos cadastrados.

## Autor
Guilherme Marques Menezes

---

## Cadastro de Carros

```javascript
async function cadastrar() {
    const placa = document.getElementById('placa').value;
    const modelo = document.getElementById('modelo').value;
    const infoCarro = document.getElementById('infoCarro').value;
    const dono = document.getElementById('dono').value;

    if (!placa || !modelo || !infoCarro || !dono) {
      alert('Preencha todos os campos!');
      return;
    }

    const response = await fetch('http://localhost:3002/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placa, modelo , infoCarro, dono })
    });

    const result = await response.json();

    if (result.success) {
      alert("Cadastro bem-sucedido!");
      window.location.href = "listar.html";
    } else {
      alert("Erro ao cadastrar veículo!");
    }
}

document.getElementById('cadastrar').addEventListener('click', cadastrar);
```

---

## Deletar e Editar

```javascript
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("deletar").addEventListener("click", async () => {
        const placa = document.getElementById("placaBusca").value.trim().toUpperCase();

        if (!placa) {
            alert("Por favor, digite a placa para excluir.");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3002/deletar", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ placa })
            });

            const result = await resposta.json();

            if (resposta.ok) {
                alert(result.mensagem);
            } else {
                alert(result.mensagem || "Erro ao excluir veículo.");
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
            alert("Erro ao conectar-se ao servidor. Verifique sua conexão.");
        }
    });

    document.getElementById("editar").addEventListener("click", async () => {
        const placa = document.getElementById("placaBusca2").value.trim().toUpperCase();
        const placaNova = document.getElementById("placaNova").value.trim().toUpperCase();

        if (!placa || !placaNova) {
            alert("Por favor, preencha os dois campos antes de editar.");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3002/editar", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ placa, placaNova })
            });

            const result = await resposta.json();

            if (resposta.ok) {
                alert(result.mensagem);
            } else {
                alert(result.mensagem || "Erro ao editar o veículo.");
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
            alert("Erro ao conectar-se ao servidor. Verifique sua conexão.");
        }
    });
});
```

---

## Listagem de Veículos

```javascript
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("buscar").addEventListener("click", async () => {
      const placa = document.getElementById("placaBusca").value.trim();
      const resultadoDiv = document.getElementById("resultado");

      resultadoDiv.innerHTML = "";

      if (!placa) {
          resultadoDiv.innerHTML = `<p style="color: red;">Por favor, insira uma placa.</p>`;
          return;
      }

      try {
          const resposta = await fetch("http://localhost:3002/buscar", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ placa })
          });

          if (!resposta.ok) {
              const erro = await resposta.json();
              throw new Error(erro.mensagem || "Erro ao buscar veículo.");
          }

          const veiculo = await resposta.json();

          resultadoDiv.innerHTML = `
              <p><strong>Placa:</strong> ${veiculo.placa}</p>
              <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
              <p><strong>Info Carro:</strong> ${veiculo.infoCarro}</p>
              <p><strong>Dono:</strong> ${veiculo.dono}</p>
          `;

      } catch (erro) {
          console.error("Erro:", erro);
          resultadoDiv.innerHTML = `<p style="color: red;">${erro.message}</p>`;
      }
  });
});
```

---

## Configuração do Servidor

```javascript
const express = require('express');
const cors = require('cors');
const connection = require('./db-config'); 

const app = express();
app.use(cors());
app.use(express.json());

const port = 3002;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
```

---

## Rotas

```javascript
// Cadastro de veículo
app.post('/cadastrar', (req, res) => { ... });

// Buscar veículo
app.post("/buscar", (req, res) => { ... });

// Login
app.post('/login', (req, res) => { ... });

// Excluir veículo
app.delete("/deletar", (req, res) => { ... });

// Editar veículo
app.put("/editar", (req, res) => { ... });
```

