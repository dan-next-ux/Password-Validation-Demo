const passwordField = document.querySelector(".password-field");
const passwordInput = document.querySelector("#password-input");
const passwordToggle = document.querySelector("#password-toggle");
const requirementItems = document.querySelectorAll(".requirement-item");

const rules = {
  lowercase: (value) => /[a-z]/.test(value),
  number: (value) => /\d/.test(value),
  uppercase: (value) => /[A-Z]/.test(value),
  length: (value) => value.length >= 8 && value.length <= 25,
};

function setPasswordVisibility(isVisible) {
  passwordInput.type = isVisible ? "text" : "password";
  passwordField.dataset.visible = String(isVisible);
  passwordToggle.textContent = isVisible ? "Hide" : "Show";
  passwordToggle.setAttribute("aria-pressed", String(isVisible));
}

function updateRequirements(value) {
  requirementItems.forEach((item) => {
    const ruleName = item.dataset.rule;
    const isMet = rules[ruleName](value);

    item.classList.toggle("is-met", isMet);
    item.classList.toggle("is-unmet", !isMet);
  });
}

passwordToggle.addEventListener("click", () => {
  const isVisible = passwordInput.type === "text";
  setPasswordVisibility(!isVisible);
});

passwordInput.addEventListener("input", (event) => {
  updateRequirements(event.target.value);
});

setPasswordVisibility(true);
updateRequirements(passwordInput.value);
