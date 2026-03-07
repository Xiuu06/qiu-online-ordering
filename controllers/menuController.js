const MenuItem = require('../models/MenuItem');

const getMenuItems = async (req, res, next) => {
  try {
    const menuItems = await MenuItem.find({ available: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItems
};