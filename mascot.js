// A small pixel turtle that walks along the bottom of the page as you scroll.
// It hops when a new section comes into view. No data is stored or sent.
(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const sections = [...document.querySelectorAll('main > section[id]')];
    if (!sections.length) return;

    // 16 x 13 sprite. o outline, b body, l highlight, s shell, d shell edge, c belly, w eye white, k pupil
    const body = [
        '................',
        '.......oooo.....',
        '....ooobbbbo....',
        '...oddlobwkbo...',
        '..odsssdobbbbo..',
        '..odsdsdobbbbo..',
        '..odsssdoobbo...',
        '..oddddoobbbo...',
        '.ooobbbbbbbbo...',
        '.obboccccccbo...',
        '..oobcccccbboo..'
    ];
    const feet = [
        ['....obboobbo....', '....ooo.ooo.....'],
        ['....obbbbbbo....', '.....ooooooo....']
    ];
    const colors = { o: '#0c2238', b: '#4fb0de', l: '#a8e4f6', s: '#c88a45', d: '#8b5a2a', c: '#f4e6b0', w: '#ffffff', k: '#0c2238' };

    function frame(rows) {
        let rects = '';
        rows.forEach((row, y) => {
            [...row].forEach((ch, x) => {
                if (colors[ch]) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${colors[ch]}"/>`;
            });
        });
        return rects;
    }

    const svg = n => `<svg class="mascot-frame mascot-frame-${n}" viewBox="0 0 16 13" width="32" height="26" shape-rendering="crispEdges" aria-hidden="true">${frame(body.concat(feet[n]))}</svg>`;

    const strip = document.createElement('div');
    strip.className = 'mascot-strip';
    strip.setAttribute('aria-hidden', 'true');
    strip.innerHTML = '<div class="mascot-line"></div><div class="mascot-walker"><div class="mascot-hop">' + svg(0) + svg(1) + '</div><span class="mascot-coin">+1</span></div>';
    document.body.appendChild(strip);

    const walker = strip.querySelector('.mascot-walker');
    const hop = strip.querySelector('.mascot-hop');
    const coin = strip.querySelector('.mascot-coin');
    let current = -1, queued = false, lastY = scrollY, walking = 0, stopTimer;

    function update() {
        queued = false;
        const available = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        const progress = Math.min(1, Math.max(0, scrollY / available));
        const room = Math.max(0, strip.clientWidth - 40);
        walker.style.transform = `translate3d(${(progress * room).toFixed(1)}px,0,0)`;

        const marker = scrollY + innerHeight * 0.38;
        let now = 0;
        sections.forEach((s, i) => { if (s.offsetTop <= marker) now = i; });
        if (now !== current) {
            const first = current === -1;
            current = now;
            if (!first && !reduce.matches) celebrate();
        }

        if (!reduce.matches) {
            walker.classList.toggle('is-back', scrollY < lastY);
            walker.classList.add('is-walking');
            clearTimeout(stopTimer);
            stopTimer = setTimeout(() => walker.classList.remove('is-walking'), 160);
        }
        lastY = scrollY;
    }

    function celebrate() {
        [hop, coin].forEach(el => { el.classList.remove('go'); void el.offsetWidth; el.classList.add('go'); });
    }

    function queue() {
        if (!queued) { queued = true; requestAnimationFrame(update); }
    }

    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    update();
})();
