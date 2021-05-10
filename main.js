const panels = [...document.querySelectorAll('.panel')];
panels.forEach(el => el.addEventListener('click', (event) => {
        panels.forEach(panel => panel.classList.remove('main'));
        event.currentTarget.classList.add('main');
    })
); 
const projects = [...document.querySelectorAll('.portfolio-item')];
projects.forEach(el => el.addEventListener('click', (event) => {
        projects.find(project => project.classList.contains('active')).classList.remove('active');
        event.currentTarget.classList.add('active');
    })
);