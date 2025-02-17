import { createHttp } from "./base.service";

const http = createHttp();
const authenticatedHttp = createHttp(true);

export const createUser = (user) => http.post("/register", user)

export const loginService = (credentials) => http.post("/login", credentials);

export const getCurrentUserService = () => authenticatedHttp.get("/me");

export const getUserService = (id) => authenticatedHttp.get(`/users/${id}`)