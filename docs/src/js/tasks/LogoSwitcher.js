class LogoSwitcher {
    /**
   * Run the logo switcher.
   * @param {Object} [options] - Options.
   * @param {number} [options.toggleDelay=2000] - Delay between toggle in milliseconds.
   */
    static run({ toggleDelay = 2000 } = {}) {
        document.querySelectorAll(".img-toggle img").forEach((element) => {
            setInterval(function () {
                element.classList.toggle("invisible");
            }, toggleDelay);
        });
    }
}

export default LogoSwitcher;
