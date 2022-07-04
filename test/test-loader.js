const MAIN = $('main');
const DESCRIPTION = $('#description');
const COL = $('<div class="col text-center">');
const TEST_CONTAINER = $('<div class="border p-3 mb-4 test rounded">');
const TEST_TITLE = $('<h4 class="fw-light text-capitalize">');

/**
 * Create the layout for testing size feature
 */
function initTestSize() {
    DESCRIPTION.html('Compares size of <code>bootstrap</code> buttons to <code>bootstrap5-toggle</code> buttons')
    const sizes = [
        { code: 'lg', name: 'large', tag: true },
        { code: 'md', name: 'medium', tag: false },
        { code: 'sm', name: 'small', tag: true }
    ];
    sizes.forEach((size) => {
        let toggleDiv = (COL.clone())
            .append(
                $('<input type="checkbox" checked data-toggle="toggle">')
                    .attr('data-size', size.tag ? size.code : '')
            );
        let buttonDiv = (COL.clone())
            .append(
                $('<button class="btn btn-primary text-center">')
                    .addClass(size.tag ? 'btn-' + size.code : '')
                    .html('Button')
            );
        let selectDiv = (COL.clone())
            .append(
                $('<select>')
                    .addClass(size.tag ? 'form-control form-control-' + size.code : 'form-control')
                    .html('<option val="Choice 1">select</option>')
            );
        let inputDiv = (COL.clone())
            .append(
                $('<input type="text" placeholder="text">')
                    .addClass(size.tag ? 'form-control form-control-' + size.code : 'form-control')
            );
        let testDiv = (TEST_CONTAINER.clone()).attr('id', 'size-' + size.code);
        testDiv.append(
            $('<div class="row mb-3">').append(toggleDiv, buttonDiv, selectDiv, inputDiv)
        );
        testDiv.append(
            $('<div class="row align-items-center">').append(
                COL.clone(),
                COL.clone(),
                COL.clone(),
                COL.clone()
            ));
        MAIN.append((TEST_TITLE.clone()).html(size.name), testDiv);
    });
}

/**
 * Create the layout for testing outline feature
 */
 function initTestOutline() {
    DESCRIPTION.html('Compares outline render color of <code>bootstrap</code> buttons to <code>bootstrap5-toggle</code> buttons')
    const colors = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light"
    ];
    colors.forEach((color) => {
        let toggleDiv = (COL.clone())
            .append(
                $('<input type="checkbox" checked data-toggle="toggle" data-offstyle="outline-dark">')
                    .attr('data-onstyle', 'outline-' + color)
            );
        let buttonDiv = (COL.clone())
            .append(
                $('<button class="btn text-center">')
                    .addClass('btn-outline-' + color)
                    .html('Button')
            );
        let testDiv = (TEST_CONTAINER.clone()).attr('id', 'color-' + color);
        testDiv.append($('<div class="row mb-3">').append(toggleDiv, buttonDiv));
        testDiv.append($('<div class="row align-items-center">').append(COL.clone(), COL.clone()));
        MAIN.append((TEST_TITLE.clone()).addClass('text-' + color).html(color), testDiv);
    });
}