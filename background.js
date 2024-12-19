chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // Find all input fields of type "password" or text with the custom attribute
        const inputs = document.querySelectorAll('input[type="password"], input[type="text"][data-toggled="true"]');
        inputs.forEach(input => {
          if (input.type === 'password') {
            // Change to "text" and add a custom attribute to track it
            input.type = 'text';
            input.setAttribute('data-toggled', 'true');
          } else if (input.type === 'text' && input.getAttribute('data-toggled') === 'true') {
            // Change back to "password" and remove the custom attribute
            input.type = 'password';
            input.removeAttribute('data-toggled');
          }
        });
      }
    }).catch((error) => {
      console.error("Failed to execute script:", error);
    });
  } else {
    console.error("No active tab found.");
  }
});
