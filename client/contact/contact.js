window.onload = () => {
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
};

function verify(data) {
  grecaptcha
    .execute("6LcbiuIUAAAAAHI5QSoY5HNdSs_I-QQ8q6ZUqnAf", { action: "homepage" })
    .then(token => {
      data.captcha = token;
      sendMessage(data);
    });
}

function sendMessage(data) {
  fetch("http://localhost:4000/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(() => {
      window.location.href = "http://localhost:4000/";
      name.value = "";
      email.value = "";
      message.value = "";
    })
    .catch(err => console.error(error));
}
