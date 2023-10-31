import { Text } from "components/Text"
import React from "react"
import { translate } from "../../i18n/translate"
import { TextProps } from "./props"
import { style as styles } from "./styles"

// Simple reusable component, handles simple ui or functions
export const ErrorMessage = (props: TextProps) => {
  const { style, customMessage, errorType } = props

  const renderErrorMessage = (error) => {
    const errMsg = error === "required" ? translate("errors.required") : customMessage

    if (error || customMessage) {
      return <Text style={[styles.errorText, style]}>{errMsg}</Text>
    }

    return null
  }

  // --------------------RENDER
  return renderErrorMessage(errorType)
}
