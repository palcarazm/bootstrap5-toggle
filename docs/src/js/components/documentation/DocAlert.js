import VersionPill from "../VersionPill";

class DocAlert {
    static build({ type, title, content, versionPill = null }) {
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;

        const alertBody = document.createElement("div");
        alertBody.innerHTML = content;

        alert.append(DocAlert.#alertHeader(type, title, versionPill), alertBody);
        return alert;
    }

    static #alertHeader(type, title, versionPill) {
        const header = document.createElement("div");
        header.className =
      "d-flex justify-content-between align-items-center alert-heading";

        let icon = document.createElement("i");
        switch (type) {
        case "info":
            icon.className = "fa-solid fa-info-circle";
            break;
        case "success":
            icon.className = "fa-solid  fa-circle-check";
            break;
        case "warning":
            icon.className = "fa-solid  fa-exclamation-circle";
            break;
        case "danger":
            icon.className = "fa-solid  fa-exclamation-triangle";
            break;
        default:
            icon = null;
            break;
        }

        const col = document.createElement("div");
        if (icon) col.appendChild(icon);
        const titleContainer = document.createElement("span");
        titleContainer.className = "text-uppercase fw-bold ms-1";
        titleContainer.textContent = title;
        col.appendChild(titleContainer);

        header.appendChild(col);

        if (versionPill) header.appendChild(VersionPill.build(versionPill));

        return header;
    }
}

export default DocAlert;
