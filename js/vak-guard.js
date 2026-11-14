// Op elke vakpagina: is dit vak live offline gehaald, stuur dan terug naar de hub.
import { VAKKEN } from "./vakken.js";
import { isBruikbaar } from "./omgeving.js";

const id = location.pathname.match(/\/vakken\/([^/]+)\//)?.[1];
const vak = VAKKEN.find((v) => v.id === id);
if (vak && !isBruikbaar(vak)) location.replace(new URL("../index.html", import.meta.url));
