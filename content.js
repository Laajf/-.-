// content.js

// Check if the extension is enabled
chrome.storage.sync.get('enabled', function(data) {
    if (data.enabled) {
      markCheckboxes();
    }
  });
  
  function markCheckboxes() {
    for (var i = 0; i <= 30; i++) {
      var checkboxName = 'a' + i;
      var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"][value="1"]');
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  }
  
  // Listen for changes in the extension state
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.enabled) {
      if (changes.enabled.newValue) {
        // Extension is enabled
        markCheckboxes();
      } else {
        // Extension is disabled
        // You can add code here to undo any changes made by the extension
      }
    }
  });
  