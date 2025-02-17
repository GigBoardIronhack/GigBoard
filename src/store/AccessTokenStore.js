const JWT_TOKEN_KEY = "accessToken";

export const setAccessToken = (token) => {
  // token = klahsdklahslfbaosd.12903u190239012u309234,2189472984912849012
  localStorage.setItem(JWT_TOKEN_KEY, token);
};

export const getAccessToken = () => {
  // klahsdklahslfbaosd.12903u190239012u309234,2189472984912849012
  return localStorage.getItem(JWT_TOKEN_KEY) || "";
};

export const logout = () => {
  localStorage.removeItem(JWT_TOKEN_KEY);
  window.location.assign("/login");
};
