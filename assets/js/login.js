const form = document.forms[0];

form.addEventListener('submit', function handleSubmit(e) {
  e.preventDefault()

  const body = {
    [form[0].id]: form[0].value,
    [form[1].id]: form[1].value
  }

  const valid = checkVaules(body);
  if (valid) getUser(body);
});

function checkVaules(body) {
  const {username, password} = body;
  if (username !== "" && password !== "") return true;
  else return false;
}

async function getUser(body) {
  const req = await fetch(`http://localhost:5000/users?username=${body.username}`);
  const res = await req.json()
  const user = res[0];
  if (!user) alert('User not found! Please check username!');
  else if (user.password !== body.password) alert('Password is incorrect!');
  else {
    localStorage.setItem('user', JSON.stringify({username: user.username, password: user.password}));
    location.assign('http://127.0.0.1:5500/main.html');
  }
}