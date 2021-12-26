const db = require("../models");
const Category = db.categories;

exports.create = (req, res) => {
  if (!req.body.category_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const category = new Category({
    category_name: req.body.category_name,
    target_sales: req.body.target_sales,
    current_sales: req.body.current_sales,
    percentage: req.body.percentage
  });

 category
    .save(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    });
};

exports.findAll = (req, res) => {
  const category_name = req.query.category_name;
  var condition = category_name ? { category_name: { $regex: new RegExp(category_name), $options: "i" } } : {};

  Category.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found category with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving category with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update category with id=${id}. Maybe category was not found!`
        });
      } else res.send({ message: "category was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating category with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Catgory.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete catgory with id=${id}. Maybe catgory was not found!`
        });
      } else {
        res.send({
          message: "catgory was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete catgory with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
 Category.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount}categorys were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing allcategorys."
      });
    });
};
