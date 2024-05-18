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

    const findMenu = await Menu.findOne({ menuName: menuName });
    if (findMenu) {
      return res.status(409).json({ message: "Menu already in database" });
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
  const { menuName, menuOrder, categories, id } = req.body;


  try {
    if (!menuName || !menuOrder) {
      return res
        .status(400)
        .json({ message: "Name, menuOrder, and categoryId are required" });
    }

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { menuName, menuOrder, categories },
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

export const getMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const findMenu = await Menu.findById(id);

    if (!findMenu) {
      return res.status(500).json({ message: "Menu not found" });
    }

    res.status(200).json(findMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
