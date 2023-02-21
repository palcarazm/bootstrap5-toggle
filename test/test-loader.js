const MAIN = $("main");
const DESCRIPTION = $("#description");
const COL = $('<div class="col text-center">');
const TEST_CONTAINER = $('<div class="border p-3 mb-4 test rounded">');
const TEST_TITLE = $('<h4 class="fw-light text-capitalize">');

const SIZES = [
  { code: "lg", name: "large", tag: true },
  { code: "md", name: "medium", tag: false },
  { code: "sm", name: "small", tag: true },
];

const COLORS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "light",
];

const STATUS = [
  { buttonCode: "enabled", inputCode: "enabled", name: "enabled", tag: false },
  {
    buttonCode: "disabled",
    inputCode: "disabled",
    name: "disabled",
    tag: true,
  },
  {
    buttonCode: "disabled",
    inputCode: "readonly",
    name: "readonly",
    tag: true,
  },
];

const STATES = {
  activated: {
    code: "checked",
    name: "activated",
    tag: true,
    value: "on",
    label: "onlabel",
    inverse: "off",
  },
  deprecatedActivated: {
    code: "checked",
    name: "activated",
    tag: true,
    value: "on",
    label: "on",
    inverse: "off",
  },
  disactivated: {
    code: "unchecked",
    name: "deactivated",
    tag: false,
    value: "off",
    label: "offlabel",
    inverse: "on",
  },
  deprecatedDisactivated: {
    code: "unchecked",
    name: "deactivated",
    tag: false,
    value: "off",
    label: "off",
    inverse: "on",
  },
};

const LAYOUTS = {
  inputGroupLG: {
    code: "input-group-lg",
    name: "Input Group Large",
    formTag: "input-group input-group-lg",
    inputTag: 'data-size="lg"',
  },
  inputGroupMD: {
    code: "input-group-md",
    name: "Input Group Medium",
    formTag: "input-group",
    inputTag: "",
  },
  inputGroupSM: {
    code: "input-group-sm",
    name: "Input Group Small",
    formTag: "input-group input-group-sm",
    inputTag: 'data-size="sm"',
  },
};

/**
 * Create the layout for testing status feature
 */
function initTestStatus() {
  let toggleDiv, buttonDiv, testDiv;
  DESCRIPTION.html(
    "Check <code>bootstrap5-toggle</code> toogle enabled/disabled"
  );
  Object.values(STATUS).forEach((status) => {
    toggleDiv = COL.clone().append(
      $(
        '<input type="checkbox" ' +
          (status.tag ? status.inputCode : "") +
          ' data-toggle="toggle">'
      )
    );
    buttonDiv = COL.clone().append(
      $("<button " + (status.tag ? status.buttonCode : "") + ">")
        .html(status.name)
        .addClass("btn btn-info")
    );
    testDiv = TEST_CONTAINER.clone().attr("id", "status-" + status.name);
    testDiv.append($('<div class="row mb-3">').append(toggleDiv, buttonDiv));
    testDiv.append(
      $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
    );
    MAIN.append(TEST_TITLE.clone().html("Status " + status.name), testDiv);
  });
}

/**
 * Create the layout for testing tristate feature
 */
function initTestTristate() {
  let toggleDiv, buttonDiv, testDiv;
  DESCRIPTION.html("Check <code>bootstrap5-toggle</code> tristate feature");
  Object.values(STATUS).forEach((status) => {
    toggleDiv = COL.clone().append(
      $(
        '<input type="checkbox" ' +
          (status.tag ? status.inputCode : "") +
          ' data-toggle="toggle" tristate>'
      )
    );
    buttonDiv = COL.clone().append(
      $("<button " + (status.tag ? status.buttonCode : "") + ">")
        .html(status.name)
        .addClass("btn btn-info")
    );
    testDiv = TEST_CONTAINER.clone().attr("id", "status-" + status.name);
    testDiv.append($('<div class="row mb-3">').append(toggleDiv, buttonDiv));
    testDiv.append(
      $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
    );
    MAIN.append(TEST_TITLE.clone().html("Status " + status.name), testDiv);
  });
}

/**
 * Create the layout for testing custom text feature
 */
