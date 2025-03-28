import { createHttp } from "./base.service";

const authenticatedHttp = createHttp(true);

export const createPurposal = (id, purposal) => authenticatedHttp.post(`/artists/${id}/purposal`, purposal)

export const listPromoterPurposals = () => authenticatedHttp.get("/purposals/promoter")

/* ARTISTS */

export const listArtists = () => authenticatedHttp.get(`/artists`)

/* FAVORITES */

export const ListFavorites = () => authenticatedHttp.get("/favorites")
