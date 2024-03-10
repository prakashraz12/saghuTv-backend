import { Category } from "../models/category.model.js";

// Create category
export const createCategory = async (req, res) => {
  const { categoryName, categoryDescription } = req.body;

  try {
    if (!categoryName) {
      return res.status(400).json({ message: "Category name is missing" });
    }

    const newCategory = await Category.create({
      categoryName,
      categoryDescription,
    });

    return res
      .status(201)
      .json({ message: "Category created successfully", newCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//get categoryBy id;
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Category not found" });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    res.status(200).json({message:'category fetched', category})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update category
export const updateCategory = async (req, res) => {
  const { categoryName, categoryDescription, id } = req.body;
  console.log(id)

  try {
    if (!categoryName) {
      return res.status(400).json({ message: "Category name is missing" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName, categoryDescription },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get list of category
export const getListOfCategory = async (req, res) => {
  try {
    const list = await Category.find();

    if (!list) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({ message: "Category list successfully fetched", list });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
