const BADGE = $('<div></div>').addClass('badge text-monospace');
/**
 * Test status feature
 */
 function testStatus() {
    let toggle, button, isSuccess,
        toggle_opacity,toggle_cursor, toggle_cursorevt, toggle_status,
        button_opacity,button_cursor, button_cursorevt, button_status;

    $('.test').each(function () {
        toggle = $(this).find('.toggle');
        button = $(this).find('button');

        toggle_opacity = window.getComputedStyle(toggle[0], null).getPropertyValue('opacity');
        button_opacity = window.getComputedStyle(button[0], null).getPropertyValue('opacity');

        toggle_cursor = window.getComputedStyle(toggle[0], null).getPropertyValue('cursor');
        button_cursor = window.getComputedStyle(button[0], null).getPropertyValue('cursor');
        
        toggle_cursorevt = window.getComputedStyle(toggle[0], null).getPropertyValue('pointer-events');
        button_cursorevt = window.getComputedStyle(button[0], null).getPropertyValue('pointer-events');
        
        toggle_status = toggle.is('[disabled]');
        button_status = button.is('[disabled]');

        isSuccess = (toggle_opacity == button_opacity) && (toggle_cursor == button_cursor) && (toggle_cursorevt == button_cursorevt) && (toggle_status == button_status);

        $(this).find('.row:eq(1) .col:eq(1)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(
                    'Opacity: ' + toggle_opacity + '<br>' +
                    'Cursor: ' + toggle_cursor + '<br>' +
                    'Cursor Event: ' + toggle_cursorevt + '<br>' +
                    'Status: ' + toggle_status
                )
        );

        $(this).find('.row:eq(1) .col:eq(0)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(
                    'Opacity: ' + button_opacity + '<br>' +
                    'Cursor: ' + button_cursor + '<br>' +
                    'Cursor Event: ' + button_cursorevt + '<br>' +
                    'Status: ' + button_status
                )
        );
    });
}

/**
 * Test custom text feature
 */
 function testCustomText() {
    let toggle_status, toggle_text, text, isSuccess;

    $('.test').each(function () {
        toggle_status = $(this).find('.toggle input[type="checkbox"]').prop('checked');
        text = $(this).find('code').html();
        toggle_text = $(this).find('.toggle ' + (toggle_status ? '.toggle-on' : '.toggle-off')).html();

        isSuccess = (text == toggle_text);

        $(this).find('.row:eq(1) .col:eq(1)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html('Text: ' + text)
        );

        $(this).find('.row:eq(1) .col:eq(0)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html('Text: ' + toggle_text)
        );
    });
}

/**
 * Test custom style feature
 */
 function testCustomStyle() {
    let toggle, style, isSuccess;

    $('.test').each(function () {
        style = $(this).find('code').html();
        toggle = $(this).find('.toggle');
        isSuccess =  toggle.hasClass(style);

        $(this).find('.row:eq(1) .col:eq(0)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(
                    'Toggle classes: ' + toggle.attr('class') + '<br>' +
                    'Custom class: ' + style
                )
        );
    });
}

/**
 * Test size feature
 */
function testSize() {
    let isSuccess, bagdeclass, toggle, toogleHeight, item, itemHeight, $row;
    $('.test').each(function () {
        isSuccess = true;
        $row = $(this).find('.row:eq(1)');
        toggle = $(this).find('div.toggle').css('height');
        toogleHeight = parseFloat(toggle.match(/(\d+.\d+)/) || toggle.match(/(\d+)/));
        $(this).find('.row:eq(0) .col').each(function (idx) {
            if (idx == 0) return;
            item = $(this).find('div.toggle, .btn, [class^="form-control"]').css('height');
            itemHeight = parseFloat(item.match(/(\d+.\d+)/) || item.match(/(\d+)/));
            if (Math.abs(toogleHeight - itemHeight) <= 0.05) {
                bagdeclass='bg-success';
            } else {
                isSuccess = false;
                bagdeclass='bg-danger';
            }
            $row.find('.col:eq(' + idx + ')').append(
                (BADGE.clone())
                    .addClass(bagdeclass)
                    .html('H: ' + itemHeight + 'px')
            );
        });
        $row.find('.col:eq(0)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html('H: ' + toogleHeight + 'px')
        );
    });
}