function initTestCustomText() {
  let toggleDiv, textDiv, testDiv;
  DESCRIPTION.html(
    "Check custom text in <code>bootstrap5-toggle</code> buttons"
  );
  Object.values(STATES).forEach((state) => {
    toggleDiv = COL.clone().append(
      $(
        '<input type="checkbox" ' +
          (state.tag ? state.code : "") +
          ' data-toggle="toggle" data-' +
          state.label +
          '="' +
          state.name +
          '">'
      )
    );
    textDiv = COL.clone().append($("<code>").html(state.name));
    testDiv = TEST_CONTAINER.clone().attr("id", "text-" + state.name);
    testDiv.append($('<div class="row mb-3">').append(toggleDiv, textDiv));
    testDiv.append(
      $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
    );
    MAIN.append(TEST_TITLE.clone().html("Custom text " + state.name), testDiv);
  });
}

/**
 * Create the layout for testing custom style feature
 */
function initTestCustomStyle() {
  let toggleDiv, textDiv, testDiv, styles;
  DESCRIPTION.html(
    "Check custom style in <code>bootstrap5-toggle</code> buttons"
  );
  styles = ["mystyle", "MYSTYLE", "mystyle1 mystyle2"];
  styles.forEach((style) => {
    toggleDiv = COL.clone().append(
      $(
        '<input type="checkbox" data-toggle="toggle" data-style="' +
          style +
          '">'
      )
    );
    textDiv = COL.clone().append($("<code>").html(style));
    testDiv = TEST_CONTAINER.clone().attr("id", "style-" + style);
    testDiv.append($('<div class="row mb-3">').append(toggleDiv, textDiv));
    testDiv.append(
      $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
    );
    MAIN.append(TEST_TITLE.clone().html("Custom style " + style), testDiv);
  });
}

/**
 * Create the layout for testing size feature
 */
function initTestSize() {
  let toggleDiv, buttonDiv, selectDiv, inputDiv, testDiv;
  DESCRIPTION.html(
    "Compares size of <code>bootstrap</code> buttons to <code>bootstrap5-toggle</code> buttons"
  );
  SIZES.forEach((size) => {
    toggleDiv = COL.clone().append(
      $('<input type="checkbox" checked data-toggle="toggle">').attr(
        "data-size",
        size.tag ? size.code : ""
      )
    );
    buttonDiv = COL.clone().append(
      $('<button class="btn btn-primary text-center">')
        .addClass(size.tag ? "btn-" + size.code : "")
        .html("Button")
    );
    selectDiv = COL.clone().append(
      $("<select>")
        .addClass(
          size.tag ? "form-control form-control-" + size.code : "form-control"
        )
        .html('<option val="Choice 1">select</option>')
    );
    inputDiv = COL.clone().append(
      $('<input type="text" placeholder="text">').addClass(
        size.tag ? "form-control form-control-" + size.code : "form-control"
      )
    );
    testDiv = TEST_CONTAINER.clone().attr("id", "size-" + size.code);
    testDiv.append(
      $('<div class="row mb-3">').append(
        toggleDiv,
        buttonDiv,
        selectDiv,
        inputDiv
      )
    );
    testDiv.append(
      $('<div class="row align-items-center">').append(
        COL.clone(),
        COL.clone(),
        COL.clone(),
        COL.clone()
      )
    );
    MAIN.append(TEST_TITLE.clone().html(size.name), testDiv);
  });
}

/**
 * Create the layout for testing custom size feature
 */
function initTestCustomSize() {
  let toggleDiv, textDiv, testDiv;
  DESCRIPTION.html(
    "Check custom size in <code>bootstrap5-toggle</code> buttons"
  );
  toggleDiv = COL.clone().append(
    $('<input type="checkbox" data-toggle="toggle" data-width="100">')
  );
  textDiv = COL.clone().append($("<code>").html("width:100"));
  testDiv = TEST_CONTAINER.clone().attr("id", "size-width");
  testDiv.append($('<div class="row mb-3">').append(toggleDiv, textDiv));
  testDiv.append(
    $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
  );
  MAIN.append(TEST_TITLE.clone().html("Custom size width"), testDiv);

  toggleDiv = COL.clone().append(
    $('<input type="checkbox" data-toggle="toggle" data-height="75">')
  );
  textDiv = COL.clone().append($("<code>").html("height:75"));
  testDiv = TEST_CONTAINER.clone().attr("id", "size-height");
  testDiv.append($('<div class="row mb-3">').append(toggleDiv, textDiv));
  testDiv.append(
    $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
  );
  MAIN.append(TEST_TITLE.clone().html("Custom size height"), testDiv);
}

