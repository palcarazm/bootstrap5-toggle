/**
 * Load docs
 */
$("section[data]").each(function (_index, section) {
  var request = new XMLHttpRequest();
  request.open("GET", $(section).attr("data"), true);
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      $(section).html(request.responseText);
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
  var logo_img = $(".img-toggle img");
  setInterval(function () {
    logo_img.toggleClass("invisible");
  }, 2000);

  //Version listener
  $('#version').on('change',function(){
    window.location.href = $(this).val();
  });

  // Wait for load
  setTimeout(function () {
    // Anchor root mapping
    $('a[root]').each(function(_index, anchor){
      $(anchor).attr('href',ROOT + $(anchor).attr('root'));
    });
    
    // Add table of contents
    $("#toc").html("");
    Toc.init({
      $nav: $("#toc"),
    });
    const _scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '#toc'
    });

    // format examples
    $(".example:not(.skip)").each(function () {
      // fetch & encode html
      var html = $("<div>").text($(this).html()).html();
      // find number of space/tabs on first line (minus line break)
      var count = html.match(/^(\s+)/)[0].length - 1;
      // replace tabs/spaces on each lines with
      var regex = new RegExp("\\n\\s{" + count + "}", "g");
      var code = html.replace(regex, "\n").replace(/\t/g, "  ").trim();
      // other cleanup
      code = code.replace(/=""/g, "");
      // add code block to dom
      $(this).after(
        $("<pre>").append(
          $('<code class="highlight">')
            .addClass("language-" + $(this).attr("code-lang"))
            .html(code)
        )
      );
    });

    // Init highlightBlock
    hljs.highlightAll();
    window.highlightJsBadge();

    // Init BootstraoToggle
    $('input[data-toggle="toggle"]').bootstrapToggle();
  }, 2000);
});

var Demo = function () {};

Demo.prototype.init = function (selector) {
  $(selector).bootstrapToggle(selector);
};
Demo.prototype.destroy = function (selector) {
  $(selector).bootstrapToggle("destroy");
};
Demo.prototype.on = function (selector) {
  $(selector).bootstrapToggle("on");
};
Demo.prototype.off = function (selector) {
  $(selector).bootstrapToggle("off");
};
Demo.prototype.toggle = function (selector) {
  $(selector).bootstrapToggle("toggle");
};
Demo.prototype.enable = function (selector) {
  $(selector).bootstrapToggle("enable");
};
Demo.prototype.disable = function (selector) {
  $(selector).bootstrapToggle("disable");
};
Demo.prototype.readonly = function (selector) {
  $(selector).bootstrapToggle("readonly");
};
Demo.prototype.indeterminate = function (selector) {
  $(selector).bootstrapToggle("indeterminate");
};
Demo.prototype.determinate = function (selector) {
  $(selector).bootstrapToggle("determinate");
};

demo = new Demo();
