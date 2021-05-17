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

let activeTab = 1;
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
    let context = '';
    context += `<div class="project-bookmark"><p>${data[index].bookmark}</p></div>`;
    context += `<div class="project-context">`; // <div> to be closed
    context += `<div class="context-title"><p>${data[index].title}</p></div>`;
    context += `<div class="context-intro"><p>${data[index].intro}</p></div>`;
    context += `<div class="context-img"><img src="${data[index].imgSrc}" alt=""></div>`
    context += `<div class="context-tech"><p>${data[index].tech}</p></div>`;
    context += `<div class="context-description"><p>${data[index].description}</p></div>`;
    context += `<a class="context-demo" href="${data[index].demoHref}" target="_blank" rel="noreferrer"><i class="fas fa-eye"></i>&nbsp;&nbsp;Demo</a>`;
    context += `<a class="context-code" href="${data[index].codeHref}" target="_blank" rel="noreferrer"><i class="fas fa-code"></i>&nbsp;&nbsp;GitHub</a>`;
    context += `</div>`;
    return context;
};
