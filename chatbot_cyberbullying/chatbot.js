
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let nome = "";
let step = 0;
let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;
let lastQuestion = null;

// ===== util =====
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function botSay(text, delay = 700) {
  setTimeout(() => addMessage(text, "bot"), delay);
}

// ===== perguntas (15) com sermões firmes =====
const questions = [
  {
    q: "Você vê um colega sendo insultado em um grupo.\na) Ignora\nb) Dá risada\nc) Defende ou avisa alguém responsável.",
    correct: "c",
    sermon: [
      "Isso não é brincadeira — ignorar ou rir normaliza a agressão.",
      "Quando ninguém age, o agressor entende que pode continuar. A vítima fica isolada e vulnerável.",
      "Defender ou avisar um adulto/administrador pode interromper o ciclo e proteger quem está sofrendo."
    ]
  },
  {
    q: "Alguém posta um comentário maldoso sobre você.\na) Responde com raiva\nb) Denuncia e bloqueia\nc) Finge que não viu",
    correct: "b",
    sermon: [
      "Responder com raiva alimenta o conflito e pode te envolver em problemas.",
      "Ignorar pode deixar o agressor impune e prolongar o dano.",
      "Denunciar e bloquear protege você e cria consequências para quem abusa."
    ]
  },
  {
    q: "Um amigo te manda uma foto humilhante de outra pessoa.\na) Ri junto\nb) Apaga e conversa com ele sobre respeito\nc) Manda pra mais pessoas",
    correct: "b",
    sermon: [
      "Compartilhar conteúdo humilhante é participar do crime moral contra alguém.",
      "Repassar a foto amplia o dano e você se torna cúmplice.",
      "Apagar e confrontar o amigo é agir com responsabilidade e respeito — isso impede mais violência."
    ]
  },
  {
    q: "Você errou algo e estão zombando de você online.\na) Revida\nb) Explica com calma ou ignora\nc) Some das redes",
    correct: "b",
    sermon: [
      "Revidar costuma amplificar a exposição e as humilhações.",
      "Desaparecer pode parecer solução, mas o problema pode continuar sem resolução.",
      "Explicar com calma ou buscar apoio ajuda a resolver e mostra maturidade."
    ]
  },
  {
    q: "Um desconhecido te ameaça por mensagem.\na) Ignora\nb) Mostra para um adulto ou autoridade\nc) Responde com raiva",
    correct: "b",
    sermon: [
      "Ameaças são questões de segurança real — não podem ser ignoradas.",
      "Responder ou confrontar pode escalar a situação e te colocar em risco.",
      "Mostrar para um responsável, guardar provas e notificar autoridades é a atitude responsável."
    ]
  },
  {
    q: "Você vê uma postagem falsa sobre um colega.\na) Compartilha\nb) Denuncia\nc) Ignora",
    correct: "b",
    sermon: [
      "Compartilhar boatos pode arruinar a reputação de alguém sem motivo.",
      "Ignorar permite que a mentira se espalhe sem contestação.",
      "Denunciar e, se possível, esclarecer que é falso protege outra pessoa."
    ]
  },
  {
    q: "Um amigo está sendo zoado em um grupo.\na) Entra na brincadeira\nb) Defende\nc) Sai do grupo e não faz nada",
    correct: "b",
    sermon: [
      "Entrar na zoeira é validar a violência psicológica contra alguém.",
      "Ficar inerte facilita que a agressão continue.",
      "Defender mostra coragem e empatia — é uma ação que pode deter o agressor."
    ]
  },
  {
    q: "Você percebe que fez um comentário ofensivo sem querer.\na) Apaga e pede desculpas\nb) Finge que nada aconteceu\nc) Justifica e continua",
    correct: "a",
    sermon: [
      "Negar ou justificar o erro demonstra desinteresse em reparar o dano.",
      "Apagar e pedir desculpas é a forma correta de assumir responsabilidade.",
      "Reconhecer o erro evita que feridas se aprofundem e ensina respeito."
    ]
  },
  {
    q: "Um colega espalha prints de conversas privadas.\na) Compartilha também\nb) Fala com ele em particular\nc) Denuncia e explica que é errado",
    correct: "c",
    sermon: [
      "Repassar conversas privadas é violação da privacidade e pode causar danos irreparáveis.",
      "Conversar em particular pode não ter poder suficiente para cessar a prática.",
      "Denunciar e explicar que é errado é proteger a vítima e sinalizar que o comportamento não é aceitável."
    ]
  },
  {
    q: "Um amigo faz piadas sobre aparência de outros.\na) Ri junto\nb) Corrige e fala que é errado\nc) Ignora",
    correct: "b",
    sermon: [
      "Rir contribui para normalizar humilhação baseada na aparência.",
      "Ignorar deixa o padrão de humilhação continuar sem oposição.",
      "Corrigir e afirmar que é errado protege a dignidade das pessoas e educa o agressor."
    ]
  },
  {
    q: "Você está em um grupo com mensagens de ódio.\na) Sai e denuncia\nb) Ri das mensagens\nc) Fica pra observar",
    correct: "a",
    sermon: [
      "Permitir mensagens de ódio é compactuar com discurso perigoso.",
      "Rir ou observar sem agir normaliza violência coletiva.",
      "Sair e denunciar é uma atitude firme contra a propagação de ódio."
    ]
  },
  {
    q: "Você vê um perfil falso zombando de pessoas.\na) Denuncia\nb) Segue o perfil\nc) Comenta também",
    correct: "a",
    sermon: [
      "Seguir ou comentar alimenta o alcance do perfil e agrava o dano.",
      "Interagir só amplia a violência virtual.",
      "Denunciar remove visibilidade e ajuda a plataforma a tomar medidas."
    ]
  },
  {
    q: "Alguém publica algo sobre você sem autorização.\na) Deixa pra lá\nb) Conversa ou denuncia\nc) Faz o mesmo com ela",
    correct: "b",
    sermon: [
      "Revidar com o mesmo comportamento só perpetua o ciclo de abuso.",
      "Ignorar não garante justiça nem impede danos.",
      "Conversar, pedir remoção e denunciar é o caminho assertivo e responsável."
    ]
  },
  {
    q: "Um colega sofre comentários maldosos nas fotos.\na) Curte os comentários\nb) Avisa ele e denuncia\nc) Finge que não viu",
    correct: "b",
    sermon: [
      "Curtir comentários cruéis legitima a humilhação.",
      "Fingir que não viu facilita o crescimento do ataque.",
      "Avisar e denunciar ajuda a cortar o abuso e proteger a vítima."
    ]
  },
  {
    q: "Você presencia uma briga online.\na) Compartilha o link\nb) Denuncia e incentiva o diálogo\nc) Escolhe um lado e briga junto",
    correct: "b",
    sermon: [
      "Compartilhar para 'mostrar' só espalha o conflito e a exposição.",
      "Escolher um lado e brigar agrava a violência digital.",
      "Denunciar e buscar diálogo (quando seguro) é a postura madura que reduz danos."
    ]
  }
];

