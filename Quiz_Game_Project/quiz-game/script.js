const clickSound = new Audio("assets/sounds/click.mp3");
const correctSound = new Audio("assets/sounds/correct.mp3");
const wrongSound = new Audio("assets/sounds/wrong.mp3");


// =========================
// START PAGE
// =========================

const startBtn = document.getElementById("startBtn");

if(startBtn){

    startBtn.onclick = ()=>{

        localStorage.setItem("currentLevel",1);

        if(!localStorage.getItem("unlockedLevel")){

            localStorage.setItem("unlockedLevel",1);

        }

        clickSound.play();

        window.location.href="levels.html";

    }

}


// =========================
// LEVEL PAGE
// =========================

if(window.location.pathname.includes("levels.html")){


    let unlocked = Number(
        localStorage.getItem("unlockedLevel") || 1
    );


    const cards = document.querySelectorAll(".level-card");


    cards.forEach(card=>{


        const level = Number(card.dataset.level);


        const button = card.querySelector(".play-btn");


        const stars = card.querySelector(".stars");


        let score = Number(
            localStorage.getItem("stars"+level) || 0
        );


        stars.innerHTML="";


        for(let i=1;i<=5;i++){


            if(i<=score){

                stars.innerHTML+="⭐";

            }

            else{

                stars.innerHTML+="☆";

            }

        }



        if(level<=unlocked){


            card.classList.remove("locked");


            button.disabled=false;


            button.innerHTML="▶ Play";



            let lock = card.querySelector(".lock");


            if(lock){

                lock.style.display="none";

            }



            button.onclick=()=>{


                localStorage.setItem(
                    "currentLevel",
                    level
                );


                window.location.href="quiz.html";


            }


        }


    });


}

// =========================
// QUIZ PAGE
// =========================

if(window.location.pathname.includes("quiz.html")){


const currentLevel = Number(
    localStorage.getItem("currentLevel")
);


const questions = quizData[currentLevel];


let currentQuestion = 0;


let score = 0;


let correct = 0;


let wrong = 0;


let notSubmitted = 0;


// Timer changed to 10 seconds

let timeLeft = 10;


const timer = document.getElementById("timer");


let interval;



function startTimer(){


    clearInterval(interval);


    timer.innerHTML = timeLeft;



    interval = setInterval(()=>{


        timeLeft--;


        timer.innerHTML = timeLeft;



        if(timeLeft <= 0){


            clearInterval(interval);


            // Time over without selecting

            notSubmitted++;



            currentQuestion++;



            if(currentQuestion < questions.length){


                timeLeft = 10;


                showQuestion();


                startTimer();


            }


            else{


                localStorage.setItem(
                    "score",
                    score
                );


                localStorage.setItem(
                    "correct",
                    correct
                );


                localStorage.setItem(
                    "wrong",
                    wrong
                );


                localStorage.setItem(
                    "notSubmitted",
                    notSubmitted
                );


                window.location.href="result.html";


            }


        }


    },1000);


}



const question =
document.getElementById("question");


const answers =
document.getElementById("answers");


const nextBtn =
document.getElementById("nextBtn");


const progress =
document.getElementById("progressFill");


const correctText =
document.getElementById("correct");


const wrongText =
document.getElementById("wrong");


const questionNumber =
document.getElementById("questionNumber");


const levelTitle =
document.getElementById("levelTitle");



levelTitle.innerHTML =
"Level "+currentLevel;



showQuestion();


startTimer();




function showQuestion(){


    nextBtn.style.display="none";



    questionNumber.innerHTML =

    `Question ${currentQuestion+1} / ${questions.length}`;



    progress.style.width =

    ((currentQuestion+1)/questions.length)*100+"%";



    question.innerHTML =

    questions[currentQuestion].question;



    answers.innerHTML="";



    questions[currentQuestion].options.forEach(
    (option,index)=>{


        const btn =
        document.createElement("button");



        btn.className="answer";


        btn.innerText=option;



        btn.onclick=()=>{

            checkAnswer(index);

        };



        answers.appendChild(btn);



    });


}





function checkAnswer(selected){


    clearInterval(interval);



    const answer =
    questions[currentQuestion].answer;



    const buttons =
    document.querySelectorAll(".answer");



    buttons.forEach(btn=>{

        btn.disabled=true;

    });



    if(selected===answer){



        buttons[selected].style.background="#22c55e";


        buttons[selected].style.color="white";


        correctSound.play();



        score++;


        correct++;


        correctText.innerHTML=correct;



    }


    else{


        buttons[selected].style.background="#ef4444";


        buttons[selected].style.color="white";



        buttons[answer].style.background="#22c55e";


        buttons[answer].style.color="white";



        wrongSound.play();



        wrong++;


        wrongText.innerHTML=wrong;



    }



    nextBtn.style.display="block";


}




nextBtn.onclick=()=>{


    currentQuestion++;



    if(currentQuestion < questions.length){


        clearInterval(interval);


        timeLeft=10;


        timer.innerHTML=10;


        showQuestion();


        startTimer();


    }


    else{


        clearInterval(interval);



        localStorage.setItem(
            "score",
            score
        );


        localStorage.setItem(
            "correct",
            correct
        );


        localStorage.setItem(
            "wrong",
            wrong
        );


        localStorage.setItem(
            "notSubmitted",
            notSubmitted
        );



        window.location.href="result.html";


    }


}


}

// =========================
// RESULT PAGE
// =========================

if(window.location.pathname.includes("result.html")){


const score = Number(
    localStorage.getItem("score") || 0
);


const correct = Number(
    localStorage.getItem("correct") || 0
);


const wrong = Number(
    localStorage.getItem("wrong") || 0
);


const notSubmitted = Number(
    localStorage.getItem("notSubmitted") || 0
);


const level = Number(
    localStorage.getItem("currentLevel")
);



document.getElementById("scoreText").innerHTML =

`Score : ${score} / 5`;



document.getElementById("correctText").innerHTML =

`✅ Correct Answers : ${correct}`;



document.getElementById("wrongText").innerHTML =

`❌ Wrong Answers : ${wrong}`;



document.getElementById("notSubmittedText").innerHTML =

`⏳ Not Submitted : ${notSubmitted}`;




// Confetti animation

confetti({

    particleCount:180,

    spread:120,

    origin:{y:0.6}

});




// Save Best Score

let previous = Number(

    localStorage.getItem("stars"+level) || 0

);



if(score > previous){

    localStorage.setItem(
        "stars"+level,
        score
    );

}




// Show Stars

let stars="";


for(let i=1;i<=5;i++){


    if(i<=score){

        stars+="⭐";

    }

    else{

        stars+="☆";

    }


}



document.getElementById("star-rating").innerHTML =

stars;





// Unlock Next Level

let unlocked = Number(

    localStorage.getItem("unlockedLevel") || 1

);



if(level==unlocked && unlocked<5){


    localStorage.setItem(

        "unlockedLevel",

        unlocked+1

    );


}




// Back Button

const backBtn = document.getElementById("backBtn");


if(backBtn){


    backBtn.onclick=()=>{


        window.location.href="levels.html";


    }


}


}



// =========================
// RESET PROGRESS
// =========================

const resetBtn = document.getElementById("resetBtn");


if(resetBtn){


    resetBtn.onclick=()=>{


        let ok = confirm(
            "Reset all progress?"
        );


        if(ok){


            localStorage.clear();


            window.location.reload();


        }


    }


}