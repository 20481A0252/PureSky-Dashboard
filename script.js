// Energy sites data with their specifications
const energySites = [
  { name: "Adirondack - Connecticut River", power: "7.06MWp / 5.00MW" },
  { name: "Blossom B - Hamilton Brook", power: "6.44MWp / 4.50MW" },
  { name: "Clayton", power: "1.68MWp / 1.25MW" },
  { name: "Dover - Buckmaster Pond", power: "1.42MWp / 1.00MW" },
  { name: "Dudley Ground Mount (1-3)", power: "4.11MWp / 3.00MW" },
  { name: "Gouverneur I", power: "1.94MWp / 1.48MW" },
  { name: "Grand Island A", power: "2.11MWp / 1.62MW" },
  { name: "Joe Jenny", power: "2.04MWp / 1.50MW" },
  { name: "Lake Waconia", power: "2.69MWp / 2.00MW" },
  { name: "Mendon Cape Road - Box Pond", power: "3.24MWp / 2.60MW" },
  { name: "New Germany", power: "1.30MWp / 1.00MW" },
  { name: "Veseli", power: "1.30MWp / 1.00MW" },
  { name: "Westport A - Bass River", power: "2.79MWp / 2.00MW" },
  { name: "Zumbro", power: "1.30MWp / 1.00MW" },
  { name: "Canandaigua", power: "4.62MWp / 4.0MW" },
  { name: "Cedar Hill Solar", power: "7.51MWp / 5.0MW" },
  { name: "Clover Meadow", power: "7.27MWp / 5.0MW" },
  { name: "Cotuit", power: "4.36MWp / 3.11MW + 1.50MW / 4.2MWh" },
  { name: "DeKalb I", power: "6.03MWp / 5.0MW" },
  { name: "DeKalb II", power: "3.86MWp / 3.0MW" },
  { name: "DeKalb III", power: "4.00MWp - 3.3MW" },
  { name: "East Brookfield Adams", power: "7.03MWp / 4.66MW + 3.0MW / 6.3MWh" },
  { name: "Elmbrook Solar", power: "8.31MWp / 5.0MW + 4.50MW / 9.0MWh" },
  { name: "Gouverneur II", power: "5.23MWp / 4.0MW" },
  { name: "Oak Hill Solar 1", power: "8.30MWp / 5.0MW + 4.50MW / 9MWh" },
  { name: "Oak Hill Solar 2", power: "8.30MWp / 5.0MW + 4.50MW / 9MWh" },
  { name: "Quiet Meadows 1", power: "5.82MWp / 4.0MW" },
  { name: "Quiet Meadows 2", power: "7.55MWp / 5.0MW" },
  { name: "Tamarac", power: "6.8 MWp / 5.0 MW" },
  { name: "Three Rivers", power: "4.55MWp / 4.00MW + 1.40MW / 3.0MWh" },
  { name: "Volney", power: "6.25MWp / 5.0MW" },
  { name: "Wallum", power: "8.74MWp / 5.0MW + 3.8MW / 12.8MWh" },
  { name: "Ware - Palmer Road", power: "4.26MWp / 2.84MW + 2.0MW / 4.5MWh" },
  { name: "White River Solar", power: "7.51MWp / 5.0MW" }
];

// Store all Excel data globally
let excelData = [];

document.addEventListener("DOMContentLoaded", () => {
  createDashboard();
  setupModalEvents();
});

