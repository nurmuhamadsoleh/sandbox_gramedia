const { success, failed } = require("../../config/response");
const { type_books } = require("../../models");

exports.get = async ({ query }, res) => {
  const where = {};
  if (query.id) where.id = query.id;
  try {
    const data = await type_books.findAll({
      where
    });
    return res.json(success({ message: "data buku berhasil diterima", data }));
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.show = async ( req, res) => {
  const where = {id : req.params.id};
 
  try {
    const data = await type_books.findAll({
      where
    });
    return res.json(success({ message: "data berhasil diterima", data: data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};

exports.create = async ({ body }, res) => {
  try {
    const payload = {
      name: body.name
    };
    const data = await type_books.create(payload);
    return res.json(success({ message: "data berhasil ditambahkan", data }));
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.update = async ({ body }, res) => {
  try {
    const payload = {
      name: body.name
    };
    const where = {
      id: body.id,
    };
    const data = await type_books.update(payload, { where });
    return res.json(
      success({
        message: "data berhasil diperbarui",
        data: { ...where, ...payload },
      })
    );
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.del = async ({ body }, res) => {
  try {
    const where = {
      id: body.id,
    };
    const data = await type_books.destroy({ where });
    if (data)
      return res.json(
        success({
          message: "data berhasil dihapus",
          data,
        })
      );
    else throw "Buku tidak ditemukan";
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};