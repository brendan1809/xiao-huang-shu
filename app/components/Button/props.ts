import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native"

export interface ButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  title?: string
  loading?: boolean
}
