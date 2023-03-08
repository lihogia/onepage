'use strict';

function createUIIDs(colid = 0, secid = -1, linid = -1) {
    let uiIDs = `col${colid}`;
    if (secid > -1) {
        uiIDs = `${uiIDs}_sec${secid}`;
        if (linid > -1) {
            uiIDs = `${uiIDs}_lin${linid}`;
        }
    }
    return uiIDs;
}

/**
 * Parse short strings like: col0 , sec0 , lin0
 * @param uiID ~ col0 , sec0 , lin0
 * @returns: index 0 get from the uiID
 */
function getIndex(uiID) {
    return Number.parseInt(uiID.slice(3));
}

/** Parse long string like: col0_sec0_lin0 */
function parseUIIDs(uiIDs) {
    let IDs = uiIDs.split('_');
    if (IDs.length == 1) { //it's col0
        return [getIndex(IDs[0])];
    }

    if (IDs.length == 2) { //it's col0_sec0
        return [getIndex(IDs[0]), getIndex(IDs[1])];
    }

    if (IDs.length == 3) { //it's col0_sec0_lin0
        return [getIndex(IDs[0]), getIndex(IDs[1]), getIndex(IDs[2])];
    }

    return [];
}

class Link {
    constructor(title, url, colid = 0, secid = 0, linid = 0) {
        this.title = title;
        this.url = url;
        
        this.uiLinkElement = document.createElement('li');
        this.uiLinkElement.className = "list-group-item";
        this.uiLinkElement.id = `col${colid}_sec${secid}_lin${linid}`;
        this.uiLinkElement.innerHTML = `
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Link Title" aria-label="Link Title" value="${this.title}">
                <span class="input-group-text"><i class="bi bi-link fs-5"></i></span>
                <input type="link" class="form-control" placeholder="http://www.xyz.com" aria-label="Link" value="${this.url}">
                <a class="btn btn-outline-secondary" href="#" role="button" id="${this.uiLinkElement.id}_a"><i class="bi bi-trash fs-6"></i></a>
            </div>`;

        const liAComp = this.uiLinkElement.querySelector("div > a");
        //console.log(liAComp);
        if (liAComp) {
            liAComp.addEventListener('click', () => {
                removeLinkUI(this.uiLinkElement.id);

            })
        }
    }
}

class Section {
    constructor(subcategory = "", links = [], colid = 0, secid = 0) {
        this.subcategory = subcategory;
        this.links = links;

        this.uiSectionElement = document.createElement('div');
        this.uiSectionElement.className = "card-body";
        this.uiSectionElement.id = createUIIDs(colid, secid);
        this.uiSectionElement.innerHTML = `
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Sub category" name="${this.uiSectionElement.id}_subcategory" value="${this.subcategory}">
                <a class="btn btn-outline-primary" href="#" role="button" data-bs-toggle="modal" data-bs-target="#addNewLinkModal" data-bs-section-id="${this.uiSectionElement.id}"><i class="bi bi-file-earmark-plus fs-5"></i></a>   
            </div>
            <ul class='list-group list-group-flush' id='${this.uiSectionElement.id}_ul'></ul>`;
        this.pushLinks(this.links);
        
    }

    pushLinks(links) {
        const ulComp = this.uiSectionElement.querySelector("div > ul");
        
        if (ulComp) {
            for (let link of links) {
                ulComp.appendChild(link.uiLinkElement);
            }
        }
    }

    insertLink(index = -1, link) {
        this.links = insert(this.links, index, link);
        this.pushLinks([link]);
    }

    removeLink(index = 0) {
        const li = this.links[index];
        const ulComp = this.uiSectionElement.querySelector("div > ul");
        if (ulComp) {
            ulComp.removeChild(li.uiLinkElement);
        }
        this.links = remove(this.links, index);
    }
}

class Column {
    constructor(columnid = "col0", category = "", sections = []) {
        this.columnid = columnid;
        this.category = category;
        this.sections = sections;

        this.uiColumnElement = document.createElement('div');
        this.uiColumnElement.className = "card";
        this.uiColumnElement.innerHTML = `
            <div class="card-header text-bg-primary d-flex justify-content-between align-items-center">
                <input type="text" class="form-control m-1" placeholder="Category" value="${this.category}">
                <span class="badge bg-primary rounded-pill">
                    <a class="btn btn-primary " href="#" role="button"><i class="bi bi-save fs-5"></i></a>
                    <a class="btn btn-primary " href="#" role="button" title="More Section"><i class="bi bi-file-earmark-plus fs-5"></i></a>
                    <a class="btn btn-primary " href="#" role="button"><i class="bi bi-trash fs-5"></i></a>
                </span>
            </div>`;
        for (let section of this.sections) {
            this.uiColumnElement.append(section.uiSectionElement);
        }
    }

