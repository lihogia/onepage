'use strict';

class Link {
    constructor(title, url) {
        this.title = title;
        this.url = url;
    }
}

class Section {
    constructor(subcategory = "", links = []) {
        this.subcategory = subcategory;
        this.links = links;
    }

    insertLink(index = -1, link) {
        this.links = insert(this.links, index, link);
    }

    removeLink(index = 0) {
        this.links = remove(this.links, index);
    }
}

class Column {
    constructor(columnid = "col1", category = "", sections = []) {
        this.columnid = columnid;
        this.category = category;
        this.sections = sections;
    }

    insertSection(index = -1, section) {
        this.sections = insert(this.sections, index, section);
    }

    removeSection(index = -1) {
        this.sections = remove(this.sections, index);
    }
}

class OnePage {
    constructor(pageConfig) {
        this.columns = [];
        for (let col of pageConfig.columns) {
            let secs = col.sections;
            let sections = [];
            for (let sec of secs) {
                let lis = sec.links;
                let links = [];
                for (let li of lis) {
                    let link = new Link(li.title, li.url);
                    links.push(link);
                }
                sections.push(new Section(sec.subcategory, links));
            }
            this.columns.push(new Column(col.columnid, col.category, sections));
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


function removeLink(linkid) {
    const li = document.getElementById(linkid);
    const ul = li.parentNode;

    const [colid, secid, liid] = linkid.split('_');
    let empty;
    [empty, secid] = secid.split('section');
    secid = Number.parseInt(secid);
    [empty, liid] = liid.split('link');
    liid = Number.parseInt(liid);
    
    myPage.columns[colid].sections[secid].removeLink(liid);
    ul.removeChild(li);
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
            let link = new Link(addLinkForm.title.value, addLinkForm.link.value);

            let [colid, secindex] = sectionid.split("_");
            
            let [empty1, cindex] = colid.split("col");
            cindex = Number.parseInt(cindex);
            let [empty2, sindex] = secindex.split("section");
            sindex = Number.parseInt(sindex);
            //console.log(`${colid}-${cindex}, ${secindex}-${sindex}`);
            //console.log(`${myPage.columns[cindex].sections[sindex].subcategory}`);
            let section = myPage.columns[cindex].sections[sindex];
            //console.log(`${section.subcategory}`);
            section.insertLink(section.links.length, link);
            //section.insertLink(0, link);

            const li = document.createElement('li');
            li.id = `${sectionid}_link${myPage.columns[cindex].sections[sindex].links.length}`;
            li.className = "list-group-item";
            li.innerHTML = `
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Link Title" aria-label="Link Title" value="${link.title}">
                    <span class="input-group-text"><i class="bi bi-link fs-5"></i></span>
                    <input type="link" class="form-control" placeholder="http://www.xyz.com" aria-label="Link" value="${link.url}">
                    <a class="btn btn-outline-secondary " href="#" role="button"><i class="bi bi-trash fs-6"></i></a>
                </div>
            `;
            const ul = document.getElementById(sectionid).querySelector("ul");
            ul.append(li);

        }

    });
}


function loadPage(onePage, isEdit = false) {
    
    for (let col of onePage.columns) {
        let elemColumn = document.getElementById(col.columnid);
        elemColumn.innerHTML = "";

        // Show Category
        const divCard = document.createElement('div');
        divCard.className = "card";

        if (isEdit) {
            divCard.innerHTML = `
                <div class="card-header text-bg-primary d-flex justify-content-between align-items-center">
                    <input type="text" class="form-control m-1" placeholder="Category" value="${col.category}">
                    <span class="badge bg-primary rounded-pill">
                        <a class="btn btn-primary " href="#" role="button"><i class="bi bi-save fs-5"></i></a>
                        <a class="btn btn-primary " href="#" role="button" title="More Section"><i class="bi bi-file-earmark-plus fs-5"></i></a>
                        <a class="btn btn-primary " href="#" role="button"><i class="bi bi-trash fs-5"></i></a>
                    </span>
                </div>  
            `;

            // Show each Sub category & List
            let index = -1;
            for (let section of col.sections) {
                index++;
                const divCardBody = document.createElement('div');
                divCardBody.className = "card-body";
                divCardBody.id = `${col.columnid}_section${index}`;

                let innerHTMLForCardBody= `
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Sub category" name="${divCardBody.id}_subcategory" value="${section.subcategory}">
                        <a class="btn btn-outline-primary" href="#" role="button" data-bs-toggle="modal" data-bs-target="#addNewLinkModal" data-bs-section-id="${divCardBody.id}"><i class="bi bi-file-earmark-plus fs-5"></i></a>   
                    </div>
                    <ul class='list-group list-group-flush'>`;
                  
                let lindex = -1;
                for (let link of section.links) {                    
                    lindex ++;
                    let linkid = `${divCardBody.id}_link${lindex}`;
                    innerHTMLForCardBody += `
                        <li class="list-group-item" id="${linkid}">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Link Title" aria-label="Link Title" value="${link.title}">
                                <span class="input-group-text"><i class="bi bi-link fs-5"></i></span>
                                <input type="link" class="form-control" placeholder="http://www.xyz.com" aria-label="Link" value="${link.url}">
                                <a class="btn btn-outline-secondary" href="#" role="button"><i class="bi bi-trash fs-6"></i></a>
                            </div>
                        </li>`;

                    const liComp = document.getElementById(linkid);
                    if (liComp) {
                        const liAComp = liComp.querySelector("div > a");
                        if (liAComp) {
                            liAComp.addEventListener('click', () => {
                                removeLink(linkid);
                            })
                        }
                        console.log(liAComp);
                    }
                    
                }
                
                innerHTMLForCardBody += `
                    </ul>`;

                divCardBody.innerHTML = innerHTMLForCardBody;
                divCard.append(divCardBody);
            }
            activateAddLinkModal('addNewLinkModal');

        }else {
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
        }
        elemColumn.append(divCard);
    }
}

function loadPageConfig(isEdit = false) {
    const url = "http://localhost:3030/pageconfig";

    const promise = fetch(url)
        .then(response => response.json())
        .then(result => {
            console.info('Successful load JSON data');
            const onepage = new OnePage(result);

            //console.log(result);
            //console.log(onepage.columns[0].sections[0]);
            loadPage(onepage, isEdit);
            myPage = onepage;
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
