const BADGE = $('<div></div>').addClass('badge text-monospace');

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
 */
 function testOutline() {
    let isSuccess, $row,
        toggleOnBgColor, toggleOnBorderColor, toggleOnTextColor, toggleOpacity,
        toggleHandleBgColor, toggleHandleBorderColor,
        buttonBgColor, buttonBorderColor, buttonTextColor, buttonOpacity;
    $('.test').each(function () {
        toggleOpacity = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle"), null).getPropertyValue('opacity');

        toggleOnBgColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-on"), null).getPropertyValue('background-color');
        toggleOnBorderColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-on"), null).getPropertyValue('border-color');
        toggleOnTextColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-on"), null).getPropertyValue('color');
        
        toggleHandleBgColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-handle"), null).getPropertyValue('background-color');
        toggleHandleBorderColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " .toggle-handle"), null).getPropertyValue('border-color');
        
        buttonBgColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('background-color');
        buttonBorderColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('border-color');
        buttonTextColor = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('color');
        buttonOpacity = window.getComputedStyle(document.querySelector('#' + $(this).attr('id') + " button"), null).getPropertyValue('opacity');
        
        $row = $(this).find('.row:eq(1)');
        isSuccess = (
                toggleOnBgColor == buttonBgColor
            ) && (
                toggleOnBorderColor == buttonBorderColor && toggleHandleBgColor == buttonBorderColor && toggleHandleBorderColor == buttonBorderColor
            ) && (
                toggleOpacity == buttonOpacity
            ) && (
                toggleOnTextColor == buttonTextColor
            );

        $row.find('.col:eq(1)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(
                    'Background: ' + buttonBgColor + '<br>'+
                    'Border: ' + buttonBorderColor + '<br>'+
                    'Tex: ' + buttonTextColor + '<br>'+
                    'Opacity: ' + buttonOpacity
                )
        );
        $row.find('.col:eq(0)').append(
            (BADGE.clone())
                .addClass(isSuccess ? 'bg-success' : 'bg-danger')
                .html(
                    'On Background: ' + toggleOnBgColor + '<br>'+
                    'On Border: ' + toggleOnBorderColor + '<br>'+
                    'On Tex: ' + toggleOnTextColor + '<br>'+
                    'Handle Background: ' + toggleHandleBgColor + '<br>'+
                    'Handle Border: ' + toggleHandleBorderColor + '<br>'+
                    'Toggle Opacity: ' + toggleOpacity
                )
        );
    });
}