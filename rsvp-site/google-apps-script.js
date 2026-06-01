// ═══════════════════════════════════════════════════════════════
//  SUSANAH & ABHINAV — RSVP Google Apps Script
//  Paste this entire file into Google Apps Script, then deploy
//  as a Web App (see instructions below).
// ═══════════════════════════════════════════════════════════════

const SHEET_NAME = 'RSVPs';  // Tab name in your Google Sheet

// ── doPost: receives the RSVP form submission ────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = getOrCreateSheet();

    // Append the new RSVP row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('en-SG'),
      data.name      || '',
      data.email     || '',
      data.guests    || '',
      data.dietary   || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── doGet: simple health-check endpoint ─────────────────────
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'RSVP endpoint is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Helper: get or create the RSVPs sheet with headers ──────
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add header row
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Guests', 'Dietary Notes']);

    // Style the header row
    const header = sheet.getRange(1, 1, 1, 5);
    header.setFontWeight('bold');
    header.setBackground('#2c3e5a');
    header.setFontColor('#ffffff');
    header.setFontFamily('Arial');
    header.setFontSize(11);

    // Set column widths
    sheet.setColumnWidth(1, 180); // Timestamp
    sheet.setColumnWidth(2, 160); // Name
    sheet.setColumnWidth(3, 220); // Email
    sheet.setColumnWidth(4, 80);  // Guests
    sheet.setColumnWidth(5, 260); // Dietary
  }

  return sheet;
}
