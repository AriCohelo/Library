const myLibrary = [{
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




function bookOnBookCard() {
    for (let i = 0; i < myLibrary.length; i++) {
        let bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        bookCardsContainer.appendChild(bookCard);

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

    }

}
addBookToTheLibrary('un libro', 'de alguien', 100000, 'nose')
bookOnBookCard();

let addBookButton = document.getElementById('addBookButton');
let modal = document.getElementById('modal')
addBookButton.addEventListener('click', () => {
    modal.showModal();
})

let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', submit)

function submit() {
    event.preventDefault();
    let title = document.getElementById('title')
    console.log(title.value);
}