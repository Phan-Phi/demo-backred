import { styled } from "@mui/material";
import { useRouter } from "next/router";
import { MouseEventHandler, useCallback } from "react";

import { Image, Ratio, Stack } from "@/components";

export default function Language() {
  const router = useRouter();

  const onChangeLanguageHandler: MouseEventHandler<HTMLSpanElement> = useCallback(
    (e) => {
      const selectedLanguage = e.currentTarget.dataset.id;

      const currentPath = router.asPath;

      router.replace(currentPath, currentPath, {
        locale: selectedLanguage,
      });
    },
    [router]
  );

  return (
    <StyledStack direction="row" spacing={2}>
      <StyledRatio className="language" ratio="1/1" onClick={onChangeLanguageHandler}>
        <Image src="/image/vi.png" alt="logo" />
      </StyledRatio>

      <StyledRatio className="language" ratio="1/1" onClick={onChangeLanguageHandler}>
        <Image src="/image/en.png" alt="logo" />
      </StyledRatio>
    </StyledStack>
  );
}

const StyledStack = styled(Stack)(({ theme }) => {
  return {};
});

const StyledRatio = styled(Ratio)(({ theme }) => {
  return { cursor: "pointer", width: "24px" };
});
