import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import { StyleProp, TextStyle } from "react-native"

export interface TextProps {
  errorType?: string
  customMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | any
  style?: StyleProp<TextStyle>
}