// ===== respostas de tópico que o bot reconhece =====
const topicResponses = {
  "o que é cyberbullying": "💡 Cyberbullying é o uso de redes, mensagens ou conteúdo online para ofender, humilhar, expor ou ameaçar alguém. É agressão com alcance muito maior e pode causar danos psicológicos sérios.",
  "como denunciar": "📲 Para denunciar, faça prints, guarde evidências e use as ferramentas da própria plataforma (denunciar perfil/post). No Brasil, a SaferNet tem orientações úteis — e, em caso de ameaça, informe autoridades.",
  "por que é errado": "🚫 É errado porque causa sofrimento real, pode levar a isolamento, ansiedade, depressão e até consequências legais para quem pratica.",
  "o que fazer se sofrer": "💙 Procure um adulto de confiança, guarde provas, bloqueie o agressor e denuncie. Você não precisa enfrentar isso sozinho.",
  "como evitar": "✅ Pense antes de postar, não compartilhe conteúdo humilhante e interpele amigos quando eles cruzarem o limite. Educação e empatia reduzem muito os danos."
};

// ===== embaralhar =====
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ===== fluxo principal =====
function handleUserInput() {
  const raw = userInput.value.trim();
  if (!raw) return;
  const text = raw.toLowerCase();
  addMessage(raw, "user");
  userInput.value = "";

  if (step === 0) {
    // mensagem inicial e pedir nome
    botSay("👋 Olá! Eu sou o CyberBot — seu guia firme contra o cyberbullying.");
    botSay("A internet é poderosa — vamos aprender a usá-la com responsabilidade.");
    botSay("Qual é o seu nome?");
    step = 1;
    return;
  }

  if (step === 1) {
    nome = raw;
    botSay(`Prazer, ${nome}. Vamos começar — eu vou te apresentar situações reais e você responde (a, b ou c).`);
    shuffledQuestions = shuffle([...questions]); // cópia embaralhada
    currentIndex = 0;
    score = 0;
    setTimeout(() => askCurrentQuestion(), 900);
    step = 2;
    return;
  }

  if (step === 2) {
    // primeiro checar se é uma pergunta temática do usuário
    for (const key in topicResponses) {
      if (text.includes(key)) {
        botSay(topicResponses[key]);
        setTimeout(() => botSay("Voltando à pergunta..."), 1400);
        setTimeout(() => botSay(lastQuestion.q), 2200);
        return;
      }
    }

    // checar se fugiu do formato (esperamos a/b/c)
    if (!["a", "b", "c"].includes(text)) {
      botSay("🤨 Você saiu do formato esperado — responda só com: a), b) ou c).");
      setTimeout(() => botSay(lastQuestion.q), 900);
      return;
    }

    evaluateAnswer(text);
  }

  // se terminou e quer reiniciar
  if (step === 3) {
    if (text === "sim") {
      // reset
      shuffledQuestions = shuffle([...questions]);
      currentIndex = 0;
      score = 0;
      setTimeout(() => askCurrentQuestion(), 800);
      step = 2;
    } else {
      botSay("Ok — se quiser jogar de novo, digite 'sim'.");
    }
  }
}

