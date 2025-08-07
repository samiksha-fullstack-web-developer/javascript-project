const menubtn = document.getElementById("menu-btn");
const menus = document.querySelector(".menu");
menubtn.addEventListener("click", ()=>{
    menus.classList.toggle("active");
})

//about
const titles = [
  "Full Stack Developer (MERN) Fresher",
  "UI/UX Designer Fresher",
  "WordPress & Elementor",
  "Frontend Developer",
  "IT Trainer"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;

const element = document.getElementById("titles");

function typeEffect() {
  const currentText = titles[index];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  element.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex === currentText.length) {
    // Pause before deleting
    setTimeout(() => {
      isDeleting = true;
      typeEffect();
    }, 3000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    // Move to next title
    isDeleting = false;
    index = (index + 1) % titles.length;
  }

  setTimeout(typeEffect, isDeleting ? 150 : 150); // speed
}

typeEffect();


