const questions = [
  {
    word: "Bite the bullet",
    options: ["Afrontar la situación", "Evitar problemas", "Rendirse"],
    answer: 0,
    errorImage: "recursos/bite_the_bullet.png",
  },
  {
    word: "Burn the midnight oil",
    options: [
      "Despertarse tarde",
      "Trabajar hasta tarde",
      "Estudiar sin descanso",
    ],
    answer: 1,
    errorImage: "recursos/burnoil.png",
  },
  {
    word: "A blessing in disguise",
    options: [
      "Algo negativo que resulta positivo",
      "Un regalo inesperado",
      "Una mala noticia",
    ],
    answer: 0,
    errorImage: "recursos/blessing.png",
  },
  {
    word: "Let the cat out of the bag",
    options: ["Mantener un secreto", "Revelar un secreto", "Cuidar a un gato"],
    answer: 1,
    errorImage: "recursos/letcat.png",
  },
  {
    word: "The ball is in your court",
    options: ["Es tu turno de actuar", "Tienes la pelota", "Eres responsable"],
    answer: 0,
    errorImage: "recursos/ball.png",
  },
  {
    word: "Piece of cake",
    options: [
      "Algo muy fácil",
      "Una pieza de pastel",
      "Una situación complicada",
    ],
    answer: 0,
    errorImage: "recursos/cake.png",
  },
];

let score = 0;
let currentQuestion = 0;

const correctoSound = new Audio("recursos/correcto.mp3");
const incorrectoSound = new Audio("recursos/incorrecto.mp3");

const ganadorSound = new Audio("recursos/aplausos.mp3");
const perdedorSound = new Audio("recursos/abucheos.mp3");

function startGame() {
  score = 0;
  currentQuestion = 0;
  document.getElementById("score").innerText = "Score: " + score;

  document.getElementById("nextButton").disabled = true;
  loadQuestion();
}

function resetGame() {
  score = 0;
  currentQuestion = 0;
  document.getElementById("score").innerText = "Score: " + score;

  document.getElementById("options").style.display = "block";
  document.getElementById("nextButton").style.display = "block";
  document.getElementById("resetButton").style.display = "none";
  document.getElementById("feedbackImage").style.display = "none";
  document.getElementById("question").innerText = "";

  startGame();
}

function loadQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    document.getElementById(
      "question"
    ).innerText = `What does "${q.word}" mean?`;
    document.querySelectorAll("#options button").forEach((btn, index) => {
      btn.innerText = q.options[index];
      btn.disabled = false;
    });
    document.getElementById("nextButton").disabled = true;
    document.getElementById("feedbackImage").style.display = "none";
  } else {
    document.getElementById("question").innerText =
      "Game Over! Your final score is: " + score;
    document.getElementById("options").style.display = "none";
    document.getElementById("nextButton").style.display = "none";
  }
}

function checkAnswer(selected) {
  const question = questions[currentQuestion];
  const feedbackImage = document.getElementById("feedbackImage");

  if (selected === question.answer) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    feedbackImage.style.display = "none";
    correctoSound.play();

    document
      .querySelectorAll("#options button")
      .forEach((btn) => (btn.disabled = true));
    document.getElementById("nextButton").disabled = false;
  } else {
    incorrectoSound.play();
    feedbackImage.src = question.errorImage;
    feedbackImage.style.display = "block";
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerText =
      "Game Over! Your final score is: " + score;
    document.getElementById("options").style.display = "none";
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("resetButton").style.display = "block";

    if (score > 3) {
      ganadorSound.play();
    } else {
      perdedorSound.play();
    }
  }
}

document.getElementById("nextButton").addEventListener("click", nextQuestion);

startGame();
