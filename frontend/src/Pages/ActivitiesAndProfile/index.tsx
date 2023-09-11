import { useState } from "react";
import AxiosInstance from "../../Configs/AxiosInstance";
import { useCookies } from "react-cookie";

const ActivitiesAndProfile = () => {
  const [cookies] = useCookies(["userID", "userDetail", "quoraSession"]);

  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      setFile(fileList[0]);
    }
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("avatar", file!);
    const res = await AxiosInstance.post(
      `/users/profile/${cookies.userID}`,
      data,
      {
        withCredentials: true,
      }
    );
  };
  return (
    <div>
      ActivitiesAndProfile
      <input type="file" name="avatar" id="avatar" onChange={onFileChange} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default ActivitiesAndProfile;
