window.addEventListener('load', function() {
  const user = JSON.parse(this.localStorage.getItem('user'));
  if (!user) this.location.assign('http://127.0.0.1:5500/login.html');
  else {
    this.fetch().then(function(res) {
      return res.json();
    }).then(function(data) {
      if (data[0].password !== user.password) {
        this.localStorage.removeItem('user')
        this.location.assign('http://127.0.0.1:5500/login.html');
      }
    }).catch(function(err) {})
  }
});

const user = JSON.parse(localStorage.getItem('user'));
const title = document.getElementById('title');
title.textContent = `Dear, ${user.username}, ${title.textContent}`

const date = document.getElementById('date');
if (date) setInterval(function() {date.textContent = new Date()}, 1000);

const logout = document.getElementById('logout');
if (logout) logout.addEventListener('click', function() {
  localStorage.removeItem('user');
  localStorage.removeItem('list');
  location.assign('http://127.0.0.1:5500/login.html')
});

const imgBtns = document.getElementsByClassName('clickImg');
const list = { items: [] };

for (let img of imgBtns) {
  img.addEventListener('click', function() {
    const date = new Date()
    const item = {
      name: img.id,
      img: img.src,
      cost: 20.00,
      deliverDate: new Date(new Date().setDate(date.getDate() + 2)).toDateString()
    }
    list.items.push(item);
    localStorage.setItem('list', JSON.stringify(list));
    alert(`1 ${img.id} item added`);
  })
}

const header = document.getElementById('header');
const storedList = JSON.parse(localStorage.getItem('list'));
if (storedList) {
  const items = storedList.items;
  header.textContent = `${header.textContent} ${items.length} items`;

  const uiList = document.getElementById('list');
  uiList.style.listStyle = 'none';

  let totalCost = 0;
  for(let item of items) {
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(`item: ${item.name}, costing $${item.cost}, will be delivered on ${item.deliverDate}`))
    uiList.appendChild(listItem);

    totalCost += item.cost;
  }
  
  const total = document.getElementById('total');
  total.textContent = `${total.textContent} $${totalCost}`
}