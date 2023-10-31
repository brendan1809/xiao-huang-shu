import { Screen } from "components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"
import { useNavigation } from "@react-navigation/native"

export const TemplateScreen = () => {
  const navigation = useNavigation<any>()

  return (
    <Screen>
      <View style={style.container}></View>
    </Screen>
  )
}
