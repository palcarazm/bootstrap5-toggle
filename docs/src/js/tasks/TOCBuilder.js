class TOCBuilder {
    static run() {
        $("#toc").html("");
        Toc.init({
            $nav: $("#toc"),
        });
        const _scrollSpy = new bootstrap.ScrollSpy(document.body, {
            target: "#toc",
        });
    }
}

export default TOCBuilder;
