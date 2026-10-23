import Example from "./Example";

class CodeBlock {
    static build({ language, code, example = [] }) {
        const codeBlock = document.createElement("div");
        if (example.length > 0) codeBlock.appendChild(Example.build(example));
        const pre = document.createElement("pre");
        const codeElement = document.createElement("code");
        codeElement.className = `highlight language-${language}`;
        codeElement.textContent = code;

        pre.appendChild(codeElement);
        codeBlock.appendChild(pre);
        return codeBlock;
    }
}

export default CodeBlock;
