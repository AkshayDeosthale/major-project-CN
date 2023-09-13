import { useState } from "react";
import { useCookies } from "react-cookie";
import AxiosInstance from "../../../Configs/AxiosInstance";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface User {
  _id: object;
  username: string;
  email: string;
  password: string;
  interests: string[];
  followers: string[];
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  __v: number;
}

const Profile = () => {
  const [cookies, setCookie] = useCookies([
    "userID",
    "userDetail",
    "quoraSession",
  ]);

  const [userInformation, setuserInformation] = useState<User>(
    cookies.userDetail
  );

  const [file, setFile] = useState<File | null>(null);

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
      setCookie("userDetail", res.data.data);
      setuserInformation(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cookies.userDetail.avatar);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={userInformation.avatar}
          alt={userInformation.avatar}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userInformation.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userInformation.email}
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
