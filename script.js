document.getElementById('new-book').addEventListener('click', toggleFormVisibility)
document.getElementById('submit-form').addEventListener('click', addBookToLibrary)
document.getElementById('library-table').addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('remove-button')) {
    removeFromLibrary(event.target.dataset.index)
  }

  if (event.target && event.target.classList.contains('read-button')) {
    changeReadStatus(event.target.dataset.index)
  }
})
document.addEventListener('DOMContentLoaded', function() {
  displayBooks()
})



const libraryTableBody = document.getElementById('library-table')

class Book {
  constructor(title, author, number_of_pages, read) {
    this.title = title
    this.author = author
    this.number_of_pages = number_of_pages
    this.read = read

    this.reading_status = function () {
      if (read === true) {
        return 'read'
      } else {
        return 'not read yet'
      }
    }

    
    this.info = function () {
      return `${this.title} by ${this.author}, ${this.number_of_pages} pages, ${this.reading_status()}`
    }

    this.toggleReadStatus = function() {
      this.read = !this.read
    }

  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', true)
const toKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 281, false)
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', 432, true)

const myLibrary = [theHobbit, toKillAMockingbird, prideAndPrejudice]


function displayBooks() {
  libraryTableBody.innerHTML = ''

  for (const book of myLibrary) {
    const row = createRow(book, libraryTableBody)
    libraryTableBody.appendChild(row)
  }

}

function createRow(book) {
  const row = document.createElement('tr')
  addDataToRow(row, book, 'title')
  addDataToRow(row, book, 'author')
  addDataToRow(row, book, 'number_of_pages')
  addDataToRow(row, book, 'read')
  addRemoveButton(row, myLibrary.indexOf(book))
  addToggleReadButton(row, myLibrary.indexOf(book))
  return row
}

function addDataToRow(row, book, property) {
  const tableData = document.createElement('td')
  tableData.textContent = book[property]
  row.appendChild(tableData)
}

function toggleFormVisibility() {
  const formContainer = document.getElementById('book-form')
  if (formContainer.style.display === 'none') {
    formContainer.style.display = 'block'
  } else {
    formContainer.style.display = 'none'
  }
}

function addBookToLibrary() {
  const form = document.getElementById('book-form')
  const { title, author, number_of_pages, read } = getBookInfo()

  const newBook = new Book(title, author, number_of_pages, read)
  myLibrary.push(newBook)
  createRow(newBook, libraryTableBody)
  
  displayBooks()
}

function getBookInfo() {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const number_of_pages = document.getElementById('number_of_pages').value
  const read = document.getElementById('read').checked
  toggleFormVisibility()
  return { title, author, number_of_pages, read }
}

function addRemoveButton(row, index) {
  const removeButton = document.createElement('button')
  removeButton.textContent = 'Remove'
  removeButton.className = 'remove-button'
  removeButton.dataset.index = index
  row.appendChild(removeButton)
}

function removeFromLibrary(data_index) {
  myLibrary.splice(data_index, 1)
  displayBooks()
}

function addToggleReadButton(row, index) {
  const toggleReadButton = document.createElement('button')
  toggleReadButton.textContent = 'Change Read Status'
  toggleReadButton.className = 'read-button'
  toggleReadButton.dataset.index = index
  row.appendChild(toggleReadButton)
}


function changeReadStatus(data_index) {
  myLibrary[data_index].toggleReadStatus()
  displayBooks()
}