const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progress-bar");

let pseudo, email, password, confirmP;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const pseudoChecker = (value) => {
  if (value.length < 3 || value.length > 20) {
    errorDisplay("pseudo", "Pseudo must comprise 3 to 20 characters");
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9-_.]*$/)) {
    errorDisplay("pseudo", "Pseudo can't include special characters");
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Please insert a valid email");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const passwordChecker = (value) => {
  progressBar.classList = "";
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "Min. 8 characters, one Capital, one small, one number and 1 special character"
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("password", "", true);
    password = value;
  } else {
    progressBar.classList.add("progressGreen");
    errorDisplay("password", "", true);
    password = value;
  }

  if (confirmP) confirmChecker();
};

const confirmChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirm", "Passwords not matching");
    confirmP = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmP = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pseudo && email && password && confirmP) {
    const data = {
      pseudo,
      email,
      password,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));

    pseudo = null;
    email = null;
    password = null;
    confirmP = null;
    alert("Inscription validée !");
  } else {
    alert("Please fill all fields correctly");
  }
});
