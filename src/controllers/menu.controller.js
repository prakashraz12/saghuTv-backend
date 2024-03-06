import { Menu } from "../models/menu.model.js";

// Create menu item
export const createMenu = async (req, res) => {
  const { menuName, menuOrder, categories } = req.body;

  try {
    if (!menuName || !menuOrder) {
      return res
        .status(400)
        .json({ message: "Name, menuOrder,  are required" });
    }

    const newMenu = await Menu.create({
      menuName,
      menuOrder,
      categories,
    });

    return res
      .status(201)
      .json({ message: "Menu item created successfully", newMenu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update menu item
export const updateMenu = async (req, res) => {
  const { name, menuOrder, categoryId, id } = req.body;

  try {
    if (!name || !menuOrder || !categoryId) {
      return res
        .status(400)
        .json({ message: "Name, menuOrder, and categoryId are required" });
    }

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { name, menuOrder, categoryId },
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    return res
      .status(200)
      .json({ message: "Menu item updated successfully", updatedMenu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete menu item
export const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    return res
      .status(200)
      .json({ message: "Menu item deleted successfully", deletedMenu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ orderMenu: 1 });
    console.log(menus);
    if (!menus || menus.length === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }

    return res
      .status(200)
      .json({ message: "Menu list fetched successfully", menus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
