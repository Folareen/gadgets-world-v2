import { Box, IconButton, Typography, Button, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import "@fontsource/kanit";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import linkItems from "../../utils/linkItems";
import MobileMenu from "./MobileMenu";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import Search from "./Search";

const isActive = (title, path) => {
  if(path[0] === '/'){
    return path === path.substring(1, path.length)
  }
  return path === title
};

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const {push, query: {productCategoryId}} = useRouter();
  const router = useRouter();
  const {user: {data, loading}, cart} = useSelector(state => state )
  
  const logout = async () => {
    try{
      await signOut(auth)
      push('/') 
    }
    catch(error){
      alert('failed to sign out!')
    }
  }

  return (
    <Box
      component="header"
      sx={{
        bgcolor: "dark.main",
        color: "light.main",
        p: 2,
        boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
        position: 'relative',
        zIndex: 3
      }}
    >

      <Box sx={{display: "flex",
        justifyContent: "space-between",
        alignItems: 'center'}}>

        <MobileMenu setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} />

        <IconButton
          onClick={() => setShowMobileMenu((prev) => !prev)}
          sx={{color: 'secondary.main',  display: { xs: "flex", sm: "none" }, zIndex: 3, alignItems: 'center', justifyContent: 'center'}}
        >
          {!showMobileMenu ? <MenuIcon /> : <CloseIcon />}
        </IconButton>

        <Link href="/">
          <Typography
            component="h1"
            sx={{ "&:hover": { cursor: "pointer" }, color: "logo.main", fontSize: {xs: 18, sm: 20}, fontWeight: 'bold',letterSpacing: 1.3, lineHeight: 1, fontFamily: 'kanit' }}
          >
            Gadgets World
          </Typography>
        </Link>

        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          {linkItems.map((item) => (
            <Link href={`/${item}`} key={item}>
              <Typography
                sx={{
                  color: isActive(item, (productCategoryId || router.pathname))
                    ? "light.main"
                    : "secondary.main",
                  "&:hover": {
                    cursor: "pointer",
                    color: 'light.main'
                  },
                  px :{ sm: 0.5, lg: 1.5}, mx: 0.5, textTransform: 'capitalize'
                }}
              >
                {item === 'about-us'? 'about us': item}
              </Typography>
            </Link>
          ))}
        </Box>

        <Box >
          <IconButton onClick={() => {
            push('/search')
            setShowAccountOptions(false)
            }} sx={{color: 'secondary.main'}}>
            <SearchRoundedIcon />
          </IconButton>
          <Box sx={{position: 'relative', display: 'inline-block'}}>
            <IconButton onClick={() => {
              push('/cart')
              setShowAccountOptions(false)
              }} sx={{color: 'secondary.main'}}>
              <ShoppingCartRoundedIcon />
            </IconButton> 
            <Typography sx={{position: 'absolute', top: 0, right: 0, bgcolor: 'light.main',px: 0.5, borderRadius: '50%', fontSize: 12, color: 'dark.main'}}>
              {cart.quantity}
            </Typography>     
          </Box>

          <Box sx={{position: 'relative', display: 'inline-block', zIndex: 3}}>
            <IconButton sx={{color: 'secondary.main'}} onClick={() => setShowAccountOptions(!showAccountOptions)}>
              {
                data?.photoURL ?
                <Avatar sx={{width: '28px', height: '28px'}} src={data?.photoURL} />
                :
                <AccountCircleRoundedIcon/>
              }
            </IconButton>
            {showAccountOptions && 
            <Box sx={{position: 'absolute',right: 0, width: 'max-content', boxShadow: '0 0 2px rgba(0, 0, 0, 0.2)'}}>
              { (!loading) ?
              <>
                {
                data?
                <Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: 'light.main', color: 'dark.main', borderRadius: 1}}>
                  <Button sx={{p: 1}} onClick={() => {
                    push('/account')
                    setShowAccountOptions(false)
                    }}>My Account <ManageAccountsRoundedIcon fontSize={'small'} /> </Button>
                  <Button sx={{p: 1}} onClick={() => {
                    push('/order-history')
                    setShowAccountOptions(false)
                    }}>Order History <HistoryRoundedIcon fontSize={'small'} /> </Button>
                  <Button color={'danger'} sx={{p: 1}} onClick={logout}>Logout <ExitToAppRoundedIcon fontSize={'small'}/></Button>
                </Box>
                :
                <Button onClick={() => {
                  push('/auth')
                  setShowAccountOptions(false)
                }} variant="contained"><LoginRoundedIcon fontSize={'small'} sx={{mr: 1}}/> Login</Button>
                }
              </>
              :
              <Typography>
                loading...
              </Typography>
              }
            </Box>
            }
          </Box>

        </Box>

      </Box>

      {
        router.pathname === '/search' &&
        <Search />
      }
      
    </Box>
  );
};

export default Header;
