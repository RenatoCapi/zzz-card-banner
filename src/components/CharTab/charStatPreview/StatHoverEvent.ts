
export const idDOMcustom = (idString: string) => {
    const hoverItems = document.querySelectorAll("." + idString);
    hoverItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            hoverItems.forEach((el) => {
                el.classList.add("hover-stats"); // Adiciona a classe do hover
            });
        });

        item.addEventListener("mouseleave", () => {
            hoverItems.forEach((el) => {
                el.classList.remove("hover-stats"); // Remove o hover
            });
        });
    });

    return () => {
        hoverItems.forEach(item => {
            item.removeEventListener("mouseenter", () => { });
            item.removeEventListener("mouseleave", () => { });
        });
    };
}