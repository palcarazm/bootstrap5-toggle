import Console from "../../Console";
import DocArticle from "../DocArticle";

class EventPropagation extends DocArticle {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `All events are propagated to and from input element to the toggle. Listen for events on the <code>input</code> directly as the toggle stays synced with the
    input.`;

    const code = `<input type="checkbox" data-toggle="toggle" checked id="events-propagation-toggle"/>
<script>
  const myToggle = document.getElementById("events-propagation-toggle");
  myToggle.addEventListener("change", (e) => {
    console.log(\`Input change fired. Checked state: \${myToggle.checked}\`);
  });
</script>`;

    return super.build({
      title: "Event Propagation",
      description,
      example: EventPropagation.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.dataset.toggle = "toggle";
    input.checked = true;
    input.id = "events-propagation-toggle";

    const console = new Console();

    input.addEventListener("change", (e) => {
      console.log({
        mode: "append",
        data: `Input change fired. Checked state: ${input.checked}`,
      });
    });

    return [input, console.htmlElement];
  }
}

export default EventPropagation;
