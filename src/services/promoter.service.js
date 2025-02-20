import { createHttp } from "./base.service";

const authenticatedHttp = createHttp(true);

export const createPurposal = (artistId, purposal) => authenticatedHttp.post(`/artists/${artistId}/purposal`, purposal)

export const listPromoterPurposals = () => authenticatedHttp.get("/purposals/promoter")

/* ARTISTS */

export const listArtists = () => authenticatedHttp.get(`/artists`)

/* FAVORITES */

export const ListFavorites = () => authenticatedHttp.get("/favorites")
