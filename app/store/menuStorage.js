import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menu_items (id integer primary key not null, name text, price text, description text, image text, category text);"
        );
      },
      reject,
      resolve
    );
  });
}

export function createMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into menu_items (id, name, price, description, image, category) values ${menuItems
        .map(
          (item) =>
            `(${item.id}, "${item.name}", "${item.price}","${item.description}","${item.image}", "${item.category}")`
        )
        .join(", ")}`
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select id, name, price, description, image, category from menu_items",
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
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `select id, name, price, description, image, category from menu_items WHERE name LIKE ? AND category IN (?,?,?)`,
          [`%${query}%`, ...activeCategories],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      });
    } catch (error) {
      console.error(error);
    }
  });
}
