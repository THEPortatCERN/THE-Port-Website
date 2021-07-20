/* 
  This toggles the "other" text input element when the corresponding checkbox is selected.
*/
(function () {
  const checkbox = document.getElementById(
    "edit-what-is-your-background-other"
  );

  const textInput = document.querySelector(
    ".js-form-item-other-background-affiliation"
  );

  if (checkbox !== null && textInput !== null) {
    function toggle() {
      textInput.style.visibility = checkbox.checked ? "visible" : "hidden";
    }

    checkbox.addEventListener("click", toggle);
    toggle();
  }
})();
