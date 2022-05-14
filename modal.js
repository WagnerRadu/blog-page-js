const addBtn = document.getElementById('addButton');
const modalBg = document.getElementById('modal-bg');
const cancelBtn = document.getElementById('closeModalBtn');
const saveBtn = document.getElementById("saveModalBtn");

function openModal() {
    modalBg.classList.add('modal-active');
}

function closeModal() {
    modalBg.classList.remove('modal-active');
}

addBtn.addEventListener('click', function() {
    openModal();
    saveBtn.addEventListener("click", addArticle)
});

cancelBtn.addEventListener('click', closeModal);

const inputTitle = document.getElementById("input-title");
const inputTag = document.getElementById("input-tag");
const inputAuthor = document.getElementById("input-author");
const inputDate = document.getElementById("input-date");
const inputUrl = document.getElementById("input-url");
const inputContent = document.getElementById("input-content");

function addArticle() {
    const article = {
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
    }).then(function() {
        getArticlesFromServer();
        closeModal();
    });
}

