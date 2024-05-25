import { LitElement, css, html } from "lit";


export class IndexStart extends LitElement {
  static styles = css`
    .index-main-top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      height: 100vh;
    }

    h1 {
      font-size: 28px;
      text-align: center;
    }

    .index-image {
      width: auto;
      height: auto;
      max-width: 400px;
      max-height: 30vh;
    }

    button {
      position: relative;
      display: inline-block;
      max-width: 100%;
      margin: 0.5em 0;
      padding: 1em 3em;
      border: 0;
      border-radius: 5px;
      background-image: linear-gradient(to left, #14e6d3, #8660f5);
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
      color: #fff;
      line-height: 1.42857143;
      text-align: center;
      text-decoration: none;
      white-space: nowrap;
      font-family: sans-serif;
      font-size: 20px;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      overflow: hidden;
    }

    button::after {
      position: absolute;
      content: "";
      top: 0;
      left: -150%;
      bottom: 0;
      width: 50%; /* Hacer que el rayo sea más fino */
      background-image: linear-gradient(
        to left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.4) 50%,
        /* Hacer el rayo más brillante en el centro */ rgba(255, 255, 255, 0)
          100%
      );
      opacity: 0;
      transform: skew(-15deg);
    }

    @keyframes shine {
      0% {
        left: -150%;
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        left: 150%;
        opacity: 0;
      }
    }

    button:hover::after {
      animation: shine 1s linear;
    }

    .theme-dark .button {
      color: #fff;
      background-image: linear-gradient(to left, #7a56f4, #14e2cd);
    }

    .title {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
      text-align: center;
    }

    .subtitle {
      margin-top: 0;
      font-family: sans-serif;
      font-size: 16px;
      line-height: 1.3;
      text-align: center;
    }

    @media screen and (min-width: 678px) {
      h1 {
        font-size: 50px;
        font-family: sans-serif;
      }
    }
  `;

  static properties = {};

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="index-main-top">
        <img src="./images/index-image.png" alt="" class="index-image" />
        <h1 class="title">
          ¿cuanto cuesta desarrollar mi <span style="color: #14e2cd">app</span>?
        </h1>
        <p class="subtitle">
          Calcula de forma rápida el costo para crear tu app, contestando estas
          sencillas preguntas.
        </p>
        <span @click=${this.startProgram}>
          <button class="index-button">empezar</button>
        </span>
      </div>
    `;
  }

  startProgram() {
    const elementToDelete = document.querySelector("index-start");
    const indexTop = document.getElementById("body");

    elementToDelete.remove();
    indexTop.insertAdjacentHTML(
      "afterbegin",
      `
        <questions-element></questions-element>
    `
    );
  }
}

customElements.define("index-start", IndexStart);
