/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { View, useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import FlashMessage from "react-native-flash-message"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import useUserStore from "utils/storage/userStore"
import flash from "config/flash"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  home: undefined
  login: undefined
  postDetail: undefined
  createPost: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, navigationBarColor: colors.background }}>
      <Stack.Screen
        name="login"
        component={Screens.LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        component={Screens.HomeScreen}
        options={({ navigation }) => ({
          title: "",
          headerRight: () => {
            const { clearUser, user } = useUserStore()
            return (
              <View>
                <Icon
                  onPress={() => {
                    GoogleSignin.signOut()
                    clearUser()
                    flash("success", "Log out successfully")
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "login" }],
                    })
                  }}
                  name="logout"
                  size={24}
                  color="red"
                />
              </View>
            )
          },
        })}
      />

      <Stack.Screen
        name="createPost"
        component={Screens.CreatePostScreen}
        options={{
          title: "Create Post",
        }}
      />
      <Stack.Screen
        name="postDetail"
        component={Screens.PostDetailScreen}
        options={{
          title: "",
        }}
      />
      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
      <FlashMessage titleStyle={{ fontSize: 17, textAlign: "center" }} />
    </NavigationContainer>
  )
})
