import axiosInstance from "../../utils/axios";

export const getVideos = async ({ tags, searchText }) => {
  let queryString = "";
  if (tags.length > 0) {
    queryString = tags.map((tag) => `tags_like=${tag}`).join("&");
  }
  if (searchText !== "") {
    queryString += `&q=${searchText}`;
  }

  const response = await axiosInstance.get(`/videos?${queryString}`);

  return response.data;
};
