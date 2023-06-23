import createHtmlElement from "./createHtml";
import displayController from "./displayController";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

const skeleton = (() => {
  function createHeader() {
    const header = document.createElement("header");
    header.classList.add("header");

    const title = createHtmlElement("h1", null, ["title"], "Battle Ship");

    header.appendChild(title);

    return header;
  }

  function createMain() {
    const main = document.createElement("main");
    main.classList.add("main");
    return main;
  }

  function createFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    const copyright = document.createElement("p");
    copyright.textContent = `Copyright © 2023 sungjinfcc`;

    const githubLink = document.createElement("a");
    githubLink.href = "https://github.com/sungjinfcc";
    githubLink.target = "_black";

    const githubIcon = document.createElement("i");
    githubIcon.classList.add("fab");
    githubIcon.classList.add("fa-github");

    githubLink.appendChild(githubIcon);
    footer.appendChild(copyright);
    footer.appendChild(githubLink);

    return footer;
  }

  function loadHome() {
    document.body.appendChild(createHeader());
    document.body.appendChild(createMain());
    document.body.appendChild(createFooter());
    displayController().updateScreen();
  }

  return { loadHome };
})();

export default skeleton;
