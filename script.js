const leftDoor = document.getElementById('leftDoor');
const rightDoor = document.getElementById('rightDoor');
const openScreen = document.getElementById('openScreen');
const card = document.getElementById('card');

function openCard(){
  leftDoor.classList.add("open-left");
  rightDoor.classList.add("open-right");
  setTimeout(()=>{
    openScreen.style.display="none"; 
    card.classList.remove("hidden"); 

    // bật hiệu ứng hero-text
    const hero = document.querySelector('.hero-text');
    hero.classList.add('show'); 

    // Thư mời hero + phụ
    setTimeout(()=> document.querySelector('.invite-hero').classList.add('show'), 1500);
    setTimeout(()=> document.querySelector('.invite-sub').classList.add('show'), 2500);

    // --- Hiển thị chữ "Thư tiệc mời cưới" + gạch + giờ + ngày ---
    const inviteTitle = document.querySelector('.invite-title');
    const inviteTime = document.querySelector('.invite-time');
    const inviteDate = document.querySelector('.invite-date');
    const dividerTop = document.querySelector('.divider-top');
    const dividerBottom = document.querySelector('.divider-bottom');

    setTimeout(()=>{
      dividerTop.classList.add('show');         // gạch trên trượt ra
      inviteTitle.classList.add('show');        // chữ Thư tiệc mời cưới to lên
      setTimeout(()=> inviteTime.classList.add('show'), 400);     // giờ
      setTimeout(()=> dividerBottom.classList.add('show'), 500); // gạch dưới
      setTimeout(()=> inviteDate.classList.add('show'), 800);     // ngày tháng
    }, 200);

    // Bắt đầu tim bay qua lại
    startHearts();
  },900);
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealLeft = document.querySelector('.reveal-left');
const revealRight = document.querySelector('.reveal-right');

window.addEventListener('scroll', ()=>{
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top < trigger){ el.classList.add('show'); setTimeout(() => el.classList.add('show'), 500);  }
  });

  if(revealLeft.getBoundingClientRect().top < trigger){ revealLeft.classList.add('show'); }
  if(revealRight.getBoundingClientRect().top < trigger){ revealRight.classList.add('show'); }
});

// Tạo tim bay qua lại
function startHearts() {
  setInterval(()=>{
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.style.left = Math.random() * 90 + 'vw';
    heart.style.fontSize = (20 + Math.random()*20) + 'px';
    heart.style.animationDuration = (6 + Math.random()*4) + 's';
    heart.textContent = '❤️';
    document.body.appendChild(heart);
    setTimeout(()=> heart.remove(), 10000);
  }, 1200); // mỗi 1.2 giây xuất hiện 1 trái tim
}
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

// Đặt canvas đúng kích thước
canvas.width = 100;
canvas.height = 100;

let particles = [];

// Công thức trái tim
function heartFunction(t) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
  return { x: x, y: -y };
}

// Tạo particles
for (let i = 0; i < 500; i++) {
  let t = Math.random() * Math.PI * 2;
  let pos = heartFunction(t);

  particles.push({
    baseX: canvas.width/2 + pos.x * 2.5,
    baseY: canvas.height/2 + pos.y * 2.5,
    x: 0,
    y: 0,
    size: Math.random() * 2 + 0.5,
    alpha: Math.random(),
    offset: Math.random() * 100
  });
}

let time = 0;

function drawHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // hiệu ứng nhịp tim
    let pulse = Math.sin(time + p.offset) * 1.5;
    p.x = p.baseX + pulse;
    p.y = p.baseY + pulse;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 80, 80, ${p.alpha})`;
    ctx.fill();
  });

  time += 0.05;
  requestAnimationFrame(drawHeart);
}

drawHeart();

