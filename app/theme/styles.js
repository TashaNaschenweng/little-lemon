import Constants from "expo-constants";

import colors from "./colors";

export default {
  appContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.white,
  },
  viewContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.light,
    paddingTop: Constants.statusBarHeight,
  },
  contentContainer: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 5,
    backgroundColor: colors.white,
  },

  colors,

  btnPrimary: {
    backgroundColor: colors.primaryYellow,
    borderRadius: 8,
    color: colors.dark,
    display: "flex",
    height: 45,
    justifyContent: "center",
  },
  btnOutline: {
    backgroundColor: "transparent",
    borderColor: colors.primaryGreen,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    margin: 5,
  },
  btnSecondary: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    margin: 5,
  },
  btnPrimaryText: {
    fontSize: 20,
    fontFamily: "Karla-Bold",
    color: colors.dark,
    textAlign: "center",
  },
  btnSecondaryText: {
    fontSize: 14,
    fontFamily: "Karla-Bold",
    color: colors.dark,
    textAlign: "center",
  },

  textSectionTitle: {
    fontSize: 20,
    fontFamily: "Karla-Bold",
    color: colors.dark,
    textAlign: "left",
    marginVertical: 10,
  },
  textSubTitle: {
    fontSize: 40,
    fontFamily: "MarkaziText-Medium",
    color: colors.primaryGreen,
    textAlign: "center",
  },

  message: {
    paddingLeft: 10,
    fontFamily: "Karla-Bold",
    fontSize: 16,
    color: colors.primaryGreen,
    marginTop: "auto",
    marginBottom: "auto",
  },
  msgSuccess: {
    backgroundColor: "#BCD1CA",
    borderRadius: 8,
    height: 50,
    width: "100%",
  },
};
