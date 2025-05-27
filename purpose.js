// Elements Selection
const proposalSection = document.getElementById('proposalSection');
const quizSection = document.getElementById('quizSection');
const complimentSection = document.getElementById('complimentSection');

const navButtons = document.querySelectorAll('.navBtn');

const crushNameInput = document.getElementById('crushName');
const startProposalBtn = document.getElementById('startProposalBtn');
const proposalMessage = document.getElementById('proposalMessage');
const proposalButtons = document.getElementById('proposalButtons');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const proposalResponse = document.getElementById('proposalResponse');

const quizContainer = document.getElementById('quizContainer');
const showResultBtn = document.getElementById('showResultBtn');
const quizResult = document.getElementById('quizResult');

const complimentName = document.getElementById('complimentName');
const complimentType = document.getElementById('complimentType');
const generateComplimentBtn = document.getElementById('generateComplimentBtn');
const complimentOutput = document.getElementById('complimentOutput');

const heartbeatHeart = document.querySelector('.heartbeat-heart');

// Navigation Logic
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const sectionToShow = btn.getAttribute('data-section');
    [proposalSection, quizSection, complimentSection].forEach(sec => {
      if (sec.id === sectionToShow) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    });
  });
});

// Proposal Logic
startProposalBtn.addEventListener('click', () => {
  const name = crushNameInput.value.trim();
  if (!name) {
    alert("Please enter your crush's name!");
    return;
  }
  proposalMessage.textContent = `Hey ${name}, will you be my Valentine? 💖`;
  proposalMessage.classList.remove('hidden');
  proposalButtons.classList.remove('hidden');
  proposalResponse.classList.add('hidden');
});

yesBtn.addEventListener('click', () => {
  proposalResponse.textContent = "Yay! 💕 Thank you! You just made my day!";
  proposalResponse.style.color = '#d81e5b';
  proposalResponse.classList.remove('hidden');
  proposalButtons.classList.add('hidden');
  proposalMessage.classList.add('hidden');
});

noBtn.addEventListener('click', () => {
  proposalResponse.textContent = "Oh no! 😢 I'll cry... but I still like you!";
  proposalResponse.style.color = '#555';
  proposalResponse.classList.remove('hidden');
  proposalButtons.classList.add('hidden');
  proposalMessage.classList.add('hidden');
});

// Quiz Logic
const quizQuestions = [
  {
    question: "What is your crush's favorite color?",
    answers: ["Red ❤️", "Blue 💙", "Pink 💗", "Green 💚"],
  },
  {
    question: "Which place would you like to go together?",
    answers: ["Beach 🏖️", "Mountains 🏔️", "Cafe ☕", "Park 🌳"],
  },
  {
    question: "What is your crush's favorite hobby?",
    answers: ["Dancing 💃", "Reading 📚", "Gaming 🎮", "Cooking 🍳"],
  },
];

let userAnswers = [];

function renderQuiz() {
  quizContainer.innerHTML = "";
  quizQuestions.forEach((q, idx) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('quiz-question');
    questionDiv.textContent = (idx + 1) + ". " + q.question;
    quizContainer.appendChild(questionDiv);

    q.answers.forEach(ans => {
      const ansDiv = document.createElement('div');
      ansDiv.classList.add('quiz-answer');
      ansDiv.textContent = ans;
      ansDiv.addEventListener('click', () => {
        // Save answer & highlight selected
        userAnswers[idx] = ans;
        // Remove selected from siblings
        const siblings = ansDiv.parentNode.querySelectorAll('.quiz-answer');
        siblings.forEach(sib => sib.classList.remove('selected'));
        ansDiv.classList.add('selected');
        // Show "Show Result" button only if all answered
        if (userAnswers.length === quizQuestions.length && !userAnswers.includes(undefined)) {
          showResultBtn.classList.remove('hidden');
        }
      });
      questionDiv.appendChild(ansDiv);
    });
  });
  showResultBtn.classList.add('hidden');
  quizResult.classList.add('hidden');
  userAnswers = [];
}

showResultBtn.addEventListener('click', () => {
  let resultText = "Your love quiz answers:\n";
  userAnswers.forEach((ans, i) => {
    resultText += `${i + 1}. ${ans}\n`;
  });
  quizResult.textContent = resultText;
  quizResult.classList.remove('hidden');
});

// Compliment Generator Logic
const compliments = {
  cute: [
    "You light up my world like nobody else.",
    "Your smile is the sweetest thing I've ever seen.",
    "Being with you feels like a dream come true.",
  ],
  funny: [
    "Are you a magician? Because whenever I look at you, everyone else disappears!",
    "If you were a vegetable, you'd be a cute-cumber!",
    "Do you have a map? I keep getting lost in your eyes!",
  ],
  poetic: [
    "In the garden of my heart, you are the most beautiful flower.",
    "Your eyes sparkle brighter than the stars at night.",
    "Every moment with you is a verse in my favorite poem.",
  ],
};

generateComplimentBtn.addEventListener('click', () => {
  const name = complimentName.value.trim();
  const type = complimentType.value;
  if (!name) {
    alert("Please enter your crush's name!");
    return;
  }
  const list = compliments[type];
  const randomIndex = Math.floor(Math.random() * list.length);
  const compliment = `${name}, ${list[randomIndex]}`;
  complimentOutput.textContent = compliment;
});

// Heartbeat click fun
heartbeatHeart.addEventListener('click', () => {
  alert("❤️ Your heart is beating for someone special! ❤️");
});

// Initialize quiz on page load
renderQuiz();
