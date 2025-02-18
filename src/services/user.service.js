import { createHttp } from "./base.service";

const authenticatedHttp = createHttp(true);

export const updateUser = (user) => authenticatedHttp.patch("/users/me", user)

