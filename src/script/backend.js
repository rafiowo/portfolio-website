const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

const fontSize = 16;
const chars = '0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

let columns, drops;
function setupGrid() {
    columns = Math.ceil(w / fontSize);
    drops = Array.from({ length: columns }, () => Math.floor(Math.random() * h / fontSize));
}
setupGrid();

const mouse = { x: -9999, y: -9999 };
addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

addEventListener('resize', () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    setupGrid();
});

const glowRadius = 150;
const frameDelay = 40;
let lastStep = 0;

requestAnimationFrame(function anim(t) {
    if (t - lastStep >= frameDelay) {
        lastStep = t;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, w, h);
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < columns; i++) {
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            const char = chars[Math.floor(Math.random() * chars.length)];

            const dist = Math.hypot(x - mouse.x, y - mouse.y);
            const glow = Math.max(0, 1 - dist / glowRadius);
            const alpha = 0.08 + glow * 0.85;

            ctx.fillStyle = `rgba(255, 116, 36, ${alpha})`;
            ctx.fillText(char, x, y);

            if (y > h && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    requestAnimationFrame(anim);
});
