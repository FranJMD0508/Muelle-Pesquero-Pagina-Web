import { renderHeader } from "./header.js";
import { renderFooter } from "./footer.js";
const header = document.querySelector("header");
const footer = document.querySelector("footer");

header.innerHTML = renderHeader();
footer.innerHTML = renderFooter();