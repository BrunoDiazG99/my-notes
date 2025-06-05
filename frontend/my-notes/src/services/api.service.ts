export const baseApiUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://localhost:4001/api/v1"
    : "https://my-notes-z6kk.onrender.com/api/v1";

console.log("baseApiUrl: ", baseApiUrl);
