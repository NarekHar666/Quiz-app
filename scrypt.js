let questions = [
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
        { option: "William Shakespeare", correct: true },
        { option: "Jane Austen", correct: false },
        { option: "Leo Tolstoy", correct: false },
        { option: "Charles Dickens", correct: false }
        ]
        },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            {option: "Mars", correct: true},
            {option: "Venus", correct: false},
            {option: "Jupiter", correct: false},
            {option: "Mercury", correct: false}
        ]
        },
    {
        question: "What is the capital of France?",
        answers: [
            { option: "Paris", correct: true },
            { option: "London", correct: false },
            { option: "Berlin", correct: false },
            { option: "Madrid", correct: false }
        ]
        },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { option: "Earth", correct: false },
            { option: "Mars", correct: false },
            { option: "Jupiter", correct: true },
            { option: "Saturn", correct: false }
        ]
        },
    {
            question: "In which year did the Titanic sink?",
            answers: [
            { option: "1907", correct: false },
            { option: "1912", correct: true },
            { option: "1923", correct: false },
            { option: "1931", correct: false }
            ]
        },
    {
            question: "Who painted the Mona Lisa?",
            answers: [
            { option: "Vincent van Gogh", correct: false },
            { option: "Leonardo da Vinci", correct: true },
            { option: "Pablo Picasso", correct: false },
            { option: "Michelangelo", correct: false }
            ]
        },
    {
            question: "What is the largest organ in the human body?",
            answers: [
            { option: "Brain", correct: false },
            { option: "Liver", correct: false },
            { option: "Skin", correct: true },
            { option: "Heart", correct: false }
            ]
        },
    {
            question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
            answers: [
            { option: "Oxygen", correct: false },
            { option: "Carbon dioxide", correct: true },
            { option: "Nitrogen", correct: false },
            { option: "Hydrogen", correct: false }
            ]
        },
    {
            question: "What is the chemical symbol for gold?",
            answers: [
                { option: "Go", correct: false },
                { option: "Gd", correct: false },
                { option: "Au", correct: true },
                { option: "Ag", correct: false }
            ]
        },
    {
            question: "In which country did the Renaissance originate?",
            answers: [
                { option: "Italy", correct: true },
                { option: "France", correct: false },
                { option: "England", correct: false },
                { option: "Spain", correct: false }
            ]
        },
    {
            question: "Which gas makes up the majority of Earth's atmosphere?",
            answers: [
                { option: "Carbon Dioxide", correct: false },
                { option: "Oxygen", correct: false },
                { option: "Nitrogen", correct: true },
                { option: "Hydrogen", correct: false }
            ]
        },
    {
            question: "What is the capital of Japan?",
            answers: [
                { option: "Beijing", correct: false },
                { option: "Seoul", correct: false },
                { option: "Tokyo", correct: true },
                { option: "Bangkok", correct: false }
            ]
        },
    {
            question: "Who is known as the 'Father of Modern Physics'?",
            answers: [
                { option: "Isaac Newton", correct: false },
                { option: "Albert Einstein", correct: true },
                { option: "Galileo Galilei", correct: false },
                { option: "Niels Bohr", correct: false }
            ]
        }                   
]

// Select HTML elements for interaction
const start = document.querySelector(".start"); // "Start" button
const container = document.querySelector(".container"); // Quiz container
const question = document.querySelector(".question"); // Question display
const answersContainer = document.querySelector(".answersContainer"); // Answer options display
const next = document.querySelector(".next"); // "Next" button
const scoreDisplay = document.querySelector(".scoreDisplay"); // Score display

// Initialize variables to keep track of quiz progress and score
let currentIndex = 0; // Index of the current question
let score = 0; // User's score
let questionsLength = 5; // Number of questions in a quiz session

// Event listener for the "Start" button
start.addEventListener("click", () => {
    // Hide the "Start" button and show the quiz container
    start.style.display = "none";
    container.style.display = "flex";
    startQuiz();
});

// Function to start the quiz
function startQuiz() {
    // Randomize and select a set of questions for this quiz session
    questions = questions.sort(() => Math.random() - 0.3).splice(0, 5);

    // Disable the "Next" button initially and display the first question
    next.setAttribute("disabled", true);
    showQuestion();
}


// Function to display the current question and answer options
function showQuestion() {
    next.innerHTML = "Next"; // Set the "Next" button text
    next.style.background = "gray"; // Set the "Next" button background color

    // Get the current question object
    let currentQuestion = questions[currentIndex];

    if (currentIndex + 1 === questionsLength) {
        next.innerHTML = "Show result"; // Change button text for the last question
    }

    if (!currentQuestion) {
        showResult(); // If there are no more questions, show the user's score
    } else {
        // Display the current question and answer options
        question.innerHTML = currentQuestion.question;
        scoreDisplay.innerHTML = `${currentIndex + 1} of ${questionsLength} Questions`;

        // Create answer buttons for the question and set event listeners
        currentQuestion.answers.forEach((item) => {
            answersContainer.innerHTML += `<button class="answer" data-list="${item.correct}">${item.option}</button>`;
            let buttons = document.querySelectorAll(".answer");
            buttons.forEach((button) => {
                button.addEventListener("click", select);
            });
        });
    }
}


// Function to handle user answer selection
function select(e) {
    let buttons = document.querySelectorAll(".answer");

    if (e.currentTarget.getAttribute("data-list") === "true") {
        // If the selected answer is correct, highlight it in green and increment the score
        e.currentTarget.style.background = "green";
        score++;
    } else {
        // If the selected answer is incorrect, highlight it in red, and highlight the correct answer in green
        buttons.forEach((button) => {
            if (button.getAttribute("data-list") === "true") {
                button.style.background = "green";
            } else {
                e.currentTarget.style.background = "red";
            }
        });
    }

    // Disable all answer buttons and enable the "Next" button for the next question
    buttons.forEach((item) => {
        item.setAttribute("disabled", true);
    });

    next.style.cursor = "pointer";
    next.style.background = "blue";
    next.removeAttribute("disabled");
}
// Event listener for the "Next" button
next.addEventListener("click", () => {
    if (next.style.background === "blue") {
        currentIndex++;
        answersContainer.innerHTML = ""; // Clear answer options
        showQuestion(); // Display the next question
    }
    return;
});

// Function to display the quiz result
function showResult() {
    const result = document.querySelector(".result");
    const response = document.querySelector(".response");
    const playAgain = document.querySelector(".playAgain");
    const quit = document.querySelector(".quit");

    // Hide the quiz container and show the result container
    container.style.display = "none";
    result.style.display = "block";

    // Display the user's score and provide options to play again or quit
    response.innerHTML = `Your score is ${score} out of ${questionsLength}`;

    // Event listeners for "Play Again" and "Quit" buttons
    playAgain.addEventListener("click", () => location.reload());
    quit.addEventListener("click", () => (result.style.display = "none"));
}