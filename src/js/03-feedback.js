import throttle from 'lodash.throttle';

const refEl = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textArea: document.querySelector('textarea'),
};
const STORAGE_KEY = 'feedBack-form-state';
const formData = {};

rescureMessage();

refEl.form.addEventListener('submit', onFormSubmit);
refEl.form.addEventListener('input', throttle(onTextAreaInput, 500));

function onTextAreaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function rescureMessage() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    const pasrsedSav = JSON.parse(savedMessage);
    refEl.textArea.value = pasrsedSav.message;
    refEl.email.value = pasrsedSav.email;
  }
}
