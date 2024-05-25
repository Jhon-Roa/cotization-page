import { LitElement, css, html } from "lit";
import { valid } from "./final-page";

const client = {};

const apiUrl = import.meta.env.VITE_API_URL;

export class FormElement extends LitElement {
  static styles = css`
    .form {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .form-cliente {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #514d4a;
      width: 40%;
      max-width: 500px;
      height: 35%;
      min-height: 300px;
      padding: 3% 1%;
      border: #787672 solid 1px;
      border-radius: 25px;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.8);
    }

    .form-input,
    .form-label {
      margin: 0 20%;
      text-align: left;
    }

    .form-input {
      margin-bottom: 3%;
      height: 10%;
      border-radius: 10px;
      border: solid 1px;
      padding-left: 3%;
      padding: 2% 1%;
    }

    .form-button {
      margin-top: 2%;
      align-self: center;
      position: relative;
      display: inline-block;
      max-width: 100%;
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
      font-size: 15px;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      overflow: hidden;
      width: 30%;
      height: 15%;
    }

    @media (orientation: portrait) {
      .form-cliente {
        width: 90%;
      }
    }
  `;

  render() {
    return html`
      <div class="form" id="form" @click=${this.exitForm}>
        <form @submit=${this.handlerForm} class="form-cliente">
          <label for="name" class="form-label">name: </label>
          <input
            type="text"
            name="name"
            id="name"
            class="form-input"
            placeholder="Jhon Ramirez"
            required
          />

          <label for="lastName" class="form-label">lastName: </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            class="form-input"
            placeholder="Roa lopez"
            required
          />

          <label for="email" class="form-label">email: </label>
          <input
            type="email"
            name="email"
            id="email"
            class="form-input"
            placeholder="example@gmail.com"
            required
          />

          <button type="submit" class="form-button">enviar</button>
        </form>
      </div>
    `;
  }

  exitForm(event) {
    const elementToRemove = event.target;

    if (elementToRemove.id === "form") {
      elementToRemove.remove();
    }
  }

  handlerForm(event) {
    event.preventDefault();

    const clientBasicInfo = new FormData(event.target);
    client["name"] = clientBasicInfo.get("name");
    client["email"] = clientBasicInfo.get("email");
    client["lastName"] = clientBasicInfo.get("lastName");
    (client["date"] = new Date().toISOString()), (client["info"] = producto);
    console.log(client);

    this.postMethod(client);

    valid.valid = false;
    valid.clase = "inactive";

    let elementToDelete = this.shadowRoot.querySelector(".form");
    elementToDelete.remove();
  }

  async postMethod(client) {
    try {
      const response = await fetch(`${apiUrl}/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
}

customElements.define("form-element", FormElement);
