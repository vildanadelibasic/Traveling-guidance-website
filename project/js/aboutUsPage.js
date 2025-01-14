function showMore(contentId, textId) {
  const content = document.getElementById(contentId);
  const showMoreText = document.getElementById(textId);

  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
    showMoreText.textContent = "Show Less";
  } else {
    content.style.display = "none";
    showMoreText.textContent = "Show More";
  }
}