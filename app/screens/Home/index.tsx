import { Screen } from "components"
import React from "react"
import { View } from "react-native"
import { style } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { translate } from "i18n"

export const HomeScreen = () => {
  const navigation = useNavigation<any>()

  return (
    <Screen>
      <View style={style.container}></View>
    </Screen>
  )
}
