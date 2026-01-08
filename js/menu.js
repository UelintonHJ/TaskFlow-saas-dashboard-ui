class AccessibleMenu {
    constructor(root, options = {}) {
        this.root = root;

        this.toggle = root.querySelector(
            options.toggleSelector || ".menu__toggle"
        );
        this.menu = root.querySelector(
            options.menuSelector || ".menu__list"
        );

        if (!this.toggle || !this.menu) return;

        this.openClass = options.openClass || "menu__list--open";

        this.focusableSelectors =
            options.focusableSelectors || 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);

        this.init();
    }

    syncResponsiveState() {
        const isDesktop = window.innerWidth >= 768;

        if (isDesktop) {
            this.menu.classList.remove(this.openClass);
            this.menu.removeAttribute("aria-hidden");
            this.toggle.setAttribute("aria-expanded", "true");
        } else {
            this.menu.setAttribute("aria-hidden", "true");
            this.toggle.setAttribute("aria-expanded", "false");
            this.setLinksFocusable(false);
        }
    }

    init() {
        this.syncResponsiveState();
        window.addEventListener("resize", () => this.syncResponsiveState());

        this.toggle.addEventListener("click", this.handleToggleClick);
        document.addEventListener("click", this.handleDocumentClick);
    }

    getFocusableElements() {
        return Array.from(this.menu.querySelectorAll(`${this.focusableSelectors}:not(.menu__link--logo)`));
    }

    setLinksFocusable(enabled) {
        const links = this.getFocusableElements();

        links.forEach(link => {
            link.tabIndex = enabled ? 0 : -1;
        })
    }

    open() {
        this.menu.classList.add(this.openClass);
        this.toggle.classList.add("is-active");
        this.menu.removeAttribute("aria-hidden");
        this.toggle.setAttribute("aria-expanded", "true");

        this.setLinksFocusable(true);

        this.focusable = this.getFocusableElements();
        this.first = this.focusable[0];
        this.last = this.focusable[this.focusable.length - 1];

        this.first?.focus();
        document.addEventListener("keydown", this.handleKeydown);
    }

    close() {
        this.menu.classList.remove(this.openClass);
        this.toggle.classList.remove("is-active");
        this.menu.setAttribute("aria-hidden", "true");
        this.toggle.setAttribute("aria-expanded", "false");

        this.setLinksFocusable(false);

        document.removeEventListener("keydown", this.handleKeydown);
        this.toggle.focus();
    }

    toggleMenu() {
        if (getComputedStyle(this.toggle).display === "none") {
            return;
        }

        const isOpen = this.menu.classList.contains(this.openClass);
        isOpen ? this.close() : this.open();
    }

    handleToggleClick(e) {
        e.stopPropagation();
        this.toggleMenu();
    }

    handleDocumentClick(e) {
        if (
            this.menu.classList.contains(this.openClass) &&
            !this.menu.contains(e.target) &&
            !this.toggle.contains(e.target)
        ) {
            this.close();
        }
    }

    handleKeydown(e) {
        if (e.key === "Escape") {
            this.close();
            return;
        }

        if (e.key !== "Tab") return;

        if (this.focusable.length === 0) return;

        if (e.shiftKey && document.activeElement === this.first) {
            e.preventDefault();
            this.last.focus();
        }

        if (!e.shiftKey && document.activeElement === this.last) {
            e.preventDefault();
            this.first.focus();
        }
    }
}

document.querySelectorAll(".menu").forEach(menu => {
    new AccessibleMenu(menu);
});

(function setActiveMenuLink() {
    const links = document.querySelectorAll(".menu__link");

    const normalizePath = (path) => {
        return path
            .replace(/\/index\.html$/, "")
            .replace(/\/$/, "") || "/";
    }

    const currentPath = normalizePath(window.location.pathname);

    links.forEach(link => {

        if (link.classList.contains("menu__link--logo")) {
            link.classList.remove("menu__link--active");
            link.removeAttribute("aria-current");
            return;
        }

        const href = link.getAttribute("href");

        if (!href || href === "#" || href.startsWith("#")) {
            link.classList.remove("menu__link--active");
            link.removeAttribute("aria-current");
            return;
        }

        const linkPath = normalizePath(
            new URL(href, window.location.origin).pathname
        );

        if (linkPath === currentPath) {
            link.classList.add("menu__link--active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("menu__link--active");
            link.removeAttribute("aria-current");
        }
    });
}
)();

(function forceFirstTabToMenu() {
    let used = false;
    let keyboardUsed = false;

    window.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            keyboardUsed = true;
        }
    }, { once: true });

    document.addEventListener("keydown", (e) => {
        if (used) return;
        if (e.key !== "Tab") return;
        if (e.altKey || e.ctrlKey || e.metaKey) return;

        if (!keyboardUsed) return;

        const firstMenuLink = document.querySelector(
            ".menu__list .menu__link"
        );

        if (!firstMenuLink) return;

        e.preventDefault();
        firstMenuLink.focus();
        used = true;
    });
})();