/**
 * Test custom size feature
 */
 function testCustomSize() {
    let isSuccess, property, toggle, toggleSize, item, itemSize;
    $('.test').each(function () {
        item = $(this).find('code').html();
        property = item.split(":")[0];
        itemSize = item.split(":")[1];

        toggle = $(this).find('div.toggle').css(property);
        toggleSize = parseFloat(toggle.match(/(\d+.\d+)/) || toggle.match(/(\d+)/));
        
        isSuccess = Math.abs(toggleSize - itemSize) <= 0.05;
        $(this).find('.row:eq(1) .col:eq(0)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(
                    property + '<br>'+
                    'current: ' + toggleSize + 'px' + '<br>'+
                    'expected: ' + itemSize + 'px'
                    )
        );
    });
}

/**
 * Test outline feature
 * @param {Object} state : toggle state (activated or disactivated)
 */
 function testOutline(state) {
    testColorsOutline('outline', state);
}

/**
 * Test color feature
 * @param {Object} state : toggle state (activated or disactivated)
 */
 function testColor(state) {
    testColorsOutline('solid', state);
 }

/**
 * Test color and outline feature
 * @param {String} colorMode : toggle style (solid or outline)
 * @param {Object} state : toggle state (activated or disactivated)
 */
 function testColorsOutline(colorMode, state) {
    let isSuccess, $row, hang_compare,
        toggleBgColor, toggleBorderColor, toggleTextColor,
        toggleHandleBgColor, toggleHandleBorderColor,
        buttonBgColor, buttonBorderColor, buttonTextColor;

    switch (colorMode.toLocaleLowerCase()) {
        case 'solid':
            hang_compare = 'rgb(248, 249, 250)';
            break;
        case 'outline':
            hang_compare = null;
            break;
        default:
            throw new DOMException('Unkown color mode "'+colorMode+'".',DOMException.NOT_SUPPORTED_ERR);
    }
    $('.test').each(function () {
        toggleBgColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-" + state.property), null).getPropertyValue('background-color');
        toggleBorderColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle"), null).getPropertyValue('border-color');
        toggleTextColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-" + state.property), null).getPropertyValue('color');
        
        toggleHandleBgColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-handle"), null).getPropertyValue('background-color');
        toggleHandleBorderColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-handle"), null).getPropertyValue('border-color');
        
        buttonBgColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('background-color');
        buttonBorderColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('border-color');
        buttonTextColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('color');
        
        $row = $(this).find('.row:eq(1)');

        isSuccess = (
                toggleBgColor == buttonBgColor
            ) && (
                toggleBorderColor == buttonBorderColor
            ) && (
                toggleTextColor == buttonTextColor
            ) && (
                toggleHandleBgColor == (hang_compare || buttonBorderColor) && toggleHandleBorderColor == (hang_compare || buttonBorderColor)
            );

        $row.find('.col:eq(1)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(
                    'Background: ' + buttonBgColor + '<br>'+
                    'Border: ' + buttonBorderColor + '<br>'+
                    'Text: ' + buttonTextColor
                )
        );
        $row.find('.col:eq(0)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(
                    'Toggle Background: ' + toggleBgColor + '<br>'+
                    'Toggle Border: ' + toggleBorderColor + '<br>'+
                    'Toggle Text: ' + toggleTextColor + '<br>'+
                    'Handle Background: ' + toggleHandleBgColor + '<br>'+
                    'Handle Border: ' + toggleHandleBorderColor 
                )
        );
    });
}

/**
 * Test layout feature
 */
 function testLayout() {
    let isSuccess, toggle, toogleHeight, item, itemHeight, badgeHTML;
    $('.test').each(function () {
        isSuccess = true;
        toggle = $(this).find('div.toggle').css('height');
        toogleHeight = parseFloat(toggle.match(/(\d+.\d+)/) || toggle.match(/(\d+)/));
        badgeHTML = 'H Toggle: ' + toogleHeight + 'px<br>H Elements:<ul>';

        $(this).find('div.toggle').siblings().each(function () {
            item = $(this).css('height');
            itemHeight = parseFloat(item.match(/(\d+.\d+)/) || item.match(/(\d+)/));
            badgeHTML+='<li>'+ itemHeight +'px</li>';
            if (Math.abs(toogleHeight - itemHeight) >= 0.05) {
                isSuccess = false;
            }
        });

        badgeHTML+='</ul>'
        $(this).find('.row:eq(1) .col').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(badgeHTML)
        );
    });
}