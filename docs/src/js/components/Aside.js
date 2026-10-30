import Badge from "./Badge";

class Aside {
    static #badges = [
        {
            name: "sponsor",
            href: "https://github.com/sponsors/palcarazm",
            imgSrc:
        "https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white",
        },
        {
            name: "GitHub repository",
            href: "https://github.com/palcarazm/bootstrap5-toggle",
            imgSrc:
        "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white",
        },
        {
            name: "License",
            href: "https://github.com/palcarazm/bootstrap5-toggle/blob/v5/LICENSE",
            imgSrc:
        "https://img.shields.io/github/license/palcarazm/bootstrap5-toggle.svg?style=for-the-badge",
        },
    ];

    static build() {
        const aside = document.createElement("aside");
        aside.className = "col-md-3 col-lg-2";

        const container = document.createElement("div");
        container.className = "position-sticky";
        container.style.top = "0rem";

        container.append(
            Aside.#logoContainer(),
            Aside.#navBar(),
            Aside.#badgeBar(),
        );

        aside.appendChild(container);
        return aside;
    }

    static #logoContainer() {
        const container = document.createElement("div");
        container.className =
      "d-none d-md-block position-relative pb-5 mb-3 img-toggle";

        const logoOn = document.createElement("img");
        logoOn.className =
      "d-block mx-auto position-absolute top-50 start-50 translate-middle w-100";
        logoOn.src = "assets/img/logo_on.png";
        logoOn.alt = "Bootstrap 5 Toggle";
        container.appendChild(logoOn);

        const logoOff = document.createElement("img");
        logoOff.className =
      "d-block mx-auto position-absolute top-50 start-50 translate-middle w-100 invisible";
        logoOff.src = "assets/img/logo_off.png";
        logoOff.alt = "Bootstrap 5 Toggle";
        container.appendChild(logoOff);

        return container;
    }

    static #navBar() {
        const navBar = document.createElement("nav");
        navBar.className =
      "navbar navbar-expand-md navbar-light flex-md-column p-0";
        navBar.setAttribute("aria-label", "Site menu");

        const button = document.createElement("button");
        button.className = "navbar-toggler";
        button.type = "button";
        button.dataset.bsToggle = "collapse";
        button.dataset.bsTarget = "#navbarSupportedContent";
        button.ariaControls = "navbarSupportedContent";
        button.ariaExpanded = "false";
        button.ariaLabel = "Toggle navigation";

        const span = document.createElement("span");
        span.className = "navbar-toggler-icon";

        button.appendChild(span);
        navBar.appendChild(button);

        const darkModeToggle = document.createElement("div");
        darkModeToggle.dataset.plugin = "bs-darkmode-toggle";
        darkModeToggle.dataset.storage = "local";

        navBar.appendChild(darkModeToggle);

        const collapseDiv = document.createElement("div");
        collapseDiv.className = "collapse navbar-collapse";
        collapseDiv.id = "navbarSupportedContent";

        const navMenu = document.createElement("nav");
        navMenu.id = "toc";
        navMenu.setAttribute("data-toggle", "toc");
        navMenu.setAttribute("aria-label", "Table of contents");

        collapseDiv.appendChild(navMenu);
        navBar.appendChild(collapseDiv);

        return navBar;
    }

    static #badgeBar() {
        const badges = document.createElement("div");
        badges.className = "d-none d-md-flex flex-column align-items-center mt-4";

        Aside.#badges.forEach((badge, index) => {
            badges.appendChild(
                Badge.build({
                    ...badge,
                    className: index === 0 ? "mt-0" : "mt-1",
                }),
            );
        });
        return badges;
    }
}
export default Aside;
