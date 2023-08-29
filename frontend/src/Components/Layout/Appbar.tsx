import DvrIcon from "@mui/icons-material/Dvr";
import HomeIcon from "@mui/icons-material/Home";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import {
  AppbarContainer,
  AppbarDataContainer,
  LayoutButtons,
  LayoutButtonsContainer,
  LayoutHeading,
  UserDetailConatiner,
} from "./Layout.styles";
import AccountMenu from "./UserOptions";

const menuitems = [
  {
    icons: <HomeIcon />,
    tooltiptext: "Home",
    route: "/",
  },
  {
    icons: <DvrIcon />,
    tooltiptext: "Following",
    route: "/following",
  },
  {
    icons: <LocalActivityIcon />,
    tooltiptext: "You Activity and Profile",
    route: "/activities",
  },
];

function Appbar() {
  return (
    <AppbarContainer>
      <AppbarDataContainer sx={{ mx: "auto" }}>
        <LayoutHeading>Quora</LayoutHeading>
        <LayoutButtonsContainer>
          {menuitems.map((item, key) => (
            <LayoutButtons
              sx={{ color: "black", fontSize: "10px" }}
              key={key}
              disableRipple
              size="small"
            >
              <Link
                style={{
                  color: "inherit",
                }}
                to={item.route}
              >
                <Tooltip title={item.tooltiptext}>{item.icons}</Tooltip>
              </Link>
            </LayoutButtons>
          ))}
        </LayoutButtonsContainer>
        <UserDetailConatiner>
          {/* <LayoutAutocomplete /> */}
          <AccountMenu />
        </UserDetailConatiner>
      </AppbarDataContainer>
    </AppbarContainer>
  );
}
export default Appbar;
