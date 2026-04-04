import DocSection from "./DocSection";
import DocArticle from "./DocArticle";

class Accessibility extends DocSection {
  static build() {
    return super.build("accessibility", "ARIA Accessibility", [
      DocArticle.build({
        title: "Key Accessibility Features",
        description: Accessibility.#featuresCards(),
        versionPill: { action: "SINCE", version: "5.3.0" },
      }),
      DocArticle.build({
        title: "WCAG 2.2 Compliance",
        description: Accessibility.#wcagCompliance(),
        className: "mt-3",
        versionPill: { action: "SINCE", version: "5.3.0" },
      }),
    ]);
  }

  static #features = [
    {
      title: "Semantic Role Implementation",
      description: `Each toggle switch is assigned the <code>role="switch"</code> attribute, allowing screen readers to identify it as a toggleable control.`,
    },
    {
      title: "State Representation",
      description: `The <code>aria-checked</code> attribute dynamically reflects the toggle's state (on/off), providing real-time feedback to assistive technologies.`,
    },
    {
      title: "Labeling",
      description: `Toggles can be associated with descriptive labels using the <code>aria-labelledby</code> or <code>aria-label</code> attributes, enhancing clarity for screen reader users.`,
    },

    {
      title: "Keyboard Navigation",
      description: `The toggle supports keyboard navigation with <code>TAB</code> and <code>ENTER</code> keys, ensuring full accessibility for users who rely on keyboard input.`,
    },
    {
      title: "Indeterminate State Accessibility",
      description: `When a toggle is in an indeterminate state, it uses the <code>aria-checked="mixed"</code> attribute to inform assistive technologies of its unique status.`,
    },
    {
      title: "Focus Management",
      description: `The toggle is fully focusable and provides visual focus indicators, aiding users in tracking their navigation through the interface.`,
    },
  ];

  static #featuresCards() {
    const fragment = document.createDocumentFragment();

    const description = document.createElement("p");
    description.innerHTML = `Bootstrap Toggle is built with accessibility in mind. The implementation ensures seamless compatibility with screen readers, keyboard navigation, and other assistive technologies.`;
    fragment.appendChild(description);

    const container = document.createElement("div");
    container.classList.add(
      "row",
      "row-cols-1",
      "row-cols-md-2",
      "row-cols-xl-3",
      "g-4",
    );
    Accessibility.#features.forEach((feature) => {
      const col = document.createElement("div");
      col.classList.add("col");

      const card = document.createElement("div");
      card.classList.add("card");

      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");
      cardHeader.textContent = feature.title;
      card.appendChild(cardHeader);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const description = document.createElement("p");
      description.classList.add("card-text");
      description.innerHTML = feature.description;
      cardBody.appendChild(description);
      card.appendChild(cardBody);

      col.appendChild(card);
      container.appendChild(col);
    });

    fragment.appendChild(container);
    return fragment;
  }

  static #wcagChecklist = [
    {
      criterion: "1.3.1 Info and Relationships",
      url: "https://www.w3.org/TR/WCAG22/#info-and-relationships",
      compliance: "Compliant",
      evidence:
        "<code>role='switch'</code>, proper ARIA attributes, semantic structure",
    },
    {
      criterion: "1.4.4 Resize Text",
      url: "https://www.w3.org/TR/WCAG22/#resize-text",
      compliance: "Compliant",
      evidence: "Uses relative units, responsive design",
    },
    {
      criterion: "2.1.1 Keyboard",
      url: "https://www.w3.org/TR/WCAG22/#keyboard",
      compliance: "Compliant",
      evidence:
        "Responds to Space and Enter keys, all functionality keyboard accessible",
    },
    {
      criterion: "2.1.2 No Keyboard Trap",
      url: "https://www.w3.org/TR/WCAG22/#no-keyboard-trap",
      compliance: "Compliant",
      evidence:
        "<code>tabindex=0</code> with proper focus management, users can navigate away",
    },
    {
      criterion: "2.1.4 Character Key Shortcuts",
      url: "https://www.w3.org/TR/WCAG22/#character-key-shortcuts",
      compliance: "Compliant",
      evidence: "No single-character shortcuts used",
    },
    {
      criterion: "2.4.3 Focus Order",
      url: "https://www.w3.org/TR/WCAG22/#focus-order",
      compliance: "Compliant",
      evidence: "<code>tabindex</code> respects DOM order",
      notice:
        "Component follows logical DOM order; integration depends on page structure",
    },
    {
      criterion: "2.4.7 Focus Visible",
      url: "https://www.w3.org/TR/WCAG22/#focus-visible",
      compliance: "Partially",
      evidence: "Programmatic focus management implemented",
      notice:
        "Visual focus indicators require CSS styling from consuming application, component defaults style meet criterion",
    },
    {
      criterion: "2.4.11 Focus Not Obscured (Minimum)",
      url: "https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum",
      compliance: "Partially",
      evidence: "Programmatic focus management implemented",
      notice:
        "Component doesn't obscure its own focus, but page-level layout/styling may affect visibility",
    },
    {
      criterion: "2.4.12 Focus Not Obscured (Enhanced)",
      url: "https://www.w3.org/TR/WCAG22/#focus-not-obscured-enhanced",
      compliance: "Partially",
      evidence: "Programmatic focus management implemented",
      notice:
        "Same as 2.4.11; component-level focus is clear but dependent on page context",
    },
    {
      criterion: "2.5.3 Label in Name",
      url: "https://www.w3.org/TR/WCAG22/#label-in-name",
      compliance: "Compliant",
      evidence: "<code>aria-label</code> matches visual label when provided",
    },
    {
      criterion: "3.2.1 On Focus",
      url: "https://www.w3.org/TR/WCAG22/#on-focus",
      compliance: "Compliant",
      evidence: "Focus does not trigger unexpected context changes",
    },
    {
      criterion: "3.3.2 Labels or Instructions",
      url: "https://www.w3.org/TR/WCAG22/#labels-or-instructions",
      compliance: "Compliant",
      evidence:
        "Supports <code>aria-label</code> and <code>aria-labelledby</code> with fallback to default label",
    },
    {
      criterion: "4.1.1 Parsing",
      url: "https://www.w3.org/TR/WCAG22/#parsing",
      compliance: "Compliant",
      evidence: "Valid HTML, no duplicate IDs, proper nesting",
    },
    {
      criterion: "4.1.2 Name, Role, Value",
      url: "https://www.w3.org/TR/WCAG22/#name-role-value",
      compliance: "Compliant",
      evidence:
        "<code>role='switch'</code>, <code>aria-label | aria-labelledby</code> for name, <code>aria-checked</code> for value",
    },
    {
      criterion: "4.1.3 Status Messages",
      url: "https://www.w3.org/TR/WCAG22/#status-messages",
      compliance: "Not Compliant",
      evidence:
        "There is not <code>aria-live</code>, <code>aria-atomic</code>, or <code>aria-relevant</code> for dynamic state announcements",
      notice:
        "State changes (ON/OFF/INDETERMINATE) are not announced via <code>aria-live</code> regions. Screen readers detect changes through aria-checked updates but not proactively announced.",
    },
  ];

  static #wcagCompliance() {
    const fragment = document.createDocumentFragment();

    const description = document.createElement("p");
    description.innerHTML = `Bootstrap Toggle adheres to WCAG 2.2 AA standards by implementing proper ARIA roles and attributes, ensuring that all users, including those with disabilities, can effectively interact with toggle switches.`;

    const list = document.createElement("ul");
    list.classList.add("list-group", "list-group-flush");
    Accessibility.#wcagChecklist.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");

      const header = document.createElement("div");
      header.classList.add(
        "d-flex",
        "justify-content-start",
        "align-items-center",
        "gap-2",
      );

      const url = document.createElement("a");
      url.classList.add("text-decoration-none");
      url.href = item.url;
      url.innerHTML = `<i class="fa-solid fa-link"></i>`;
      url.target = "_blank";
      header.appendChild(url);

      const criterionText = document.createElement("strong");
      criterionText.innerHTML = item.criterion;
      header.appendChild(criterionText);

      const badge = document.createElement("span");
      badge.classList.add("badge");
      if (item.compliance === "Compliant") {
        badge.classList.add("bg-success");
      } else if (item.compliance === "Partially") {
        badge.classList.add("bg-warning");
      } else {
        badge.classList.add("bg-danger");
      }
      badge.textContent = item.compliance;
      header.appendChild(badge);
      listItem.appendChild(header);

      const evidence = document.createElement("p");
      evidence.classList.add("m-0");
      evidence.innerHTML = item.evidence;
      listItem.appendChild(evidence);

      if (item.notice) {
        const notice = document.createElement("p");
        notice.classList.add("m-0");
        notice.innerHTML = `<small>${item.notice}</small>`;
        listItem.appendChild(notice);
      }

      list.appendChild(listItem);
    });

    fragment.appendChild(description);
    fragment.appendChild(list);
    return fragment;
  }
}

export default Accessibility;
