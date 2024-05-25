import { LitElement, css, html } from "lit";
import { precioAMostrar } from "./questions";


export let valid = {
  valid: true,
  clase: 'active'
}

export class finalPage extends LitElement {
    static styles = css`
    .index-main-top {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 960px;
        text-align: center;
        position: relative;
      }
      
      p {
        margin: 0;
        font-size: 14px;
        margin-bottom: 20px;
      }
      
      h3 {
        font-size: 16px;
        margin: 0;
      }
      
      h2 {
        font-size: 20px;
        margin-bottom: 0;
      }
      
      h1 {
        font-size: 40px;
        margin: 0;
        margin-bottom: 20px;
      }
      
      button {
        position: relative;
        display: inline-block;
        max-width: 100%;
        margin: 0.5em 0;
        padding: 1em 3em;
        border: 0;
        border-radius: 5px;
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

      .active {
        background-image: linear-gradient(to left, #14e6d3, #8660f5);
      }

      .inactive {
        background-image: linear-gradient(to left, #fff, #000);
      }

      .reinicio {
        position: absolute;
        left: 0;
        top: 2%;
        cursor: pointer;
      }
      
      @media screen and (min-width: 678px) {
        p {
          font-size: 16px;
        }
        h3 {
          font-size: 20px;
        }
        h2 {
          font-size: 32px;
        }
        h1 {
          font-size: 80px;
        }
      }
      
      .weigth {
        font-weight: 700;
      }
      
      .color {
        color: #14e2cd;
      }
      
      .form-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
  
    `
    static properties = {
      local: {type:String}
    }

    constructor () {
      super();
      this.local= valid.clase
    }

    render() {
        return html`
        <div class="index-main-top">
        <p class="reinicio" @click=${this.reiniciarPage} >←volver a empezar</p>
        <p>bien hecho, hemos terminado</p>
        <h3>¡compartenos si te ha gustado!</h3>
        <h2>El costo estimado de tu app es</h2>
        <h1 class="color">${precioAMostrar} cop</h1>
        <p>En Yeeply seleccionamos los mejores <span class="weigth">desarrolladores de apps y webs</span> para tu proyecto.
          Publica tu proyecto en Yeeply o mira algunos de nuestros <span class="color">casos de éxito.</span> </p>
        <button @click=${this.insertForm} class='${valid.clase}' id='button'>crea tu proyecto</button>
      </div>
        `
    }

    reiniciarPage() {
        location.reload()
    }

    insertForm() {
      if (valid.valid) {
        const indexTop = this.shadowRoot.querySelector('.index-main-top');

        indexTop.insertAdjacentHTML("beforeend",`
            <form-element class='form-wrapper' ></form-element>
          `
        );
      }
    }

    
}

customElements.define("final-page", finalPage);
