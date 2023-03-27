'use strict';

/** 
 * Utilities 
 * **/

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

/** 
 * Components 
 * **/

class Link {
    constructor(title, url, colid = 0, secid = 0, linid = 0) {
        this.title = title;
        this.url = url;
        
        this.uiLinkElement = document.createElement('li');
        this.uiLinkElement.className = "list-group-item-op";
        this.uiLinkElement.id = `col${colid}_sec${secid}_lin${linid}`;
        this.uiLinkElement.innerHTML = `
            <div class="input-group mb-3">
                <input type="text" name="${this.uiLinkElement.id}_title" class="form-control" placeholder="Link Title" aria-label="Link Title" value="${this.title}">
                <span class="input-group-text"><i class="bi bi-link fs-5"></i></span>
                <input type="text" name="${this.uiLinkElement.id}_url" class="form-control" placeholder="http://www.xyz.com" aria-label="Link" value="${this.url}">
                <a class="btn btn-outline-success" href="#" role="button" id="${this.uiLinkElement.id}_a" data-bs-link-id="${this.uiLinkElement.id}" data-bs-toggle="modal" data-bs-target="#deleteALinkFormModal"><i class="bi bi-trash fs-6"></i></a>
                
            </div>`;

        //const liAComp = this.uiLinkElement.querySelector("div > a");
        const textElements = this.uiLinkElement.querySelectorAll("div > input");
        const textTitle = textElements[0];
        textTitle.onchange = function() {
            const index = this.name.indexOf('_title');
            const linkid = this.name.substring(0, index);
            const [cindex, sindex, lindex] = parseUIIDs(linkid);
            myPage.columns[cindex].sections[sindex].links[lindex].title = this.value;
        }
        const textLink = textElements[1];
        textLink.onchange = function() {
            const index = this.name.indexOf('_url');
            const linkid = this.name.substring(0, index);
            const [cindex, sindex, lindex] = parseUIIDs(linkid);
            myPage.columns[cindex].sections[sindex].links[lindex].url = this.value;
        }

    }
}

