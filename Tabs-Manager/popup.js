const tabs = await chrome.tabs.query({
    url: [
        "https://developer.chrome.com/docs/webstore/*",
        "https://developer.chrome.com/docs/extensions/*",
    ],
});

//sap xep tab the chu cai
const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
    //lay noi dung dau tien de nhan ban
    const element = template.content.firstElementChild.cloneNode(true);

    //lay thong tin title, pathname
    const title = tab.title.split("-")[0].trim();
    const pathname = new URL(tab.url).pathname.slice("/docs".length);

    //gan thong tin title, pathname
    element.querySelector(".title").textContent = title;
    element.querySelector(".pathname").textContent = pathname;

    //gan the a kem link den tab
    element.querySelector("a").addEventListener("click", async () => {
        await chrome.tabs.update(tab.id, {active: true});
        await chrome.windows.update(tab.windowId, {focused: true});
    });

    elements.add(element);
}
document.querySelector("ul").append(...elements);

// nhom tab
const button = document.querySelector("button");
button.addEventListener("click", async () => {
    const tabIds = tabs.map(({id}) => id);
    const group = await chrome.tabs.group({tabIds});
    await chrome.tabGroups.update(group, {title: "DOCS"});
});
