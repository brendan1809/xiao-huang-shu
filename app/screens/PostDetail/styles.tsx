import { colors } from "colors"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  bottomStickyBar: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    bottom: 0,
    flexDirection: "row",
    paddingHorizontal: 10,
    position: "absolute",
    width: "100%",
  },
  commentContainer: { flexDirection: "row", justifyContent: "space-between" },
  commentTextInput: { width: "90%" },
  commentTextInputContainer: { alignItems: "center", flex: 1, flexDirection: "row" },
  container: { height: "100%", margin: 10, paddingBottom: 80 },
  likeContainer: { alignItems: "center", marginRight: 10 },
  mt10: { marginTop: 10 },
  nameContainer: {
    marginTop: 10,
  },
  nameText: { fontSize: 18, fontWeight: "600" },
  sendLogo: { marginLeft: 10 },
  text: { fontSize: 18, fontWeight: "600", marginTop: 10 },
  titleText: { fontSize: 30, fontWeight: "bold", marginTop: 10 },
})
