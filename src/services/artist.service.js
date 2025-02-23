import { createHttp } from "./base.service";


const authenticatedHttp = createHttp(true);

export const getArtist = (id) => authenticatedHttp.get(`/artists/${id}`)

export const getRecommendedArtists = async () => authenticatedHttp.get("/recommended");