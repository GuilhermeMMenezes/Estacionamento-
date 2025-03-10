async function cadastrar() {

    const placa = document.getElementById('placa').value;
    const modelo = document.getElementById('modelo').value;
    const infoCarro = document.getElementById('infoCarro').value;
    const dono = document.getElementById('dono').value

    if (!placa || !modelo || !infoCarro || !dono) {
      alert('Preencha todos os campos!');
      return;
  }

    const response = await fetch('http://localhost:3002/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placa, modelo , infoCarro, dono})
    });

    const result = await response.json();

    if (result.success) {
      alert("cadastro bem-sucedido!");
      window.location.href = "listar.html";
    } else {
      alert("Usuário ou senha incorretos!");
    }

};

document.getElementById('cadastrar').addEventListener('click', cadastrar);