const express = require('express')
require('./config/db.config')
const contactRouter = require('./routes/contact.route')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(contactRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})