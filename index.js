function navigate(pagename) {
  let items = window.location.href
    .split("/")
    .filter((x) => !x.includes("html"));
  items.push(`pages/${pagename}.html`);
  let path = items.join("/");
  console.log(`final path: ${path}`);
  window.location = path;
}

function openInNewTab(url) {
  window.open(url, "_blank").focus();
}
