<script context="module">
  // check type of browser
  export let isBrowserSafari = () => {
    return fnBrowserDetect() === "safari";
  };
  let fnBrowserDetect = () => {
    let browserName;
    let userAgent = navigator.userAgent;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge";
    } else {
      browserName = "No browser detection";
    }

    return browserName;
  };
</script>
