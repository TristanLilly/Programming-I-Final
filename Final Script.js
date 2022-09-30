const start = document.getElementById("start");

const quiz = document.getElementById("quiz");

const question = document.getElementById("question");

const qImg = document.getElementById("qImg");  

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

const counter = document.getElementById("counter"); 

const timeGauge = document.getElementById("timeGauge");

const progress = document.getElementById("progress"); 

const scoreDiv = document.getElementById("scoreContainer"); 



//Creating Questions
let questions = [
  {  
    question: "How many versions of Minecraft are there?",
    imgSrc: "img/grassblock.png",
    choiceA: "Two",
    choiceB: "Three",
    choiceC: "Four",
    correct: "A"},
  
  {
    question: "What are creepers scared of?",
    imgSrc: "img/creeperhead.png",
    choiceA: "Dogs",
    choiceB: "Ocelots",
    choiceC: "Pigs",
    correct: "B"},
  
  {
    question: "How many buckets of water do you need to make an infinite water source?",
    imgSrc: "img/waterbucket.png",
    choiceA: "Three",
    choiceB: "Four",
    choiceC: "Two",
    correct: "C"},
  {
    question: "In Minecraft how many Axolotl colors are there?",
    imgSrc: "img/axolotl.png",
    choiceA: "Four",
    choiceB: "Five",
    choiceC: "Six",
    correct: "B"},
  {
    question: "If you name a sheep 'jeb_' what happens?",
    imgSrc: "img/sheep.png",
    choiceA: "The wool on the sheep cycles through colors",
    choiceB: "The sheep flips over on its back",
    choiceC: "The sheep eyes turn red and it becomes agressive",
    correct: "A"}
];
  

//creating variables

const lastQuestion = questions.length-1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10 seconds
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render question

function renderQuestion(){
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
   choiceB.innerHTML = q.choiceB;
   choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

//start quiz
function startQuiz(){
  start.style.display = "none";
renderQuestion();
quiz.style.display = "block";
renderProgress();
renderCounter();
TIMER = setInterval(renderCounter, 1000); //1000ms
}


//render progress
function renderProgress(){
  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
    progress.innerHTML += "<div class = 'prog' id="+ qIndex + "></div>";
  }
}

//counter render
function renderCounter(){
  if(count <= questionTime){
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++
  }else{
    count = 0;
     answerIsWrong();
    if(runningQuestion < lastQuestion ){
    runningQuestion++;
  renderQuestion();
     }else{
      //end the quiz show score
      clearInterval(TIMER);
      scoreRender();
     }
  }
}

//checking answers
function checkAnswer(answer){
  if(answer == questions[runningQuestion].correct){
    //answer is correct
    score++;
    //change progress color to green
    answerIsCorrect();
  }else{
    answerIsWrong();
    //answer is wrong
    //change progress color to red
  }
  count = 0;
  if(runningQuestion < lastQuestion ){
    runningQuestion++;
  renderQuestion();
  }else{
      //end the quiz show score
    clearInterval(TIMER);
      scoreRender();
     }
  
}

//correct answer
function answerIsCorrect(){
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
//wrong answer
function answerIsWrong(){
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score render
function scoreRender(){
  scoreDiv.style.display = "block";

  const scorePercent = Math.round(100 * score/questions.length);

  let img = (scorePercent >= 80) ? "img/netherite.png":
            (scorePercent >= 70) ? "img/diamond.png":
            (scorePercent >= 60) ? "img/goldingot.png":
            (scorePercent >= 50) ? "img/ironingot.png":
            "img/coal.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePercent + "%</p>";
}