function createDashboard() {
  const container = document.getElementById('siteContainer');
  container.innerHTML = '';

  // Add a single upload button at the top
  const uploadDiv = document.createElement('div');
  uploadDiv.className = 'file-input-container';
  uploadDiv.innerHTML = `
    <label class="file-input-label">
      Upload Excel for All Sites
      <input type="file" class="file-input" accept=".xlsx,.xls" onchange="handleFileUpload(event)">
    </label>
  `;
  container.appendChild(uploadDiv);

  energySites.forEach(site => {
    const card = document.createElement('div');
    card.className = 'site-card';
    card.id = `site-${site.name.replace(/[^a-zA-Z0-9]/g, '-')}`;
    card.innerHTML = `
      <div class="site-name">${site.name} - ${site.power}</div>
      <div class="button-group">
        <button onclick="showDataModal('${site.name}', 'open')">Open Issues</button>
        <button onclick="showDataModal('${site.name}', 'closed')">Closed Issues</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function setupModalEvents() {
  const modal = document.getElementById('dataModal');
  const closeBtn = document.querySelector('.close');
  window.onclick = function(event) {
    if (event.target === modal) {
      closeModal();
    }
  }
  closeBtn.onclick = function() {
    closeModal();
  }
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Highlight sites with open issues
      highlightSitesWithOpenIssues();
      
      alert('Excel data uploaded for all sites!');
    } catch (error) {
      alert('Error reading Excel file. Please make sure it is valid.');
    }
  };
  reader.readAsArrayBuffer(file);
}

function showDataModal(siteName, issueType) {
  const modal = document.getElementById('dataModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  modalTitle.textContent = `${siteName} - ${issueType.charAt(0).toUpperCase() + issueType.slice(1)} Issues`;
  modal.style.display = 'block';

  if (!excelData || excelData.length === 0) {
    modalBody.innerHTML = `
      <div class="no-data">
        No Excel data uploaded.<br>
        Please upload an Excel file using the "Upload Excel for All Sites" button.
      </div>
    `;
    return;
  }

  // Find "Site Name" and "Open & close" column indexes (case-insensitive)
  const header = excelData[0];
  const siteIdx = header.findIndex(h => h && h.toString().toLowerCase().includes('site name'));
  const statusIdx = header.findIndex(h => h && h.toString().toLowerCase().includes('open & close'));

  let filtered = [header];
  if (siteIdx !== -1 && statusIdx !== -1) {
    filtered = [header].concat(
      excelData.slice(1).filter(row => {
        const site = row[siteIdx] ? row[siteIdx].toString().trim() : '';
        const status = row[statusIdx] ? row[statusIdx].toString().toLowerCase() : '';
        return site === siteName && status === issueType;
      })
    );
  }

  modalBody.innerHTML = renderTable(filtered, siteName, issueType);
}

function renderTable(data, siteName, issueType) {
  if (!data || data.length <= 1) {
    return `
      <div class="no-data">
        No matching issues found.<br>
        <button onclick="closeModal()" style="background-color: #7b1fa2; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">Close</button>
      </div>
    `;
  }
  let html = '<table class="data-table">';
  data.forEach((row, i) => {
    html += '<tr>';
    row.forEach(cell => {
      html += i === 0
        ? `<th>${cell || ''}</th>`
        : `<td>${cell || ''}</td>`;
    });
    html += '</tr>';
  });
  html += '</table>';

  const totalRows = data.length - 1;
  const totalColumns = data[0] ? data[0].length : 0;

  html = `
    <div style="margin-bottom: 20px;">
      <p><strong>Data Summary:</strong> ${totalRows} rows, ${totalColumns} columns</p>
      <p><strong>Site:</strong> ${siteName}</p>
      <p><strong>Issue Type:</strong> ${issueType.charAt(0).toUpperCase() + issueType.slice(1)}</p>
    </div>
    ${html}
    <div style="margin-top: 20px; text-align: center;">
      <button onclick="closeModal()" style="background-color: #7b1fa2; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">Close</button>
      <button onclick="exportToExcel('${siteName}', '${issueType}')" style="background-color: #4caf50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Export Data</button>
    </div>
  `;
  return html;
}

function exportToExcel(siteName, issueType) {
  if (!excelData || excelData.length === 0) return;

  const header = excelData[0]; // Use row 0 as the header

  const siteIdx = header.findIndex(h => h && h.toString().trim().toLowerCase() === 'site name');
  const statusIdx = header.findIndex(h => h && h.toString().trim().toLowerCase() === 'open & close');

  let filtered = [header];

  if (siteIdx !== -1 && statusIdx !== -1) {
    filtered = [header].concat(
      excelData.slice(1).filter(row => {
        const site = row[siteIdx] ? row[siteIdx].toString().trim() : '';
        const status = row[statusIdx] ? row[statusIdx].toString().toLowerCase() : '';
        return site === siteName && status === issueType;
      })
    );
  } else {
    console.error('Could not find expected columns. Found header:', header);
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(filtered);
  XLSX.utils.book_append_sheet(wb, ws, `${siteName}_${issueType}`);
  const filename = `${siteName.replace(/[^a-zA-Z0-9]/g, '_')}_${issueType}_issues.xlsx`;
  XLSX.writeFile(wb, filename);
}

function closeModal() {
  const modal = document.getElementById('dataModal');
  modal.style.display = 'none';
}

// Highlight sites with open issues after Excel upload
function highlightSitesWithOpenIssues() {
  if (!excelData || excelData.length <= 1) return;
  
  // Clear previous highlights
  document.querySelectorAll('.site-card').forEach(card => {
    card.classList.remove('has-open-issues');
    const existingIndicator = card.querySelector('.issue-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }
  });
  
  // Find column indexes
  const header = excelData[0];
  const siteIdx = header.findIndex(h => h && h.toString().toLowerCase().includes('site name'));
  const statusIdx = header.findIndex(h => h && h.toString().toLowerCase().includes('open & close'));
  
  if (siteIdx === -1 || statusIdx === -1) {
    console.warn('Could not find required columns in Excel data');
    return;
  }
  
  // Count open issues per site
  const sitesWithOpenIssues = new Map();
  
  excelData.slice(1).forEach(row => {
    const siteName = row[siteIdx] ? row[siteIdx].toString().trim() : '';
    const status = row[statusIdx] ? row[statusIdx].toString().toLowerCase().trim() : '';
    
    if (siteName && status === 'open') {
      sitesWithOpenIssues.set(siteName, (sitesWithOpenIssues.get(siteName) || 0) + 1);
    }
  });
  
  // Highlight site cards with open issues
  sitesWithOpenIssues.forEach((count, siteName) => {
    const siteId = `site-${siteName.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const siteCard = document.getElementById(siteId);
    
    if (siteCard) {
      // Add red border class
      siteCard.classList.add('has-open-issues');
      
      // Add issue indicator with count
      const indicator = document.createElement('div');
      indicator.className = 'issue-indicator';
      indicator.textContent = count;
      indicator.title = `${count} open issue${count > 1 ? 's' : ''}`;
      siteCard.appendChild(indicator);
    }
  });
  
  // Log summary
  console.log(`Highlighted ${sitesWithOpenIssues.size} sites with open issues`);
}

// For debugging
function getStoredData() {
  return excelData;
}

function clearStoredData() {
  excelData = [];
  console.log('Stored data cleared.');
  
  // Clear highlights when data is cleared
  document.querySelectorAll('.site-card').forEach(card => {
    card.classList.remove('has-open-issues');
    const existingIndicator = card.querySelector('.issue-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }
  });
}