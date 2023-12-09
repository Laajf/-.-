// popup.js

document.addEventListener('DOMContentLoaded', function() {
  // Проверяем текущее состояние расширения и обновляем текст кнопки
  chrome.storage.sync.get('enabled', function(data) {
    updateButtonText(data.enabled);
  });

  // Переключаем состояние расширения при нажатии кнопки
  document.getElementById('toggleButton').addEventListener('click', function() {
    chrome.storage.sync.get('enabled', function(data) {
      var newEnabledState = !data.enabled;
      chrome.storage.sync.set({ 'enabled': newEnabledState });
      updateButtonText(newEnabledState);

      // Отправляем сообщение в content.js для мгновенного переключения состояния
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { toggleExtension: true });
      });
    });
  });

  function updateButtonText(enabled) {
    document.getElementById('toggleButton').innerText = enabled ? 'Отключить расширение' : 'Включить расширение';
  }
});
