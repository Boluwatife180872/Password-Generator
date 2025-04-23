const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const checkboxes = {
  lowercase: document.getElementById("lowercase"),
  uppercase: document.getElementById("uppercase"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols"),
};

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

/* function generatePassword() {
  let charSet = "";
  let password = "";
  let length = parseInt(lengthInput.value);

  // Validate length
  if (isNaN(length) || length < 5 || length > 20) {
    alert("Please enter a valid length between 5 and 20");
    lengthInput.value = 12;
    length = 12;
  }

  for (let key in checkboxes) {
    if (checkboxes[key].checked) {
      charSet += characters[key];
    }
  }

  if (charSet === "") {
    alert("Please select at least one character type");
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet[randomIndex];
  }

  passwordInput.value = password;
} */

function generatePassword() {
  let charSet = "";
  let password = "";
  let length = parseInt(lengthInput.value);

  // Validate length
  if (isNaN(length) || length < 5 || length > 20) {
    alert("Please enter a valid length between 5 and 20");
    lengthInput.value = 12;
    length = 12;
  }

  // Collect selected character sets
  const selectedCharSets = [];
  for (let key in checkboxes) {
    if (checkboxes[key].checked) {
      charSet += characters[key];
      selectedCharSets.push(characters[key]);
    }
  }

  console.log(selectedCharSets);

  if (charSet === "") {
    alert("Please select at least one character type");
    return;
  }

  // Ensure at least one character from each selected set
  selectedCharSets.forEach((set) => {
    const randomIndex = Math.floor(Math.random() * set.length);
    password += set[randomIndex];
  });

  // Fill the rest of the password with random characters
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet[randomIndex];
  }

  // Shuffle the password to randomize character positions
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  passwordInput.value = password;
}

function copyPassword() {
  if (passwordInput.value === "") {
    alert("Generate a password first!");
    return;
  }

  passwordInput.select(); //Highlights the text
  navigator.clipboard.writeText(passwordInput.value); // Copies the text to the clipboard
  copyBtn.textContent = "Copied!";
  copyBtn.classList.add("copied");

  setTimeout(() => {
    copyBtn.textContent = "Copy";
    copyBtn.classList.remove("copied");
  }, 2000);
}

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
lengthInput.addEventListener("change", generatePassword);

// Generate password on page load
generatePassword();
