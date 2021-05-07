const panels = [...document.querySelectorAll('.panel')];
// console.log(panels);

panels.forEach(el => 
    el.addEventListener('click', () => {
        let num = el.id.slice(-1); 
        // console.log(panels[num]);
        panels.forEach((panel, i) => {
            if (i !== num) panel.classList.remove('main');
        });
        panels[num].classList.add('main');
    })
); 