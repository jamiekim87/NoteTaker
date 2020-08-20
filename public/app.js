
axios.get('/api/notes')
.then(({ data }) => {
  console.log(data)
  data.forEach(notes => {
    let notesElem = document.createElement('li')
    if (item.isDone) {
      itemElem.classList.add('done')
    } else {
      itemElem.classList.add('notDone')
    }
    itemElem.innerHTML = `
      <span>${item.text}</span>
      <button 
        data-id="${item.id}"
        data-done="${item.isDone}"
        class="complete">✓</button>
      <button
        data-id="${item.id}" 
        class="delete">X</button>
    `
    document.getElementById('items').append(itemElem)
  })
})
.catch(err => console.error(err))


document.getElementById('addItem').addEventListener('click', event => {
event.preventDefault()
axios.post('/api/items', {
  text: document.getElementById('text').value,
  isDone: false
})
  .then(({ data }) => {

    document.getElementById('text').value = ''

    let itemElem = document.createElement('li')
    itemElem.classList.add('notDone')
    itemElem.innerHTML = `
      <span>${data.text}</span>
      <button 
        data-id="${data.id}"
        data-done="${data.isDone}"
        class="complete">✓</button>
      <button
        data-id="${data.id}" 
        class="delete">X</button>
    `
    document.getElementById('items').append(itemElem)
  })
  .catch(err => console.error(err))
})

document.addEventListener('click', event => {
if (event.target.className === 'complete') {

  axios.put(`/api/items/${event.target.dataset.id}`, {
    isDone: event.target.dataset.done === 'false'
  })
    .then(() => {
      if (event.target.dataset.done === 'false') {
        event.target.dataset.done = 'true'
        event.target.parentNode.classList.add('done')
        event.target.parentNode.classList.remove('notDone')
      } else {
        event.target.dataset.done = 'false'
        event.target.parentNode.classList.add('notDone')
        event.target.parentNode.classList.remove('done')
      }
    })
    .catch(err => console.error(err))
} else if (event.target.className === 'delete') {
  axios.delete(`/api/items/${event.target.dataset.id}`)
    .then(() => {
      event.target.parentNode.remove()
    })
    .catch(err => console.error(err))
}
})