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
let timeCount = document.querySelector(".timer-count")
let done = false
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

let secondsLeft = 70

let highScores = [
]
let activeQuestion = 0;
let currScore = 0;

//pull local storage data to populate the highscores array if data exists
highScores = JSON.parse(localStorage.getItem("Scores"))

//function for clicking "start quiz"
start.addEventListener("click", () => {
    //hide the intro div and display the quiz div
    intro.setAttribute("style", "display: none")
    quiz.setAttribute("style", "display: flex")

    //start timer
    startTimer()

    //Reset questions text to the first question
    title.textContent = questions[activeQuestion].title;
    document.getElementsByClassName("option")[0].textContent = questions[activeQuestion].choices[0];
    document.getElementsByClassName("option")[0].setAttribute("value", questions[activeQuestion].choices[0]);

})

//starts the timer counting down 1 second at a time
function startTimer() {
    timer = setInterval(function () {
        secondsLeft--;
        //keep displaying the current time as long as it is >0
        if (secondsLeft >= 0) {
            timeCount.textContent = secondsLeft;
            //if the timer drops below zero, display zero
        } else {
            timeCount.textContent = 0
        }
        //stop the timer if it reaches 0 or quiz finishes
        if (secondsLeft === 0 || done === true) {
            // Stops execution of action at set interval
            clearInterval(timer);
        }
    }, 1000);
}

//function that evaluates the answer you select for each question
quiz.addEventListener("click", function () {
    //check to see if the question was answered correctly
    let clicked = event.target;
    if (clicked.getAttribute("class") === "option") {
        if (clicked.getAttribute("value") === questions[activeQuestion].correctAnswer) {
            //say "correct!" if correct
            response.innerText = "Correct!"
        } else {
            //lose time if wrong
            secondsLeft = secondsLeft - 15
            //say "wrong!" if wrong
            response.innerText = "Wrong!"
        }

        //create hr tag and append to div #options to show feedback
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
            //if we are out of questions end the quiz
        } else {
            quiz.setAttribute("style", "display: none")
            quizDone.setAttribute("style", "display: block")
            if (secondsLeft >= 0) {
                currScore = secondsLeft
            } else {
                currScore = 0
            }
            displayScore.textContent = currScore

            //stop the timer
            done = true
        }
    }
})

sendScore.addEventListener("click", function () {

    activeQuestion = 0
    //log the data to local storage as an object
    highScores.push({ Initials: initials.value, Score: currScore })
    localStorage.setItem("Scores", JSON.stringify(highScores))

    //hide the quiz done div
    quizDone.setAttribute("style", "display: none")
    hr.remove()
    response.remove()

    //display the highscore area 
    highScorePage.setAttribute("style", "display: block")

    //delete any old highscores

    if (parentList.children.length > 0) {
        let length = highScores.length
        for (let i = 0; i < length - 1; i++) {
            parentList.removeChild(parentList.lastElementChild)
        }
    }

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


    //reset timer value
    secondsLeft = 70
    done = false
    timeCount.textContent = 70
})

clear.addEventListener("click", function () {
    // reset highscores variable 
    let length = highScores.length
    for (let i = 0; i <= length; i++) {
        highScores.pop()
    }
    //reset the local storage
    localStorage.setItem("Scores", JSON.stringify(highScores))
    //delete li list items
    if (parentList.children.length > 0) {
        for (let i = 0; i < length; i++) {
            parentList.removeChild(parentList.lastElementChild)
        }
    }
})

viewScores.addEventListener("click", function () {
    //hide all the divs/elements and show the highscores div
    intro.setAttribute("style", "display: none")
    quiz.setAttribute("style", "display: none")
    quizDone.setAttribute("style", "display: none")
    time.setAttribute("style", "display: none")
    viewScores.setAttribute("style", "display: none")
    hr.remove()
    response.remove()
    highScorePage.setAttribute("style", "display: block")

    //prevent page reload
    event.preventDefault()

    //delete the li's from the highscore page
    if (parentList.children.length > 0) {
        let length = highScores.length
        for (let i = 0; i < length; i++) {
            parentList.removeChild(parentList.lastElementChild)
        }
    }

    //recreate the li's from the highscores array
    for (let i = 0; i < highScores.length; i++) {
        let list = document.createElement("li")
        document.getElementById("display-scores").appendChild(list)
        list.setAttribute("id", "list" + [i])
        list.textContent = highScores[i].Initials + " - " + highScores[i].Score
    }
})




