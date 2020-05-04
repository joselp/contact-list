const Contact = require('../models/contact')

exports.create = async (req, res) => {
  const contact = new Contact(req.body)
  try {
    await contact.save()
    res.status(201).send(contact)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.findAll = async (req, res) => {
  try {
    const contacts = await Contact.find({})
    res.send(contacts)
  } catch (e) {
    res.status(500).send()
  }
}
