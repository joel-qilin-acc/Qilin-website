// Runs before hydration: marks the document so GSAP-animated content stays hidden until ready, and flags campaign visitors.
export const documentFlagsScript = `(function(){var d=document.documentElement;d.setAttribute("data-js","true");try{if(/[?&](for|utm_campaign)=/.test(location.search))d.setAttribute("data-campaign","true")}catch(e){}})();`;
