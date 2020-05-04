const router = require("express").Router();
const contacts = require("../controllers/contacts.controller");
  
//Create a contact
router.post('/contacts', contacts.create);

//Get all contacts
router.get('/contacts', contacts.findAll);

module.exports = router;