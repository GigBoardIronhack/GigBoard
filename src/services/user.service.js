import { createHttp } from "./base.service";

const http = createHttp(true);



export const updateUser = (id, user) => http.patch(`/users/${id}`,user)

