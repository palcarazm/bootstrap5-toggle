import DocArticle from "../DocArticle";

class CustomStyle {
  static build() {
    const description = document.createElement("p");
    description.innerHTML = `Bootstrap toggle allows to style the buttons to fit an existing UX. Just add the <code>data-style</code> attribute to set a custom css class.`;

    const code = `<!-- iOS Style: Rounded -->
<style>
  .toggle.ios,
  .toggle.ios .toggle-on,
  .toggle.ios .toggle-off,
  .toggle.ios .toggle-handle{
    border-radius: 20rem;
  }
</style>
<input type="checkbox" checked data-toggle="toggle" data-style="ios" />

<!-- Android Style: No radius -->
<style>
  .toggle.android,
  .toggle.android .toggle-on,
  .toggle.android .toggle-off,
  .toggle.android .toggle-handle{
    border-radius: 0px;
  }
</style>
<input type="checkbox" checked data-toggle="toggle" data-style="android" />`;

    return DocArticle.build({
      title: "Custom Style",
      description,
      example: CustomStyle.#example(),
      codeBlock: {
        language: "html",
        code,
      },
    });
  }

  static #example() {
    const iosStyle = document.createElement("style");
    iosStyle.textContent = `.toggle.ios, .toggle.ios .toggle-on, .toggle.ios .toggle-off, .toggle.ios .toggle-handle { border-radius: 20rem; }`;

    const iosInput = document.createElement("input");
    iosInput.type = "checkbox";
    iosInput.checked = true;
    iosInput.dataset.toggle = "toggle";
    iosInput.dataset.style = "ios";

    const androidStyle = document.createElement("style");
    androidStyle.textContent = `.toggle.android , .toggle.android .toggle-on, .toggle.android .toggle-off, .toggle.android .toggle-handle{ border-radius: 0px; }`;

    const androidInput = document.createElement("input");
    androidInput.type = "checkbox";
    androidInput.checked = true;
    androidInput.dataset.toggle = "toggle";
    androidInput.dataset.style = "android";

    return [iosStyle, iosInput, androidStyle, androidInput];
  }
}
export default CustomStyle;
