import { Dimensions, StyleSheet } from "react-native"
import { typography } from "theme"

export const style = StyleSheet.create({
  button: { marginTop: 30 },
  container: { height: "100%", margin: 10 },
  fieldTitle: {
    alignSelf: "flex-start",
    fontFamily: typography.primary.normal,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  marginBottomTen: { alignItems: "center", marginBottom: 10 },
  uploadImage: {
    height: 1000,
    marginBottom: 20,
    maxHeight: Dimensions.get("screen").height * 0.4,
    maxWidth: Dimensions.get("screen").height * 0.3,
    width: 1000,
    zIndex: 100,
  },
})
