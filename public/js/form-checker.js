document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registration-form");
  if (!form) return;
  
  const errorDiv = document.querySelector(".password-error");
  const usernameEl = document.querySelector("#username");
  const emailEl = document.querySelector("#email");
  const passwordEl = document.querySelector("#password");
  const confirmEl = document.querySelector("#confirm");
  const registorBtn = document.querySelector("#submit-btn");

  errorDiv.classList.add("invisible");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isRequiredValid = checkRequired([
      usernameEl,
      emailEl,
      passwordEl,
      confirmEl,
    ]);
    let isFormValid = isRequiredValid;
    if (isRequiredValid) {
      const usernameValid = checkLength(usernameEl, 3, 15);
      const emailValid = checkEmail(emailEl);
      const passwordValid = checkPassword(passwordEl);
      const ConformPassword = isConformPassword(passwordEl, confirmEl);

      isFormValid =
        isRequiredValid &&
        usernameValid &&
        emailValid &&
        passwordValid &&
        ConformPassword;
    }

    if (isFormValid) {
      form.submit();

      document.querySelectorAll(".form-group").forEach((group) => {
        group.className = "form-group";
      });
    }
  });

  function checkRequired(inputArray) {
    let isValid = true;
    inputArray.forEach((input) => {
      if (input.value.trim() === "") {
        showError(input, `${formatFieldName(input)} is required`);
        isValid = false;
      }
    });
    return isValid;
  }

  function checkLength(value, min, max) {
    if (value.value.length < min) {
      showError(
        value,
        `${formatFieldName(value)} must be at least ${min} characters.`
      );
      return false;
    } else if (value.value.length > max) {
      showError(
        value,
        `${formatFieldName(value)} must be at less than ${max} characters.`
      );
      return false;
    } else {
      showSuccess(value);
      return true;
    }
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.innerText = message;
  }

  function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
  }

  function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  function checkEmail(input) {
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input.value.trim())) {
      showSuccess(input);
      return true;
    } else {
      showError(input, `Email is not vaild`);
      return false;
    }
  }

  function checkPassword(input) {
    const value = input.value.trim();
    let errors = [];
    let vaild = [];

    // rules
    if (value.length < 8) {
      errors.push("At least 8 characters");
    } else {
      vaild.push("At least 8 characters");
    }
    if (!/[a-z]/.test(value)) {
      errors.push("At least one lowercase letter");
    } else {
      vaild.push("At least one lowercase letter");
    }
    if (!/[A-Z]/.test(value)) {
      errors.push("At least one uppercase letter");
    } else {
      vaild.push("At least one uppercase letter");
    }
    if (!/\d/.test(value)) {
      errors.push("At least one number");
    } else {
      vaild.push("At least one number");
    }
    if (!/[!@#$%^&*?|]/.test(value)) {
      errors.push("At least one special character (!@#$%^&*?|)");
    } else {
      vaild.push("At least one special character (!@#$%^&*?|)");
    }

    // show messages
    const showErrorDiv = document.querySelector(".pawword-error");

    // build HTML with colors
    if (errors.length > 0) {
      const formGroup = input.parentElement;
      formGroup.className = "form-group error";
      errorDiv.classList.remove("invisible");
      let html = "";
      errors.forEach((err) => {
        html += `<div class="error-text"> ${err}</div>`;
      });
      vaild.forEach((ok) => {
        html += `<div class="valid-text"> ${ok}</div>`;
      });

      if (showErrorDiv) {
        showErrorDiv.innerHTML = html;
      }
      return false;
    } else {
      if (showErrorDiv) {
        showErrorDiv.innerHTML = "";
      }
      errorDiv.classList.add("invisible");
      showSuccess(input);
      return true;
    }
  }

  function isConformPassword(password, conformpassword) {
    if (password.value != conformpassword.value) {
      showError(
        conformpassword,
        `${formatFieldName(conformpassword)} is not equal`
      );
      return false;
    } else {
      showSuccess(conformpassword);
      return true;
    }
  }
});
