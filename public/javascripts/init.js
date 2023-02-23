'use strict';

let myPage = {
    columns: []
};

function loadPage(pageConfig) {
    for (let col of pageConfig.columns) {
        let elemColumn = document.getElementById(col.columnid);
        elemColumn.innerHTML = "";

        // Show Category
        const divCard = document.createElement('div');
        divCard.className = "card";
        divCard.innerHTML = `
            <div class='card-header text-bg-info'>
                <h5 class='card-title'>${col.category}</h5>
            </div>
        `;

        // Show each Sub category & List
        for (let section of col.sections) {
            const divCardBody = document.createElement('div');
            divCardBody.className = "card-body";
            let innerHTMLForCardBody= `
                <h6 class='card-title'>${section.subcategory}</h6>
                <ul class='list-group list-group-flush'>`;
                
            for (let link of section.links) {
                innerHTMLForCardBody += `
                    <li class='list-group-item'>
                        <a href="${link.url}" target="_blank">${link.title}</a>
                    </li>`;
            }
            
            innerHTMLForCardBody += `
                </ul>`;

            divCardBody.innerHTML = innerHTMLForCardBody;
            divCard.append(divCardBody);
        }

        elemColumn.append(divCard);
    }
}

window.onload = () => {
    loadPage(myPage);
    setTimeout(loadPageConfig, 2000);
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