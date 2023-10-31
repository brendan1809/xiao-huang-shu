import { colors } from "colors"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  authorNameText: {
    marginTop: 8,
  },
  container: { height: "100%", margin: 10, paddingBottom: 40 },
  contentContainer: { flex: 1, marginTop: 12 },
  floatingButton: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 9999,
    bottom: 50,
    height: 60,
    justifyContent: "center",
    paddingBottom: 3,
    position: "absolute",
    right: 10,
    width: 60,
  },
  floatingButtonText: { color: colors.white, fontSize: 30, fontWeight: "bold" },
  image: { alignSelf: "stretch", height: 200 },
  likeContainer: { alignItems: "center", flexDirection: "row", justifyContent: "flex-end" },
  likeCountText: {
    marginBottom: 2,
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
})
