chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {

    const prevState = await chrome.action.getBadgeText({tabId: tab.id});
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });
    if(nextState === "ON") {
        let queryWindowsOptions = {populate: true};
        let tabs = await chrome.tabs.query({url: ["<all_urls>"]});
        let windows = await chrome.windows.getAll(queryWindowsOptions);
        if (tabs.length > 4 || windows.length > 2) {
            await chrome.tabs.onCreated.addListener(async function (tab) {
                await chrome.tabs.remove(tab.id);
            });
        }
    } if(nextState === "OFF") {}

});