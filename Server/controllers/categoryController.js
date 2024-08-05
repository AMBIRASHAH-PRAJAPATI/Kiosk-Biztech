import CategoryModel from "../model/categoryModel.js";
import slugify from "slugify";
import ProductModel from "../model/productModel.js";

// *-------------------
// * Get All category
// *-------------------

const getAllcategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While gettig all categories",
    });
  }
};

// *-------------------
// * Get category hide deleted maarked
// *-------------------

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({ deleted: { $ne: true } });
    res.status(200).send({
      success: true,
      message: "All category List",
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting categories",
      error,
    });
  }
};

// *-------------------
// * Single category
// *-------------------

const getSinglecategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While gettig single categories",
    });
  }
};

// *-------------------
// * Create category
// *-------------------

const createcategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExist = await CategoryModel.findOne({ name });
    if (categoryExist) {
      return res.status(200).send({
        success: true,
        message: "category already Exists",
      });
    }
    const newcategory = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New category Created",
      newcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category creation",
    });
  }
};

// *-------------------
// * update category
// *-------------------

const updatecategory = async (req, res) => {
  try {
    const { name, deleted } = req.body;
    const { id } = req.params;
    const updateData = { name, slug: slugify(name) };

    if (typeof deleted !== "undefined") {
      updateData.deleted = deleted;
    }

    const category = await CategoryModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).send({
      success: true,
      message: "category updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category update",
    });
  }
};

// *-------------------
// * permanent delete category
// *-------------------

const CascadeDeletecategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Delete all products in this category
    await ProductModel.deleteMany({ category: categoryId });
    // Delete the category itself
    await CategoryModel.findByIdAndDelete(categoryId);

    res.status(200).send({
      success: true,
      message: "Category and all related products deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting category",
      error: error.message,
    });
  }
};

// *-------------------
// * soft delete category
// *-------------------

const ensureUncategorizedCategory = async () => {
  let uncategorized = await CategoryModel.findOne({ name: "Others" });

  if (!uncategorized) {
    uncategorized = new CategoryModel({
      name: "Others",
      slug: "uncategorized",
      deleted: false, // Ensure this is not marked as deleted
    });
    await uncategorized.save();
  }

  return uncategorized;
};

ensureUncategorizedCategory();

const deletecategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const uncategorized = await ensureUncategorizedCategory();

    await ProductModel.updateMany(
      { category: categoryId },
      { category: uncategorized._id }
    );

    await CategoryModel.findByIdAndUpdate(categoryId, { deleted: true });
    // await CategoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Category marked as deleted and products reassigned",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category Delete",
    });
  }
};

export default {
  getAllcategory,
  getCategories,
  getSinglecategory,
  createcategory,
  updatecategory,
  CascadeDeletecategory,
  deletecategory,
};
