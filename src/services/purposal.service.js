import { createHttp } from "./base.service";

const http = createHttp();

export const getPurposal = (id) => http.get(`/purposals/${id}`)

export const editPurposal = (id, purposal) => http.patch(`/purposals/${id}`,purposal)

export const deletePurposal = (id) => http.delete(`/purposals/${id}`)