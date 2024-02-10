const { default: mongoose } = require('mongoose')
const Schema = mongoose.Schema

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
    // automatichal date
}, { timestamps: true })

const Contacts = mongoose.model('Contacts', contactsSchema)

module.exports = Contacts