const section = document.querySelector('section');
const playerLivesCount = document.querySelector('.playerLiveCount');
let playerLives = 3;

playerLivesCount.textContent = playerLives;

const getData = () => [
    {imgSrc: "./img/card.png", name: "card"},
    {imgSrc: "./img/nike.jpg", name: "nike"},
    {imgSrc: "./img/rock.jpg", name: "rock"},
    {imgSrc: "./img/sneakers.png", name: "sneakers"},
    {imgSrc: "./img/card.png", name: "card"},
    {imgSrc: "./img/nike.jpg", name: "nike"},
    {imgSrc: "./img/rock.jpg", name: "rock"},
    {imgSrc: "./img/sneakers.png", name: "sneakers"},
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;

}
//Card generator function
const cardGenerator = () => {
    const cardData = randomize();

    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');

        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';

        face.src = item.imgSrc;
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.setAttribute('name', item.name);
        card.addEventListener('click', (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });


}

//Check card
const checkCards = (e) => {
    const clickCard = e.target;
    clickCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    //Logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') ===
            flippedCards[1].getAttribute('name')) {
            console.log("match");
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        } else {
            console.log("noope");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);

            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart();
            }
        }
    }

};

//Restart

const restart = () => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");

        setTimeout(() => {

            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 3;
    playerLivesCount.textContent = playerLives;
}

cardGenerator();
