import Monitoring from "./devtools/Monitoring";
import DocSection from "./DocSection";

class DevTools extends DocSection {
    static build() {
        return super.build("devtools", "Developer Tools", [
            Monitoring.build(),
        ]);
    }
}

export default DevTools;
