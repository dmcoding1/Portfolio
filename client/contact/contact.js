window.onload = () => {

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const form = document.querySelector(".form");

  form.addEventListener("submit", sendMessage);

  function sendMessage(e) {
    e.preventDefault();

    const messageData = {
      name: name.value,
      email: email.value,
      message: message.value
    };

    fetch("http://localhost:4000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageData)
    })
      .then(() => {
        window.location.href = "http://localhost:4000/"
        name.value = "";
        email.value = "";
        message.value = "";
      })
      .catch(err => console.error(error));
  }
};
