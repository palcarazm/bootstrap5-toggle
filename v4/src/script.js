/**
 * Load docs
 */
$("section[data]").each(function (_index, section) {
  let request = new XMLHttpRequest();
  request.open("GET", $(section).attr("data"), true);
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      // file deepcode ignore DOMXSS: is desired to load the html and the js from the source file.
      $(section).html(request.responseText);

      // format examples
      $(section)
        .find(".example:not(.skip)")
        .each(function () {
          // fetch & encode html
          let html = $("<div>").text($(this).html()).html();
          // find number of space/tabs on first line (minus line break)
          let count = html.match(/^(\s+)/)[0].length - 1;
          // replace tabs/spaces on each lines with
          let regex = new RegExp("\\n\\s{" + count + "}", "g");
          let code = html.replace(regex, "\n").replace(/\t/g, "  ").trim();
          // other cleanup
          code = code.replace(/=""/g, "");
          // add code block to dom
          $(this).after(
            $("<pre>").append(
              $('<code class="highlight">')
                .addClass(
                  $(this).attr("code-lang")
                    ? "language-" + $(this).attr("code-lang")
                    : "language-html"
                )
                .html(code)
            )
          );
        });
    }
    if (request.readyState === 4 && request.status != 200) {
      $(section).html(
        $("<div></div>")
          .addClass("alert alert-warning")
          .attr("role", "alert")
          .html("Ouups! We can't load this section.")
      );
    }
  };
});

/**
 * Main function
 */
$().ready(function () {
  //Blinking logo
  let logo_img = $(".img-toggle img");
  setInterval(function () {
    logo_img.toggleClass("invisible");
  }, 2000);

  //Version listener
  $("#version").on("change", function () {
    window.location.href = $(this).val();
  });

  // Wait for load
  setTimeout(function () {
    // Anchor root mapping
    $("a[root]").each(function (_index, anchor) {
      $(anchor).attr("href", ROOT + $(anchor).attr("root"));
    });

    // Add table of contents
    $("#toc").html("");
    Toc.init({
      $nav: $("#toc"),
    });
    const _scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: "#toc",
    });

    // Init highlightBlock
    hljs.highlightAll();
    window.highlightJsBadge();

    // Init BootstraoToggle
    $('input[data-toggle="toggle"]').bootstrapToggle();
  }, 2000);
});

class Demo {
  init = function (selector) {
    $(selector).bootstrapToggle(selector);
  };
  destroy = function (selector) {
    $(selector).bootstrapToggle("destroy");
  };
  on = function (selector) {
    $(selector).bootstrapToggle("on");
  };
  off = function (selector) {
    $(selector).bootstrapToggle("off");
  };
  toggle = function (selector) {
    $(selector).bootstrapToggle("toggle");
  };
  enable = function (selector) {
    $(selector).bootstrapToggle("enable");
  };
  disable = function (selector) {
    $(selector).bootstrapToggle("disable");
  };
  readonly = function (selector) {
    $(selector).bootstrapToggle("readonly");
  };
  indeterminate = function (selector) {
    $(selector).bootstrapToggle("indeterminate");
  };
  determinate = function (selector) {
    $(selector).bootstrapToggle("determinate");
  };
}

const demo = new Demo();
