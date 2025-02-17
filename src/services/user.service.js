import { createHttp } from "./base.service";

const http = createHttp(true);



export const updateUser = (user) => http.patch("/users/me", user)

