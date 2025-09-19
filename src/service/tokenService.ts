
// if (typeof window !== "undefined") {
let token = localStorage.getItem("token");
token = token ? JSON.parse(token) : null;
// }

export default token