// ===== perguntar =====
function askCurrentQuestion() {
  const q = shuffledQuestions[currentIndex];
  lastQuestion = q;
  botSay(`Pergunta ${currentIndex + 1}/${shuffledQuestions.length}`);
  botSay(q.q);
}

// ===== avaliar e dar sermão se errado =====
function evaluateAnswer(answer) {
  const q = shuffledQuestions[currentIndex];
  const correct = q.correct.toLowerCase();

  if (answer === correct) {
    score++;
    botSay("✅ Correto. Boa escolha.");
  } else {
    // responde errado e então sermão firme específico
    botSay("❌ Resposta incorreta.");
    // exibir sermão (cada frase com pequeno delay)
    q.sermon.forEach((line, i) => botSay(line, (i + 1) * 700));
  }

  currentIndex++;

  if (currentIndex < shuffledQuestions.length) {
    setTimeout(() => askCurrentQuestion(), 2200 + (q.sermon ? q.sermon.length * 100 : 0));
  } else {
    setTimeout(() => showFinalResult(), 2600);
  }
}

// ===== resultado final =====
function showFinalResult() {
  botSay(`🏁 Quiz finalizado, ${nome}.`);
  botSay(`Você acertou ${score} de ${shuffledQuestions.length} perguntas.`);
  const media = score / shuffledQuestions.length;

  if (media < 0.5) {
    botSay("⚠️ Sua média ficou baixa. É importante reforçar seus conhecimentos sobre segurança digital.");
    botSay("Sugestão: procure materiais sobre empatia online, guarde provas quando necessário e pratique bloquear/denunciar agressões.");
    botSay("Quer tentar novamente para melhorar? Digite 'sim' para recomeçar.");
  } else if (media < 0.8) {
    botSay("👍 Boa! Você tem uma noção razoável, mas ainda dá pra melhorar.");
    botSay("Reflita sobre as situações onde errou e leia mais sobre como agir em casos graves (ameaças, exposição e fake news).");
    botSay("Se quiser, digite 'sim' para jogar outra vez e treinar.");
  } else {
    botSay("🎉 Excelente! Sua consciência digital está muito boa.");
    botSay("Continue ajudando outras pessoas e mantendo a internet um lugar mais seguro.");
    botSay("Se quiser jogar novamente e manter a prática, digite 'sim'.");
  }

  step = 3;
}

// ===== eventos =====
sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserInput();
});

// ===== mensagem inicial automática (apenas conecta) =====
window.onload = () => {
  botSay("💬 Conectando ao CyberBot...");
  setTimeout(() => botSay("Digite qualquer coisa para começar."), 900);
};