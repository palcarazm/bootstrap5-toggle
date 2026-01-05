import BootstrapToggler from "./tasks/BootstrapToggler";
import CodeHighlighter from "./tasks/CodeHighlighter";
import DOMBuilder from "./tasks/DOMBuilder";
import LogoSwitcher from "./tasks/LogoSwitcher";
import TOCBuilder from "./tasks/TOCBuilder";

DOMBuilder.run();
LogoSwitcher.run({ toggleDelay: 3000 });

window.onload = () => {
  BootstrapToggler.run();
  CodeHighlighter.run();
  TOCBuilder.run();
};