/**
 * Create the layout for testing outline feature
 * @param {Object} state : toggle state (activated or disactivated)
 */
function initTestOutline(state) {
  initTestColorsOutline("outline", state);
}

/**
 * Create the layout for testing color feature
 * @param {Object} state : toggle state (activated or disactivated)
 */
function initTestColor(state) {
  initTestColorsOutline("solid", state);
}

/**
 *  Create the layout dor testing colors or outline feature
 * @param {String} colorMode : toggle style (solid or outline)
 * @param {Object} state : toggle state (activated or disactivated)
 */
function initTestColorsOutline(colorMode, state) {
  let toggleDiv, buttonDiv, testDiv, color_tag;
  switch (colorMode.toLocaleLowerCase()) {
    case "solid":
      color_tag = "";
      break;
    case "outline":
      color_tag = "outline-";
      break;
    default:
      throw new DOMException(
        'Unkown color mode "' + colorMode + '".',
        DOMException.NOT_SUPPORTED_ERR
      );
  }
  DESCRIPTION.html(
    "Compares render color of <code>bootstrap</code> buttons to <code>bootstrap5-toggle</code> buttons"
  );
  COLORS.forEach((color) => {
    toggleDiv = COL.clone().append(
      $(
        '<input type="checkbox" ' +
          (state.tag ? state.code : "") +
          ' data-toggle="toggle" data-' +
          state.inverse +
          'style="' +
          color_tag +
          'dark">'
      ).attr("data-" + state.value + "style", color_tag + color)
    );
    buttonDiv = COL.clone().append(
      $('<button class="btn text-center">')
        .addClass("btn-" + color_tag + color)
        .html("Button")
    );
    testDiv = TEST_CONTAINER.clone().attr("id", "color-" + color);
    testDiv.append($('<div class="row mb-3">').append(toggleDiv, buttonDiv));
    testDiv.append(
      $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
    );
    MAIN.append(
      TEST_TITLE.clone()
        .addClass("text-" + color)
        .html(color + " " + state.name),
      testDiv
    );
  });
}

/**
 * Create the layout for testing layouts feature
 */
function initTestLayout() {
  let formDiv, testDiv;
  DESCRIPTION.html(
    "Check <code>bootstrap5-toggle</code> support for forms layouts"
  );
  Object.values(LAYOUTS).forEach((layout) => {
    formDiv = COL.clone().append(
      $('<div class="' + layout.formTag + '">').append(
        $(
          '<label class="input-group-text" for="' +
            layout.code +
            '">Label</label>'
        ),
        $('<input type="text" class="form-control">'),
        $(
          '<input type="checkbox" ' +
            layout.inputTag +
            ' data-toggle="toggle" id="' +
            layout.code +
            '">'
        )
      )
    );
    testDiv = TEST_CONTAINER.clone().attr("id", "layout-" + layout.code);
    testDiv.append($('<div class="row mb-3">').append(formDiv));
    testDiv.append(
      $('<div class="row align-items-center">').append(COL.clone())
    );
    MAIN.append(TEST_TITLE.clone().html("Layout " + layout.name), testDiv);
  });
}

/**
 * Create the layout for testing API contructor feature
 */
