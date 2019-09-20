"use strict";

//Starts the quiz when user clicks the start button
function startQuiz() {
  $("#startButton").on("click", function(event) {
    renderAQuestion();
  });
}

//Updates the question number
function updateQuestionTracker() {
  let questionNum = STORE.currentQuestion + 1;
  STORE.currentQuestion += 1;
  let score = STORE.score;
  const trackerHTML = `
  <p>Question: ${questionNum}/${STORE.questions.length}</p>
  <p>Score: ${score}/${STORE.questions.length}</p>
  `;
  $(".js-tracker").html($(trackerHTML));
}

//Updates the score
function updateScoreTracker() {
  let questionNum = STORE.currentQuestion;
  let totalQuestions = STORE.questions.length;
  let score = STORE.score + 1;
  STORE.score += 1;
  const trackerHTML = `
  <p>Question: ${questionNum}/${totalQuestions}</p>
  <p>Score: ${score}/${totalQuestions}</p>
  `;
  $(".js-tracker").html($(trackerHTML));
}

//Render the options for the question
function renderOptions(options) {
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    $(".js-options").append(`<input type="radio" name="option" value="${option}" id="option${i+1}" required/>
    <label for="option${i+1}">${option}</label><br/>`);
  }
}

//Renders a question
function renderAQuestion() {
  window.scroll(0,0);
  let question = STORE.questions[STORE.currentQuestion].question;
  let options = STORE.questions[STORE.currentQuestion].options;
  let questionHTML = `
  <div class="tracker js-tracker"></div>
  <div class="multiQuestion">
    <form id="js-form">
      <fieldset>
        <legend>${question}</legend>
        <div class="js-options"></div>
        <button type="submit" class="answer js-answer">SUBMIT</button>
      </fieldset>
    </form>
  </div>
  `;
  
  $("main").html($(questionHTML));
  updateQuestionTracker();
  renderOptions(options);
}

//Helper function to handleSelectedOption()
function correct() {
  window.scroll(0,0);
  let correctHTML = `
  <div class="tracker js-tracker"></div>
  <div class="output">
    <p>You got it right!!</p>
    <button type="submit" class="next js-next">NEXT >></button>
  </div>
  `;
  $("main").html($(correctHTML));
  updateScoreTracker();
}

//Helper function to handleSelectedOption()
function wrong(answer) {
  window.scroll(0,0);
  let questionNum = STORE.currentQuestion;
  let totalQuestions = STORE.questions.length;
  let score = STORE.score;
  let wrongHTML = `
  <div class="tracker js-tracker">
    <p>Question: ${questionNum}/${totalQuestions}</p>
    <p>Score: ${score}/${totalQuestions}</p>
  </div>
  <div class="output">
    <p>You got it wrong.</p>
    <p>The correct answer is...</p><br/>
    <p class="correctAnswer">${answer}</p>
    <button type="submit" class="next js-next">NEXT >></button>
  </div>
  `;
  $("main").html($(wrongHTML));
}

//Checks whether the selected option was the right answer
function handleSelectedOption() {
  $("body").on("submit", "#js-form", function(event) {
    event.preventDefault();
    let correctAnswer = STORE.questions[STORE.currentQuestion - 1].answer;
    let selectedOption = $("input:radio[name=option]:checked").val();
    
    if (correctAnswer === selectedOption) {
      correct();
    } else {
      wrong(correctAnswer);
    }
  });
}


function displayFinalResult() {
  window.scroll(0,0);
  let totalQuestions = STORE.questions.length;
  let score = STORE.score;
  let resultHTML = `
  <div class="output">
    <p>Your score is ${score}/${totalQuestions}</p>
    <button type="submit" class="restart js-restart">RESTART</button>
  </div>
  `;
  $("main").html($(resultHTML));
}

//Check if there's a next question. If there is, go to the next question.
//Otherwise, display the final result.
function handleNext() {
  $("body").on("click", ".js-next", function(event) {
    let questionNum = STORE.currentQuestion;
    let totalQuestions = STORE.questions.length;
    if (questionNum === totalQuestions) {
      displayFinalResult();
    } else {
      renderAQuestion();
    }
  });
}

function handleRestart() {
  $("body").on("click", ".js-restart", function(event) {
    STORE.currentQuestion = 0;
    STORE.score = 0;
    renderAQuestion();
  });
}

function handleQuizApp() {
  startQuiz();
  handleSelectedOption();
  handleNext();
  handleRestart();
}

$(handleQuizApp);