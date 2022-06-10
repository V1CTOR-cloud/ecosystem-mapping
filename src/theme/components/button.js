export const button = {
  baseStyle: {
    fontWeight: "normal",
    paddingX: 3,
    whiteSpace: "nonwrap",
    _focus: {
      boxShadow: "none",
    },
  },
  variants: {
    outline: {
      borderWidth: 2,
      _active: {
        bg: "brand.100",
      },
    },
    ghost: {
      _active: {
        bg: "brand.100",
      },
    },
  },
};
