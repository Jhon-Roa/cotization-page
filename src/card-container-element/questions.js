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
      font-size: 20px
    }

    .card:hover {
      background-color: #514D4A;
      transform: translateY(-5%);
      transition: 200ms linear;
    }

    .card > img {
      width: 60%;
    }

    .card > p {
      text-align: center;
      font-weight: 400;
    }

    @media screen and (min-width: 678px) {
      .down > h1 {
        font-size: 32px;
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
          <div class="card-container" style="${this.getStyle()}">
            ${this.printCard()}
          </div>
        </div>
      </div>
    `;
  }

  getStyle() {
    const pagActual = this.counter;
    if (cardInfo[pagActual].cards.length === 4) {
      return `
        display: grid;
        grid-template-columns: repeat(4, 20%);
        justify-content: center;
        width: 100%;
        column-gap: 1%;
        padding: 0 10%;
        box-sizing: border-box;
      `;
    } else if (cardInfo[pagActual].cards.length === 3){
      return `
        display: grid;
        grid-template-columns: repeat(3, 30%);
        justify-content: center;
        width: 100%;
        column-gap: 1%;
        padding: 0 10%;
        box-sizing: border-box;
      `;
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
          <div class="card" @click='${() => this.handlerCardClick(index)}' style='
          margin: 0 1%;
          padding: 0 2%;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-height: 30vh;
          min-height: 30vh;'>
            <img src="${card[0]}" alt="" />
            <p>${card[1]}</p>
          </div>
        `;
      });
    } else if (cardInfo[this.counter].cards.length === 3) {
      return cardInfo[this.counter].cards.map((card, index) => {
        return html`
          <div class="card" @click='${() => this.handlerCardClick(index)}' style='
          margin: 0 1%;
          padding: 0 2%;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-height: 30vh;
          min-height: 30vh;'>
            <img src="${card[0]}" alt="" style='width: 50%'/>
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
    indexTop.insertAdjacentHTML('afterbegin', `
        <questions-element counter=${this.counter}></questions-element>
    `)
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