class Section {
    constructor(subcategory = "", links = [], colid = 0, secid = 0) {
        this.subcategory = subcategory;
        this.links = links;

        this.uiSectionElement = document.createElement('div');
        this.uiSectionElement.className = "card-body-op";
        this.uiSectionElement.id = createUIIDs(colid, secid);
        this.uiSectionElement.innerHTML = `
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Sub category" name="${this.uiSectionElement.id}_subcategory" value="${this.subcategory}">
                <a class="btn btn-outline-success" href="#" role="button" data-bs-toggle="modal" data-bs-target="#addNewLinkModal" data-bs-section-id="${this.uiSectionElement.id}"><i class="bi bi-file-earmark-plus fs-5"></i></a>
                <a class="btn btn-outline-success" href="#" role="button" data-bs-toggle="modal" data-bs-target="#deleteASectionFormModal" data-bs-section-id="${this.uiSectionElement.id}"><i class="bi bi-trash fs-5"></i></a>
            </div>
            <ul class='list-group list-group-flush' id='${this.uiSectionElement.id}_ul'></ul>`;
        this.pushLinks(this.links);

        const textElement = this.uiSectionElement.querySelector("div > input");
        textElement.onchange = function() {
            const index = this.name.indexOf('_subcategory');
            const sectionid = this.name.substring(0, index);
            const [cindex, sindex] = parseUIIDs(sectionid);
            myPage.columns[cindex].sections[sindex].subcategory = this.value;
        }

        
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
            <div class="card-header-op-e">
                <input type="text" class="form-control m-1" placeholder="Category" value="${this.category}">
                <span class="badge-e">
                    <a class="button-e" href="#" role="button" data-bs-toggle="modal" data-bs-target="#saveOnePageFormModal"><i class="icon-save-big"></i></a>
                    <a class="button-e" href="#" role="button" title="More Section" data-bs-toggle="modal" data-bs-target="#addNewSectionFormModal" data-bs-column-id="${this.columnid}"><i class="icon-add-big"></i></a>
                    <a class="button-e" href="#" role="button"><i class="icon-delete-big"></i></a>
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

    stringify() { // create a pure JSON object
        const pureOnePage = {
            columns: []
        };

        for (let col of this.columns) {
            const pureSections = [];
            for (let sec of col.sections) {
                const pureLinks = [];
                for (let link of sec.links) {
                    const pureLink = {
                        title: link.title,
                        url: link.url
                    };
                    pureLinks.push(pureLink);
                }
                const pureSection = {
                    subcategory: sec.subcategory,
                    links: pureLinks
                };
                pureSections.push(pureSection);
            }
            const pureCol = {
                category: col.category,
                columnid: col.columnid,
                sections: pureSections
            }
            pureOnePage.columns.push(pureCol);
        }

        console.log(pureOnePage);
        return JSON.stringify(pureOnePage);
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
                    <div class='card-header-op'>
                        <h5 class='card-title-op'>${col.category}</h5>
                    </div>
                `;
    
                // Show each Sub category & List
                for (let section of col.sections) {
                    const divCardBody = document.createElement('div');
                    divCardBody.className = "card-body-op";
                    let innerHTMLForCardBody= `
                        <h6 class='card-title'>${section.subcategory}</h6>
                        <ul class='list-group-op'>`;
                        
                    for (let link of section.links) {
                        innerHTMLForCardBody += `
                            <li class='list-group-item-op'>
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

            // confirm for Saving
            createConfirmForm({
                isSubmit: true,
                name: "saveOnePageForm", 
                title: "Are you sure to Save the current data?",
                description: "The current data will be stored in the config file.",
                actionWhenShow: function(event) {
                    console.log("Save confirm showing...");                    
                },
                action: function(form) {
                    console.log("Yes is clicked !");
                    const dataToPost = form.elements[`${form.name}_onePageData`];
                    dataToPost.value = myPage.stringify();
                    savePageConfig(form);
                    }
                });

            // confirm for Add a Section addNewSectionModal
            createConfirmForm({
                isSubmit: false,
                name: "addNewSectionForm", 
                title: "Are you sure to add a new Section into this column?",
                description: "The section will be added at the bottom of this column.",
                actionWhenShow: function(event) {
                    console.log("Add a new section confirm showing");
                    
                    const customData = event.relatedTarget;
                    const columnid = customData.getAttribute('data-bs-column-id');
                    console.log(`${columnid}`);
                    const form = document.forms[this.name];
                    form.reset();

                    form.elements[`${this.name}_id`].value = columnid;
                    //console.log(`sectionid = ${sectionid}`);
                    
                    //const uiConfirmModal = document.getElementById(`${this.name}Modal`);
                    //const modalTitle = uiConfirmModal.querySelector('.modal-title');
                    //modalTitle.textContent = this.title + ` _${linkid}_`;
            
                    },
                action: function(form) {
                        console.log("Add a new Section is clicked !");
                        //const hiddenField = form.elements[`${form.name}_id`]; 
                        //console.log(hiddenField.value);
                        console.log(`Going to add ${form.elements[`${form.name}_id`].value}`);
                        //removeSectionUI(form.elements[`${form.name}_id`].value);
                    }
                });


            // confirm for Delete a Section
            createConfirmForm({
                isSubmit: false,
                name: "deleteASectionForm", 
                title: "Are you sure to Delete this section?",
                description: "The section will be removed from this column.",
                actionWhenShow: function(event) {
                    console.log("Delete section confirm showing");
                    
                    const customData = event.relatedTarget;
                    const sectionid = customData.getAttribute('data-bs-section-id');
                    //const linkid = customData.getAttribute('data-bs-section-id');
                    const form = document.forms[this.name];

                    form.reset();

                    form.elements[`${this.name}_id`].value = sectionid;
                    console.log(`sectionid = ${sectionid}`);
                    
                    //const uiConfirmModal = document.getElementById(`${this.name}Modal`);
                    //const modalTitle = uiConfirmModal.querySelector('.modal-title');
                    //modalTitle.textContent = this.title + ` _${linkid}_`;
            
                    },
                action: function(form) {
                        console.log("Delete Yes of Section is clicked !");
                        //const hiddenField = form.elements[`${form.name}_id`]; 
                        //console.log(hiddenField.value);
                        console.log(`Going to remove ${form.elements[`${form.name}_id`].value}`);
                        //removeSectionUI(form.elements[`${form.name}_id`].value);
                    }
                });
            
            // confirm for Delete a link
            createConfirmForm({
                isSubmit: false,
                name: "deleteALinkForm", 
                title: "Are you sure to Delete this link?",
                description: "The link will be removed from this section.",
                actionWhenShow: function(event) {
                    console.log("Delete confirm showing");
                    
                    const customData = event.relatedTarget;
                    const linkid = customData.getAttribute('data-bs-link-id');
                    const form = document.forms[this.name];

                    form.reset();

                    form.elements[`${this.name}_id`].value = linkid;
                    console.log(`linkid = ${linkid}`);
                    
                    //const uiConfirmModal = document.getElementById(`${this.name}Modal`);
                    //const modalTitle = uiConfirmModal.querySelector('.modal-title');
                    //modalTitle.textContent = this.title + ` _${linkid}_`;
            
                    },
                action: function(form) {
                        console.log("Delete Yes is clicked !");
                        //const hiddenField = form.elements[`${form.name}_id`]; 
                        //console.log(hiddenField.value);
                        removeLinkUI(form.elements[`${form.name}_id`].value);
                    }
                });    
        }
    }

}

