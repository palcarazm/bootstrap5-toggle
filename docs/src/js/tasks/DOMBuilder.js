import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Notice from "../components/Notice";

class DOMBuilder {
    static #sections = [
        Header.build(),
        Notice.build(),
        Main.build(),
        Footer.build(),
    ];
    static run() {
        document.body.append(...this.#sections);
    }
}
export default DOMBuilder;
