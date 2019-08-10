chrome.runtime.onMessage.addListener(request => {
  if (request && request.action) {
    switch (request.action) {
      case "openInIncognito":
        if (!request.url) break;
        chrome.windows.create({ url: request.url, incognito: true });
        break;
      default:
        break;
    }
  }
});
