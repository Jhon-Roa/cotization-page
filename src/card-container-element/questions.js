import { LitElement, css, html } from "lit";
import { cardInfo } from "../../data/cardsInfo.js";

let extractedCardInfo = null
let multiplicador = null
let precio = 0
let precioDelete = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let producto = new Object();

export class Questions extends LitElement {
  static styles = css`

    .index-main-top {
      width: 100%;
      height: 100vh;
    }

    .top {
      padding: 1.5em;
      display: flex;
      justify-content: center;
      position: relative;
    }

    .anterior {
      position: absolute;
      left: 5%;
      font-weight: 400;
      cursor: pointer;
    }
    
    .precio {
      position: absolute;
      right: 5%;
    }

    .down {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 80%;
    }

    .down > h1 {
      margin: 1% 0;
      text-align: center;
      font-size: 20px;
      margin-bottom: 2.5%;
    }

    .card:hover {
      background-color: #514D4A;
      transform: translateY(-5%);
      transition: 200ms linear;
    }

    .four-cards-container, .three-cards-container {
      display: grid;
      width: 100%;
      column-gap: 1%;
      padding: 0;
      box-sizing: border-box;
      padding: 0 2%
    }

    .four-cards, .three-cards {
      display: flex;
      width: 100%;
      height: 12.5vh;'
    }
    
    }

    .card > p {
      text-align: center;
      font-weight: 400;
      align-self: center;
      margin-left: 5%;
    }


    @media screen and (min-width: 678px) and (max-width: 990px) {
      .down > h1 {
        font-size: 32px;
      }
      .four-cards-container, .three-cards-container{
        justify-content: center;
        padding: 0 0%
      }
      .three-cards-container, .four-cards-container {
        grid-template-columns: 45% 45%;
      }
      .three-cards-container>div:nth-child(3) {
        grid-column: span 2;
        justify-self: center;
        width: 50%;
      }
    }

    @media screen and (min-width: 990px) {
      .four-cards, .three-cards {
        flex-direction: column;
        justify-content: center;
        max-height: 30vh;
        min-height: 30vh;
      }
      .four-cards-container {
        grid-template-columns: repeat(4, 22,5%);
        width: 100%
      }
      .three-cards-container {
        grid-template-columns: repeat(3, 30%);
        width: 100%;
        justify-content: center;
      }
      .three-cards>img  {
        width: 50%;
        height: auto
      }
    }
  `;

  static properties = {
    counter: { type: Number },
  };

  constructor() {
    super();
    this.counter = 0;
  }

  render() {
    return html`
      <div class="index-main-top">
        <div class="top">
          ${this.validacionAnterior()}
          <span>${this.counter + 1}/10</span>
          <span class='precio'>${this.validacionPrecio()}<span>
        </div>
        <div class="down">
          <h1>${cardInfo[this.counter].question}</h1>
          <div class="card-container ${this.getClass()}">
            ${this.printCard()}
          </div>
        </div>
      </div>
    `;
  }

  getClass() {
    if (cardInfo[this.counter].cards.length === 4) {
      return `four-cards-container`
    } else if (cardInfo[this.counter].cards.length === 3) {
      return `three-cards-container`
    } else if (cardInfo[this.counter].cards.length === 5) {
      return `five-cards-container`
    }
  }

  validacionAnterior() {
    if (this.counter !== 0) {
      return html`
        <span @click='${() => this.cargarAnterior()}' class="anterior">anterior</span>
      `;
    } else {
      return ``;
    }
  }

  validacionPrecio() {
    if (this.counter >= 2) {
      return `${precio}`
    } else {
      return ``
    }
  }

  handlerCardClick(index) {
    extractedCardInfo = cardInfo[this.counter].cards[index];
    if (this.counter === 0) {
      multiplicador = extractedCardInfo[2]
      console.log(multiplicador)
    } else {
      precio +=  extractedCardInfo[2] * multiplicador
      precioDelete[this.counter] = extractedCardInfo[2] * multiplicador 
      console.table(precioDelete)
    } 

    producto[cardInfo[this.counter].question] = extractedCardInfo[1];
    producto["precio"] = precio;


    console.log(producto)
    
    this.counter++

    this.cargarSiguiente()
  }

  printCard() {
    if (cardInfo[this.counter].cards.length === 4) {
      return cardInfo[this.counter].cards.map((card, index) => {
        return html`
          <div class="card four-cards" @click='${() => this.handlerCardClick(index)}'>
            <img src="${card[0]}" alt="" style='height: 100%' />
            <p>${card[1]}</p>
          </div>
        `;
      });
    } else if (cardInfo[this.counter].cards.length === 3) {
      return cardInfo[this.counter].cards.map((card, index) => {
        return html`
          <div class="card three-cards" @click='${() => this.handlerCardClick(index)}'>
            <img src="${card[0]}" alt="" style='height: 100%'/>
            <p>${card[1]}</p>
          </div>
        `;
      });
    }
  }

  cargarSiguiente() {
    const elementToRemove = document.querySelector('questions-element')
    const indexTop = document.getElementById('body')

    elementToRemove.remove()
    if (this.counter <= 9) {
      indexTop.insertAdjacentHTML('afterbegin', `
      <questions-element counter=${this.counter}></questions-element>
      `)
    } else {
      indexTop.insertAdjacentHTML('afterbegin', `
      <h1>${precio}</h1>
      `)
    }
  }

  cargarAnterior() {
    this.counter --

    if (this.counter >= 1) {
      precio -= precioDelete[this.counter]
    }

    const elementToRemove = document.querySelector('questions-element')
    const indexTop = document.getElementById('body')

    elementToRemove.remove()
    indexTop.insertAdjacentHTML('afterbegin', `
        <questions-element counter=${this.counter}></questions-element>
    `)
  }
}

customElements.define("questions-element", Questions);