axios.get('/api/notes')
  .then(({ data }) => {
    console.log(data)
    data.forEach(note => {
      let notesElem = document.createElement('li')
      if (note.isDone) {
        noteElem.classList.add('done')
      } else {
        noteElem.classList.add('notDone')
      }
      noteElem.innerHTML = `
        <span>${note.text}</span>
        <button 
          data-id="${note.id}"
          data-done="${note.isDone}"
          class="complete">✓</button>
        <button
          data-id="${note.id}" 
          class="delete">X</button>
      `
      document.getElementById('notes').append(noteElem)
    })
  })
  .catch(err => console.error(err))


document.getElementById('addNote').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/notes', {
    text: document.getElementById('text').value,
    isDone: false
  })
    .then(({ data }) => {

      document.getElementById('text').value = ''

      let noteElem = document.createElement('li')
      noteElem.classList.add('notDone')
      notelem.innerHTML = `
        <span>${data.text}</span>
        <button 
          data-id="${data.id}"
          data-done="${data.isDone}"
          class="complete">✓</button>
        <button
          data-id="${data.id}" 
          class="delete">X</button>
      `
      document.getElementById('notes').append(noteElem)
    })
    .catch(err => console.error(err))
})

document.addEventListener('click', event => {
  if (event.target.className === 'complete') {

    axios.put(`/api/notes/${event.target.dataset.id}`, {
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
    axios.delete(`/api/notes/${event.target.dataset.id}`)
      .then(() => {
        event.target.parentNode.remove()
      })
      .catch(err => console.error(err))
  }
})