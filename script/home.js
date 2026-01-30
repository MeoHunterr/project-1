const btn = document.querySelectorAll('.btn');
const btnStart = document.querySelector('.btn.btn1');

btnStart.classList.add('active');

btn.forEach(button => {
  button.onclick = (e) => {
    btn.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  }
});