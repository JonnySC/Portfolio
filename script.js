const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let particles = [];
let animationFrame;

function resizeCanvas() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    particles = Array.from({ length: window.innerWidth < 700 ? 28 : 56 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 0.15 + Math.random() * 0.3,
        size: 1 + Math.random() * 1.8,
    }));
}

function drawBackground() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < -10) particle.y = window.innerHeight + 10;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = "rgba(199, 243, 107, 0.55)";
        context.fill();
    });
    animationFrame = window.requestAnimationFrame(drawBackground);
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    });
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

if (!reduceMotion.matches) {
    drawBackground();
}

window.addEventListener("beforeunload", () => {
    window.cancelAnimationFrame(animationFrame);
});