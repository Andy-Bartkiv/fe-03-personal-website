// -------------------------- Main panels animation ------------------------------------
const panels = [...document.querySelectorAll('.panel')];
panels.forEach(el => el.addEventListener('click', (event) => {
        panels.forEach(panel => panel.classList.remove('main'));
        event.currentTarget.classList.add('main');
    })
); 
// -------------------------- Portfolio page rendering and animation --------------------
createProjects(document.querySelector('.projects-container'), 7);
const projects = [...document.querySelectorAll('.project')];
// --- Fetch projects data from JSON and create each project tab markup ---
fetch('./json/projects-data.json')
    .then(response => response.json())
    .then(data => projects.forEach((project, index) => project.innerHTML = populateProject(data[index])));

let activeTab = 3; // index of 'active' (currently opened) project tab  
const delayContextHide = 450; // time delay for Project Tab context hiding
let mql = window.matchMedia('(max-width: 90vh)'); // Media Query List object
if (mql.matches) setTimeout(() => reverseTabs(), 500); // change project order for mobile view
projects[activeTab].classList.add('show'); // 'active' tab opens
toggleClassTrans(activeTab); // other tabs stacking left and right around opened tab
// -------------- EVENTS ------------------------------------------------------------
mql.addEventListener("change", reverseTabs); // change project order if screen ratio changes
projects.forEach(el => el.addEventListener('click', openTab)); // open 'active' tab

// --------------------------------- FUNCTIONS DECLARATION ----------------------------------
function createProjects(container, maxIndex = 7) {
    for (let j = 0; j < maxIndex; j++) {
        const project = document.createElement('div');
        project.setAttribute('class', 'project');
        project.innerHTML = '';
        container.appendChild(project);
    }
};

function reverseTabs() {
    activeTab = projects.length - 1 - activeTab;
    projects.reverse();
    toggleClassTrans(activeTab);
};

function openTab(event) {
    const tab = projects.indexOf(event.currentTarget);
    if (activeTab !== tab) {
        activeTab = tab;
        toggleClassTrans(activeTab);
        toggleClassShow(activeTab);
    }
};

function toggleClassTrans(tab) {
    projects.slice(0, tab).forEach(el => el.classList.remove('trans'));
    projects.slice(tab).forEach(el => el.classList.add('trans'));
};

function toggleClassShow(tab) {
    const tabClosed = projects.find(el => el.classList.contains('show'));
    setTimeout(() => tabClosed.classList.remove('show'), delayContextHide);
    projects[tab].classList.add('show');
};

function populateProject(info) {
    let context = '';
    context += `<div class="project-bookmark"><p>${info.bookmark}</p></div>`;
    if (info.id !== '-1') {
        context += `<div class="project-context">`; // <div> to be closed
        context += `<div class="context-title"><h4>${info.title}</h4></div>`;
        context += `<hr class="hr-title"/>`;
        context += `<div class="context-intro"><p>${info.intro}</p></div>`;
        context += `<hr class="hr-intro"/>`;
        context += `<div class="context-img"><img src="${info.imgSrc}" alt=""></div>`;
        context += `<div class="context-tech">`;
        info.tech.split(', ').forEach(tag => context += `<p>${tag}</p>`)
        context += `</div>`;
        context += `<hr class="hr-tech"/>`;
        context += `<div class="context-description">${info.description}</div>`;
        context += `<hr class="hr-links"/>`;
        context += `<a class="context-demo" href="${info.demoHref}" target="_blank" rel="noreferrer"><i class="fas fa-eye"></i>&nbsp;&nbsp;Demo</a>`;
        context += `<a class="context-code" href="${info.codeHref}" target="_blank" rel="noreferrer"><i class="fas fa-code"></i>&nbsp;&nbsp;GitHub</a>`;
    } else {
        context += `<div class="project-context coming-soon">`; // <div> to be closed
    }
    context += `</div>`;
    return context;
};
