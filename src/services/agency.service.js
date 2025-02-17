import { createHttp } from "./base.service";

const http = createHttp(true);


export const createArtist = (artist) => http.post("/artists",artist)

export const editArtist = (id, artist) => http.patch(`/artists/${id}`, artist) 

export const deleteArtist = (id) => http.delete(`/artists/${id}`)

export const listArtists = () => http.get("/artists/agency")

/* PURPOSALS */

export const listAgencyPurposals = () => http.get("/purposals")


