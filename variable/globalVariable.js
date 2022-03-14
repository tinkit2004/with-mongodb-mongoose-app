export const API_HOST = "http://localhost:3000";
export const ironOptions = {
  cookieName: "siwe",
  password: process.env.ironSessionPassword,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
