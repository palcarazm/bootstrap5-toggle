class Header {
  static build() {
    const header = document.createElement("header");
    header.appendChild(Header.#forkMeLink());
    header.appendChild(Header.#logoContainer());
    return header;
  }

  static #forkMeLink() {
    const forkMeLink = document.createElement("a");
    forkMeLink.className = "position-absolute top-0 end-0 d-none d-md-inline";
    forkMeLink.href = "https://github.com/palcarazm/bootstrap5-toggle";
    forkMeLink.target = "_blank";
    forkMeLink.rel = "noopener noreferrer";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.width = "149";
    img.height = "149";
    img.src = "assets/img/fork-me.webp";
    img.className = "attachment-full size-full";
    img.alt = "Fork me on GitHub";
    img.setAttribute("data-recalc-dims", "1");

    forkMeLink.appendChild(img);
    return forkMeLink;
  }

  static #logoContainer() {
    const container = document.createElement("div");
    container.className = "px-4 py-5 my-5 text-center";

    const logoWrapper = document.createElement("div");
    logoWrapper.className = "position-relative mx-auto mb-4 img-toggle";

    const logoOn = document.createElement("img");
    logoOn.className =
      "d-block mx-auto position-absolute top-50 start-50 translate-middle";
    logoOn.src = "assets/img/logo_on.png";
    logoOn.alt = "Bootstrap 5 Toggle";
    logoWrapper.appendChild(logoOn);

    const logoOff = document.createElement("img");
    logoOff.className =
      "d-block mx-auto position-absolute top-50 start-50 translate-middle invisible";
    logoOff.src = "assets/img/logo_off.png";
    logoOff.alt = "Bootstrap 5 Toggle";
    logoWrapper.appendChild(logoOff);

    container.appendChild(logoWrapper);

    const heading = document.createElement("div");
    heading.className = "col-lg-6 mx-auto";

    const paragraph = document.createElement("p");
    paragraph.className = "lead mb-4";
    paragraph.textContent =
      "Bootstrap 5 Toggle is a bootstrap plugin that converts checkboxes into responsive toggles.";

    heading.appendChild(paragraph);
    container.appendChild(heading);

    return container;
  }
}

export default Header;
