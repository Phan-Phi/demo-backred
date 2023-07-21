import YouTube from "react-youtube";
import { useCallback, useState } from "react";
import { Modal, Typography, styled } from "@mui/material";

import { getIdYoutube } from "@/libs";
import { Box, Ratio, VideoIcon } from "@/components";

interface Props {
  img: string;
  text: string;
  video: string;
}

interface WrapperProps {
  src: string;
}

export default function VideoSection({ img, text, video }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Wrapper src={img}>
      <Ratio ratio="1200/500">
        <Overlay className="overlay" />
        <Content>
          <VideoIcon
            onClick={() => setOpen(true)}
            sx={{ cursor: "pointer", width: "80px", height: "80px" }}
          />
          <Text>{text}</Text>
        </Content>
      </Ratio>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapperModal>
          <YouTube
            videoId={getIdYoutube(video) as string}
            opts={{
              width: "100%",
              height: "100%",

              playerVars: {
                autoplay: 1,
              },
            }}
          />
        </WrapperModal>
      </StyledModal>
      {/* <ImageRatio ratio="1200/500" src="/image/video-section.png" /> */}
    </Wrapper>
  );
}

const Wrapper = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "src";
  },
})<WrapperProps>(({ src }) => {
  return {
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${src})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  };
});

const Content = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "100%",
    textAlign: "center",
  };
});

const Overlay = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    background: "rgba(0,0,0,0.4)",
  };
});

const StyledModal = styled(Modal)(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const WrapperModal = styled(Box)(({ theme }) => {
  return {
    width: "60%",
    height: "60%",
    "& div": {
      height: "100%",
    },
  };
});

const Text = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.h3,
    fontWeight: 700,
    display: "block",
    marginBottom: "1.25rem",

    [theme.breakpoints.down("md")]: {
      ...theme.typography.p_large,
      fontWeight: "700 !important",
      marginBottom: "1rem",
    },
  };
});
