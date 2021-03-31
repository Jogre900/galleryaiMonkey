import AsyncStorage from "@react-native-community/async-storage";

export const storage = {
    setItem: async function(key, value){
        let item = await AsyncStorage.setItem(key, value)
        if(item) return true
    },
    getItem: async function(key){
        const item = await AsyncStorage.getItem(key)
        return item
    },
    removeItem: async function(key){
        let item = await AsyncStorage.removeItem(key)
        if(item) return true
    }
}