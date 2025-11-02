const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const DATA_FILE = path.join(__dirname, 'sample-data.json')

// helper: load data
function loadData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

app.get('/api/transactions', (req, res) => {
  const data = loadData()
  res.json(data)
})

// simple health
app.get('/api/health', (req,res) => res.json({ ok: true }))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API listening on ${port}`))
