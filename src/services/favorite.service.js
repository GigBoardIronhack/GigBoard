import { createHttp } from "./base.service";

const authenticatedHttp = createHttp(true);

export const toggleFavorite = (id) => authenticatedHttp.post(`/artists/${id}/favorites`);

export const getFavorites = () => authenticatedHttp.get("/favorites")





