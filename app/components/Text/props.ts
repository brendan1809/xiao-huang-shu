import { ReactText } from "react"
import { TextProps as ReactNativeTextProps } from "react-native"

export interface TextProps extends ReactNativeTextProps {
  children?: ReactText | any
}
