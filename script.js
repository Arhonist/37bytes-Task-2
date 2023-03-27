const notEmptyPattern = /[^\s]/;
const cyryllicPattern = /^[а-яА-ЯёЁ\s]+$/;
const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phonePattern = /^\d{11}$/;

function showElement(elementId) {
  const blockToShow = document.getElementById(elementId);
  const blocksToHide = document.querySelectorAll('div.hiddable');
  blocksToHide.forEach((element) => element.classList.add('hidden'));
  blockToShow.classList.remove('hidden');
}

function handleFormExit() {
  eraseAllInputElements();
  trackedElementsList.forEach((element) => {
    element.nextElementSibling.classList.add('hidden');
  });
  document.querySelectorAll('input[type=checkbox]').forEach((input) => {
    input.checked = false;
  });
  showElement('choose-form-block');
}

function validateInput(value, type = 'validate-not-empty') {
  switch (type) {
    case 'validate-not-empty':
      return notEmptyPattern.test(value);

    case 'validate-cyrillic':
      return notEmptyPattern.test(value) && cyryllicPattern.test(value);

    case 'validate-email':
      return emailPattern.test(value);

    case 'validate-phone':
      return phonePattern.test(value);

    case 'validate-phone-or-email':
      return emailPattern.test(value) || phonePattern.test(value);

    default:
      return false;
  }
}

function stringifyForm(form) {
  const formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => (formObject[key] = value));
  return JSON.stringify(formObject);
}

function eraseAllInputElements() {
  const inputElems = document.querySelectorAll('.form-input');
  inputElems.forEach((element) => (element.value = ''));
}

function validateForm(event, formNumber) {
  let isFormValid = true;
  event.preventDefault();

  const formInputElements = document.querySelectorAll(
    `#form-${formNumber}-form .form-input`
  );

  formInputElements.forEach((element) => {
    if (!validateInput(element.value, element.classList[1])) {
      element.nextElementSibling.classList.remove('hidden');
      isFormValid = false;
    }
  });

  if (isFormValid) {
    const form = document.querySelector(`#form-${formNumber}-form`);
    console.log(stringifyForm(form));
    eraseAllInputElements();
  }
}

const trackedElementsList = document.querySelectorAll('.form-input');
trackedElementsList.forEach((element) => {
  element.addEventListener('input', () => {
    element.nextElementSibling.classList.add('hidden');
  });
});
