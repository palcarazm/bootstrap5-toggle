class BootsrapDarkmodeToggler {
    static run() {
        document.querySelectorAll('[data-plugin="bs-darkmode-toggle"]').forEach((element) => {
            element.bsDarkmodeToggle();
        });
    }
}

export default BootsrapDarkmodeToggler;
