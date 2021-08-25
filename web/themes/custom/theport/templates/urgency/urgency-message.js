/*
  This script adds a countdown to an urgency message.
  Add a data attribute "enddate" and give it a date attribute in the ISO format.
*/
(function () {
  const urgentElement = document.querySelector(".urgent");
  if (urgentElement !== null) {
    const endDateElement = urgentElement.querySelector("[data-enddate]");
    if (endDateElement !== null) {
      let daysLeft;

      try {
        const endDate = new Date(endDateElement.dataset.enddate);
        const today = new Date();
        const timeLeft = endDate.getTime() - today.getTime();
        // 86400000ms = one day (24 * 60 * 60 * 1000)
        // adding + 1 because deadline is end of day
        daysLeft = Math.floor(timeLeft / 86400000) + 1;
      } catch (error) {}

      console.log(daysLeft);

      if (daysLeft < 0) {
        urgentElement.style.display = "none";
      } else if (daysLeft === 0) {
        endDateElement.textContent = "today";
      } else if (daysLeft === 1) {
        endDateElement.textContent = "tomorrow";
      } else if (daysLeft > 1) {
        endDateElement.textContent = `in ${daysLeft} days`;
      }
    }
  }
})();