/** 
 * Supports for Components' behaviors: UI & data
 **/

/**
 * confirmForm 
 * confirmModal {
 *      isSubmit: true/false (to create a Form and then submit or not)
 *      name: "saveOnePageForm",
 *      title: "Are you sure to Save the current data?",
 *      description: "The current data will be stored in the config file."
 *      actionWhenShow: script to handle when show the Modal
 *      action: script to handle when the Yes is clicked
 * }
 */
function createConfirmForm(confirmForm) {
    const theForm = document.createElement('form');
    theForm.name = confirmForm.name;
    let innerHTML = `
        <div class="modal fade" id="${confirmForm.name}Modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${confirmForm.name}_label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">${confirmForm.title}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </div>
                    <div class="modal-body">${confirmForm.description}</div>
                    <div class="modal-footer">`;
    if (confirmForm.isSubmit) {
        innerHTML += `<input type="hidden" readonly name="${confirmForm.name}_onePageData">`;
    }else {
        innerHTML += `<input type="hidden" readonly name="${confirmForm.name}_id">`;
    }
    innerHTML += `                             
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" name="${confirmForm.name}_yesBut">Yes</button>
                    </div>
                </div>
            </div>
        </div>`;

    theForm.innerHTML = innerHTML;

    const yesBut = theForm.elements[`${confirmForm.name}_yesBut`];
    yesBut.onclick = () => confirmForm.action(theForm);

    const forms = document.getElementById("forms");
    forms.append(theForm);
    
    const uiConfirmModal = document.getElementById(`${confirmForm.name}Modal`);
    uiConfirmModal.addEventListener('show.bs.modal', event => confirmForm.actionWhenShow(event));
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
    console.log(li);
    const ul = li.parentNode;
    const [colid, secid, liid] = parseUIIDs(linkid);
    console.log(`${colid} - ${secid} - ${liid}`);
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

const URL_PAGE_CONFIG = "http://localhost:3030/pageconfig";

function savePageConfig(form) {
    const formData = new FormData(form);

    const promise = fetch(URL_PAGE_CONFIG, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.info(`Save successful! ${result.status}`);
            console.info(result);
        })
        .catch(error => {
            console.error(error);
        });
}

function loadPageConfig(isEdit = false) {

    const promise = fetch(URL_PAGE_CONFIG)
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

const TEST_PAGE = {
    columns: [
        {
            "category": "Test Category",
            "columnid": "col0",
            "sections": [
                {
                    "subcategory": "sub test",
                    "links": [
                        {
                            "title": "Dzone",
                            "url": "https://dzone.com/"
                        },
                        {
                            "title": "The New Stack",
                            "url": "https://thenewstack.io/category/frontend-dev/"
                        }
                    ]
                }
            ]
        }
    ]
}

let myPage = new OnePage(EMPTY_PAGE);
