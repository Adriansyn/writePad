const router = require('express').Router()
const fs = require('fs')
const path = require('path')

router.get('/notes', (req, res) => {
    const rawData = fs.readFileSync(path.join(__dirname, '../db/db.json'))
    const savedNote = JSON.parse(rawData)
    res.status(200).json(savedNote)
}
);
router.post('/notes', (req, res) => {
    const rawData = fs.readFileSync(path.join(__dirname, '../db/db.json'))
    const savedNote = JSON.parse(rawData)
    const newNote= req.body
    newNote.id = savedNote.length + 1
    savedNote.push(newNote)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),JSON.stringify(savedNote))
    res.status(200).json(savedNote)
}


);
router.delete('/notes/:id', (req, res) => {
    const rawData = fs.readFileSync(path.join(__dirname, '../db/db.json'))
    let savedNote = JSON.parse(rawData)
    const deleteId= req.params.id
    savedNote=savedNote.filter(s => s.id != deleteId) 
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),JSON.stringify(savedNote))
    res.status(200).json(savedNote)
}
);



module.exports=router