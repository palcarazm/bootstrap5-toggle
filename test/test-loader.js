const MAIN = $('main');
const DESCRIPTION = $('#description');
const COL = $('<div class="col text-center">');
const TEST_CONTAINER = $('<div class="border p-3 mb-4 test rounded">');
const TEST_TITLE = $('<h4 class="fw-light text-capitalize">');

const SIZES = [
    { code: 'lg', name: 'large', tag: true },
    { code: 'md', name: 'medium', tag: false },
    { code: 'sm', name: 'small', tag: true }
];

const COLORS = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "light"
];

const STATUS = [
    {code: 'enabled', name: 'enabled', tag : false},
    {code: 'disabled', name: 'disabled', tag : true}
];

const STATES = {
    activated : {code: 'checked', name: 'activated', tag : true, property: 'on' , inverse: 'off'},
    disactivated : {code: 'unchecked', name: 'deactivated', tag : false, property: 'off', inverse: 'on'}
};

const LAYOUTS = {
    inputGroupLG: {code: 'input-group-lg', name:'Input Group Large', formTag: 'input-group input-group-lg', inputTag:'data-size="lg"'},
    inputGroupMD: {code: 'input-group-md', name:'Input Group Medium', formTag: 'input-group', inputTag:''},
    inputGroupSM: {code: 'input-group-sm', name:'Input Group Small', formTag: 'input-group input-group-sm', inputTag:'data-size="sm"'}
}

/**
 * Create the layout for testing status feature
 */
 function initTestStatus() {
    let toggleDiv, buttonDiv, testDiv;
    DESCRIPTION.html('Check <code>bootstrap5-toggle</code> toogle enabled/disabled');
    (Object.values(STATUS)).forEach((status)=>{
        toggleDiv = (COL.clone())
        .append(
            $('<input type="checkbox" ' + (status.tag ? status.code : '') + ' data-toggle="toggle">')
        );
        buttonDiv = (COL.clone())
        .append(
            $('<button ' + (status.tag ? status.code : '') + '>').html(status.name).addClass('btn btn-info')
        );
    testDiv = (TEST_CONTAINER.clone()).attr('id', 'status-' + status.name);
    testDiv.append($('<div class="row mb-3">').append(toggleDiv, buttonDiv));
    testDiv.append($('<div class="row align-items-center">').append(COL.clone(), COL.clone()));
    MAIN.append((TEST_TITLE.clone()).html('Status ' + status.name), testDiv);
    });
}

/**
 * Create the layout for testing custom text feature
 */
function initTestCustomText() {
    let toggleDiv, textDiv, testDiv;
    DESCRIPTION.html('Check custom text in <code>bootstrap5-toggle</code> buttons');
    (Object.values(STATES)).forEach((state)=>{
        toggleDiv = (COL.clone())
        .append(
            $('<input type="checkbox" ' + (state.tag ? state.code : '') + ' data-toggle="toggle" data-' + state.property + '="'+state.name+'">')
        );
        textDiv = (COL.clone())
        .append(
            $('<code>').html(state.name)
        );
    testDiv = (TEST_CONTAINER.clone()).attr('id', 'text-' + state.name);
    testDiv.append($('<div class="row mb-3">').append(toggleDiv, textDiv));
    testDiv.append($('<div class="row align-items-center">').append(COL.clone(), COL.clone()));
    MAIN.append((TEST_TITLE.clone()).html('Custom text ' + state.name), testDiv);
    });
}

/**
 * Create the layout for testing size feature
 */
function initTestSize() {
    let toggleDiv, buttonDiv, selectDiv, inputDiv, testDiv;
    DESCRIPTION.html('Compares size of <code>bootstrap</code> buttons to <code>bootstrap5-toggle</code> buttons')
    SIZES.forEach((size) => {
        toggleDiv = (COL.clone())
            .append(
                $('<input type="checkbox" checked data-toggle="toggle">')
                    .attr('data-size', size.tag ? size.code : '')
            );
        buttonDiv = (COL.clone())
            .append(
                $('<button class="btn btn-primary text-center">')
                    .addClass(size.tag ? 'btn-' + size.code : '')
                    .html('Button')
            );
        selectDiv = (COL.clone())
            .append(
                $('<select>')
                    .addClass(size.tag ? 'form-control form-control-' + size.code : 'form-control')
                    .html('<option val="Choice 1">select</option>')
            );
        inputDiv = (COL.clone())
            .append(
                $('<input type="text" placeholder="text">')
                    .addClass(size.tag ? 'form-control form-control-' + size.code : 'form-control')
            );
        testDiv = (TEST_CONTAINER.clone()).attr('id', 'size-' + size.code);
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
 * @param {Object} state : toggle state (activated or disactivated)
 */
 function initTestOutline(state) {
    initTestColorsOutline('outline', state);
}

/**
 * Create the layout for testing color feature
 * @param {Object} state : toggle state (activated or disactivated)
 */
 function initTestColor(state) {
    initTestColorsOutline('solid', state);
 }

 /**
  *  Create the layout dor testing colors or outline feature
  * @param {String} colorMode : toggle style (solid or outline)
  * @param {Object} state : toggle state (activated or disactivated)
  */
 function initTestColorsOutline(colorMode, state) {
    let toggleDiv, buttonDiv, testDiv, color_tag;
    switch (colorMode.toLocaleLowerCase()) {
        case 'solid':
            color_tag = '';
            break;
        case 'outline':
            color_tag  ='outline-'
            break;
        default:
            throw new DOMException('Unkown color mode "'+colorMode+'".',DOMException.NOT_SUPPORTED_ERR);
    }
    DESCRIPTION.html('Compares render color of <code>bootstrap</code> buttons to <code>bootstrap5-toggle</code> buttons')
    COLORS.forEach((color) => {
        toggleDiv = (COL.clone())
            .append(
                $('<input type="checkbox" ' + (state.tag ? state.code : '') + ' data-toggle="toggle" data-' + state.inverse + 'style="'+color_tag+'dark">')
                    .attr('data-' + state.property + 'style', color_tag + color)
            );
        buttonDiv = (COL.clone())
            .append(
                $('<button class="btn text-center">')
                    .addClass('btn-'+color_tag + color)
                    .html('Button')
            );
        testDiv = (TEST_CONTAINER.clone()).attr('id', 'color-' + color);
        testDiv.append($('<div class="row mb-3">').append(toggleDiv, buttonDiv));
        testDiv.append($('<div class="row align-items-center">').append(COL.clone(), COL.clone()));
        MAIN.append((TEST_TITLE.clone()).addClass('text-' + color).html(color + ' ' + state.name), testDiv);
    });
 }

/**
 * Create the layout for testing layouts feature
 */
function initTestLayout() {
    let formDiv, testDiv;
    DESCRIPTION.html('Check <code>bootstrap5-toggle</code> support for forms layouts');
    (Object.values(LAYOUTS)).forEach((layout)=>{
        formDiv = (COL.clone())
        .append( $('<div class="'+layout.formTag+'">')
            .append(
                $('<span class="input-group-text">Label</span>'),
                $('<input type="text" class="form-control">'),
                $('<input type="checkbox" ' + layout.inputTag + ' data-toggle="toggle">')
            )
        );
    testDiv = (TEST_CONTAINER.clone()).attr('id', 'layout-' + layout.code);
    testDiv.append($('<div class="row mb-3">').append(formDiv));
    testDiv.append($('<div class="row align-items-center">').append(COL.clone()));
    MAIN.append((TEST_TITLE.clone()).html('Layout ' + layout.name), testDiv);
    });
}