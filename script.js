const form1 = document.getElementById("signupForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const newEmail = document.getElementById("newEmail");
const reEmail = document.getElementById("reEmail");
const newPassword = document.getElementById("newPassword");
const rePassword = document.getElementById("rePassword");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const reEmailError = document.getElementById("reEmailError");
const passwordError = document.getElementById("passwordError");
const passwordStrength = document.getElementById("passwordStrength");
const rePasswordError = document.getElementById("rePasswordError");

const form2 = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const keepSignIn = document.getElementById("keepSignIn");

const loginUsernameError = document.getElementById("loginUsernameError");
const loginPasswordError = document.getElementById("loginPasswordError");

//client side validation for form1 sign up
document.querySelectorAll(".error, .strength").forEach((el) => {
  el.style.display = "none";
});

firstName.addEventListener("input", () => {
  if (firstName.value.length < 3) {
    firstNameError.style.display = "block";
    firstNameError.textContent = "First name must be at least 3 characters.";
  } else {
    firstNameError.style.display = "none";
  }
});

lastName.addEventListener("input", () => {
  if (lastName.value.length < 3) {
    lastNameError.style.display = "block";
    lastNameError.textContent = "Last name must be at least 3 characters.";
  } else {
    lastNameError.style.display = "none";
  }
});

newEmail.addEventListener("input", () => {
  if (!newEmail.value.includes("@")) {
    emailError.style.display = "block";
    emailError.textContent = "Invalid email address.";
  } else {
    emailError.style.display = "none";
  }
});

reEmail.addEventListener("input", () => {
  if (reEmail.value !== newEmail.value) {
    reEmailError.style.display = "block";
    reEmailError.textContent = "Emails do not match.";
  } else {
    reEmailError.style.display = "none";
  }
});

newPassword.addEventListener("input", () => {
  const password = newPassword.value;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLower = /[a-z]/.test(password);

  passwordStrength.style.display = "block";
  let strength = "";
  let suggestions = [];

  if (password.length < 8) {
    strength = "Too weak ❌";
    passwordStrength.style.color = "red";
    suggestions.push("Use at least 8 characters");
  } else if (hasUpper && hasSymbol && hasNumber && hasLower) {
    strength = "Strong ✅";
    passwordStrength.style.color = "green";
  } else {
    strength = "Not strong enough ⚠️";
    passwordStrength.style.color = "orange";
    if (!hasUpper) suggestions.push("Add an uppercase letter");
    if (!hasSymbol) suggestions.push("Add a special symbol (e.g. @, #, !)");
    if (!hasNumber) suggestions.push("Add a number");
    if (!hasLower) suggestions.push("Add a lowercase letter");
  }

  // Combine message + suggestions
  passwordStrength.textContent = `${strength}${
    suggestions.length ? " – " + suggestions.join(", ") : ""
  }`;
});

rePassword.addEventListener("input", () => {
  if (rePassword.value !== newPassword.value) {
    rePasswordError.style.display = "block";
    rePasswordError.textContent = "Passwords do not match.";
  } else {
    rePasswordError.style.display = "none";
  }
});

form1.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    firstName.value.length < 3 ||
    lastName.value.length < 3 ||
    !newEmail.value.includes("@") ||
    newEmail.value !== reEmail.value ||
    newPassword.value.length < 8 ||
    !/[A-Z]/.test(newPassword.value) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword.value) ||
    newPassword.value !== rePassword.value
  ) {
    alert("Please correct all errors before submitting.");
    return;
  }

  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: newEmail.value,
    password: newPassword.value,
  };

  fetch("signup.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "success") {
        alert("Sign up successful!");
        console.log("✅ Server response:", data);
        form1.reset();
      } else {
        alert("Sign up failed. Please try again.");
        console.log("❌ Server response:", data.errors);
      }
    })
    .catch((err) => {
      console.log("Error in sending data to PHP: ", err);
      alert("An error occurred. Please try again.");
    });
});

//client side validation for form2 login
loginUsername.addEventListener("input", () => {
  const value = loginUsername.value.trim();

  if (value === "") {
    loginUsernameError.style.display = "block";
    loginUsernameError.textContent = "Username or email is required.";
  } else if (value.includes("@")) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      loginUsernameError.style.display = "block";
      loginUsernameError.textContent = "Please enter a valid email address.";
    } else {
      loginUsernameError.style.display = "none";
    }
  } else {
    if (value.length < 3) {
      loginUsernameError.style.display = "block";
      loginUsernameError.textContent =
        "Username must be at least 3 characters.";
    } else {
      loginUsernameError.style.display = "none";
    }
  }
});

loginPassword.addEventListener("input", () => {
  const value = loginPassword.value;

  if (value === "") {
    loginPasswordError.style.display = "block";
    loginPasswordError.textContent = "Password is required.";
  } else if (value.length < 6) {
    loginPasswordError.style.display = "block";
    loginPasswordError.textContent = "Password must be at least 6 characters.";
  } else {
    loginPasswordError.style.display = "none";
  }
});

form2.addEventListener("submit", (e) => {
  e.preventDefault();

  const usernameValue = loginUsername.value.trim();
  const passwordValue = loginPassword.value.trim();

  let valid = true;

  if (usernameValue === "") {
    loginUsernameError.style.display = "block";
    loginUsernameError.textContent = "Username or email is required.";
    valid = false;
  }

  if (passwordValue === "") {
    loginPasswordError.style.display = "block";
    loginPasswordError.textContent = "Password is required.";
    valid = false;
  }

  if (!valid) {
    alert("Please fill in all required fields.");
    return;
  }

  const loginData = {
    usernameOrEmail: usernameValue,
    password: passwordValue,
    keepSignedIn: keepSignIn.checked,
  };

  console.log("✅ Login Data (JSON):", JSON.stringify(loginData, null, 2));
  alert("Login successful!");
});
