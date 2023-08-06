// 更新徽章文本
function updateBadgeText(enabled) {
  const badgeText = enabled ? "ON" : "OFF";
  chrome.action.setBadgeText({ text: badgeText });
}

// 初始化开关状态
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("scriptEnabled", result => {
    if (result.scriptEnabled === undefined) {
      chrome.storage.local.set({ "scriptEnabled": true });
      updateBadgeText(true); // 初始化为开启状态
    } else {
      updateBadgeText(result.scriptEnabled);
    }
  });
});

// 处理开关状态变化
chrome.action.onClicked.addListener(tab => {
  chrome.storage.local.get("scriptEnabled", result => {
    const newStatus = !result.scriptEnabled;
    chrome.storage.local.set({ "scriptEnabled": newStatus });
    updateBadgeText(newStatus);
    chrome.tabs.reload(tab.id);
  });
});
