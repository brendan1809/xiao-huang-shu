import { colors } from "colors"
import { StyleSheet } from "react-native"
import { typography } from "theme"

export const style = StyleSheet.create({
  errorText: {
    color: colors.errorText,
    fontFamily: typography.primary.normal,
    marginBottom: 8,
  },
})
