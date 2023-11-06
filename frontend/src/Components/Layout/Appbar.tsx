/* eslint-disable @typescript-eslint/no-unused-vars */
import DvrIcon from "@mui/icons-material/Dvr";
import HomeIcon from "@mui/icons-material/Home";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { Tooltip } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppbarContainer,
  AppbarDataContainer,
  LayoutButtons,
  LayoutButtonsContainer,
  LayoutHeading,
  UserDetailConatiner,
} from "./Layout.styles";
import AccountMenu from "./UserOptions";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { setGlobalUser } from "../../Redux/Slices/user.slice";

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
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Code to run on route change
    const storageData = localStorage.getItem("users");
    if (!storageData) {
      // navigate("/login");
    } else {
      const converteddata = JSON.parse(storageData);
      dispatch(setGlobalUser(converteddata));
    }
  }, [location.pathname]);

  const [cookies] = useCookies(["userID", "quoraSession"]);

  if (!cookies.userID) {
    navigate("/login");
  }

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
