// 1 = Ás, 11 = Valete, 12 = Rainha, 13 = Rei

type Suit = "diamonds" | "clubs" | "spades" | "hearts";
type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

let listOfSuits: Suit[] = ["diamonds", "clubs", "spades", "hearts"];
let listOfValues: CardValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];


class Card {
    suit: Suit
    value: CardValue

    constructor(value: CardValue, suit: Suit) {
        this.suit = suit
        this.value = value
    }

    stringify(){
        switch(this.value){
            case 1:
                return `Ace of ${this.suit}`
            case 11:
                return `Jack of ${this.suit}`
            case 12:
                return `Queen of ${this.suit}`
            case 13:
                return `King of ${this.suit}`
            default:
                return `${this.value} of ${this.suit}`
        }
    }
}

class Deck {
    deck: Card[]

    constructor() {
        this.deck = []
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 12; j++) {
                let card: Card = new Card(listOfValues[j], listOfSuits[i])
                this.deck.push(card)
            }
        }
    }

    shuffle() {
        let auxDeck = []
        let aux = this.deck.length
        let heldCard
        while (aux >= 1) {
            let chosenIndex = Math.floor(Math.random() * aux)
            heldCard = this.deck[chosenIndex]
            aux--
            this.deck.splice(chosenIndex, 1)
            auxDeck.push(heldCard)
        }
        this.deck = auxDeck
    }

    topDeck(amount: number) {
        let drawnCards = []
        for (let i = 0; i < amount; i++) {
            let card = this.deck.pop()
            if (card) { drawnCards.push(card) }
        }
        return drawnCards
    }

    cheat() {
        let counter = 1
        this.deck.forEach((seenCard) => {
            console.log(`${counter}: ${seenCard.stringify()}`)
            counter++
        })
    }
}

class Board {
    deck: Deck
    room: (Card | null)[]

    constructor(deck: Deck) {
        this.deck = deck;
        this.room = deck.topDeck(4);
    }

    pickOne(position: 0 | 1 | 2 | 3) {
        let toReturn = this.room[position]
        this.room[position] = null
        return toReturn
    }

    refillRoom() {
        let emptySlots = 0
        this.room.forEach((item) => {
            if (item == null) {
                emptySlots++
            }
        })
        this.room.sort((a, b) => {
            if (a === null && b !== null) return 1
            if (a !== null && b === null) return -1
            return 0
        })
        for (let i = 0; i < emptySlots; i++) {
            this.room.pop()
        }
        let newCards: Card[]
        newCards = this.deck.topDeck(emptySlots)
        newCards.forEach((item) => { this.room.push(item) })
    }
}

class Hand {
    weapon: (Card | null);
    cap: (number | null);

    constructor(){
        this.weapon = null;
        this.cap = null;
    }

    equipWeapon(weaponCard: Card){
        this.weapon = weaponCard
        this.cap = weaponCard.value
    }

    useWeapon(enemyCard: Card){
        if (this.cap === null || enemyCard.value >= this.cap){
            return false
        }
        this.cap = enemyCard.value
        return true
    }
}

let drawPile = new Deck()
drawPile.shuffle()
drawPile.cheat()
console.log(drawPile.topDeck(4))
drawPile.cheat()

// provavelmente devia ser o construtor
// function createDeck() {
//     let listOfSuits: Suit[] = ["diamonds", "clubs", "spades", "hearts"];
//     let listOfValues: CardValue[] = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
//     let deck = []
//     for (let i = 0; i <= 3; i++) {
//         for (let j = 0; j <= 12; j++) {
//             let card: Card = new Card(listOfValues[j], listOfSuits[i])
//             deck.push(card)
//         }
//     }
//     return deck
// }