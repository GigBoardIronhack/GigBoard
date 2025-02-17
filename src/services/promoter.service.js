import { createHttp } from "./base.service";

const http = createHttp();

export const createPurposal = (purposal) => http.post("/purposals",purposal)

export const listPromoterPurposals = () => http.get("/purposals/promoter")

/* ARTISTS */

export const listArtists = () => http.get(`/artists`)
