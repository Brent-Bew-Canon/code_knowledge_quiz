//assign html elements to variables for use
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

//initialize important variables including highscores array
let secondsLeft = 70
let highScores = []
let activeQuestion = 0;
let currScore = 0;

//setup the array for quiz questions
const questions = [
    {
        title: "String values are enclosed with ___",
        choices: ["1. Quotations", "2. Parentheses ", "3. Brackets", "4. Angle Brackets"],
        correctAnswer: "1. Quotations"
    },
    {
        title: "A useful debugging tool is __",
        choices: ["1. console.log", "2. console.debugCode", "3. code checker", "4. fixMyCode"],
        correctAnswer: "1. console.log"
    },
    {
        title: "Which is not a JS data type?",
        choices: ["1. Words", "2. String", "3. Number", "4. Object"],
        correctAnswer: "1. Words"
    },
    {
        title: "A Javscript function is enclosed by what?",
        choices: ["1. Curly Braces", "2. Brackets", "3. Single Quotes", "4. Double Quotes"],
        correctAnswer: "1. Curly Braces"
    },
    {
        title: "Arrays start at what index?",
        choices: ["1. Zero", "2. One", "3. Negative 1", "4. Two"],
        correctAnswer: "1. Zero"
    },
    {
        title: "To accesses an array of objects in local storage, use ___",
        choices: ["1. JSON", "2. jQuery", "3. Adobe", "4. Floppy Disc"],
        correctAnswer: "1. JSON"
    }
]

//pull local storage data to populate the highscores array if data exists
if (JSON.parse(localStorage.getItem("Scores")) != null) {
    highScores = JSON.parse(localStorage.getItem("Scores"))
}

//event listener function for clicking "start quiz" button on the intro screen div
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
        if (secondsLeft > 0) {
            timeCount.textContent = secondsLeft;

            //if the timer drops below zero, display zero as timer
        } else {
            timeCount.textContent = 0
            endQuiz()
        }

        //stop the timer if it reaches 0 or quiz finishes
        if (secondsLeft === 0 || done === true) {

            // Stops execution of action at set interval
            clearInterval(timer);
        }
    }, 1000);
}

//event listener function that evaluates the answer you select for each question
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
            if (secondsLeft > 0) {
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

//function to end the quiz - called when time runs out
function endQuiz() {
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


//event listener function for clicking the "submit" button at end of quiz
sendScore.addEventListener("click", function () {

    // reset active question to 0
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

//event listener function for clicking the "back" button in the highscores div
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

//event listener function for clicking the "clear high scores" button in the highscore div
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

//event listener function for clicking the "view high scores" header element
viewScores.addEventListener("click", function () {

    //resets the timer
    clearInterval(timer);

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




