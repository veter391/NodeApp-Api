const Contacts = require('../models/contacts')
const createPath = require('../helpers/create-path')

const getContact = (req, res) => {
    const title = 'Contacts'
    Contacts.find()
        .then(contacts => res.render(createPath('contacts'), { contacts, title }))
        .catch(err => {
            console.log(err)
            res.render(createPath('error'), { title: 'Error' })
        })
}

module.exports = {
    getContact
}