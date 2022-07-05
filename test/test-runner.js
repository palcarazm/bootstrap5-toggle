const BADGE = $('<div></div>').addClass('badge text-monospace');

/**
 * Testcustom text feature
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
        toggleBgColor, toggleBorderColor, toggleTextColor, toggleOpacity,
        toggleHandleBgColor, toggleHandleBorderColor,
        buttonBgColor, buttonBorderColor, buttonTextColor, buttonOpacity;

    switch (colorMode.toLocaleLowerCase()) {
        case 'solid':
            hang_compare = 'rgb(255, 255, 255)';
            break;
        case 'outline':
            hang_compare = null;
            break;
        default:
            throw new DOMException('Unkown color mode "'+colorMode+'".',DOMException.NOT_SUPPORTED_ERR);
    }
    $('.test').each(function () {
        toggleOpacity = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle"), null).getPropertyValue('opacity');

        toggleBgColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-" + state.property), null).getPropertyValue('background-color');
        toggleBorderColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle"), null).getPropertyValue('border-color');
        toggleTextColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-" + state.property), null).getPropertyValue('color');
        
        toggleHandleBgColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-handle"), null).getPropertyValue('background-color');
        toggleHandleBorderColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-handle"), null).getPropertyValue('border-color');
        
        buttonBgColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('background-color');
        buttonBorderColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('border-color');
        buttonTextColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('color');
        buttonOpacity = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('opacity');
        
        $row = $(this).find('.row:eq(1)');

        isSuccess = (
                toggleBgColor == buttonBgColor
            ) && (
                toggleBorderColor == buttonBorderColor
            ) && (
                toggleOpacity == buttonOpacity
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
                    'Text: ' + buttonTextColor + '<br>'+
                    'Opacity: ' + buttonOpacity
                )
        );
        $row.find('.col:eq(0)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(
                    'Toggle Background: ' + toggleBgColor + '<br>'+
                    'Toggle Border: ' + toggleBorderColor + '<br>'+
                    'Toggle Text: ' + toggleTextColor + '<br>'+
                    'Toggle Opacity: ' + toggleOpacity + '<br>'+
                    'Handle Background: ' + toggleHandleBgColor + '<br>'+
                    'Handle Border: ' + toggleHandleBorderColor 
                )
        );
    });
}