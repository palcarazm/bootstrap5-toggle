class Example {
    static build(examples) {
        const example = document.createElement("div");
        example.className = "example";
        example.append(...examples);
        return example;
    }
}

export default Example;
