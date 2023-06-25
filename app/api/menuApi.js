const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const apiResponse = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

const getMenuCategories = async () => {
  try {
    const json = await apiResponse();
    const categories = json.menu.map((item) => item.category);
    return categories;
  } catch (error) {
    console.error(error);
  }
};

const getMenuItems = async () => {
  try {
    const json = await apiResponse();
    const menu = json.menu.map((item, index) => ({
      id: index + 1,
      name: item.name,
      price: item.price.toString(),
      description: item.description,
      image: item.image,
      category: item.category,
    }));
    return menu;
  } catch (error) {
    console.error(error);
  }
};

export default { getMenuCategories, getMenuItems };
