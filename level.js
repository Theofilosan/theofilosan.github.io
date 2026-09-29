// A small progress HUD for exploring the page. No data is stored or sent.
const chapters = [
    ['top', 'START'],
    ['about', 'ABOUT'],
    ['skills', 'TOOLKIT'],
    ['experience', 'EXPERIENCE'],
    ['work', 'WORK'],
    ['more', 'MORE'],
    ['contact', 'CONTACT']
];

const progressFill = document.getElementById('progress-fill');
const levelLabel = document.getElementById('level-label');
const xpLabel = document.getElementById('xp-label');
let queued = false;

function updateProgress() {
    const available = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / available));
    const marker = scrollY + innerHeight * 0.38;
    let current = 0;
    chapters.forEach(([id], index) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = index;
    });
    progressFill.style.width = `${Math.round(progress * 100)}%`;
    levelLabel.textContent = `LEVEL ${String(current + 1).padStart(2, '0')} / ${chapters[current][1]}`;
    xpLabel.textContent = `${Math.round(progress * 100)} XP`;
    queued = false;
}

function queueUpdate() {
    if (!queued) {
        queued = true;
        requestAnimationFrame(updateProgress);
    }
}

addEventListener('scroll', queueUpdate, { passive: true });
addEventListener('resize', queueUpdate);
updateProgress();
