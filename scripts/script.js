const passwordForm = document.querySelector(".password-form");
const passwordInput = document.querySelector("#new-password");
const toggleButton = document.querySelector(".password-input__toggle");
const requirementItems = document.querySelectorAll(".password-rules__item");
let hasSubmitted = false;

const ruleChecks = {
  lowercase: (value) => /[a-z]/.test(value),
  number: (value) => /\d/.test(value),
  uppercase: (value) => /[A-Z]/.test(value),
  length: (value) => value.length >= 8 && value.length <= 25,
};

const ruleIcons = {
  neutral: "images/icon-bullet-neutral.svg",
  met: "images/icon-check-small.svg",
  unmet: "images/icon-cross-small.svg",
};

function syncToggleLabel() {
  const isHidden = passwordInput.type === "password";
  toggleButton.textContent = isHidden ? "Show" : "Hide";
  toggleButton.setAttribute("aria-label", isHidden ? "Show password" : "Hide password");
}

function updateRequirementState(item, isMet, showErrors) {
  const icon = item.querySelector(".password-rules__icon");
  const isUnmet = !isMet && showErrors;

  item.classList.toggle("password-rules__item--met", isMet);
  item.classList.toggle("password-rules__item--unmet", isUnmet);
  icon.src = isMet ? ruleIcons.met : isUnmet ? ruleIcons.unmet : ruleIcons.neutral;
}

function validatePassword() {
  const value = passwordInput.value;

  requirementItems.forEach((item) => {
    const ruleName = item.dataset.rule;
    const isMet = ruleChecks[ruleName](value);
    updateRequirementState(item, isMet, hasSubmitted);
  });
}

toggleButton.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  syncToggleLabel();
  passwordInput.focus({ preventScroll: true });
  const end = passwordInput.value.length;
  passwordInput.setSelectionRange(end, end);
});

passwordInput.addEventListener("input", validatePassword);

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  hasSubmitted = true;
  validatePassword();
});

syncToggleLabel();
validatePassword();
