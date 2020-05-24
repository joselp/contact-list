const router = require("express").Router();
const contacts = require("../controllers/contacts.controller");
const { check, validationResult, body } = require('express-validator');

//Create a contact
router.post('/contacts', [
    body('', 'must be an array').isArray(),
    body('*.owner', 'must have an owner').notEmpty(),
    body('*.email', 'Invalid email').optional().isEmail(),
    body('*.phoneNumber', 'Invalid phone number').optional().isMobilePhone("any")],
    contacts.create);

//Update a contact
router.patch('/contacts', [
    body('owner', 'must provide the owner').notEmpty(),
    body('email', 'Invalid email').optional().isEmail(),
    body('phoneNumber', 'Invalid phone number').optional().isMobilePhone("any")],
    contacts.update);

//Get all contacts
router.get('/contacts', contacts.findAll);

module.exports = router;