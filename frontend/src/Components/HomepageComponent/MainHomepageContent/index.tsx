/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MainContentContainer } from "./MainHomepageContent.styles";
import Post from "./Post";
import WritePost from "./WritePost";
import AxiosInstance from "../../../Configs/AxiosInstance";
import { useEffect, useState } from "react";
import { Comments } from "./Comments";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  interests: string[];
  followers: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Post {
  comments: Comments[];
  _id: string;
  from: User;
  to: User | null;
  title: string;
  interestType: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const MainHomepageContent = () => {
  const [postArray, setPostArray] = useState<Post[]>([]);
  const fetchTimelinePosts = async () => {
    try {
      const res = await AxiosInstance.get(`/posts/all`);
      setPostArray(res.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTimelinePosts();
  }, []);

  return (
    <MainContentContainer>
      <WritePost fetchTimelinePosts={fetchTimelinePosts} />
      {postArray.map((post, key) => (
        <Post key={key} post={post} />
      ))}
    </MainContentContainer>
  );
};

export default MainHomepageContent;
