import { MainContentContainer } from "./MainHomepageContent.styles";
import Post from "./Post";
import WritePost from "./WritePost";

const MainHomepageContent = () => {
  return (
    <MainContentContainer>
      <WritePost />
      <Post />
    </MainContentContainer>
  );
};

export default MainHomepageContent;
