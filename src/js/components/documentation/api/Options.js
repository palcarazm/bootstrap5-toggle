import DocArticle from "../DocArticle";

class Options extends DocArticle {
  static build() {
    return super.build({
      title: "Options",
      description: Options.#description(),
      example: Options.#example(),
      codePanel: Options.#codePanel(),
      alert: {
        type: "warning",
        title: "Deprecation notice",
        versionPill: {
          version: "5.0.0",
          action: "DEPRECATED",
        },
        content: `Using <code>on</code> and <code>off</code> user options is deprecated and will throw a console warning. Use <code>onlabel</code> and <code>offlabel</code> user options instead.`,
      },
    });
  }

  static #codePanel() {
    const ecmas = `<form class="d-flex justify-content-between align-items-center" id="api-option-form">
  <input type="checkbox" id="api-option-toggle" checked />
  <button type="submit" class="btn btn-outline-secondary">Launch Bootstrap Toggle</button>
</form>
<script>
  document.getElementById("api-option-form").onsubmit = (e) => {
    e.preventDefault();
    document.getElementById("api-option-toggle").bootstrapToggle({
      onlable: "Enabled",
      offlabel: "Disabled",
      onstyle: "success",
      offstyle: "danger",
      onvalue: "1",
      offvalue: "0",
      size: "lg",
      style: null,
      width: null,
      height: null,
      tabindex: -1,
      tristate: true,
    });
  };
</script>`;
    const jquery = `<form class="d-flex justify-content-between align-items-center" id="api-option-form">
  <input type="checkbox" id="api-option-toggle" checked />
  <button type="submit" class="btn btn-outline-secondary">Launch Bootstrap Toggle</button>
</form>
<script>
  $("#api-option-form").submit((e) => {
    e.preventDefault();
    $("#api-option-toggle").bootstrapToggle({
      onlable: "Enabled",
      offlabel: "Disabled",
      onstyle: "success",
      offstyle: "danger",
      onvalue: "1",
      offvalue: "0",
      size: "lg",
      style: null,
      width: null,
      height: null,
      tabindex: -1,
      tristate: true,
    });
  });
</script>`;
    return {
      name: "api-options",
      language: "javascript",
      tabs: ["ECMAScript", "jQuery"],
      contents: [ecmas, jquery],
    };
  }

  static #example() {
    const form = document.createElement("form");
    form.id = "form_state_status";
    form.className = "d-flex justify-content-between align-items-center";

    const input = document.createElement("input");
    input.id = "api-option-toggle";
    input.type = "checkbox";
    input.checked = true;

    const button = document.createElement("button");
    button.type = "submit";
    button.className = "btn btn-outline-secondary";
    button.innerHTML = "Launch Bootstrap Toggle";

    form.append(input, button);

    form.onsubmit = (e) => {
      e.preventDefault();
      input.bootstrapToggle({
        onlable: "Enabled",
        offlabel: "Disabled",
        onstyle: "success",
        offstyle: "danger",
        onvalue: "1",
        offvalue: "0",
        size: "lg",
        style: null,
        width: null,
        height: null,
        tabindex: -1,
        tristate: true,
      });
    };

    return [form];
  }

  static #description() {
    const description = document.createElement("div");
    description.innerHTML = `<p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <code>data-</code>, as in <code>data-on="Enabled"</code>. Data attributes will take precedence over JavaScript options. </p>
<div class="table-responsive">
    <table class="table table-striped table-condensed">
        <caption>API constructor options</caption>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>onlabel</code></td>
                <td class="text-nowrap">string | html</td>
                <td><code>"On"</code></td>
                <td>Text of the <em>on</em> toggle label.</td>
            </tr>
            <tr>
                <td><code>offlabel</code></td>
                <td>string | html</td>
                <td><code>"Off"</code></td>
                <td>Text of the <em>off</em> toggle label.</td>
            </tr>
            <tr>
                <td><code class="text-nowrap">onstyle</code></td>
                <td>string</td>
                <td><code class="text-nowrap">"primary"</code></td>
                <td>
                    Style of the <em>on</em> toggle.<br>Possible values are:
                    <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>,
                    <code>warning</code>, <code>info</code>, <code>light</code>, <code>dark</code><br>
                </td>
            </tr>
            <tr>
                <td><code class="text-nowrap">offstyle</code></td>
                <td>string</td>
                <td><code class="text-nowrap">"secondary"</code></td>
                <td>
                    Style of the <em>off</em> toggle.<br>Possible values are:
                    <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>,
                    <code>warning</code>, <code>info</code>, <code>light</code>, <code>dark</code><br>
                </td>
            </tr>
            <tr>
                <td><code class="text-nowrap">onvalue</code></td>
                <td>string</td>
                <td><em>null</em></td>
                <td>Sets on state value.</td>
            </tr>
            <tr>
                <td><code class="text-nowrap">offvalue</code></td>
                <td>string</td>
                <td><em>null</em></td>
                <td>Sets off state value.</td>
            </tr>
            <tr>
                <td><code>size<code></td>
							<td>string</td>
							<td><em>null</em></td>
							<td>
								Size of the toggle. If set to <em>null</em>, button is default/normal size.<br>
								Possible values are:
								<code>lg</code>, <code>sm</code>, <code>xs</code><br>
                </td>
            </tr>
            <tr>
                <td><code>style</code></td>
                <td>string</td>
                <td><em>null</em></td>
                <td>
                    Appends the provided value to the toggle's class attribute.
                    Use this to apply custom styles to the toggle.
                </td>
            </tr>
            <tr>
                <td><code>width</code></td>
                <td>integer</td>
                <td><em>null</em></td>
                <td>
                    Sets the width of the toggle.<br>
                    If set to <em>null</em>, width will be calculated.
                </td>
            </tr>
            <tr>
                <td><code>height</code></td>
                <td>integer</td>
                <td><em>null</em></td>
                <td>
                    Sets the height of the toggle.<br>
                    If set to <em>null</em>, height will be calculated.
                </td>
            </tr>
            <tr>
                <td><code>tabindex</code></td>
                <td>integer</td>
                <td><code>0</code></td>
                <td>Sets the tabindex.</td>
            </tr>
            <tr>
                <td><code>tristate</code></td>
                <td>boolean</td>
                <td><code>false</code></td>
                <td>Sets tristate support.</td>
            </tr>
        </tbody>
    </table>
</div>`;
    return description;
  }
}

export default Options;
