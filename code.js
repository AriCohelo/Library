let myLibrary = [{
    title: 'bestiario',
    author: 'julio cortazar',
    pages: 200,
    status: 'readed',
    cover: 'covers/bestiario.png',
    info: function () {
        return bookInfo.call(this);
    }

}, {
    title: 'el lobo estepario',
    author: 'hermann hesse',
    pages: 250,
    status: 'readed',
    cover: 'covers/loboestepario.jpeg',
    info: function () {
        return bookInfo.call(this);
    }

}, {
    title: 'la casa de los espiritus',
    author: 'isabel allende',
    pages: 300,
    status: 'readed',
    cover: 'covers/espiritus.jpeg',
    info: function () {
        return bookInfo.call(this);
    }

}, {
    title: 'el mundo como voluntad y representacion',
    author: 'arthur schopenhauer',
    pages: 290,
    status: 'not readed',
    cover: 'covers/voluntad.jpg',
    info: function () {
        return bookInfo.call(this);
    }

}


];
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function () {
        return bookInfo.call(this);
    }
}

function bookInfo() {
    return `title: ${this.title}, author: ${this.author}, 
            pages: ${this.pages}, status: ${this.status}`;
}

function addBookToTheLibrary(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status)
    myLibrary.push(newBook)

}

function deleteBook(event) {
    // The event.target represents the element that triggered the event (in this case, the Delete button)
    let deleteButton = event.target;

    // Use closest() to find the closest ancestor element with the class "bookCard"
    let bookCard = deleteButton.closest('.bookCard');

    if (bookCard) {
        // Now you have a reference to the parent book card element, and you can manipulate or remove it as needed
        bookCard.remove();
    }
}


function bookOnCard() {
    bookCardsContainer.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        bookCardsContainer.appendChild(bookCard);
        // bookCard.setAttribute('data-index', i);

        // //borrar
        // let index = bookCard.getAttribute('data-index');
        // console.log(index);

        let cover = document.createElement('img')
        cover.classList.add('cover');
        cover.src = myLibrary[i].cover ? myLibrary[i].cover : 'Covers/generic.png';
        bookCard.appendChild(cover);

        let infoParag = document.createElement('p');
        let bookInfo = myLibrary[i].info();
        bookInfo = bookInfo.replace(/, /g, '<br>');
        infoParag.classList.add('infoParag')
        infoParag.innerHTML = bookInfo;
        bookCard.appendChild(infoParag);

        let deleteButton = document.createElement('button');
        deleteButton.innerText = '-'
        bookCard.appendChild(deleteButton)
        deleteButton.addEventListener('click', deleteBook)
    }
}


let addBookButton = document.getElementById('addBookButton');
let modal = document.getElementById('modal')
addBookButton.addEventListener('click', () => {
    modal.showModal();
})

let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', submit)

function submit(event) {
    event.preventDefault();
    let status = '';
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let readed = document.getElementById('readed');
    let notReaded = document.getElementById('notReaded')
    readed.checked ? status = 'readed' : status = 'not readed';
    addBookToTheLibrary(title.value, author.value, pages.value, status);
    bookOnCard();
    modal.close();
    title.value = '';
    author.value = '';
    pages.value = '';
    notReaded.checked = true;

}

bookOnCard();


modificar cosas