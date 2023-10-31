import { colors } from "colors"
import { StyleSheet } from "react-native"
import { typography } from "theme"

export const style = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
  },
  errorTextField: {
    borderColor: colors.error,
  },
  textField: {
    flex: 1,
    height: 40,
    padding: 4,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  textFieldContainer: {
    alignItems: "center",
    backgroundColor: colors.inputFieldBackground,
    borderColor: colors.inputFieldBorder,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 6,
    paddingRight: 10,
  },
  title: {
    fontFamily: typography.primary.normal,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    paddingLeft: 4,
  },
})
