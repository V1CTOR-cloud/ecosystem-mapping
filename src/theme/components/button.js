export const button = {
  baseStyle: {
    fontWeight: "normal",
    paddingX: 3,
    whiteSpace: "nowrap",
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
    greyGhost: {
      bg: "white",
      color: "blackAlpha.600",
      _hover: {
        bg: "blackAlpha.200",
      },
      _active: {
        bg: "blackAlpha.400",
      },
    },
    blackGhost: {
      bg: "white",
      color: "black",
      _hover: {
        bg: "blackAlpha.100",
      },
      _active: {
        bg: "blackAlpha.300",
      },
    },
  },
};
