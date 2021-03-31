import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
export const Details = ({ visible, data, onClose }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        onClose();
      }}
      useNativeDriver={true}
      animationIn="fadeInUp"
      animationInTiming={300}
      animationOut="fadeOutDown"
      animationOutTiming={300}
      children={
        <View>
          {data && (
            <View
              style={styles.container}
            >
              <View style={styles.contentContainer}>
                <Text style={styles.label}>Autor:</Text>
                <Text style={styles.text}>{data.author}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.label}>ID:</Text>
                <Text>#{data.id}</Text>
              </View>
            </View>
          )}
        </View>
      }
    ></Modal>
  );
};

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15
  },
    contentContainer: {
      flexDirection: 'row',
      marginVertical: 3.5,
      alignItems: 'center'
  },
    text: {
    fontSize: 16,
    color: "#262626",
    marginLeft: 5
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8e8e8e",
  },
});
