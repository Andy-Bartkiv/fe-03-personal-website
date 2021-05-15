const panels = [...document.querySelectorAll('.panel')];
panels.forEach(el => el.addEventListener('click', (event) => {
        panels.forEach(panel => panel.classList.remove('main'));
        event.currentTarget.classList.add('main');
    })
); 

const projects = [...document.querySelectorAll('.project')];
const delayContextHide = 450; //450

let mql = window.matchMedia('(max-width: 90vh)');
if (mql.matches) projects.reverse();
mql.addEventListener("change", reverseTabs);

let activeTab = 0;
toggleClassTrans(activeTab);
projects[activeTab].classList.add('show');

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