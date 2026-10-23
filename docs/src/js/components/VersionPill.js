class VersionPill {
    static build({ version, action }) {
        let color;
        switch (action) {
        case "SINCE":
            color = "success";
            break;
        case "DEPRECATED":
            color = "warning";
            break;
        case "REMOVED":
            color = "danger";
            break;
        default:
            throw new Error("Unsupported action");
        }
        const pill = document.createElement("span");
        pill.className = `badge rounded-pill bg-${color} px-2`;
        pill.textContent = `${action} v${version}`;
        return pill;
    }
}

export default VersionPill;
