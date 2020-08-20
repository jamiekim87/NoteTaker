const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
const uuid = require('uuid')

// GET all items
router.get('/api/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// POST one item
router.post('api/notes', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let items = JSON.parse(data)
    let item = {
      id: uuid.v1(),
      text: req.body.text,
      isDone: req.body.isDone
    }
    items.push(item)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(items), err => {
      if (err) { console.log(err) }

      res.json(item)
    })
  })
})

// PUT one item
router.put('api/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let items = JSON.parse(data)

    for (let i = 0; i < items.length; i++) {
      if (items[i].id === req.params.id) {
        items[i].isDone = req.body.isDone
      }
    }

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(items), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

// DELETE one item
router.delete('api/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let items = JSON.parse(data)
    items = items.filter(item => item.id !== req.params.id)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(items), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

module.exports = router