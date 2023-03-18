let start = document.querySelector("#start-button")
let intro = document.querySelector("#intro-screen")
let choice = document.querySelector("#options")
let quiz = document.querySelector("#quiz-questions")
let title = document.querySelector("h2")
let buttons = quiz.querySelectorAll(".option")
let quizDone = document.querySelector(".quiz-done")
let main = document.querySelector("main")
let sendScore = document.querySelector("#hs")
let displayScore = document.querySelector("#final-score")
let highScorePage = document.querySelector(".high-score-page")
let initials = document.querySelector("#initials-area")
let back = document.querySelector("#back")
let clear = document.querySelector("#clear")
let parentList = document.querySelector("#display-scores")
let viewScores = document.querySelector("#view-scores")
let time = document.querySelector("#time")
let hr = document.createElement("hr")
let response = document.createElement("h3")

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

let highScores = [
]
let activeQuestion = 0;
let currScore = 0;

highScores = JSON.parse(localStorage.getItem("Scores"))

document.onload = () => {
    currScore = 0
}

start.addEventListener("click", () => {
    intro.setAttribute("style", "display: none")
    quiz.setAttribute("style", "display: flex")

    //set active question to 0 for loop
    activeQuestion = 0

    //start timer
})

quiz.addEventListener("click", function () {
    //check to see if the question was answered correctly
    let clicked = event.target;
    if (clicked.getAttribute("class") === "option") {
        if (clicked.getAttribute("value") === questions[activeQuestion].correctAnswer) {
            console.log("hooray!!!")

            //score the point 
            currScore = currScore + 10
            console.log(currScore)
            console.log(activeQuestion)

            //say "correct!"
            response.innerText = "Correct!"
        } else {
            //lose time

            //say "wrong!"
            response.innerText = "Wrong!"
        }

        //create hr tag and append to div #options
        main.appendChild(hr)
        main.appendChild(response)

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
            quiz.setAttribute("style", "display: none")
            quizDone.setAttribute("style", "display: block")
            displayScore.textContent = currScore

            //stop the timer

        }
    }

})

sendScore.addEventListener("click", function () {
    //log the data to local storage as an object
    console.log(initials.value);
    highScores.push({ Initials: initials.value, Score: currScore })
    localStorage.setItem("Scores", JSON.stringify(highScores))
    console.log(JSON.parse(localStorage.getItem("Scores")))

    //hide the quiz done div
    quizDone.setAttribute("style", "display: none")
    hr.remove()
    response.remove()

    //display the highscore area 
    highScorePage.setAttribute("style", "display: block")

    // create highscores list and display them
    for (let i = 0; i < highScores.length; i++) {
        let list = document.createElement("li")
        document.getElementById("display-scores").appendChild(list)
        list.setAttribute("id", "list" + [i])
        list.textContent = highScores[i].Initials + " - " + highScores[i].Score
    }

    //hide header elements
    time.setAttribute("style", "display: none")
    viewScores.setAttribute("style", "display: none")
});

back.addEventListener("click", function () {
    // hide the highscore div
    highScorePage.setAttribute("style", "display: none")

    //display start div
    intro.setAttribute("style", "display: flex")

    //redisplay the timer and highscores link in header
    viewScores.setAttribute("style", "display: block")
    time.setAttribute("style", "display: block")
})

clear.addEventListener("click", function () {
    // reset highscores variable 
    let length = highScores.length
    for (let i = 0; i < length; i++) {
        highScores.pop()
    }
    //reset the local storage
    localStorage.setItem("Scores", JSON.stringify(highScores))
    //delete li's
    for (let i = 0; i < length; i++) {
        parentList.removeChild(parentList.lastElementChild)

        // let listItem = "#list" + [i]
        // console.log(listItem);
        // let listRemove = document.querySelector(listItem)
        // listRemove.remove()
    }
})

viewScores.addEventListener("click", function () {
    intro.setAttribute("style", "display: none")
    quiz.setAttribute("style", "display: none")
    quizDone.setAttribute("style", "display: none")
    time.setAttribute("style", "display: none")
    viewScores.setAttribute("style", "display: none")
    highScorePage.setAttribute("style", "display: block")
    event.preventDefault()
    for (let i = 0; i < highScores.length; i++) {
        let list = document.createElement("li")
        document.getElementById("display-scores").appendChild(list)
        list.setAttribute("id", "list" + [i])
        list.textContent = highScores[i].Initials + " - " + highScores[i].Score
    }
    //stop timer


})




