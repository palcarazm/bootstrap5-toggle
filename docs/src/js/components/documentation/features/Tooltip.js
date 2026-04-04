import DocArticle from "../DocArticle";

class Tooltip {
  static build() {
    const description = document.createDocumentFragment();

    const p1 = document.createElement("p");
    p1.innerHTML = `Bootstrap toggle allows to set tooltip. Just add the <code>data-tooltip-title-on</code> or <code>data-tooltip-title-off</code> or <code>data-tooltip-title-mixed</code> attribute to set a custom label. Plain text and HTML are supported. The attribute <code>data-tooltip-title</code> is used as fallback when a title for the specific state is not provided.`;
    description.appendChild(p1);

    const p2 = document.createElement("p");
    p2.innerHTML = `Tooltips placement can be set using the <code>data-tooltip-placement</code> attribute. Possible values are: <code>top</code>, <code>bottom</code>, <code>left</code>, and <code>right</code>. The default value is <code>top</code>.`;
    description.appendChild(p2);

    const code = `<input type="checkbox" checked data-toggle="toggle" data-tooltip-title="Fallback" data-tooltip-title-on="Checked" data-tooltip-title-off="Unchecked" tristate/>
<input type="checkbox" checked data-toggle="toggle" data-tooltip-title-on="Checked" data-tooltip-title-off="Unchecked" data-tooltip-placement="bottom" />
<input type="checkbox" checked data-toggle="toggle" data-tooltip-title-on="<i class="fa-solid fa-circle-check"></i> Checked" data-tooltip-title-off="<i class="fa-solid fa-circle-xmark"></i> Unchecked" />`;

    return DocArticle.build({
      title: "Tooltip",
      description,
      example: Tooltip.#example(),
      codeBlock: {
        language: "html",
        code,
      },
      versionPill: { action: "SINCE", version: "5.3.0" },
    });
  }

  static #example() {
    const input1 = document.createElement("input");
    input1.type = "checkbox";
    input1.checked = true;
    input1.dataset.toggle = "toggle";
    input1.dataset.tooltipTitle = "Fallback";
    input1.dataset.tooltipTitleOn = "Checked";
    input1.dataset.tooltipTitleOff = "Unchecked";
    input1.setAttribute("tristate", "");

    const input2 = document.createElement("input");
    input2.type = "checkbox";
    input2.checked = true;
    input2.dataset.toggle = "toggle";
    input2.dataset.tooltipTitleOn = "Checked";
    input2.dataset.tooltipTitleOff = "Unchecked";
    input2.dataset.tooltipPlacement = "bottom";

    const input3 = document.createElement("input");
    input3.type = "checkbox";
    input3.checked = true;
    input3.dataset.toggle = "toggle";
    input3.dataset.tooltipTitleOn =
      '<i class="fa-solid fa-circle-check"></i> Checked';
    input3.dataset.tooltipTitleOff =
      '<i class="fa-solid fa-circle-xmark"></i> Unchecked';

    return [input1, input2, input3];
  }
}
export default Tooltip;
