const main = document.getElementById("main");

const addBtn = document.getElementById('addButton');
const modalBg = document.getElementById('modal-bg');
const cancelBtn = document.getElementById('closeModalBtn');

const inputTitle = document.getElementById("input-title");
const inputTag = document.getElementById("input-tag");
const inputAuthor = document.getElementById("input-author");
const inputDate = document.getElementById("input-date");
const inputUrl = document.getElementById("input-url");
const inputContent = document.getElementById("input-content");

let saveBtn = document.getElementById("saveModalBtn");

function getArticlesFromServer() {
    fetch("http://localhost:3000/articles")
        .then((response) => {
            response.json().then(articles => renderArticles(articles));
        })
}

function renderArticles(articles) {
    for (let i = 0; i < articles.length; i++) {
        let article = createArticle(articles[i]);
        main.appendChild(article);
    }
}

function createArticle(article) {
    let articleNode = document.createElement("article");
    articleNode.setAttribute("class", "article");
    let titleNode = document.createElement("h1");
    titleNode.textContent = article.title;
    titleNode.setAttribute("class", "title");
    articleNode.appendChild(titleNode);

    let ulNode = document.createElement("ul");
    ulNode.setAttribute("class", "details-list");

    let liNode1 = document.createElement("li");
    liNode1.setAttribute("class", "details-item");
    liNode1.textContent = article.tag;
    ulNode.appendChild(liNode1);

    let liNode2 = document.createElement("li");
    liNode2.setAttribute("class", "details-item");
    liNode2.textContent = "Added by ";
    let span = document.createElement("span");
    span.setAttribute("class", "details-span");
    span.textContent = article.author;
    liNode2.appendChild(span);
    ulNode.appendChild(liNode2);

    let liNode3 = document.createElement("li");
    liNode3.setAttribute("class", "details-item");
    liNode3.textContent = article.date;
    ulNode.appendChild(liNode3);

    articleNode.appendChild(ulNode);

    let editContainer = addEditContainer(article);
    articleNode.appendChild(editContainer);

    let img = document.createElement("img");
    img.setAttribute("class", "image");
    img.setAttribute("src", article.imgUrl);
    articleNode.appendChild(img);

    let p = document.createElement("p");
    p.setAttribute("class", "text");
    p.textContent = article.content;
    articleNode.appendChild(p);

    return articleNode;
}

function addEditContainer(article) {
    let editContainer = document.createElement("div");
    editContainer.setAttribute("class", "edit-container");
    let editBtn = createEditButton(article);
    let vBar = document.createElement("p");
    vBar.setAttribute("class", "edit-button");
    vBar.textContent = "|";
    let deleteBtn = createDeleteButton(article.id);
    editContainer.appendChild(editBtn);
    editContainer.appendChild(vBar);
    editContainer.appendChild(deleteBtn);
    return editContainer;
}

function createEditButton(article) {
    let editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit-button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function() {
        refreshSaveButton();
        saveBtn.addEventListener("click", () => editArticle(article.id));
        inputTitle.value = article.title;
        inputTag.value = article.tag;
        inputAuthor.value = article.author;
        inputDate.value = article.date;
        inputUrl.value = article.imgUrl;
        inputContent.value = article.content;
        openModal();
    });
    return editBtn;
}

function createDeleteButton(id) {
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "edit-button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteArticle(id));
    return deleteBtn;
}

addBtn.addEventListener('click', function () {
    refreshSaveButton();
    saveBtn.addEventListener("click", addArticle);
    openModal();
});

cancelBtn.addEventListener('click', closeModal);

function openModal() {
    modalBg.classList.add('modal-active');
}

function closeModal() {
    modalBg.classList.remove('modal-active');
    clearModal();
}

function clearModal() {
    inputTitle.value = "";
    inputTag.value = "";
    inputAuthor.value = "";
    inputDate.value = "";
    inputUrl.value = "";
    inputContent.value = "";
}

function clearPage() {
    while (main.lastElementChild) {
        main.removeChild(main.lastElementChild);
      }
}

function refreshSaveButton() {
    let newSaveBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
    saveBtn = document.getElementById("saveModalBtn");
}

function addArticle() {
    let article = {
        title: inputTitle.value,
        tag: inputTag.value,
        author: inputAuthor.value,
        date: inputDate.value,
        imgUrl: inputUrl.value,
        content: inputContent.value
    }

    fetch("http://localhost:3000/articles", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(article)
    }).then(function () {
        clearPage();
        getArticlesFromServer();
        clearModal();
        closeModal();
    });
}

function deleteArticle(id) {
    fetch(`http://localhost:3000/articles/${id}`, {
        method: "DELETE",
    }).then(function() {
        clearPage();
        getArticlesFromServer();
    }); 
}

function editArticle(id) {
    let article = {
        title: inputTitle.value,
        tag: inputTag.value,
        author: inputAuthor.value,
        date: inputDate.value,
        imgUrl: inputUrl.value,
        content: inputContent.value
    }
    fetch(`http://localhost:3000/articles/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(article)
    }).then(function () {
        clearPage();
        getArticlesFromServer();
        clearModal();
        closeModal();
        refreshSaveButton();
    });
}

console.log("ok");
getArticlesFromServer();