const images = [
    { id: 1, src: "images/1.jpg" },
    { id: 2, src: "images/2.jpg" },
    { id: 3, src: "images/3.jpg" },
    { id: 4, src: "images/4.jpg" },
    { id: 5, src: "images/5.jpg" },
    { id: 6, src: "images/6.jpg" },
    { id: 1, src: "images/1.jpg" },
    { id: 2, src: "images/2.jpg" },
    { id: 3, src: "images/3.jpg" },
    { id: 4, src: "images/4.jpg" },
    { id: 5, src: "images/5.jpg" },
    { id: 6, src: "images/6.jpg" },
]




const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(images)


const right_side = document.querySelector(".right-side")
const moves = document.getElementById("moves")
const misses = document.getElementById("misses")
const score = document.getElementById("score")


const resultScreen = document.querySelector(".result-screen")
const winLose = document.querySelector(".win-lose")

const playAgainBtn = document.querySelector(".play-again-btn")

const startGameBtn = document.querySelector(".start-game-btn")

const startGameScreen = document.querySelector(".start-game")



playAgainBtn.addEventListener("click", () => {
    location.reload()
})


const renderFunction = () => {

    let movesCounter = 0;
    let missesCounter = 0;
    let scoreCounter = 0

    images.map((ele) => {
        const image_container = document.createElement("div")
        image_container.classList.add("image-container")

        const card = document.createElement("div")
        card.classList.add("card")
        card.classList.add("flipped")
        card.id = ele.id

        setTimeout(() => {
            card.classList.remove("flipped")
        }, 3000);

        const front_card = document.createElement("div")
        front_card.classList.add("front-card")
        front_card.id = ele.id

        const back_card = document.createElement("div")
        back_card.classList.add("back-card")
        const image = document.createElement("img")
        image.src = ele.src
        back_card.append(image)
        card.append(front_card)
        card.append(back_card)
        image_container.append(card)
        right_side.append(image_container)


        front_card.addEventListener("click", function () {
            card.classList.add("flipped")

            const flipped = document.querySelectorAll(".flipped")

            if (flipped.length === 2) {
                if (flipped[0].id !== flipped[1].id) {
                    const failAudio = document.getElementById("fail")
                    failAudio.volume = 0.1
                    failAudio.play()

                    setTimeout(() => {
                        flipped[0].classList.remove("flipped")
                        flipped[1].classList.remove("flipped")
                    }, 500);


                    missesCounter++
                    misses.innerText = missesCounter


                } else {
                    const successAudio = document.getElementById("success")
                    successAudio.play()
                    successAudio.volume = 0.3


                    flipped[1].classList.add("hidden")
                    flipped[0].classList.add("hidden")


                    setTimeout(() => {
                        const flipped = document.querySelectorAll(".flipped")

                        flipped[0].classList.remove("flipped")
                        flipped[1].classList.remove("flipped")
                        const hidden = document.querySelectorAll(".hidden")


                        if (hidden.length == images.length) {
                            const h1 = document.querySelector(".win-lose-h1")
                            const p = document.querySelector(".win-lose-p")


                            if (scoreCounter > 0) {
                                const audio = document.getElementById("background-audio");
                                audio.pause();


                                const successAudio = document.getElementById("success-audio")
                                successAudio.volume = 0.2
                                successAudio.play()


                                resultScreen.classList.add("visible")
                            } else {
                                const audio = document.getElementById("background-audio");
                                audio.pause();

                                h1.innerHTML = "OMG"
                                p.innerHTML = "You lose"
                                resultScreen.classList.add("visible")
                            }
                        }

                    }, 500);
                    movesCounter++
                    moves.innerText = movesCounter
                }
            }
            scoreCounter = movesCounter - missesCounter
            score.innerText = scoreCounter
        })
    })
}



const startGame = () => {

    startGameBtn.addEventListener("click", () => {
        const audio = document.getElementById("background-audio");
        audio.volume = 0.1
        audio.play();
        startGameScreen.remove()
        renderFunction()
    })
}

startGame()




