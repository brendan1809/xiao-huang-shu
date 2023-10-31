import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import firestore from "@react-native-firebase/firestore"
import useUserStore from "utils/storage/userStore"
import { useNavigation } from "@react-navigation/native"

GoogleSignin.configure({
  webClientId: "191841855764-1ue3v8n1uvd72j0nttd351otad3tk6on.apps.googleusercontent.com",
})

const checkIfUserExists = async (user) => {
  const navigation = useNavigation()
  const { setUser } = useUserStore()
  try {
    const userDoc = await firestore().collection("users").doc(user.id).get()

    setUser(userDoc)
    if (userDoc.exists) {
      console.log("login user")
      navigation.navigate("home")
      // Login user
    } else {
      console.log("create user")
      navigation.navigate("home")
      await storeUserDataInFirestore(user)
    }
  } catch (error) {
    console.error("Error checking user existence:", error)
  }
}

const storeUserDataInFirestore = async (user) => {
  try {
    const userRef = firestore().collection("users").doc(user.id) // Assuming "users" is the collection name.

    // You can set user data in the document.
    await userRef.set({
      displayName: user?.name,
      email: user?.email,
      image: user?.photo,
      // Add any other user data you want to store.
    })

    // Check if the user exists after storing their data.
  } catch (error) {
    console.error("Error storing user data:", error)
  }
}

const onGoogleButtonPress = async () => {
  try {
    const userInfo = await GoogleSignin.signIn()

    const { user } = userInfo

    await checkIfUserExists(user)
  } catch (error) {
    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("Google Play services not available or outdated")
    } else {
      console.error("Some other error happened:", error)
    }
  }
}

export const login = () => {
  onGoogleButtonPress()
}
