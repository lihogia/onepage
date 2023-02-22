'use strict';

let myPage = {
    columns: []
};

function loadPage(pageConfig) {
    for (let col of pageConfig.columns) {
        let elemColumn = document.getElementById(col.columnid);
        elemColumn.innerHTML = "";
        elemColumn.appendChild(document.createTextNode(col.category));
        let ul = document.createElement('ul');
        elemColumn.append(ul);
        for (let section of col.sections) {
            ul.appendChild(document.createTextNode(section.subcategory));
            for (let link of section.links) {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${link.url}" target="_blank">${link.title}</a>`;
                ul.append(li);
            }
            
        }
    }
}

window.onload = () => {
    loadPage(myPage);
    setTimeout(loadPageConfig, 0);
}        

function loadPageConfig() {
    const url = "http://localhost:3030/pageconfig";

    const promise = fetch(url)
        .then(response => response.json())
        .then(result => {
            console.info('Successful load JSON data');
            loadPage(result);
        })
        .catch(error => {
            console.error(error);
            setTimeout(loadPageConfig, 2000);
        });
}