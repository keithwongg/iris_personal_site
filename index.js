function navigate(pagename) {
  let items = window.location.href
    .split("/")
    .filter((x) => !x.includes("html"));
  items.push(`${pagename}.html`);
  let path = items.join("/");
  console.log(`final path: ${path}`);
  window.location = path;
}
