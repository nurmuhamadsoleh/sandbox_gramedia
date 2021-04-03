const { body, validationResult } = require("express-validator");
const {  type_books, Sequelize } = require("../../models");
const { failed } = require("../../config/response");

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(404).json(failed({ message: errors.array()[0].msg }));
  next();
};

exports.bookType = [
  body("name").notEmpty().withMessage("Tipe buku tidak boleh kosong"),
];

exports.putBookType = [
  body("id").notEmpty().withMessage("Id tipe tidak boleh kosong"),
  body("name").notEmpty().withMessage("Tipe buku tidak boleh kosong"),
];

exports.postValidator = [
  body("name", "nama type buku tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const type_book = await type_books.findOne({ where: { name: value } });
      if (type_book) {
        return Promise.reject("Nama type buku telah digunakan");
      }
    }),
  
];

exports.putValidator = [
  body("name", "nama type buku tidak boleh kosong")
    .notEmpty()
    .custom(async (value, { req }) => {
      const type_book = await type_books.findOne({
        where: { name: value, id: { [Sequelize.Op.ne]: req.body.id } },
      });
      if (type_book) return Promise.reject("Nama type buku telah digunakan");
    }),
 
];