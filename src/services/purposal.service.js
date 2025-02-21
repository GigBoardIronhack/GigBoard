import { createHttp } from "./base.service";



const authenticatedHttp = createHttp(true);

export const getPurposal = (id) => authenticatedHttp.get(`/purposals/${id}`)

export const editPurposal = (id, purposal) => authenticatedHttp.patch(`/purposals/${id}`,purposal)

export const deletePurposal = (id) => authenticatedHttp.delete(`/purposals/${id}`)

export const getPurposals = () => authenticatedHttp.get("/purposals/promoter");