// Utility helpers

// Conditional class names helper (lightweight cx)
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Format number with thousands separator
export function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined) return '-';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

// Format date to readable string
export function formatDate(dateString, lang = 'en') {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Format date range
export function formatDateRange(start, end, lang = 'en') {
  if (!start) return '-';
  const startDate = formatDate(start, lang);
  if (!end || start === end) return startDate;
  const endDate = formatDate(end, lang);
  return `${startDate} – ${endDate}`;
}

// Truncate text with ellipsis
export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

// Slugify string for URLs
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Debounce function
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if point is in bounding box
export function isInBounds(point, bounds) {
  const [lng, lat] = point;
  const [[west, south], [east, north]] = bounds;
  return lng >= west && lng <= east && lat >= south && lat <= north;
}

// Get Google Maps directions URL
export function getDirectionsUrl(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

// Generate ICS calendar file content
export function generateICS(event) {
  const formatICSDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Zero Waste Asia//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@zerowaste.asia`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(event.start)}`,
    `DTEND:${formatICSDate(event.end || event.start)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}`,
    event.venue ? `LOCATION:${event.venue}, ${event.city}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n');

  return ics;
}

// Download ICS file
export function downloadICS(event) {
  const ics = generateICS(event);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${slugify(event.title)}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Download JSON file
export function downloadJSON(data, filename = 'data.json') {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Copy text to clipboard
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

// Parse query params from URL
export function parseQueryParams(search) {
  return Object.fromEntries(new URLSearchParams(search));
}

// Build query string from object
export function buildQueryString(params) {
  const filtered = Object.entries(params).filter(([_, v]) => v !== null && v !== undefined && v !== '');
  return filtered.length > 0 ? '?' + new URLSearchParams(filtered).toString() : '';
}

