const darkConfig = {

particles:{

number:{value:80},

size:{value:3},

move:{speed:1},

line_linked:{
enable:true,
distance:150,
color:"#ffffff",
opacity:0.2,
width:1
}

}

};

const lightConfig = {

particles:{

number:{value:80},

size:{value:3},

move:{speed:1},

line_linked:{
enable:true,
distance:150,
color:"#000000",
opacity:0.2,
width:1
}

}

};

function initParticles(config) {

particlesJS("particles-js", config);

}

// Initialize with dark config

initParticles(darkConfig);



const logo = document.getElementById("logoToggle")

logo.addEventListener("click",()=>{

document.body.classList.add("theme-transition")

setTimeout(() => {
document.body.classList.toggle("light")

if(document.body.classList.contains("light")){

localStorage.setItem("theme","light")

logo.src = "assets/logo-light.jpeg"

initParticles(lightConfig)

updateHeroLogo()

}else{

localStorage.setItem("theme","dark")

logo.src = "assets/logo-dark.jpg"

initParticles(darkConfig)

updateHeroLogo()

}

setTimeout(() => {
document.body.classList.remove("theme-transition")
}, 400)

}, 200)

})



// Show Theme Tutorial Modal on first visit
function showThemeTutorial() {
const hasSeenTutorial = localStorage.getItem('seenThemeTutorial');
const themeModal = document.getElementById('themeModal');

if (!hasSeenTutorial) {
themeModal.classList.remove('hidden');
}
}

// Close Theme Modal
function closeThemeTutorial() {
const themeModal = document.getElementById('themeModal');
themeModal.classList.add('hidden');
localStorage.setItem('seenThemeTutorial', 'true');
}

const closeModal = document.getElementById('closeModal');
const gotItBtn = document.getElementById('gotItBtn');
const themeModal = document.getElementById('themeModal');

if (closeModal) closeModal.addEventListener('click', closeThemeTutorial);
if (gotItBtn) gotItBtn.addEventListener('click', closeThemeTutorial);

// Close modal when clicking outside
if (themeModal) {
themeModal.addEventListener('click', (e) => {
if (e.target === themeModal) {
closeThemeTutorial();
}
});
}

window.onload = () => {

const savedTheme = localStorage.getItem("theme")

if(savedTheme === "light"){

document.body.classList.add("light")

logo.src = "assets/logo-light.jpeg"

initParticles(lightConfig)

} else {

logo.src = "assets/logo-dark.jpg"

initParticles(darkConfig)

}

updateHeroLogo()

showThemeTutorial()

}

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-link').forEach(link => {
link.addEventListener('click', (e) => {
e.preventDefault();
const targetId = link.getAttribute('href');
const target = document.querySelector(targetId);
if (target) {
target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
});
});

// Update Hero Logo based on theme
function updateHeroLogo() {
const heroLogo = document.getElementById('heroLogo');
if (document.body.classList.contains('light')) {
heroLogo.src = 'assets/light.png';
} else {
heroLogo.src = 'assets/dark.png';
}
}

// Handle Hero Logo Fade In/Out on Scroll
const heroLogo = document.getElementById('heroLogo');
window.addEventListener('scroll', () => {
const scrollPosition = window.scrollY;
const heroHeight = document.querySelector('.hero').clientHeight;
const fadeOutStart = heroHeight * 0.3;
const fadeOutEnd = heroHeight;

if (scrollPosition > fadeOutEnd) {
heroLogo.classList.remove('visible');
heroLogo.classList.add('hidden');
} else if (scrollPosition > fadeOutStart) {
const progress = (scrollPosition - fadeOutStart) / (fadeOutEnd - fadeOutStart);
heroLogo.style.opacity = 0.3 * (1 - progress);
} else {
heroLogo.classList.add('visible');
heroLogo.classList.remove('hidden');
heroLogo.style.opacity = 0.3;
}
});

// Handle Navbar Background on Scroll
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
if (window.scrollY > 50) {
navbar.classList.add('scrolled');
} else {
navbar.classList.remove('scrolled');
}
});

// Scroll Animation Observer
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
if (entry.target.classList.contains('scroll-fade')) {
entry.target.classList.add('visible');
}
if (entry.target.classList.contains('scroll-stagger')) {
entry.target.classList.add('visible');
}
}
});
}, {
threshold: 0.1,
rootMargin: '0px 0px -100px 0px'
});

// Observe all animated elements
document.querySelectorAll('.scroll-fade, .scroll-stagger').forEach(el => {
observer.observe(el);
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
contactForm.addEventListener('submit', (e) => {
e.preventDefault();

const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const message = document.getElementById('message').value.trim();
const formMessage = document.getElementById('formMessage');

// Simple validation
if (!name || !email || !message) {
formMessage.textContent = '❌ Please fill in all fields';
formMessage.className = 'form-message form-error';
return;
}

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
formMessage.textContent = '❌ Please enter a valid email';
formMessage.className = 'form-message form-error';
return;
}

// Simulate form submission
formMessage.textContent = '✅ Message sent successfully! We will reply soon.';
formMessage.className = 'form-message form-success';

// Reset form
contactForm.reset();

// Clear message after 3 seconds
setTimeout(() => {
formMessage.textContent = '';
formMessage.className = 'form-message';
}, 3000);
});
}