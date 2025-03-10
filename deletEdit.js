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