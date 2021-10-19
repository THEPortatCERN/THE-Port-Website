(function () {
  const viewEl = document.querySelector(".event-participants");
  if (viewEl !== null) {
    const tooltipTriggerList = [].slice.call(
      viewEl.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }
})();
