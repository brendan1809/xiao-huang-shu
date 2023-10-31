import React from "react"
import { Text as RNText } from "react-native"
import { TextProps } from "./props"
import { style as styles } from "./styles"

// Simple reusable component, handles simple ui or functions
export const Text = (props: TextProps) => {
  const { children, ...restProps } = props

  // --------------------RENDER
  return (
    <RNText style={styles.text} {...restProps}>
      {children}
    </RNText>
  )
}
