class BootstrapToggler {
    static run() {
        document.querySelectorAll('[data-toggle="toggle"]').forEach((element) => {
            element.bootstrapToggle();
        });
    }
}

export default BootstrapToggler;
