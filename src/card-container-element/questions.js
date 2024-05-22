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
      height: 85%;
    }

    .down > h2 {
      margin: 1% 0;
      text-align: center;
      margin-bottom: 1.5%;
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

    .card > p {
      text-align: center;
      font-weight: 400;
      align-self: center;
      margin-left: 5%;
    }

    .card>img {
      height: 100%
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
      .down > h2 {
        font-size: 32px;
      }
      .four-cards, .three-cards {
        flex-direction: column;
        justify-content: center;
        max-height: 22.5vh;
        min-height: 22.5vh;
        align-items: center;
      }
      .four-cards-container {
        grid-template-columns: repeat(4, 225px);
        width: 100%;
        justify-content: center;
        padding: 0 10%;
        gap: 1%
      }
      .three-cards-container {
        grid-template-columns: repeat(3, 315px);
        width: 100%;
        justify-content: center;
        padding: 0 10%;
        gap: 1%
      }
      .three-cards>img  {
        width: 50%;
        height: auto
      }
      .four-cards>img  {
        width: 65%;
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
          <h2>${cardInfo[this.counter].question}</h2>
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
    let precioAMostrar

    if (this.counter >= 2) {
      precioAMostrar= `${precio.toLocaleString('es')}`
      return `${precioAMostrar} cop`
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
            <img src="${card[0]}" alt="" />
            <p>${card[1]}</p>
          </div>
        `;
      });
    } else if (cardInfo[this.counter].cards.length === 3) {
      return cardInfo[this.counter].cards.map((card, index) => {
        return html`
          <div class="card three-cards" @click='${() => this.handlerCardClick(index)}'>
            <img src="${card[0]}" alt=""/>
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