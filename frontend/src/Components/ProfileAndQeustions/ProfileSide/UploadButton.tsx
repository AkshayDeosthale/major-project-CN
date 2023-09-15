import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef } from "react";
import { useCookies } from "react-cookie";
import AxiosInstance from "../../../Configs/AxiosInstance";

type Props = {
  getuserProfile: () => Promise<void>;
};

const UploadButton = ({ getuserProfile }: Props) => {
  const fileInput = useRef<any>(null);
  const [cookies] = useCookies(["userID"]);

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      try {
        const data = new FormData();
        data.append("avatar", fileList[0]);
        const res = await AxiosInstance.post(
          `/users/profile/${cookies.userID}`,
          data,
          {
            withCredentials: true,
          }
        );
        console.log(res);

        getuserProfile();
      } catch (error) {}
    }
  };

  return (
    <div>
      <input
        type="file"
        name="avatar"
        id="avatar"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={onFileChange}
      />
      <label htmlFor="avatar">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleButtonClick}
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
};

export default UploadButton;
