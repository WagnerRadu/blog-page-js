const main = document.getElementById("main");

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

    let editContainer = document.createElement("div");
    editContainer.setAttribute("class", "edit-container");

    let editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit-button");
    editBtn.textContent = "Edit";
    let vBar = document.createElement("p");
    vBar.setAttribute("class", "edit-button");
    vBar.textContent = "|";
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "edit-button");
    deleteBtn.textContent = "Delete";
    editContainer.appendChild(editBtn);
    editContainer.appendChild(vBar);
    editContainer.appendChild(deleteBtn);
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

console.log("ok");
getArticlesFromServer();