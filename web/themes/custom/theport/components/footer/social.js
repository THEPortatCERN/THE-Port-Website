/*
  Only load the social media styling when the footer is becoming visible.
 */
const el = document.getElementById("social");

if (el && "IntersectionObserver" in window) {
  function loadCss() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/themes/custom/theport/components/footer/social.css";
    const head = document.getElementsByTagName("head")[0];
    head.parentNode.insertBefore(link, head);
  }

  function onChange(changes, observer) {
    if (changes[0].intersectionRatio > 0) {
      loadCss();
      observer.unobserve(changes[0].target);
    }
  }

  const options = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(onChange, options);
  observer.observe(el);
}
