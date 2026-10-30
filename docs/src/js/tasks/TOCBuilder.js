class TOCBuilder {
    static run() {
        $("#toc").html("");
        Toc.init({
            $nav: $("#toc"),
        });
        void new bootstrap.ScrollSpy(document.body, {
            target: "#toc",
        });
    }
}

export default TOCBuilder;
