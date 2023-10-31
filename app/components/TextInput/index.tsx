import { colors } from "colors"
import { ErrorMessage } from "components/ErrorMessageText"
import { Text } from "components/Text"
import React, { useState } from "react"
import { View, TextInput as RNTextInput, TouchableOpacity } from "react-native"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { TextInputProps } from "./props"
import { style as styles } from "./styles"

// Simple reusable component, handles simple ui or functions
export const TextInput = (props: TextInputProps) => {
  const {
    title,
    error,
    onPress,
    isPasswordField = false,
    containerStyle,
    titleStyle,
    textFieldStyle,
    textFieldContainer,
    errorMessage,
    rightIcon,
    ...restProps
  } = props

  const [isVisible, setIsVisible] = useState(false)

  // --------------------RENDER
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        <TouchableOpacity onPress={onPress && onPress}>
          <View
            pointerEvents={onPress ? "none" : "auto"}
            style={[styles.textFieldContainer, error && styles.errorTextField, textFieldContainer]}
          >
            <RNTextInput
              style={[styles.textField, textFieldStyle]}
              secureTextEntry={isPasswordField && !isVisible}
              placeholderTextColor={colors.placeholder}
              {...restProps}
            />
            {isPasswordField && (
              <Icon
                name={isVisible ? "eye" : "eye-off"}
                color={colors.passwordIcon}
                size={24}
                onPress={() => setIsVisible(!isVisible)}
              />
            )}
            {rightIcon && rightIcon()}
          </View>
        </TouchableOpacity>

        {error && <ErrorMessage errorType={error.type} customMessage={errorMessage} />}
      </View>
    </>
  )
}
