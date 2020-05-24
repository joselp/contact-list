const aqp = require('api-query-params');
const Contact = require('../models/contact')
const Exception = require('../models/exception')
const { validationResult } = require('express-validator'); 
const { validateUpdate } = require('./contacts.validator')

exports.create = async (req, res) => {
  const { email, phoneNumber } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(new Exception(errors.array()));
  }

  await Contact.insertMany(req.body).then(docs => {
    res.status(201).send(docs)
    return;
  }).catch(error => {
    if (error.code === 11000) {
      res.status(400).send(new Exception("Contact already exist in your list", error));
      return;
    }
    res.status(500).send(new Exception("Internal Error", error));
    return
  })
}

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(new Exception(errors.array()));
  }

  const { email, phoneNumber, owner } = req.query;

  if(!validateUpdate(owner, phoneNumber, email)) {
    res.status(400).send(new Exception("Must provide an email or phoneNumber"));
    return;
  }

  const { filter } = aqp(req.query);
  
  contact = new Contact(req.body);
  console.log('contact', contact)

  try {
    contact = await Contact.findOneAndUpdate(filter, req.body);
    console.log("Updated", contacts);
    res.status(201).send(contact)
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).send(new Exception("Contact already exist in your list", e))
    }
    res.status(500).send(e)
  }
}

exports.findAll = async (req, res) => {
  try {
    const { filter, skip, limit, sort, projection, population, fields } = aqp(req.query);

    const contacts = await Contact.find(filter)
      .skip(skip)
      .limit(limit)

    res.send(contacts)
  } catch (e) {
    res.status(500).send()
  }
}
