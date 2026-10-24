class Badge {
    static build({ name, href, imgSrc, className = "" }) {
        const container = document.createElement("div");
        container.className = className;

        const badge = { name, href, imgSrc };
        const badgeLink = document.createElement("a");
        badgeLink.href = badge.href;
        badgeLink.title = badge.name;
        badgeLink.target = "_blank";
        badgeLink.rel = "noopener noreferrer";

        const badgeImg = document.createElement("img");
        badgeImg.src = badge.imgSrc;
        badgeImg.alt = badge.name;

        badgeLink.appendChild(badgeImg);
        container.appendChild(badgeLink);
        return container;
    }
}

export default Badge;
