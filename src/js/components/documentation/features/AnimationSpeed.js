import DocArticle from "../DocArticle";

class AnimationSpeed {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Transition speed can be easily controlled with css <code>transition</code> property on <code>.toggle-group</code>. You can also turn animation off completely.`;

    const code = `<style>
  .slow .toggle-group {
    transition: left 0.7s;
    -webkit-transition: left 0.7s;
  }

  .fast .toggle-group {
    transition: left 0.1s;
    -webkit-transition: left 0.1s;
  }

  .none .toggle-group {
    transition: none;
    -webkit-transition: none;
  }
</style>
<input type="checkbox" checked data-toggle="toggle" data-style="slow" />
<input type="checkbox" checked data-toggle="toggle" data-style="fast" />
<input type="checkbox" checked data-toggle="toggle" data-style="none" />`;

    return DocArticle.build({
      title: "Animation Speed",
      description,
      example: AnimationSpeed.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const style = document.createElement("style");
    style.textContent = `
    .slow .toggle-group { transition: left 0.7s; -webkit-transition: left 0.7s; }
    .fast .toggle-group { transition: left 0.1s; -webkit-transition: left 0.1s; }
    .none .toggle-group { transition: none; -webkit-transition: none; }`;

    const inputs = ["slow", "fast", "none"].map((style) => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = true;
      input.dataset.toggle = "toggle";
      input.dataset.style = style;
      return input;
    });

    return [style, ...inputs];
  }
}
export default AnimationSpeed;
