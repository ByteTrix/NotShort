interface ToastOptions {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // Duration in ms, 0 or undefined for default (3000ms), negative for indefinite
}

const TOAST_CONTAINER_ID = 'toast-notifications-container';

function ensureToastContainer(): HTMLElement {
  let container = document.getElementById(TOAST_CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = TOAST_CONTAINER_ID;
    container.className = 'fixed top-0 right-0 z-50 p-4 space-y-2'; // Positioned top-right, adjust as needed
    document.body.appendChild(container);
  }
  return container;
}

export function showToast({
  message,
  type = 'info',
  duration = 3000,
}: ToastOptions): void {
  const container = ensureToastContainer();

  const toastId = `toast-${Math.random().toString(36).substring(2, 9)}`;
  const toastElement = document.createElement('div');
  toastElement.id = toastId;

  const baseClasses = "p-4 rounded-md shadow-lg text-white transition-all duration-300 ease-in-out transform";
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  toastElement.className = `${baseClasses} ${typeClasses[type]} opacity-0 translate-y-[-20px]`;
  toastElement.setAttribute('role', 'alert');
  toastElement.setAttribute('aria-live', 'assertive');

  const messageContent = document.createElement('span');
  messageContent.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.className = "ml-4 text-xl font-semibold leading-none hover:text-gray-200 focus:outline-none";
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.onclick = () => {
    toastElement.classList.remove("opacity-100", "translate-y-0");
    toastElement.classList.add("opacity-0", "translate-y-[-20px]");
    setTimeout(() => {
      toastElement.remove();
    }, 300); // Allow fade-out animation
  };

  const contentWrapper = document.createElement('div');
  contentWrapper.className = "flex items-center justify-between";
  contentWrapper.appendChild(messageContent);
  contentWrapper.appendChild(closeButton);
  toastElement.appendChild(contentWrapper);

  container.appendChild(toastElement);

  // Animate in
  setTimeout(() => {
    toastElement.classList.remove("opacity-0", "translate-y-[-20px]");
    toastElement.classList.add("opacity-100", "translate-y-0");
  }, 10); // Small delay for transition

  if (duration >= 0) {
    setTimeout(() => {
      // Check if element still exists (user might have closed it manually)
      if (document.getElementById(toastId)) {
        closeButton.click(); // Trigger the close animation and removal
      }
    }, duration);
  }
}

// Example usage (can be removed or kept for testing):
// document.addEventListener('DOMContentLoaded', () => {
//   const testButton = document.createElement('button');
//   testButton.textContent = 'Show Test Toast';
//   testButton.className = 'm-4 p-2 bg-blue-500 text-white rounded';
//   testButton.onclick = () => showToast({ message: 'This is a test toast!', type: 'success', duration: 5000 });
//   document.body.insertAdjacentElement('afterbegin', testButton);

//   const errorButton = document.createElement('button');
//   errorButton.textContent = 'Show Error Toast';
//   errorButton.className = 'm-4 p-2 bg-red-500 text-white rounded';
//   errorButton.onclick = () => showToast({ message: 'Something went wrong!', type: 'error', duration: 0 });
//   document.body.insertAdjacentElement('afterbegin', errorButton);
// });