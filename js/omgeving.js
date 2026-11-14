// Waar draait de app? Live = GitHub Pages (gebouwd vanaf main). Al de rest (localhost, WebStorm) = testen.
export const isLive = typeof location !== "undefined" && location.hostname.endsWith("github.io");

// Een vak met `online: false` is live verborgen, maar blijft lokaal bruikbaar om te testen.
export const isOnline = (vak) => vak.online !== false;
export const isBruikbaar = (vak) => vak.beschikbaar && (isOnline(vak) || !isLive);
