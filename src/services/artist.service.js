import { createHttp } from "./base.service";

const http = createHttp(true);

export const getArtist = (id) => http.get(`/artists/${id}`)