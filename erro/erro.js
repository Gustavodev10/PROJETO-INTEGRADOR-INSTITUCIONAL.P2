// Ativa ícones do Feather (caso existam no HTML futuramente)
feather.replace();

// Efeito de brilho no botão após alguns segundos
const botao = document.querySelector('.btn-voltar');
setTimeout(() => {
  botao.classList.add('shadow-lg');
}, 1000);
