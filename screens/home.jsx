import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import axios from "axios";
import { storage } from "../assets/storage";
import { Details } from "./details";
const { width } = Dimensions.get("screen");
const IMG_WIDTH = Math.floor(width / 3);
const IMG_HEIGHT = Math.floor(width / 3);

export const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [options, setOptions] = useState({
    page: 1,
    limit: 5,
  });
  const [modal, setModal] = useState({
    visible: false,
    data: null,
  });

  const requestPhoto = async () => {
    const data = await storage.getItem("imgArray");
    if (data) {
      const parseData = JSON.parse(data);
      setPhotos(parseData);
      return;
    }
    try {
      console.log("me ejecute");
      const res = await axios.get(
        `https://picsum.photos/v2/list?page=${options.page}&limit=${options.limit}`
      );
      if(res){
          await storage.removeItem("imgArray");
          setPhotos(prev => (prev.concat(res.data)));
          await storage.setItem("imgArray", JSON.stringify(photos));
          setOptions(values => ({...values, page: options.page + 1}))
        }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    requestPhoto();
  }, []);

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setModal({ visible: true, data: item })}>
        <Image
          style={{ width: IMG_WIDTH, height: IMG_HEIGHT }}
          source={{ uri: item.download_url }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {photos && (
        <FlatList
          data={photos}
          renderItem={RenderItem}
          numColumns={3}
          keyExtractor={(item) => item.id}
          initialNumToRender={20}
          getItemLayout={(_, index) => ({
            length: IMG_HEIGHT,
            offset: IMG_HEIGHT * index,
            index,
          })}
          onEndReached={requestPhoto}
          onEndReachedThreshold={0.7}
        />
      )}
      <Details
        {...modal}
        onClose={() => setModal((values) => ({ ...values, visible: false }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
