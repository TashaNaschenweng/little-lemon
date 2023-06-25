import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

const createTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);"
        );
      },
      reject,
      resolve
    );
  });
};

export function createMenuItems(menuItems) {
  const menuItemValues = menuItems
    .map(
      (item) =>
        `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`
    )
    .join(", ");

  db.transaction((tx) => {
    tx.executeSql(
      `insert into menuitems (id, name, price, description, image, category) values ?`,
      [menuItemValues]
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select id, name, price, description, image, category from menuitems",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select id, name, price, description, image, category from menuitems WHERE name LIKE ? AND category IN (?,?,?)`,
        [`%${query}%`, ...activeCategories],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
}

export default {
  createTable,
  createMenuItems,
  getMenuItems,
  filterByQueryAndCategories,
};
