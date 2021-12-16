const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema(
      {

            name:
            {
                  type: String,
                  required: true
            },
            author:
            {
                  type: String,
                  required: true
            },
            category:
            {
                  type: String,
                  required: true
            }

          

      },

      { timestamps: true }

)

module.exports = mongoose.model('bookModel_Hiring', bookSchema)

