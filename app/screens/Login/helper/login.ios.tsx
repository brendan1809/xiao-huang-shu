import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import firestore from "@react-native-firebase/firestore"
import useUserStore from "utils/storage/userStore"
import flash from "config/flash"

GoogleSignin.configure({
  webClientId: "191841855764-1ue3v8n1uvd72j0nttd351otad3tk6on.apps.googleusercontent.com",
})

const checkIfUserExists = async (user, navigation) => {
  try {
    const userDoc = await firestore().collection("users").doc(user.id).get()

    if (userDoc.exists) {
      useUserStore.setState({ user })
      navigation.reset({
        index: 0,
        routes: [{ name: "home" }],
      })
      flash("success", "Login Successfully")
    } else {
      await storeUserDataInFirestore(user, navigation)
    }
  } catch (error) {
    console.error("Error checking user existence:", error)
  }
}

const storeUserDataInFirestore = async (user, navigation) => {
  try {
    const userRef = firestore().collection("users").doc(user.id)

    await userRef.set({
      displayName: user?.name,
      email: user?.email,
      image: user?.photo,
      userId: user?.id,
    })
    useUserStore.setState({ user })
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    })
    flash("success", "Login Successfully")
  } catch (error) {
    console.error("Error storing user data:", error)
  }
}

const onGoogleButtonPress = async (navigation) => {
  try {
    const userInfo = await GoogleSignin.signIn()

    const { user } = userInfo

    await checkIfUserExists(user, navigation)
  } catch (error) {
    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("Google Play services not available or outdated")
    } else {
      console.error("Some other error happened:", error)
    }
  }
}

export const login = (navigation) => {
  onGoogleButtonPress(navigation)
}
