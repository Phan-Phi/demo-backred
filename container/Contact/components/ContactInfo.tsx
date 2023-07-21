import { get } from "lodash";
import React, { useMemo } from "react";
import { Box, Stack, Typography, styled } from "@mui/material";

import { useSetting } from "@/hooks";
import { Headline, Link, SVG } from "@/components";

export default function ContactInfo() {
  const setting = useSetting();

  const emails = get(setting, "emails");
  const address = get(setting, "address");
  const hotlines = get(setting, "hotlines");
  const workingTimes = get(setting, "working_times");

  const renderEmails = useMemo(() => {
    if (emails == undefined) return null;

    return emails.map((item, index) => {
      return (
        <StyledLink key={index} href={`mailto: ${item.value}`}>
          {item.value}
        </StyledLink>
      );
    });
  }, [emails]);

  const renderWorkingTimes = useMemo(() => {
    if (workingTimes == undefined) return null;

    return workingTimes.map((item, index) => {
      return <StyledText key={index}>{item.value}</StyledText>;
    });
  }, [workingTimes]);

  const renderHotlines = useMemo(() => {
    if (hotlines == undefined) return null;

    return hotlines.map((item, index) => {
      return (
        <StyledLink key={index} href={`tel: ${item.value}`}>
          {item.value}
        </StyledLink>
      );
    });
  }, [hotlines]);

  return (
    <Stack gap="20px">
      <Headline title="thông tin liên hệ" />

      <StyledStack>
        <Box>
          <SVG src="/svg/phone.svg" />
        </Box>

        <StyledWrapperHotlines divider={<StyledLine />}>
          {renderHotlines}
        </StyledWrapperHotlines>
      </StyledStack>

      <StyledStack>
        <Box>
          <SVG src="/svg/company.svg" />
        </Box>

        <StyledText>{address || "NN8, Bạch Mã, P.15, Q.10, Tp. HCM"}</StyledText>
      </StyledStack>

      <StyledStack>
        <Box>
          <SVG src="/svg/email.svg" />
        </Box>

        <Box>{renderEmails}</Box>
      </StyledStack>

      <StyledStack>
        <Box>
          <SVG src="/svg/clock.svg" />
        </Box>

        <Box>{renderWorkingTimes}</Box>
      </StyledStack>
    </Stack>
  );
}

const StyledStack = styled(Stack)(() => {
  return {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
    color: "white",
    marginTop: -8,
  };
});

const StyledLink = styled(Link)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
    color: "white",
    marginTop: -8,
  };
});

const StyledLine = styled(Box)(() => {
  return {
    width: 8,
    height: 1,
    margin: "0 10px",

    top: -5,
    position: "relative",
    backgroundColor: "white",
  };
});

const StyledWrapperHotlines = styled(Stack)(() => {
  return {
    flexDirection: "row",
    alignItems: "center",
  };
});
