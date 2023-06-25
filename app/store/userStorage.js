import * as SecureStore from "expo-secure-store";

const key = "user";

const storeUser = async (user) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(user));
  } catch (error) {
    console.error("Error storing the user", error);
  }
};

const getUser = async () => {
  try {
    const user = await SecureStore.getItemAsync(key);
    return JSON.parse(user);
  } catch (error) {
    console.error("Error getting the user", error);
  }
};

const deleteUser = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing the user", error);
  }
};

export default { getUser, storeUser, deleteUser };
