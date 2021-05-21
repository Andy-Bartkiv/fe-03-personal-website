const panels = [...document.querySelectorAll('.panel')];
panels.forEach(el => el.addEventListener('click', (event) => {
        panels.forEach(panel => panel.classList.remove('main'));
        event.currentTarget.classList.add('main');
    })
); 

createProjects(document.querySelector('.projects-container'), 7);
const projects = [...document.querySelectorAll('.project')];
// ---------------------------------- Fetching JSON --------------------------
fetch('./json/projects-data.json')
    .then(response => response.json())
    .then(data => { projects.forEach((el, i) => el.innerHTML = populateProject(data, i)) })
    
// ------------------------------ Portfolio page animation --------------------
let mql = window.matchMedia('(max-width: 90vh)'); // Media Query List object
if (mql.matches) projects.reverse();
mql.addEventListener("change", reverseTabs);

let activeTab = 3;
toggleClassTrans(activeTab);
projects[activeTab].classList.add('show');

const delayContextHide = 450; // time delay for Project Tab context hiding
projects.forEach(el => el.addEventListener('click', openTab));


// --------------------- FUNCTIONS ----------------------------------
function toggleClassTrans(tab) {
    projects.slice(0, tab).forEach(el => el.classList.remove('trans'));
    projects.slice(tab).forEach(el => el.classList.add('trans'));
};

function toggleClassShow(tab) {
    const tabClosed = projects.find(el => el.classList.contains('show'));
    setTimeout(() => tabClosed.classList.remove('show'), delayContextHide);
    projects[tab].classList.add('show');
};

function openTab(event) {
    const tab = projects.indexOf(event.currentTarget);
    if (activeTab !== tab) {
        activeTab = tab;
        toggleClassTrans(activeTab);
        toggleClassShow(activeTab);
    }
};

function reverseTabs() {
    activeTab = projects.length - 1 - activeTab;
    projects.reverse();
    toggleClassTrans(activeTab);
};

function createProjects(container, maxIndex = 7) {
    for (let j = 0; j < maxIndex; j++) {
        const project = document.createElement('div');
        project.setAttribute('class', 'project');
        project.innerHTML = '';
        container.appendChild(project);
    }
};

function populateProject(data, index) {
    console.log(data[index].id);
    let context = '';
    context += `<div class="project-bookmark"><p>${data[index].bookmark}</p></div>`;
    if (data[index].id !== '-1') {
        context += `<div class="project-context">`; // <div> to be closed
        context += `<div class="context-title"><h4>${data[index].title}</h4></div>`;
        context += `<hr class="hr-title"/>`;
        context += `<div class="context-intro"><p>${data[index].intro}</p></div>`;
        context += `<hr class="hr-intro"/>`;
        context += `<div class="context-img"><img src="${data[index].imgSrc}" alt=""></div>`;
        context += `<div class="context-tech">`;
        data[index].tech.split(', ').forEach(tag => context += `<p>${tag}</p>`)
        context += `</div>`;
        context += `<hr class="hr-tech"/>`;
        context += `<div class="context-description">${data[index].description}</div>`;
        context += `<hr class="hr-links"/>`;
        context += `<a class="context-demo" href="${data[index].demoHref}" target="_blank" rel="noreferrer"><i class="fas fa-eye"></i>&nbsp;&nbsp;Demo</a>`;
        context += `<a class="context-code" href="${data[index].codeHref}" target="_blank" rel="noreferrer"><i class="fas fa-code"></i>&nbsp;&nbsp;GitHub</a>`;
    } else {
        context += `<div class="project-context coming-soon">`; // <div> to be closed
    }
    context += `</div>`;
    return context;
};
