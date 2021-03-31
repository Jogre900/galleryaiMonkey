import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { storage } from "../assets/storage";
import { requestPhoto } from "../helper";
import { Details } from "./details";

const { width } = Dimensions.get("screen");
const IMG_WIDTH = Math.floor(width / 3);
const IMG_HEIGHT = Math.floor(width / 3);


export const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [options, setOptions] = useState({
    page: 1,
    limit: 30,
  });
  const [modal, setModal] = useState({
    visible: false,
    data: null,
  });
  const fetchStorage = async () => {
    const storageData = await storage.getItem("imgArray");
      if (storageData) {
        setPhotos(JSON.parse(storageData));
      }
  }
  const fetchData = async () => {
    try {
      const data = await requestPhoto(options.page, options.limit);

      if (data) {
        setPhotos((prev) => prev.concat(data));
        setOptions((values) => ({ ...values, page: options.page + 1 }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchStorage()
    }, [])
  );
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
          initialNumToRender={30}
          getItemLayout={(_, index) => ({
            length: IMG_HEIGHT,
            offset: IMG_HEIGHT * index,
            index,
          })}
          onEndReached={fetchData}
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
