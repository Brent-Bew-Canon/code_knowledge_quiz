let start = document.querySelector("#start-button")
let intro = document.querySelector("#intro-screen")
let choice = document.querySelector("#options")
let quiz = document.querySelector("#quiz-questions")
let title = document.querySelector("h2")
let buttons = quiz.querySelectorAll(".option")
// console.log(start);
// console.log(intro);
// console.log(choice);
// console.log(quiz);
console.log(buttons);


const questions = [
    {
        title: "What is JavaScript?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "Programming Language"
    },
    {
        title: "What is Python?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "1. Programming Language"
    },
    {
        title: "What is HTML?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "1. Programming Language"
    },
    {
        title: "What is CSS?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "1. Programming Language"
    },
    {
        title: "What is Elixir?",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "1. Programming Language"
    },
    {
        title: "What is C++",
        choices: ["1. Programming Language", "2. A thing you read at a play about coffee", "3. A bottele", "4. A funny joke"],
        correctAnswer: "1. Programming Language"
    }
]

let activeQuestion = 0;

let currScore = 0;

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
                title.textContent = questions[activeQuestion].title;
                document.getElementsByClassName("option")[i].textContent = questions[activeQuestion].choices[i];
                document.getElementsByClassName("option")[i].setAttribute("value", questions[activeQuestion].choices[i]);
            }
            console.log(activeQuestion)
            console.log(currScore);

        } else {
            //if we are out of questions end the quiz
            for (let i = 0; i < 4; i++) {
                buttons[i].setAttribute("style", "display: none")
            }
            title.textContent = "All done!"
            let finalScore = document.createElement("p")
            let initials = document.createElement("p")

            finalScore.textContent = "Your final score is " + currScore
            initials.textContent = "Enter Initials: "

            document.querySelector("h2").appendChild(finalScore)
            document.querySelector("h2").appendChild(initials)
        }
        return;

    }


})