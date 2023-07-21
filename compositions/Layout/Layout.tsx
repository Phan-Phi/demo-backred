import { useEffect } from "react";
import { styled } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import { Box, LoadingPage, Stack } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  });

  return (
    <MainPage>
      <LoadingPage />
      <Header />
      <MainContent className="main-content">{children}</MainContent>
      <Footer />
    </MainPage>
  );
}

const MainPage = styled(Stack)(({ theme }) => {
  return {
    minHeight: "100vh",
    backgroundColor: theme.palette.secondary.main,
  };
});

const MainContent = styled(Box)(({ theme }) => {
  return {
    flexGrow: 1,
    overflow: "hidden",
  };
});
