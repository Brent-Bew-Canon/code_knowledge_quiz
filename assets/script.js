let start = document.querySelector("#start-button")
let intro = document.querySelector("#intro-screen")
let choice = document.querySelector("#options")
let quiz = document.querySelector("#quiz-questions")
// console.log(start);
// console.log(intro);
// console.log(choice);
// console.log(quiz);


const questions = [
    {
        title: "What is JavaScript?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "Programming Language"
    },
    {
        title: "What is Python?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "Python"
    },
    {
        title: "What is HTML?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "HTML"
    },
    {
        title: "What is CSS?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "CSS"
    },
    {
        title: "What is Elixir?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "Elixir"
    },
    {
        title: "What is C++",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "C++"
    }
]

let activeQuestion = 0;

let currScore;

document.onload = () => {
    currScore = 0
}

start.addEventListener("click", () => {
    intro.setAttribute("style", "display: none")
    quiz.setAttribute("style", "display: flex")

    //start timer
})

quiz.addEventListener("click", () => {

    //check to see if the question was answered correctly
    let clicked = event.target;
    if (clicked.getAttribute("class") === "option") {
        if (clicked.getAttribute("value") === questions[activeQuestion].correctAnswer) {
            console.log("hooray!!!")

            //score the point 
            currScore = currScore + 10
            console.log(currScore)
            console.log(activeQuestion)
        } else {
            //lose time
        }

        //increase our question index
        activeQuestion++

        //if we have more questions render the new question

        if (activeQuestion < questions.length) {

            for (let i = 0; i < 4; i++) {
                document.getElementsByClassName("option")[i].textContent = questions[activeQuestion].choices[i];
                document.getElementsByClassName("option")[i].setAttribute("value", questions[activeQuestion].choices[i]);

            }
            console.log(activeQuestion)

        }

    }




    //if we are out of questions end the quiz
})