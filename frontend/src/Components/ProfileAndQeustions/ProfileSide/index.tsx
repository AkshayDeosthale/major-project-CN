import {
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

const Profile = () => {
  const userInformation = useAppSelector((state: RootState) => state.users);

  const [cookies] = useCookies(["userID"]);

  const [file, setFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const getuserProfile = async () => {
    try {
      const res = await AxiosInstance.get(`/users/profile/${cookies.userID}`, {
        withCredentials: true,
      });

      dispatch(setGlobalUser(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserProfile();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      setFile(fileList[0]);
    }
  };
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("avatar", file!);
      const res = await AxiosInstance.post(
        `/users/profile/${cookies.userID}`,
        data,
        {
          withCredentials: true,
        }
      );
      getuserProfile();
    } catch (error) {}
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
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
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={onFileChange}
          />
          <button onClick={handleSubmit}>submit</button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Profile;
