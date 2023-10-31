import { Button, ErrorMessage, Screen, Text, TextInput } from "components"
import React, { useState } from "react"
import { Dimensions, Image, TouchableOpacity, View } from "react-native"
import { style } from "./styles"
import { useNavigation } from "@react-navigation/native"
import ImagePicker from "react-native-image-crop-picker"
import storage from "@react-native-firebase/storage"
import { Controller, useForm } from "react-hook-form"
import firestore from "@react-native-firebase/firestore"
import flash from "config/flash"
import useUserStore from "utils/storage/userStore"

export const CreatePostScreen = () => {
  const navigation = useNavigation<any>()
  const { control, handleSubmit, clearErrors, setValue, watch } = useForm({})
  const [loading, setLoading] = useState(false)

  const user = useUserStore((state) => state.user)

  const uploadImage = () => {
    ImagePicker.openPicker({
      includeBase64: true,
    }).then(async (image) => {
      const storageRef = storage().ref(`/images/${image.filename}`)
      await storageRef.putFile(image.path, { contentType: image.mime })
      const downloadURL = await storageRef.getDownloadURL()
      setValue("thumbnail", downloadURL)
      clearErrors("thumbnail")
    })
  }

  const createPost = async (data) => {
    const { title, thumbnail, description } = data
    try {
      const postRef = await firestore().collection("Post").doc()
      const postId = postRef.id

      console.log(postId, postRef)
      await postRef
        .set({
          postId,
          title,
          thumbnail,
          description,
          createdAt: new Date(),
          authorName: user?.name || "Brendan",
          likeCount: 0,
        })
        .then(async () => {
          flash("success", "Post create successfully")

          navigation.goBack()
        })
        .catch(() => {
          console.log("failed")
          flash("error", "Failed to create Post")
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (e) {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    await createPost(data)
  }

  return (
    <Screen>
      <View style={style.container}>
        <Text style={style.fieldTitle}>{"Image"}</Text>
        <Controller
          name="thumbnail"
          control={control}
          render={({ fieldState: { error } }) => {
            return (
              <>
                {watch("thumbnail") && (
                  <View style={style.marginBottomTen}>
                    <TouchableOpacity
                      style={{
                        maxHeight: Dimensions.get("screen").height * 0.4,
                        maxWidth: Dimensions.get("screen").height * 0.3,
                      }}
                      onPress={() => {
                        uploadImage()
                      }}
                    >
                      <Image
                        source={{ uri: watch("thumbnail") }}
                        resizeMode="stretch"
                        style={style.uploadImage}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {!watch("thumbnail") && (
                  <Button
                    title={"Upload"}
                    style={style.marginBottomTen}
                    onPress={() => {
                      uploadImage()
                    }}
                  />
                )}
                {error && <ErrorMessage customMessage={error?.message} />}
              </>
            )
          }}
        />

        <Controller
          name="title"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  error={error}
                  errorMessage={error?.message}
                  title={"Title"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={"Please enter title"}
                />
              </>
            )
          }}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  error={error}
                  errorMessage={error?.message}
                  title={"Description"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={"Please enter description"}
                />
              </>
            )
          }}
        />

        <Button
          loading={loading}
          style={style.button}
          onPress={handleSubmit(onSubmit)}
          title={"Create Post"}
        />
      </View>
    </Screen>
  )
}
