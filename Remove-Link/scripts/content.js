const links = document.querySelectorAll('[href]');
if (links) {
  for (const link of links) {
    const textLink = "<p id='insert_text' style='color: red'>" + link.textContent + "</p>";
    link.outerHTML = textLink;
  }
}
