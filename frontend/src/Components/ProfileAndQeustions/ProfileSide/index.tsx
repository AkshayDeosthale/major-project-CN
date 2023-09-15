import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AxiosInstance from "../../../Configs/AxiosInstance";
import { setGlobalUser } from "../../../Redux/Slices/user.slice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { RootState } from "../../../Redux/store";
import { CardContainer, EditContainer } from "./ProfileSideStyle";
import UploadButton from "./UploadButton";

const Profile = () => {
  const userInformation = useAppSelector((state: RootState) => state.users);

  const [cookies] = useCookies(["userID"]);

  const dispatch = useAppDispatch();
  const getuserProfile = async () => {
    try {
      const res = await AxiosInstance.get(`/users/profile/${cookies.userID}`, {
        withCredentials: true,
      });

      dispatch(setGlobalUser(res.data.data));
      localStorage.setItem("users", JSON.stringify(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserProfile();
  }, []);

  return (
    <CardContainer>
      <CardMedia
        component="img"
        height="250"
        image={userInformation?.avatar}
        alt={userInformation?.avatar}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {userInformation?.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userInformation?.email}
        </Typography>
        <EditContainer>
          <UploadButton getuserProfile={getuserProfile} />
        </EditContainer>
      </CardContent>
    </CardContainer>
  );
};

export default Profile;
