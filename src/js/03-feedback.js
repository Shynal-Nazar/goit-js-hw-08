import throttle from 'lodash.throttle';

const refEl = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textArea: document.querySelector('textarea'),
};
const STORAGE_KEY = 'feedBack-form-state';
let formData = {};

rescureMessage();

refEl.form.addEventListener('submit', onFormSubmit);
refEl.form.addEventListener('input', throttle(onTextAreaInput, 500));

function onTextAreaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (refEl.textArea.value && refEl.email.value !== '') {
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
    formData = {};
    return;
  }
  alert('Для відправки повідомлення заповніть усі поля! Дякую');
}

function rescureMessage() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    const pasrsedMessage = JSON.parse(savedMessage);
    formData = pasrsedMessage;
    if (pasrsedMessage.message !== undefined) {
      refEl.textArea.value = pasrsedMessage.message;
    }
    if (pasrsedMessage.email !== undefined) {
      refEl.email.value = pasrsedMessage.email;
    }
  }
}
