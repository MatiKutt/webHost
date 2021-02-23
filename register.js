window.onload = () => {
    'use strict';
	console.log("registered");
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service_worker.js');
			   console.log("register function");
    }
  }