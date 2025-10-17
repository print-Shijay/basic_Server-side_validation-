const form = document.getElementById("signupForm");

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

form.addEventListener("submit", (e) => {
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

  console.log("✅ User Data (JSON):", JSON.stringify(userData, null, 2));
  alert("Form submitted successfully!");
});
