import { Screen, TextInput } from "components"
import React, { useState, useEffect } from "react"
import {
  Image,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native"
import { style } from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import firestore from "@react-native-firebase/firestore"
import flash from "config/flash"
import moment from "moment"
import { colors } from "colors"
import Icons from "@expo/vector-icons/AntDesign"
import useUserStore from "utils/storage/userStore"

export const PostDetailScreen = () => {
  const route = useRoute()
  const navigation = useNavigation<any>()
  const postId = route?.params?.id || ""
  const { width, height } = useWindowDimensions()
  const [post, setPost] = useState(null) // Initialize post state as null
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentList, setCommentList] = useState([])
  const [comment, setComment] = useState("")

  const { user } = useUserStore()

  const fetchComments = async () => {
    const commentsRef = firestore().collection("comments")
    const querySnapshot = await commentsRef.where("postId", "==", postId).get()
    const commentsData = []

    querySnapshot.forEach((doc) => {
      commentsData.push(doc.data())
    })

    setCommentList(commentsData)
  }

  const fetchData = async () => {
    try {
      const postSnapshot = await firestore().collection("Post").doc(postId).get()
      const postData = postSnapshot.data()
      setPost(postData)
      setLikeCount(postData?.likeCount)
    } catch (error) {
      navigation.goBack()
      flash("error", "Failed to retrieve post")
    }
  }

  const likePost = async (userId, postId) => {
    firestore().collection("likes").add({ userId, postId })
    await firestore()
      .collection("Post")
      .doc(postId)
      .update({
        likeCount: likeCount + 1,
      })

    // Update the like count in the component state
    setLikeCount(likeCount + 1)
  }

  const unlikePost = async (userId, postId) => {
    const likeRef = firestore().collection("likes")
    const likeQuery = await likeRef
      .where("userId", "==", userId)
      .where("postId", "==", postId)
      .get()
    likeQuery.forEach((doc) => {
      doc.ref.delete() // Delete the like document
    })

    await firestore()
      .collection("Post")
      .doc(postId)
      .update({
        likeCount: likeCount - 1,
      })

    // Update the like count in the component state
    setLikeCount(likeCount - 1)
  }

  const checkIfUserLikedPost = async () => {
    const likeRef = firestore().collection("likes")
    const likeQuery = await likeRef
      .where("userId", "==", user?.id)
      .where("postId", "==", postId)
      .get()

    setIsLiked(!likeQuery.empty)
  }

  const addComment = async (userId, postId, commentText) => {
    try {
      const commentsRef = firestore().collection("comments")
      await commentsRef.add({
        userId,
        postId,
        text: commentText,
        timestamp: new Date(),
        username: user?.name,
      })

      fetchComments()

      // Optionally, you can fetch and display the updated comments after adding a new one.
      // You might want to store comments in a state variable and update it here.
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const navigateToLogin = () => {
    navigation.navigate("login")
  }

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData()
    user?.id && checkIfUserLikedPost()
    fetchComments()
  }, []) // Fetch data when the 'id' prop changes

  return (
    <>
      <Screen preset="scroll">
        <View style={style.container}>
          <Image
            resizeMode="contain"
            source={{ uri: post?.thumbnail }}
            style={{ width: width - 20, height: height / 2 }}
          />
          <Text style={style.titleText}>{post?.title}</Text>
          <View style={style.nameContainer}>
            <Text style={style.nameText}>
              By : {post?.authorName} {"  "}
              {moment.unix(post?.createdAt?.seconds).format("DD-MM-YYYY")}
            </Text>
          </View>

          <Text style={style.text}>{post?.description}</Text>

          {commentList?.length !== 0 && (
            <>
              <Text style={style.text}>Comment</Text>
              <FlatList
                data={commentList}
                renderItem={({ item, i }) => {
                  return (
                    <View style={style.mt10}>
                      <View style={style.commentContainer}>
                        <Text>{item?.username}</Text>
                        <Text>{moment.unix(post?.createdAt?.seconds).format("DD/MM/YYYY")}</Text>
                      </View>
                      <Text key={i}>{item?.text}</Text>
                    </View>
                  )
                }}
              />
            </>
          )}
        </View>
      </Screen>
      <View style={style.bottomStickyBar}>
        <TouchableOpacity
          style={style.likeContainer}
          onPress={async () => {
            if (!user?.id) {
              navigateToLogin()
            } else if (isLiked) {
              await unlikePost(user?.id, postId)
            } else {
              await likePost(user?.id, postId)
            }
            // Toggle the like status
            setIsLiked(!isLiked)
          }}
        >
          <Icons name={isLiked ? "heart" : "hearto"} color={isLiked ? "red" : "white"} size={24} />
          <Text style={{ color: isLiked ? "red" : "white" }}>{likeCount}</Text>
        </TouchableOpacity>

        <View style={style.commentTextInputContainer}>
          <TextInput
            placeholder="Comment"
            value={comment}
            containerStyle={style.commentTextInput}
            onChangeText={(e) => setComment(e)}
          />
          <Icons
            name="rocket1"
            color={colors.white}
            size={24}
            style={style.sendLogo}
            onPress={() => {
              if (!user?.id) {
                navigateToLogin()
              } else {
                addComment(user?.id, postId, comment)
                setComment("")
                Keyboard.dismiss()
              }
            }}
          />
        </View>
      </View>
    </>
  )
}
