import Console from "../../Console";
import DocArticle from "../DocArticle";

class Rerender extends DocArticle {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle can be re-rendered with the <code>rerender</code> method. This can be used to update toggle when a process updates input data attributes.`;

    const code = `<form class="d-flex justify-content-between align-items-center">
  <input type="checkbox" data-toggle="toggle" checked id="api-rerender-toggle"/>
  <button type="submit" class="btn btn-outline-secondary">Change label and re-render</button>
</form>
<script>
  form.onsubmit = (e) => {
    e.preventDefault();
    const myToggle = e.target.elements["api-rerender-toggle"];
    const onLabel = crypto.getRandomValues(new Uint32Array(1))[0];
    myToggle.dataset.onlabel = onLabel;
    console.log(\`On label set to: \${onLabel}\`);
    myToggle.bootstrapToggle("rerender");
  };
</script>`;

    return super.build({
      title: "Re-render",
      description,
      example: Rerender.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const form = document.createElement("form");
    form.id = "api-state-form";
    form.className = "d-flex justify-content-between align-items-center";
    form.innerHTML = `<input type="checkbox" data-toggle="toggle" checked id="api-rerender-toggle"/>
    <button type="submit" class="btn btn-outline-secondary">Change label and re-render</button>`;

    const console = new Console();

    form.onsubmit = (e) => {
      e.preventDefault();
      const myToggle = e.target.elements["api-rerender-toggle"];
      const onLabel = crypto.getRandomValues(new Uint32Array(1))[0];
      myToggle.dataset.onlabel = onLabel;
      console.log({
        mode: "append",
        data: `On label set to: ${onLabel}`,
      });

      myToggle.bootstrapToggle("rerender");
    };

    return [form, console.htmlElement];
  }
}

export default Rerender;
