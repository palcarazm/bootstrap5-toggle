import Aside from "./Aside";
import Documentation from "./Documentation";

class Main {
    static #sections = [Aside.build(), Documentation.build()];

    static build() {
        const main = document.createElement("main");
        main.className = "container mb-3";

        const row = document.createElement("div");
        row.className = "row g5";

        row.append(...Main.#sections);
        main.appendChild(row);

        return main;
    }
}

export default Main;
