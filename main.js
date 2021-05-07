const panels = [...document.querySelectorAll('.panel')];
panels.forEach(el => 
    el.addEventListener('click', () => {
        const num = el.id.slice(-1); 
        panels.forEach((panel, i) => {
            if (i !== num) panel.classList.remove('main');
        });
        panels[num].classList.add('main');
    })
); 