    insertSection(index = -1, section) {
        this.sections = insert(this.sections, index, section);
    }

    removeSection(index = -1) {
        this.sections = remove(this.sections, index);
    }
}

class OnePage {
    constructor(pageConfig, isEdit = false) {
        this.columns = [];
        this.isEdit = isEdit;

        let colindex = -1;
        for (let col of pageConfig.columns) {
            colindex ++;
            let secs = col.sections;
            let sections = [];
            let secindex = -1;
            for (let sec of secs) {
                secindex ++;
                let lis = sec.links;
                let links = [];
                let linindex = -1;
                for (let li of lis) {
                    linindex ++;
                    let link = new Link(li.title, li.url, colindex, secindex, linindex);
                    links.push(link);
                }
                sections.push(new Section(sec.subcategory, links, colindex, secindex));
            }
            this.columns.push(new Column(col.columnid, col.category, sections));
        }
    }

    load() {
        if (!this.isEdit) {
            for (let col of this.columns) {
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
    
        }else {
            for (let col of this.columns) {
                const elemColumn = document.getElementById(col.columnid);
                elemColumn.innerHTML = "";
                elemColumn.append(col.uiColumnElement);
            }
            activateAddLinkModal('addNewLinkModal');
        }
    }

}

function insert(arr, index = 0, item) {
    let newArr = [];
    if (arr == null) {
        newArr.push(item);
        return newArr;
    }
    const len = arr.length;

    if (index <= 0) {
        newArr = [item, ...arr];
    }else if(index >= len) {
        newArr = [...arr, item];
    }else {
        for (let i = 0; i < index; i++) {
            newArr.push(arr[i]);
        }
        newArr.push(item);
        for (let i = index; i < len; i++) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

function remove(arr, index = 0) {
    let newArr = [];
    if (arr == null) {
        return newArr;
    }
    const len = arr.length;
    if (index < 0 || index > len) {
        newArr = arr;
    }else if (index == 0) {
        for (let i = 1; i < len; i++) {
            newArr.push(arr[i]);
        }
    }else {
        for (let i = 0; i < index; i++) {
            newArr.push(arr[i]);
        }
        for (let i = index + 1; i < len; i++) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}


function removeLinkUI(linkid) {
    const li = document.getElementById(linkid);
    const ul = li.parentNode;
    const [colid, secid, liid] = parseUIIDs(linkid);
    myPage.columns[colid].sections[secid].removeLink(liid);
}

function activateAddLinkModal(id) {
    const addLinkModal = document.getElementById(id);

    addLinkModal.addEventListener('show.bs.modal', event => {
        const but = event.relatedTarget;
        const sectionid = but.getAttribute('data-bs-section-id');

        const section_subcategory = document.forms.onepage.elements[`${sectionid}_subcategory`];

        const modalTitle = addLinkModal.querySelector('.modal-title');
        modalTitle.textContent = `Add new Link for "${section_subcategory.value}"`;

        const addLinkForm = document.forms.addNewLinkForm;
        addLinkForm.reset();
        const saveBut = addLinkForm.elements['addNewLinkModal_SaveBut'];
        saveBut.onclick = function() {
            const [cindex, sindex] = parseUIIDs(sectionid);
            const section = myPage.columns[cindex].sections[sindex];
            
            const newlindex = section.links.length;
            const link = new Link(addLinkForm.title.value, addLinkForm.link.value, cindex, sindex, newlindex);

            section.insertLink(section.links.length, link);
        }

    });
}

function loadPage(onePage, isEdit = false) {
    if (isEdit) {
        onePage.load();
    }else {
        for (let col of onePage.columns) {
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
}

function loadPageConfig(isEdit = false) {
    const url = "http://localhost:3030/pageconfig";

    const promise = fetch(url)
        .then(response => response.json())
        .then(result => {
            console.info('Successful load JSON data');
            myPage = new OnePage(result, isEdit);
            myPage.load();
        })
        .catch(error => {
            console.error(error);
            setTimeout(loadPageConfig, 2000, isEdit);
        });
}

const EMPTY_PAGE = {
    columns: []
};

let myPage = new OnePage(EMPTY_PAGE);
