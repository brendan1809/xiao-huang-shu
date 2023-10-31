import { Screen } from "components"
import React from "react"
import { Platform, Text, TouchableOpacity, View } from "react-native"
import { style } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { login } from "./helper/login"
import { Button } from "components/Button"

export const LoginScreen = () => {
  const navigation = useNavigation<any>()

  const onPress = () => {
    login(navigation)
  }

  return (
    <Screen>
      <View style={style.container}>
        <Text style={{ color: "black", fontSize: 30 }}>Login</Text>
        <Text style={{ color: "black", fontSize: 18, marginTop: 50 }}>
          Login to get to see what's inside to comment and like any post you like
        </Text>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button onPress={onPress} title="Sign In with Google" />
        </View>
      </View>
    </Screen>
  )
}
