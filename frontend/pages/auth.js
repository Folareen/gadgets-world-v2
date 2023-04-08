import { Button, Box, Typography, Container, Link } from "@mui/material";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const { push, replace } = useRouter();
  const { data } = useSelector((state) => state.user);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(() => {
      push("/");
    });
  };

  useEffect(() => {
    if (data) {
      replace("/");
    }
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        my: 4,
      }}
    >
      <Box sx={{ width: "85%", maxWidth: 400 }}>
        {hasAccount ? <Login /> : <Signup />}

        <Box>
          <Button onClick={signIn} variant="outlined" fullWidth sx={{ py: 1 }}>
            Sign in with Google
          </Button>

          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography component="p" sx={{ p: 0.5, textAlign: "center" }}>
              {hasAccount && "Don't "}
              Have an account?
            </Typography>
            <Link
              onClick={(e) => {
                e.preventDefault();
                setHasAccount(!hasAccount);
              }}
              sx={{
                color: "primary.main",
                p: 0.2,
                borderRadius: 1,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              <a>
              {hasAccount ? "Signup" : "Login"}
              </a>
            </Link>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
