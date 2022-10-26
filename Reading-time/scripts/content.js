const article = document.querySelector("article");
// lay the article
if (article) {
    const text = article.textContent;
    //lay text cua article
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    //tinh ra thoi gian doc
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    // chen thoi gian doc sau badge trong 2 truong hop
    (date ?? heading).insertAdjacentElement("afterend", badge);
}
