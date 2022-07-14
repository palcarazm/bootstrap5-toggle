const ENV = $('#env-data')
function appStartup(test) {
    ENV.html('');
    ENV.append(
        $("<div>").append($("<code>").html("Bootstrap v"+Bootstrap)),
        $("<div>").append($("<code>").html("Interface "+INTERFACE))
        )
    MAIN.html('');
    DESCRIPTION.html('');
    switch (test) {
        case 'status':
            initTestStatus() 
            break;
        case 'size':
            initTestSize() 
            break;
        case 'custom-size':
            initTestCustomSize() 
            break;
        case 'outline-on':
            initTestOutline(STATES.activated) 
            break;
        case 'outline-off':
            initTestOutline(STATES.disactivated) 
            break;
        case 'color-on':
            initTestColor(STATES.activated) 
            break;
        case 'color-off':
            initTestColor(STATES.disactivated) 
            break;
        case 'custom-text':
            initTestCustomText() 
            break;
        case 'layout':
            initTestLayout() 
            break;
    
        default:
            throw new DOMException('Unknown test case: '+ test, "NotSupportedError");
    }
    switch (INTERFACE) {
        case 'ECMAS':
            document.querySelectorAll('input[type=checkbox][data-toggle="toggle"]').forEach(function(ele) {
                ele.bootstrapToggle();
            });
            break;
        case 'JQUERY':
            $('input[data-toggle="toggle"]').bootstrapToggle();
            break;
    
        default:
            throw new DOMException('Unknown interface: '+ INTERFACE, "NotSupportedError");
    }
    
    setTimeout(function () {
        switch (test) {
        case 'status':
            testStatus() 
            break;
        case 'size':
            testSize() 
            break;
        case 'custom-size':
            testCustomSize() 
            break;
        case 'outline-on':
            testOutline(STATES.activated) 
            break;
        case 'outline-off':
            testOutline(STATES.disactivated) 
            break;
        case 'color-on':
            testColor(STATES.activated) 
            break;
        case 'color-off':
            testColor(STATES.disactivated) 
            break;
        case 'custom-text':
            testCustomText() 
            break;
        case 'layout':
            testLayout() 
            break;
    
        default:
            throw new DOMException('Unknown test case: '+ test, "NotSupportedError");
    }
    }, 500);
}
$(document).ready( function () {
    $('#test-selector button[data-test]').click(function() {
        appStartup($(this).attr('data-test'))
    });
});