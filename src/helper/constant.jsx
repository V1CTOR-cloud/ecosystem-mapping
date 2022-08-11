import isStrongPassword from "validator/es/lib/isStrongPassword";
import isNumeric from "validator/es/lib/isNumeric";

// COLORS

export const blueColor = "#0753F8";

// STRINGS
export const market_and_organization = "Market_and_Organization";
export const market = "Market";
export const organization = "Organization";

// LISTS
export const audienceList = [
  { id: 1, name: "Support Service Staff" },
  { id: 2, name: "Talent Joining Startups" },
  { id: 3, name: "Co Founders" },
  { id: 4, name: "New Founders" },
];

// FUNCTIONS
export function validatePassword(value) {
  return !isStrongPassword(value) && value !== "";
}

export function isPasswordInvalid(value) {
  return value === "" || !isStrongPassword(value);
}

export function validateConfirmationCode(value) {
  return !isNumeric(value) || value.length !== 6;
}

export function isCodeInvalid(value) {
  return value === "" || !isNumeric(value) || value.length !== 6;
}

export function validateUsername(value) {
  return value.length <= 5 && value !== "";
}

export function isUsernameInvalid(value) {
  return value.length <= 5 || value === "";
}
