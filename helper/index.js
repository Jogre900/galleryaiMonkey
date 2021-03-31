import axios from "axios";
import { storage } from "../assets/storage";
export const requestPhoto = async (page, limit) => {
  console.log("me ejecute");
  console.log("page", page);
  const res = await axios.get(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  );
  if (res) {
    await storage.removeItem("imgArray");
    await storage.setItem("imgArray", JSON.stringify(res.data));
    return res.data;
  }
};
