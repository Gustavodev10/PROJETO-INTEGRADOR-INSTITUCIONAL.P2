// Ativa os ícones Feather
feather.replace();

// Valida o nome antes de ir para o quiz
document.getElementById("startQuizBtn").addEventListener("click", e => {
  const name = document.getElementById("username").value.trim();

  if (name.length < 3) {
    e.preventDefault();
    alert("Digite um nome válido com pelo menos 3 caracteres!");
  } else {
    sessionStorage.setItem("quizUsername", name);
  }
});
