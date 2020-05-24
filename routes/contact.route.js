const router = require("express").Router();
const contacts = require("../controllers/contacts.controller");
const { check, validationResult, body, query } = require('express-validator');

//Create a contact
router.post('/contacts', [
    body('', 'must be an array').isArray(),
    body('*.owner', 'must have an owner').notEmpty(),
    body('*.email', 'Invalid email').optional().isEmail(),
    body('*.phoneNumber', 'Invalid phone number').optional().isMobilePhone("any")],
    contacts.create);

//Update a contact
router.patch('/contacts', [
    query('_id', 'must provide the id').notEmpty()],
    contacts.update);

//Get all contacts
router.get('/contacts', contacts.findAll);

//Delete a contact
router.delete('/contacts', [
    query('_id', 'must provide the _id').notEmpty()],
    contacts.delete);

module.exports = router;