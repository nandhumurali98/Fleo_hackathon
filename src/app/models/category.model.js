module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        category_name: String,
        target_sales: Number,
        current_sales: Number,
        percentage:Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Category = mongoose.model("category", schema);
  return Category;
};
