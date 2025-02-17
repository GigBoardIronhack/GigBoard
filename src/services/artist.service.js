import { createHttp } from "./base.service";

const http = createHttp();

export const getArtist = (id) => http.get(`/artists/${id}`)


