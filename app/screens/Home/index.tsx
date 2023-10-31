import { Screen } from "components"
import React, { useEffect, useMemo, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { style } from "./styles"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import MasonryList from "@react-native-seoul/masonry-list"
import firestore from "@react-native-firebase/firestore"
import Icons from "@expo/vector-icons/AntDesign"
import FastImage from "react-native-fast-image"

export const HomeScreen = () => {
  const navigation = useNavigation<any>()
  const [post, setPost] = useState<any>()

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData()
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  const fetchData = async () => {
    const snapshot = await firestore().collection("Post").get()
    const documents = snapshot.docs.map((doc) => doc.data())
    setPost(documents)
  }

  const MasonryCard = ({ item, i }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("postDetail", { id: item?.postId })
        }}
        key={item?.id}
        style={[style.contentContainer, { marginLeft: i % 2 === 0 ? 0 : 12 }]}
      >
        <FastImage source={{ uri: item?.thumbnail }} style={style.image} resizeMode="cover" />
        <Text style={style.title}>{item?.title}</Text>
        <Text style={style.authorNameText}>{item?.authorName}</Text>
        <View style={style.likeContainer}>
          <Icons name="hearto" color="red" size={16} />

          <Text style={style.likeCountText}>{item?.likeCount}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Screen>
      <View style={style.container}>
        {post && (
          <MasonryList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item): string => item.id}
            ListHeaderComponent={<View />}
            contentContainerStyle={{
              alignSelf: "stretch",
            }}
            onEndReached={() => console.log("onEndReached")}
            numColumns={2}
            data={post}
            renderItem={({ item, i }) => <MasonryCard item={item} i={i} />}
          />
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("createPost")}
          style={style.floatingButton}
        >
          <Text style={style.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}