function initTestApiContructor() {
  let toggleDiv, testDiv, buttonDiv, configDiv;
  DESCRIPTION.html("Check <code>bootstrap5-toggle</code> API constructor");
  toggleDiv = COL.clone().append($('<input type="checkbox" id="toggle1">'));
  buttonDiv = COL.clone().append(
    $('<button type="button" class="btn btn-outline-secondary">')
      .html("Create")
      .on("click", () => {
        let options = {
          onlabel: "Enabled",
          offlabel: "Disabled",
          onstyle: "success",
          offstyle: "danger",
          onvalue: "ON",
          offvalue: "OFF",
          ontitle: "Title ON",
          offtitle: "Title OFF",
          size: "lg",
          tristate: true,
        };
        if (INTERFACE == "JQUERY") $("#toggle1").bootstrapToggle(options);
        if (INTERFACE == "ECMAS")
          document.querySelector("#toggle1").bootstrapToggle(options);
        $("#config1").html(JSON.stringify(options, null, 2));
      })
  );
  configDiv = COL.clone().append($('<code id="config1">'));
  testDiv = TEST_CONTAINER.clone().attr("id", "api-all");
  testDiv.append(
    $('<div class="row mb-3">').append(toggleDiv, buttonDiv, configDiv)
  );
  testDiv.append(
    $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
  );
  MAIN.append(TEST_TITLE.clone().html("API all options"), testDiv);

  toggleDiv = COL.clone().append($('<input type="checkbox" id="toggle2">'));
  buttonDiv = COL.clone().append(
    $('<button type="button" class="btn btn-outline-secondary">')
      .html("Create")
      .on("click", () => {
        let options = {
          onlabel: "Enabled",
          offlabel: "Disabled",
          onstyle: "outline-success",
          offstyle: "outline-danger",
          style: "mystyle",
          width: 150,
          height: 75,
          tabindex: -1,
        };
        if (INTERFACE == "JQUERY") $("#toggle2").bootstrapToggle(options);
        if (INTERFACE == "ECMAS")
          document.querySelector("#toggle2").bootstrapToggle(options);
        $("#config2").html(JSON.stringify(options, null, 2));
      })
  );
  configDiv = COL.clone().append($('<code id="config2">'));
  testDiv = TEST_CONTAINER.clone().attr("id", "api-custom");
  testDiv.append(
    $('<div class="row mb-3">').append(toggleDiv, buttonDiv, configDiv)
  );
  testDiv.append(
    $('<div class="row align-items-center">').append(
      COL.clone(),
      COL.clone(),
      COL.clone()
    )
  );
  MAIN.append(TEST_TITLE.clone().html("API custom options"), testDiv);

  toggleDiv = COL.clone().append(
    $('<input type="checkbox" id="toggle3" value="Enabled">')
  );
  buttonDiv = COL.clone().append(
    $('<button type="button" class="btn btn-outline-secondary">')
      .html("Create")
      .on("click", () => {
        let options = {
          onlabel: "Enabled",
          offlabel: "Disabled",
          onstyle: "success",
          offstyle: "danger",
        };
        if (INTERFACE == "JQUERY") $("#toggle3").bootstrapToggle(options);
        if (INTERFACE == "ECMAS")
          document.querySelector("#toggle3").bootstrapToggle(options);
        $("#config3").html(JSON.stringify(options, null, 2));
      })
  );
  configDiv = COL.clone().append($('<code id="config3">'));
  testDiv = TEST_CONTAINER.clone().attr("id", "api-all");
  testDiv.append(
    $('<div class="row mb-3">').append(toggleDiv, buttonDiv, configDiv)
  );
  testDiv.append(
    $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
  );
  MAIN.append(TEST_TITLE.clone().html("API input with value"), testDiv);

  toggleDiv = COL.clone().append($('<input type="checkbox" id="toggle4">'));
  buttonDiv = COL.clone().append(
    $('<button type="button" class="btn btn-outline-secondary">')
      .html("Create")
      .on("click", () => {
        let options = {
          on: "Enabled",
          off: "Disabled",
        };
        if (INTERFACE == "JQUERY") $("#toggle4").bootstrapToggle(options);
        if (INTERFACE == "ECMAS")
          document.querySelector("#toggle4").bootstrapToggle(options);
        $("#config4").html(JSON.stringify(options, null, 2));
      })
  );
  configDiv = COL.clone().append($('<code id="config4">'));
  testDiv = TEST_CONTAINER.clone().attr("id", "api-all");
  testDiv.append(
    $('<div class="row mb-3">').append(toggleDiv, buttonDiv, configDiv)
  );
  testDiv.append(
    $('<div class="row align-items-center">').append(COL.clone(), COL.clone())
  );
  MAIN.append(
    TEST_TITLE.clone().html("API input with deprecated options"),
    testDiv
  );
}

