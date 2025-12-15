export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Hard redirect (safer than navigate here)
  window.location.href = "/login";
};
