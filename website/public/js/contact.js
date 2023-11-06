function submitForm() {
  const nameValue = document.getElementsByName("name")[0].value;
  const emailValue = document.getElementsByName("email")[0].value;
  const messageValue = document.getElementsByName("message")[0].value;

  fetch("/feedback", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameValue,
      email: emailValue,
      feedback: messageValue,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      const { success, message } = res;

      const msg = document.getElementById("msg");
      msg.textContent = message;

      if (!success) {
        msg.classList.remove(...msg.classList);
        msg.classList.add("red");
      } else {
        msg.classList.remove(...msg.classList);
        msg.classList.add("green");
      }

      msg.style.display = "block";

      // reset the form
      document.getElementsByName("name")[0].value = "";
      document.getElementsByName("email")[0].value = "";
      document.getElementsByName("message")[0].value = "";
    })
    .catch(() => {
      msg.classList.remove(...msg.classList);
      msg.classList.add("green");
      msg.style.display = "block";
      msg.textContent = "An unknown error occurred. Please try again.";
    });
}
