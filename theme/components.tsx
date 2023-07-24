import { Components, Theme } from "@mui/material";

import { typographyTheme } from "./typography";
import { COLOR_PALETTE, COMPONENT_STATE, PSEUDO_STATE } from "@/configuration";

import {
  ClearIcon,
  PrevButton,
  NextButton,
  UncheckIcon,
  ArrowDownIcon,
  CheckedIcon,
} from "@/components";

export const ComponentsTheme: Components<Omit<Theme, "components">> = {
  MuiTypography: {
    defaultProps: {},
    styleOverrides: {
      // root: {
      //   display: "block",
      //   color: COLOR_PALETTE["white"],
      // },

      root: ({ theme }) => {
        return {
          display: "block",
          color: theme.palette.text.primary,
        };
      },
    },
  },

  MuiContainer: {
    defaultProps: {
      maxWidth: "xl",
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          "& .MuiTabs-flexContainer": {
            display: "flex",
            flexDirection: "row !important",
            justifyContent: "center !important",
            "& .Mui-selected": {
              "& .MuiTypography-root": {
                color: `${theme.palette.primary.main} !important`,
              },
            },
          },
        };
      },
    },
  },

  MuiTab: {
    defaultProps: {
      disableRipple: true,
    },

    styleOverrides: {
      root: ({ theme }) => {
        return {
          fontWeight: 500,
          textTransform: "capitalize",
        };
      },
    },
  },

  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },

    styleOverrides: {
      root: ({ theme }) => {
        return {
          ...typographyTheme["p_small"],
          fontWeight: 500,
          backgroundColor: theme.palette.primary.main,
          color: "white",
          borderRadius: "6px",
          padding: "0.5rem 1rem",

          // [PSEUDO_STATE.hover]: {
          //   backgroundColor: theme.palette.primary.main,
          //   opacity: 0.7,
          //   transition: "opacity 0.5s ease",
          // },

          [COMPONENT_STATE.disabled]: {
            backgroundColor: "#f5f5f5",
          },
        };
      },
      contained: ({ theme }) => {
        return {
          backgroundColor: theme.palette.primary.main,
          transition: "all .4s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        };
      },
      outlined: ({ theme }) => {
        return {
          background: "none",
          border: "1px solid white",
          transition: "all .4s ease",
          "&:hover": {
            background: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
            color: "white",
            opacity: 1,
          },
        };
      },
    },
  },

  MuiFormControl: {
    defaultProps: {
      fullWidth: true,
    },
    styleOverrides: {
      root: ({ theme }) => {
        return {
          ["& .MuiFormLabel-root"]: {
            ...typographyTheme["p_small"],
            fontWeight: 500,
            marginBottom: "0.3rem",
            color: theme.palette.common.white,
          },
          ["& .MuiFormHelperText-root"]: {
            marginTop: 2,
          },
        };
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          borderRadius: "6px",
          padding: "10px 12px",
          marginTop: "0 !important",
          border: `1px solid ${theme.palette.common.white}`,

          "& .MuiInputBase-input": {
            padding: 0,
            color: `${theme.palette.common.white} !important`,
          },
          "&.Mui-focused": {
            border: `1px solid ${theme.palette.primary.main} !important`,
          },
          "&::after": {
            display: "none",
          },

          "&::before": {
            display: "none",
          },
        };
      },
    },
  },

  MuiCheckbox: {
    defaultProps: {
      icon: <UncheckIcon />,
      checkedIcon: <CheckedIcon />,
    },
  },

  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        backgroundColor: COLOR_PALETTE["white"],
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginTop: 0,
        fontSize: "15px",
        lineHeight: "20px",
        fontWeight: 500,
      },
    },
  },

  MuiPagination: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          "& .MuiPagination-ul": {
            "& button": {
              color: COLOR_PALETTE["white"],
            },

            "& .Mui-selected": {
              color: theme.palette.primary.main,
              background: COLOR_PALETTE["white"],
              borderRadius: "6px",
            },
          },
        };
      },
    },
  },

  MuiPaginationItem: {
    defaultProps: {
      slots: {
        previous: PrevButton,
        next: NextButton,
      },
    },
  },

  MuiAutocomplete: {
    styleOverrides: {
      root: {},

      inputRoot: {
        borderRadius: "6px",
        padding: "6px 12px !important",
      },
      option: ({ theme }) => {
        return {
          ["&:hover"]: {
            opacity: 0.7,
            color: theme.palette.common.white,
            backgroundColor: `${theme.palette.primary.main} !important`,
          },
          [`&[aria-selected="true"]`]: {
            color: "white",
            backgroundColor: `${theme.palette.primary.main} !important`,
          },
        };
      },
      endAdornment: {
        right: 16,
        color: "white",
      },
    },

    defaultProps: {
      popupIcon: <ArrowDownIcon />,
      clearIcon: <ClearIcon />,
    },
  },
};
