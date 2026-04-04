class Console {
  #element;
  #pre;

  constructor() {
    this.#element = document.createElement("div");
    this.#element.classList.add("d-flex", "mt-2", "align-items-start");

    const aside = document.createElement("div");
    aside.className = "d-flex flex-column me-2";

    const legend = document.createElement("div");
    legend.className = "font-monospace text-muted";
    legend.textContent = "Console";
    aside.append(legend);

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group btn-group-sm btn-group-vertical";
    btnGroup.setAttribute("role", "group");
    aside.append(btnGroup);

    const clearBtn = document.createElement("button");
    clearBtn.className = "btn btn-outline-secondary";
    clearBtn.title = "Clear";
    clearBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    clearBtn.addEventListener("click", () => this.clear());
    btnGroup.append(clearBtn);

    const console = document.createElement("div");
    console.className = "flex-grow-1 me-2";
    this.#pre = document.createElement("pre");
    console.append(this.#pre);

    this.#element.append(aside, console);
  }

  get htmlElement() {
    return this.#element;
  }

  #handleMode(mode) {
    switch (mode) {
      case "replace":
        this.clear();
        return;
      case "append":
        return;
      default:
        throw new Error("Unsupported mode");
    }
  }

  clear() {
    this.#pre.innerHTML = "";
  }

  json({ mode, data }) {
    this.#handleMode(mode);

    const code = document.createElement("code");
    code.className = "highlight language-json";
    code.textContent = JSON.stringify(data, null, 2);

    this.#pre.append(code);
    hljs.highlightElement(code);
  }

  log({ level = "info", mode, data }) {
    this.#handleMode(mode);

    const code = document.createElement("code");
    code.className = "highlight language-shell";
    code.textContent = `> ${new Date().toISOString()} - ${data}`;

    this.#pre.append(code);
    hljs.highlightElement(code);
  }
}

export default Console;
