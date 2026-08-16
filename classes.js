function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderClassSchedule(data) {
  if (!data) return;

  // Render Leave Dates
  const leaveDatesContainer = document.getElementById('leave-dates-list');
  if (leaveDatesContainer && Array.isArray(data.leaveDates)) {
    leaveDatesContainer.innerHTML = data.leaveDates.map(item => `
      <li class="leave-date-pill">🗓️ ${escapeHtml(item)}</li>
    `).join('');
  }

  // Render Note
  const noteContainer = document.getElementById('note-banner');
  if (noteContainer && data.note) {
    noteContainer.innerHTML = `⭐ <b>Note:</b> ${escapeHtml(data.note)}`;
  }

  // Render Centres
  const bookingsContainer = document.getElementById('bookings-container');
  if (bookingsContainer && Array.isArray(data.centres)) {
    bookingsContainer.innerHTML = data.centres.map(centre => {
      // Highlight specific word in title if specified
      let titleHtml = escapeHtml(centre.name);
      if (centre.highlightWord && titleHtml.includes(centre.highlightWord)) {
        titleHtml = titleHtml.replace(
          centre.highlightWord,
          `<b>${escapeHtml(centre.highlightWord)}</b>`
        );
      }

      // Location button (optional)
      const locButtonHtml = centre.locationUrl ? `
        <button onclick="openInNewTab('${escapeHtml(centre.locationUrl)}')" class="loc" aria-label="See Location for ${escapeHtml(centre.name)}">
          <img class="ext-open" src="../icons/location.svg" alt="Location" />
          <span class="ext-open-label">See Location</span>
        </button>
      ` : '';

      // Booking button (optional)
      const bookButtonHtml = centre.bookingUrl ? `
        <button onclick="openInNewTab('${escapeHtml(centre.bookingUrl)}')" class="makebook" aria-label="Book Slots for ${escapeHtml(centre.name)}">
          <img class="ext-open" src="../icons/ext-blue.svg" alt="Book" />
          <span class="ext-open-label">Book Slots</span>
        </button>
      ` : '';

      // Address banner (optional)
      const addressHtml = centre.address ? `
        <div class="location-address">
          <span class="address-label">📍 Location:</span>
          <span class="address-text">${escapeHtml(centre.address)}</span>
        </div>
      ` : '';

      // Schedule day groups
      const scheduleHtml = (centre.schedule || []).map(group => `
        <div class="day-group">
          <div class="day-badge">${escapeHtml(group.day)}</div>
          <div class="day-slots">
            ${(group.slots || []).map(slot => `
              <div class="class-slot">
                <span class="slot-time">${escapeHtml(slot.time)}</span>
                <span class="slot-name">${escapeHtml(slot.name)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');

      return `
        <div class="booking-item-container bg-blur" id="centre-${escapeHtml(centre.id || '')}">
          <div class="display-logo-container">
            <img src="${escapeHtml(centre.logo)}" class="img-cover" alt="${escapeHtml(centre.name)} Logo" />
          </div>
          <h3>${titleHtml}</h3>
          <div class="booking-cta-container">
            ${locButtonHtml}
            ${bookButtonHtml}
          </div>
          ${addressHtml}
          <div class="schedule-section">
            <div class="schedule-header-badge">Class Timings</div>
            <div class="day-groups-container">
              ${scheduleHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

function initClassesPage() {
  if (typeof window.CLASSES_DATA !== 'undefined') {
    renderClassSchedule(window.CLASSES_DATA);
  } else {
    console.error('CLASSES_DATA not found. Please ensure data/classes.js is loaded.');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initClassesPage);
} else {
  initClassesPage();
}
