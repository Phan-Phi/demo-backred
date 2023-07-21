import { useMemo } from "react";
import { useRouter } from "next/router";
import { Container, Grid, Typography, styled } from "@mui/material";

import { transformUrl } from "@/libs";
import { NAVBAR_ROUTES } from "@/routes";
import { useFetch, useSetting } from "@/hooks";
import { PAGES_API, TYPE_PARAMS } from "@/apis";
import { Box, Divider, Image, ImageRatio, Link, Ratio, Stack } from "@/components";

export default function Footer() {
  const setting = useSetting();
  const { locale } = useRouter();

  const { data } = useFetch(
    transformUrl(PAGES_API, {
      type: TYPE_PARAMS["news.NewsPage"],
      fields: "*",
      locale,
    })
  );
  const { data: dataProduct } = useFetch(
    transformUrl(PAGES_API, {
      type: TYPE_PARAMS["product.ProductCategoryDetailPage"],
      fields: "*",
      locale,
    })
  );

  const {
    address,
    address_en,
    tax_identification_number,
    footer_description,
    footer_description_en,
    company_name,
    company_name_en,
    footer_social_icon,
    footer_ecom_icon,
  } = setting;

  const renderSocialIcon = useMemo(() => {
    if (footer_social_icon === undefined) return;
    return footer_social_icon.map((el, idx) => {
      const { value } = el;

      return (
        <Link key={idx} href={`${value.link}`} target="_blank">
          <Ratio ratio="0" width={32} height={32}>
            <Image src={value.icon} alt="" />
          </Ratio>
        </Link>
      );
    });
  }, [footer_social_icon]);

  const renderEcomIcon = useMemo(() => {
    if (footer_ecom_icon === undefined) return;
    return footer_ecom_icon.map((el, idx) => {
      const { value } = el;

      return (
        <Link key={idx} href={`${value.link}`} target="_blank">
          <Ratio ratio="0" width={32} height={32}>
            <Image src={value.icon} alt="" />
          </Ratio>
        </Link>
      );
    });
  }, [footer_ecom_icon]);

  const renderInfo = useMemo(() => {
    return NAVBAR_ROUTES.map((el, idx) => {
      if (idx === 0) return;
      return (
        <Link key={idx} href={`/${el.link}`}>
          <TextMenu>{el.name}</TextMenu>
        </Link>
      );
    });
  }, [NAVBAR_ROUTES]);

  const renderPolicy = useMemo(() => {
    if (data === undefined) return;

    const policy = data.filter((el) => el.is_on_footer === true);

    return policy.map((el, idx) => {
      return (
        <Link key={idx} href={`/news/${el.id}`}>
          <TextMenu>{el.title}</TextMenu>
        </Link>
      );
    });
  }, [data]);

  const renderProduct = useMemo(() => {
    if (dataProduct === undefined) return;

    return dataProduct.map((el, idx) => {
      return (
        <Link key={idx} href={`/product?category=${el.id}`}>
          <TextMenu>{el.title}</TextMenu>
        </Link>
      );
    });
  }, [dataProduct]);

  if (setting === undefined) return;

  return (
    <Box>
      <Divider sx={{ marginTop: "5rem" }} />

      <StyledContainer>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* <ImageRatio
              imageProps={{ alt: "", src: "/image/Logo.png" }}
              ratio="0"
              boxProps={{ width: 80, height: 80, marginBottom: "1rem" }}
            /> */}
            <Stack spacing={2}>
              <Title>{company_name}</Title>
              <Box>
                <Text>028.38681495 - 0908246170</Text>
                <Text>Địa chỉ: {address}</Text>
                <Text>Mã số doanh nghiệp: {tax_identification_number}</Text>
                <Text>{footer_description}</Text>
              </Box>

              <Stack direction="row" spacing={2}>
                {renderSocialIcon}
              </Stack>
              <CopyRight>© 2023 Đen Đỏ. All rights reserved.</CopyRight>
            </Stack>
          </Grid>

          <Grid item xs={2}>
            <Stack spacing={2}>
              <Title>THÔNG TIN CHUNG</Title>
              <Stack spacing={0.5}>{renderInfo}</Stack>
            </Stack>
          </Grid>

          <Grid item xs={2}>
            <Stack spacing={2}>
              <Title>SẢN PHẨM</Title>
              <Stack spacing={0.5}>{renderProduct}</Stack>
            </Stack>
          </Grid>

          <Grid item xs={2}>
            <Stack spacing={2}>
              <Title>CHÍNH SÁCH</Title>
              {renderPolicy}
              {/* <Stack spacing={0.5}>
                <Link href={`/${ROUTES.about}`}>
                  <TextMenu>Thanh Toán</TextMenu>
                </Link>
                <Link href={`/${ROUTES.about}`}>
                  <TextMenu>Vận Chuyển</TextMenu>
                </Link>
              </Stack> */}
            </Stack>
          </Grid>

          <Grid item xs={2}>
            <Stack spacing={2}>
              {/* <Box width={80} height={80} marginBottom={1} /> */}
              <Title>TMĐT</Title>
              <Stack direction="row" spacing={0.5}>
                {renderEcomIcon}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </StyledContainer>

      <WrapperPowered>
        <Powered>
          Powered by{" "}
          <Link
            sx={{ display: "inline", color: "white" }}
            href="https://t-solution.vn"
            target="_blank"
          >
            T-Solution
          </Link>
        </Powered>
      </WrapperPowered>
    </Box>
  );
}

const WrapperPowered = styled(Box)(({ theme }) => {
  return {
    textAlign: "center",
    background: theme.palette.primary.main,
    padding: "0.5rem 0",
  };
});

const StyledContainer = styled(Container)(({ theme }) => {
  return { margin: "2.5rem auto" };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 700,
    marginTop: "0 !important",
    textTransform: "uppercase",
  };
});

const Text = styled(Typography)(({ theme }) => {
  return { ...theme.typography.p_medium };
});

const TextMenu = styled(Typography)(({ theme }) => {
  return { ...theme.typography.p_medium };
});

const CopyRight = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
  };
});
const Powered = styled(Typography)(({ theme }) => {
  return { fontWeight: 600, color: theme.palette.common.white };
});
