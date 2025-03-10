const express = require('express');
const cors = require('cors');
const connection = require('./db-config'); 

const app = express();

app.use(cors());
app.use(express.json());

const port = 3002;

app.post('/cadastrar', (req, res) => {
    const {placa, modelo ,infoCarro ,dono} = req.body

    const query = 'insert into cadastroCarros (placa, modelo, infoCarro, dono) values (?,?,?,?)'

    connection.query(query, [placa, modelo , infoCarro, dono], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar veiculo' });
          }
          res.json({ success: true, message: 'veiculo cadastrado com sucesso!'});
    })

})

app.post("/buscar", (req, res) => {
    const { placa } = req.body;
  
    const query = "SELECT * FROM cadastroCarros WHERE placa = ?";
  
    connection.query(query, [placa], (err, resultados) => {
      if (err) {
        console.error("Erro na consulta ao banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
      }
  
      if (resultados.length === 0) {
        return res.status(404).json({ mensagem: "Veículo não encontrado." });
      }
  
      res.json(resultados[0]);
    });
  });
  

//comecei a fazer a rota de login mas não acabei  
app.post('/login', (req, res) => {
    const { cpf, nome } = req.body;
  
    const query = 'SELECT * FROM pessoas WHERE cpf = ? AND nome = ?';
    connection.query(query, [cpf, nome], (err, result) => {
      if (err) {
        return result.status(500).json({ success: false, message: 'Erro no servidor.' });
      }
  
      if (result.length > 0) {
        res.json({ success: true, message: 'Login bem-sucedido!' });
      } else {
        res.json({ success: false, message: 'Usuário ou senha incorretos!' });
      }
    });
});



app.delete("/deletar", (req, res) => {
  const { placa } = req.body;

  if (!placa) {
      return res.status(400).json({ mensagem: "A placa do veículo é obrigatória." });
  }

  const query = "DELETE FROM cadastroCarros WHERE placa = ?";

  connection.query(query, [placa], (err, resultados) => {
      if (err) {
          console.error("Erro ao excluir veículo:", err);
          return res.status(500).json({ mensagem: "Erro interno no servidor." });
      }

      if (resultados.affectedRows === 0) {
          return res.status(404).json({ mensagem: "Veículo não encontrado." });
      }

      res.json({ success: true, mensagem: "Veículo excluído com sucesso!" });
  });
});

app.put("/editar", (req, res) => {
  let { placa, placaNova } = req.body;

  if (!placa || !placaNova) {
      return res.status(400).json({ mensagem: "Placa antiga e nova são obrigatórias." });
  }

  placa = placa.toUpperCase();
  placaNova = placaNova.toUpperCase();

  const checkQuery = "SELECT * FROM cadastroCarros WHERE placa = ?";
  connection.query(checkQuery, [placa], (err, resultados) => {
      if (err) {
          console.error("Erro ao verificar veículo:", err);
          return res.status(500).json({ mensagem: "Erro interno no servidor." });
      }

      if (resultados.length === 0) {
          return res.status(404).json({ mensagem: "Veículo não encontrado." });
      }

      const updateQuery = "UPDATE cadastroCarros SET placa = ? WHERE placa = ?";
      connection.query(updateQuery, [placaNova, placa], (err, updateResultados) => {
          if (err) {
              console.error("Erro ao editar veículo:", err);
              return res.status(500).json({ mensagem: "Erro interno no servidor." });
          }

          res.json({ success: true, mensagem: "Veículo editado com sucesso!" });
      });
  });
});
  
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));