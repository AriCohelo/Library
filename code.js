let myLibrary = [{
    title: 'bestiario',
    author: 'julio cortazar',
    pages: 200,
    status: 'read',
    cover: 'Covers/bestiario.png',
    info: function () {
        return bookInfo.call(this);
    },

}, {
    title: 'el lobo estepario',
    author: 'hermann hesse',
    pages: 250,
    status: 'read',
    cover: 'Covers/loboestepario.jpeg',
    info: function () {
        return bookInfo.call(this);
    }
}, {
    title: 'la casa de los espiritus',
    author: 'isabel allende',
    pages: 300,
    status: 'read',
    cover: 'Covers/espiritus.jpeg',
    info: function () {
        return bookInfo.call(this);
    }
}, {
    title: 'el mundo como voluntad y representacion',
    author: 'a. schopenhauer',
    pages: 290,
    status: 'unread',
    cover: 'Covers/voluntad.jpg',
    info: function () {
        return bookInfo.call(this);
    }
}];
function bookInfo() {
    return `title: ${this.title}, author: ${this.author}, 
            pages: ${this.pages}, status: ${this.status}`;
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function () {
        return bookInfo.call(this);
    }
}

Book.prototype.toggleStatus = function () {
    this.status === 'read' ? this.status = 'unread' : this.status = 'read';
    return this.status;
}

function bookOnCard() {
    bookCardsContainer.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let currentBook = new Book(myLibrary[i].title, myLibrary[i].author,
            myLibrary[i].pages, myLibrary[i].status, myLibrary[i].cover);

        let bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        bookCardsContainer.appendChild(bookCard);

        let cover = document.createElement('img');
        cover.classList.add('cover');
        cover.src = myLibrary[i].cover;
        bookCard.appendChild(cover);

        let bookcardInfo = document.createElement('div');
        bookcardInfo.setAttribute('id', 'bookcardInfo')
        bookCard.appendChild(bookcardInfo);

        bookcardInfo.innerHTML =
            `<p class="author info"><strong>title: </strong>${currentBook.title}</p>
             <p class="author info"><strong>author: </strong>${currentBook.author}</p>
             <p class="pages info"><strong>pages: </strong>${currentBook.pages}</p>`;

        let bookcardButtons = document.createElement('div');
        bookcardButtons.setAttribute('id', 'bookcardButtons');
        bookcardInfo.appendChild(bookcardButtons);

        let toggleButton = document.createElement('button');
        toggleButton.textContent = currentBook.status;
        toggleButton.textContent === 'read' ?
            toggleButton.style.color = 'green' : toggleButton.style.color = 'brown';

        bookcardButtons.appendChild(toggleButton);
        toggleButton.classList.add('toggleButton')
        toggleButton.addEventListener('click', function () {
            currentBook.toggleStatus();
            toggleButton.textContent = currentBook.status;
            toggleButton.textContent === 'read' ?
                toggleButton.style.color = 'green' : toggleButton.style.color = 'brown';
        })

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('trashCanIcon');
        svg.setAttribute("viewbox", "0 0 100 100");
        let useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useElement.setAttribute("href", "#trashCan");
        svg.appendChild(useElement);
        bookcardButtons.appendChild(svg);

        let deleteModal = document.getElementById('deleteModal');
        let deleteButton = document.getElementById('deleteButton');
        svg.addEventListener('click', () => {
            deleteModal.showModal();
            toBeDeleted = i;
        })
        deleteButton.addEventListener('click', deleteBook);
    }

}

function addBookToTheLibrary(title, author, pages, status, cover) {
    let newBook = new Book(title, author, pages, status, cover)
    newBook.cover === undefined ? newBook.cover = 'Covers/generic.png' : null;
    myLibrary.unshift(newBook);
    updateDOM();
}

function updateDOM() {
    bookCardsContainer.innerHTML = '';
    bookOnCard();
}

let toBeDeleted = undefined;
function deleteBook() {
    if (toBeDeleted !== undefined) {
        myLibrary.splice(toBeDeleted, 1);
        updateDOM();
        deleteModal.close();
        toBeDeleted = undefined;
    }
}

function submitNewBook(event) {
    event.preventDefault();
    let status = '';
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let read = document.getElementById('read');
    let unread = document.getElementById('unread')
    read.checked ? status = 'read' : status = 'unread';
    addBookToTheLibrary(title.value, author.value, pages.value, status);
    addModal.close();
    title.value = '';
    author.value = '';
    pages.value = '';
    unread.checked = true;
}

let addBookButton = document.getElementById('addBookButton');
let addModal = document.getElementById('addModal')
addBookButton.addEventListener('click', () => {
    addModal.showModal();
})

let submitNewBookButton = document.getElementById('submitNewBookButton');
submitNewBookButton.addEventListener('click', submitNewBook)

bookOnCard();