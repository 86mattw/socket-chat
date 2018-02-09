const socket = io();

const form = document.querySelector('.form');
const userNameInput = document.querySelector('.username-input');

const username = document.querySelector('.username');
const userList = document.querySelector('.user-list');
const button = document.querySelector('.btn');
const output = document.querySelector('.output');

// Emmitters
form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('new username', userNameInput.value);
  username.innerHTML = userNameInput.value;
  form.style.display = 'none';
});

button.addEventListener('click', () => {
  const msg = 'hello there';
  appendMsg(`me: ${msg}`);

  socket.emit('clientMsg', msg);
});

// Receivers
socket.on('serverMsg', (msg) => {
  appendMsg(msg);
});

socket.on('users updated', (users) => {
  let html = '';
  users.forEach(user => {
    html += `<li>${user}</li>`;
  });
  userList.innerHTML = html;
});

const appendMsg = (msg) => {
  output.innerHTML = `${output.innerHTML}<br />${msg}`;
};
