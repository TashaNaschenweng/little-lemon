import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";

import Constants from "expo-constants";
import debounce from "lodash.debounce";

import menuApi from "../api/menuApi";
import {
  createTable,
  createMenuItems,
  getMenuItems,
  filterByQueryAndCategories,
} from "../store/menuStorage";
import { useUpdateEffect } from "../utils";

import Header from "../components/Header";
import Filters from "../components/Filters";
import Banner from "../components/Banner";
import MenuItem from "../components/MenuItem";

import defaultStyles from "../theme/styles";

const HomeScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [sections, setSections] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    sections.map(() => false)
  );

  useEffect(() => {
    (async () => {
      await createTable();
      let menuItems = await getMenuItems();

      if (!menuItems?.length) {
        menuItems = await menuApi.getMenuItems();
        await createMenuItems(menuItems);
      }

      setMenuItems(menuItems);

      let categories = menuItems.map((menuItem) => menuItem.category);
      setSections(
        categories.filter(function (item, pos) {
          return categories.indexOf(item) == pos;
        })
      );
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (selectedCategories.every((item) => item === false)) {
          return true;
        }
        return selectedCategories[i];
      });

      let menuItems = await filterByQueryAndCategories(
        query,
        activeCategories.length ? activeCategories : sections
      );

      setMenuItems(menuItems);
    })();
  }, [selectedCategories, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchText(text);
    debouncedLookup(text);
  };

  const handleCategoriesChange = async (index) => {
    const arrayCopy = [...selectedCategories];
    arrayCopy[index] = !selectedCategories[index];
    setSelectedCategories(arrayCopy);
  };

  const getImageUrl = (image) => {
    return `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`;
  };

  return (
    <View style={defaultStyles.viewContainer}>
      <Header navigation={navigation} />

      <ScrollView style={defaultStyles.appContainer}>
        <Banner
          handleSearchChange={handleSearchChange}
          searchText={searchText}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.filterHeader}>ORDER FOR DELIVERY!</Text>
          <ScrollView horizontal={true} style={styles.filterContainer}>
            <Filters
              selections={selectedCategories}
              onChange={handleCategoriesChange}
              sections={sections}
            />
          </ScrollView>

          <FlatList
            scrollEnabled={false}
            style={styles.listContainer}
            data={menuItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MenuItem
                name={item.name}
                price={item.price}
                description={item.description}
                imageUrl={getImageUrl(item.image)}
              />
            )}
            renderSectionHeader={({ section: { name } }) => (
              <Text style={styles.itemHeader}>{name}</Text>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  listContainer: {
    height: "100%",
    paddingHorizontal: 16,
  },
  itemHeader: {
    fontFamily: "Karla-ExtraBold",
    fontSize: 24,
    paddingVertical: 8,
    color: defaultStyles.colors.primaryGreen,
  },
  filterContainer: {
    height: 150,
  },
  filterHeader: {
    fontFamily: "Karla-ExtraBold",
    fontSize: 18,
    padding: 15,
    paddingBottom: 0,
  },
});

export default HomeScreen;
