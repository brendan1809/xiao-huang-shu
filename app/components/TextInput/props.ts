// stores component props

import {
  GestureResponderEvent,
  StyleProp,
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native"

// extend text component with react native text props
export interface TextInputProps extends RNTextInputProps {
  title?: string
  error?: any
  isPasswordField?: boolean
  onPress?: (event: GestureResponderEvent) => void
  containerStyle?: StyleProp<ViewStyle>
  textFieldStyle?: StyleProp<ViewStyle>
  textFieldContainer?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  errorMessage?: string
  rightIcon?: any
}
