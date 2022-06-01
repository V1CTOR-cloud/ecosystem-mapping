import Logo from "../assets/images/Logo.png";

function isLoggedIn() {
  return !!JSON.parse(sessionStorage.getItem("user"));
}

function getCurrentUser() {
  let user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    if (!user.profileImage.url) {
      user.profileImage = {
        url: Logo,
      };
      sessionStorage.setItem("user", JSON.stringify(user));
    }
    return user;
  }
  return null;
}

export { isLoggedIn, getCurrentUser };