/**
 * Create the layout for testing API methods feature
 */
function initTestApiMethods() {
  let toggleDiv, testDiv, buttonDiv, buttonGroup;
  DESCRIPTION.html("Check <code>bootstrap5-toggle</code> API methods");
  toggleDiv = COL.clone().append(
    $(
      '<input type="checkbox" id="toggle" data-offvalue="OFF" name="toggle" tristate>'
    ).on("change", () => {
      $(".test").append(
        $('<div class="badge bg-secondary" id="changeNotif">').html(
          "Change event fired!"
        )
      );
    })
  );
  buttonDiv = COL.clone().append(
    $("<div>")
      .addClass("btn-group mb-2")
      .attr("role", "group")
      .append(
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="initialize">'
        )
          .html("initialize")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY") $("#toggle").bootstrapToggle();
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle();
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="destroy">'
        )
          .html("destroy")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY") $("#toggle").bootstrapToggle("destroy");
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("destroy");
          })
      ),
    $("<div>")
      .addClass("btn-group mb-2")
      .attr("role", "group")
      .append(
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="on">'
        )
          .html("on")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY") $("#toggle").bootstrapToggle("on");
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("on");
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="off">'
        )
          .html("off")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY") $("#toggle").bootstrapToggle("off");
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("off");
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="toggle">'
        )
          .html("toggle")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY") $("#toggle").bootstrapToggle("toggle");
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("toggle");
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="on-silent">'
        )
          .html("on silent")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY") $("#toggle").bootstrapToggle("on", true);
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("on", true);
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="off-silent">'
        )
          .html("off silent")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY")
              $("#toggle").bootstrapToggle("off", true);
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("off", true);
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="toggle-silent">'
        )
          .html("toggle silent")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY")
              $("#toggle").bootstrapToggle("toggle", true);
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("toggle", true);
          })
      ),
    $("<div>")
      .addClass("btn-group mb-2")
      .attr("role", "group")
      .append(
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="determinate">'
        )
          .html("determinate")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY")
              $("#toggle").bootstrapToggle("determinate");
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("determinate");
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="indeterminate">'
        )
          .html("indeterminate")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY")
              $("#toggle").bootstrapToggle("indeterminate");
            if (INTERFACE == "ECMAS")
              document
                .querySelector("#toggle")
                .bootstrapToggle("indeterminate");
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="determinate-silent">'
        )
          .html("determinate silent")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY")
              $("#toggle").bootstrapToggle("determinate", true);
            if (INTERFACE == "ECMAS")
              document
                .querySelector("#toggle")
                .bootstrapToggle("determinate", true);
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="indeterminate-silent">'
        )
          .html("indeterminate silent")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY")
              $("#toggle").bootstrapToggle("indeterminate", true);
            if (INTERFACE == "ECMAS")
              document
                .querySelector("#toggle")
                .bootstrapToggle("indeterminate", true);
          })
      ),
    $("<div>")
      .addClass("btn-group mb-2")
      .attr("role", "group")
      .append(
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="enable">'
        )
          .html("enable")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY") $("#toggle").bootstrapToggle("enable");
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("enable");
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="disable">'
        )
          .html("disable")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY") $("#toggle").bootstrapToggle("disable");
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("disable");
          }),
        $(
          '<button type="button" class="btn btn-outline-secondary" data-method="readonly">'
        )
          .html("readonly")
          .on("click", () => {
            $("#changeNotif").remove();
            if (INTERFACE == "JQUERY") $("#toggle").bootstrapToggle("readonly");
            if (INTERFACE == "ECMAS")
              document.querySelector("#toggle").bootstrapToggle("readonly");
          })
      )
  );
  testDiv = TEST_CONTAINER.clone().attr("id", "api-all");
  testDiv.append($('<div class="row mb-3">').append(toggleDiv, buttonDiv));
  MAIN.append(TEST_TITLE.clone().html("API all options"), testDiv);
}
