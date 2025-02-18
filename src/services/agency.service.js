import { createHttp } from "./base.service";


const authenticatedHttp = createHttp(true);


export const createArtist = (artist) => authenticatedHttp.post("/artists",artist)

export const editArtist = (id, artist) => authenticatedHttp.patch(`/artists/${id}`, artist) 

export const deleteArtist = (id) => authenticatedHttp.delete(`/artists/${id}`)

export const listArtists = () => authenticatedHttp.get("/artists/agency")

/* PURPOSALS */

export const listAgencyPurposals = () => authenticatedHttp.get("/purposals")

export const editAgencyPurposals = (id, purposal) => authenticatedHttp.patch(`/purposals/${id}`, purposal) 


