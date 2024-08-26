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

const pages = ["Products", "Upload", "About Us", "Contact Us"];
const settings = ["Profile", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const router = useRouter();
  const checkLoggedIn = useSelector((state) => state?.user?.isLoggedIn);
  console.log("checkLoggedIn", checkLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setIsUserLoggedIn(true);
      setUser(user);
    }
  }, [checkLoggedIn]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (i) => {
    setAnchorElNav(null);
    if (pages[i] === "Upload") {
      router.push("/admin/upload");
    } else if (pages[i] === "Products") {
      router.push("/product");
    }
  };

  const handleCloseUserMenu = (i) => {
    setAnchorElUser(null);
    if (settings[i] === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsUserLoggedIn("");
      dispatch(userUpdate(false));
      router.push("/auth/login");
    } else if (settings[i] === "Profile") {
      router.push("/profile");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
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
            {/* <div style={{ marginTop: "4px" }}>KRISHNA</div> */}
          </Typography>
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
                    !["Products", "Upload"].includes(page)) && (
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
                (isUserLoggedIn || !["Products", "Upload"].includes(page)) && (
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
                    <Typography textAlign="center" sx={{ fontSize: "20px" }}>
                      {user.name.split(" ")[0]}
                    </Typography>
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
                      <AccountCircleIcon sx={{ mr: 2 }} />
                    )}
                    {setting === "Logout" && <LogoutIcon sx={{ mr: 2 }} />}
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
