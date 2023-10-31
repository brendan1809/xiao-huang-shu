import firebase from "config/firebase"

const authAuthorization = firebase.auth()
const authProviders = firebase.auth

export const login = async () => {
  const data = await authAuthorization.signInWithPopup(new authProviders.GoogleAuthProvider())
  return data
}
