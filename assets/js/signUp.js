const form = document.forms[0];
const message = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const body = {};

  for(let input of form){
    if (input.id && input.id !== 'confirmPassword') {
      body[input.id] = input.value;
    }
  }
  // console.log(body);
  const valid = checkVaules(body, form[4].value);
  if (!valid) e.stopPropagation();
  else registerUser(body);
});

function checkVaules(body, confirmPassword) {
  const {username, email, number, password} = body;
  if (username !== "", email !== "", number !== "", password !== "") {
    if (password !== confirmPassword) {
      message.textContent = 'Passwords do not match';
      return false;
    }
    if (number.toString().length !== 10){
      message.textContent = 'Please enter valid phone number';
      return false;
    }
    message.textContent = "";
    return true;
  } else {
    message.textContent = 'All feilds are required';
    return false;
  }
}

async function registerUser(body) {
  console.log(body)
  const req = await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
  const res = await req.json();
  if (res) {
    localStorage.setItem('user', JSON.stringify({
      username: res.username, 
      password: res.password
    }));
    location.assign('http://127.0.0.1:5500/main.html');
  }
}