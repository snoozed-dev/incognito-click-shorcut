let shorcutKeys = [];
let heldDownKeys = [];

const keyDown = event => {
  if (event.keyCode === 20) return;
  if (!heldDownKeys.includes(event.keyCode)) heldDownKeys.push(event.keyCode);
};

const keyUp = event => {
  heldDownKeys = heldDownKeys.filter(keyCode => keyCode !== event.keyCode);
};

const updateShorcutKeys = () => {
  shorcutKeys = [16, 91];
  chrome.storage.local.get(["userShorcut"], result => {
    if (result.userShorcut) shorcutKeys = result.userShorcut;
  });
};

Array.from(document.links).forEach(link => {
  link.addEventListener("click", async e => {
    let url = "";
    if (e.target.href) url = e.target.href;
    else {
      if (e.target.parentElement && e.target.parentElement.href) {
        url = e.target.parentElement.href;
      } else {
        if (e.target.children.length > 1 && e.target.children[0].href)
          url = e.target.children[0].href;
      }
    }
    if (url === "") return;
    if (
      heldDownKeys.filter(e => shorcutKeys.includes(e)).length ===
      shorcutKeys.length
    ) {
      e.preventDefault();
      chrome.runtime.sendMessage({
        action: "openInIncognito",
        url
      });
    }
  });
});

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
updateShorcutKeys();
window.addEventListener("blur", () => (heldDownKeys = []));
