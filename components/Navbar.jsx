"use client";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { userUpdate } from "@/src/slice/userSlice";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile icon
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon
const Swal = require("sweetalert2");

import { userRoleUpdate } from "/src/slice/userSlice";

//API
import { getUser } from "/services/user";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState();
  // const [userRole, setUserRole] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const checkLoggedIn = useSelector((state) => state?.user?.isLoggedIn);
  const userRole = useSelector((state) => state?.user?.userRole);

  const pages = [
    "Home",
    "Products",
    "Contact Us",
    ...(userRole === "admin" ? ["Admin"] : []),
  ];
  const settings = ["Profile", "Logout"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      // Swal.fire({
      //   title: "Error!",
      //   text: "You are not logged in. Please login to with your credentials.",
      //   icon: "error",
      // });
      // router.push("/auth/login");
    } else {
      const getUserData = async () => {
        const token = localStorage.getItem("token");
        const userData = await getUser(token);
        setIsUserLoggedIn(true);
        setUser(user);
        dispatch(userRoleUpdate(userData?.user?.role));
        if (!userData) {
          setIsUserLoggedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/auth/login");
        }
      };
      getUserData();
    }
  }, [checkLoggedIn]);

  console.log("here running");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (i) => {
    setAnchorElNav(null);
    switch (i) {
      case 0:
        router.push("/");
        break;
      case 1:
        router.push("/product");
        break;
      case 2:
        router.push("/contact");
        break;
      case 3:
        router.push("/admin");
        break;
      default:
        break;
    }
  };

  const handleCloseUserMenu = (i) => {
    setAnchorElUser(null);
    if (settings[i] === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      userRoleUpdate("");
      setIsUserLoggedIn("");
      dispatch(userUpdate(false));
      dispatch(userRoleUpdate(""));
      router.push("/auth/login");
    } else if (settings[i] === "Profile") {
      router.push("/profile");
    }
  };

  return (
    <AppBar position="fixed" sx={{ top: 0, width: "100%" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.jpg"
              style={{
                borderRadius: "80px",
                marginRight: "8px",
                border: "1px solid #fff",
              }}
              height={50}
              width={50}
              alt="Logo"
            />
            <div style={{ marginTop: "4px" }}>KRISHNA</div>
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(
                (page, i) =>
                  (isUserLoggedIn ||
                    !["Home", "Products", "Upload", "Admin"].includes(
                      page
                    )) && (
                    <MenuItem key={page} onClick={() => handleCloseNavMenu(i)}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KRISHNA
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(
              (page, i) =>
                (isUserLoggedIn ||
                  !["Home", "Products", "Upload"].includes(page)) && (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(i)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                )
            )}
          </Box>

          {isUserLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    paddingRight: "40px",
                    width: 24,
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/3.jpg" /> */}
                  <MenuItem>
                    <div
                      className="flex items-center mr-1"
                      style={{ fontSize: "17px" }}
                    >
                      <AccountCircleIcon />
                      <div className="ml-1">{user?.name?.split(" ")[0]}</div>
                    </div>
                  </MenuItem>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, i) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(i)}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {setting === "Profile" && (
                      <AccountCircleIcon sx={{ mr: 1 }} />
                    )}
                    {setting === "Logout" && <LogoutIcon sx={{ mr: 1 }} />}
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          {!isUserLoggedIn && (
            <Link href="/auth/login">
              <MenuItem>
                <Typography textAlign="center">LOG IN</Typography>
              </MenuItem>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
