import { load } from 'recaptcha-v3';

import "../scripts/cursor";
import "../scripts/nav";
import registerSW from "../scripts/swRegistration";
import { hostname } from "../config";

import "./contact.scss";
import "../font/font.scss";

window.addEventListener("DOMContentLoaded", init);

registerSW();

function init() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const form = document.querySelector(".form");

  form.addEventListener("submit", handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    const messageData = {
      name: name.value,
      email: email.value,
      message: message.value
    };

    verify(messageData);
  }

  function verify(data) {

    load("6LcbiuIUAAAAAHI5QSoY5HNdSs_I-QQ8q6ZUqnAf")
      .then((recaptcha) => {
        recaptcha.execute("homepage").then((token) => {
            data.captcha = token;
            sendMessage(data);
          })
      })
      .catch(err => console.error(err));
  }
  
  function sendMessage(data) {
    fetch(`${hostname}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        window.location.href = "/";
        name.value = "";
        email.value = "";
        message.value = "";
      })
      .catch(err => console.error(err));
  }
}




