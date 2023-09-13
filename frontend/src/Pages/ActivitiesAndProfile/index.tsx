import { Grid } from "@mui/material";
import Profile from "../../Components/ProfileAndQeustions/ProfileSide";
import {
  HomePageStructure,
  HomepageContainer,
} from "../Homepage/Homepage.styles";
import QuestionsSide from "../../Components/ProfileAndQeustions/QuestionsSide";

const ActivitiesAndProfile = () => {
  return (
    <HomepageContainer>
      <HomePageStructure spacing={4} container>
        <Grid item xs={0} md={4}>
          <Profile />
        </Grid>
        <Grid item xs={12} md={8}>
          <QuestionsSide />
        </Grid>
      </HomePageStructure>
    </HomepageContainer>
  );
};

export default ActivitiesAndProfile;
