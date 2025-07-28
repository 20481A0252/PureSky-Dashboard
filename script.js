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

// Function to show all issues across all sites
function showAllIssuesModal() {
  if (!excelData || excelData.length === 0) {
    alert('No issue data available. Please upload an Excel file first.');
    return;
  }

  // Separate open and closed issues
  const openIssues = [];
  const closedIssues = [];

  excelData.forEach(row => {
    const status = row['Status'] || row['Issue Status'] || '';
    const site = row['Site'] || row['Site Name'] || 'Unknown Site';
    const issue = row['Issue'] || row['Description'] || 'No description';
    const priority = row['Priority'] || 'Medium';
    const assignee = row['Assignee'] || row['Assigned To'] || 'Unassigned';
    const dateCreated = row['Date Created'] || row['Created'] || 'Unknown';
    const dateResolved = row['Date Resolved'] || row['Resolved'] || '';

    const issueData = {
      site,
      issue,
      priority,
      assignee,
      dateCreated,
      dateResolved,
      status
    };

    if (status.toLowerCase().includes('open') || status.toLowerCase().includes('active') || status.toLowerCase().includes('pending')) {
      openIssues.push(issueData);
    } else if (status.toLowerCase().includes('closed') || status.toLowerCase().includes('resolved') || status.toLowerCase().includes('completed')) {
      closedIssues.push(issueData);
    }
  });

  // Create modal content
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  modalTitle.textContent = 'PURESKY All Issues Overview';
  
  let content = `
    <div style="margin-bottom: 20px;">
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; text-align: center; flex: 1;">
          <h3 style="margin: 0; color: #1976d2;">Open Issues</h3>
          <div style="font-size: 24px; font-weight: bold; color: #d32f2f;">${openIssues.length}</div>
        </div>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center; flex: 1;">
          <h3 style="margin: 0; color: #388e3c;">Closed Issues</h3>
          <div style="font-size: 24px; font-weight: bold; color: #388e3c;">${closedIssues.length}</div>
        </div>
        <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; text-align: center; flex: 1;">
          <h3 style="margin: 0; color: #7b1fa2;">Total Issues</h3>
          <div style="font-size: 24px; font-weight: bold; color: #7b1fa2;">${openIssues.length + closedIssues.length}</div>
        </div>
      </div>
    </div>
  `;

  // Add tabs for switching between open and closed issues
  content += `
    <div style="margin-bottom: 20px;">
      <button onclick="showIssueTab('open')" id="openTab" style="padding: 10px 20px; margin-right: 10px; background: #1976d2; color: white; border: none; border-radius: 5px; cursor: pointer;">Open Issues</button>
      <button onclick="showIssueTab('closed')" id="closedTab" style="padding: 10px 20px; background: #388e3c; color: white; border: none; border-radius: 5px; cursor: pointer;">Closed Issues</button>
      <button onclick="exportAllIssues()" style="padding: 10px 20px; margin-left: 10px; background: #7b1fa2; color: white; border: none; border-radius: 5px; cursor: pointer;">Export All</button>
    </div>
  `;

  // Open issues table
  content += `<div id="openIssuesContent">`;
  if (openIssues.length > 0) {
    content += renderIssuesTable(openIssues, 'Open Issues');
  } else {
    content += '<p style="text-align: center; color: #666; font-style: italic;">No open issues found.</p>';
  }
  content += `</div>`;

  // Closed issues table (initially hidden)
  content += `<div id="closedIssuesContent" style="display: none;">`;
  if (closedIssues.length > 0) {
    content += renderIssuesTable(closedIssues, 'Closed Issues');
  } else {
    content += '<p style="text-align: center; color: #666; font-style: italic;">No closed issues found.</p>';
  }
  content += `</div>`;

  modalBody.innerHTML = content;
  document.getElementById('dataModal').style.display = 'block';
}

// Function to render issues table
function renderIssuesTable(issues, title) {
  let table = `
    <div style="margin-bottom: 20px;">
      <h3 style="color: #333; margin-bottom: 15px;">${title} (${issues.length})</h3>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 600;">Site</th>
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 600;">Issue</th>
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 600;">Priority</th>
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 600;">Assignee</th>
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 600;">Created</th>
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 600;">Status</th>
            </tr>
          </thead>
          <tbody>
  `;

  issues.forEach((issue, index) => {
    const priorityColor = issue.priority.toLowerCase() === 'high' ? '#d32f2f' : 
                         issue.priority.toLowerCase() === 'medium' ? '#f57c00' : '#388e3c';
    
    table += `
      <tr style="${index % 2 === 0 ? 'background: #fafafa;' : 'background: white;'}">
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${issue.site}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; max-width: 300px; word-wrap: break-word;">${issue.issue}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">
          <span style="background: ${priorityColor}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${issue.priority}</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${issue.assignee}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${issue.dateCreated}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${issue.status}</td>
      </tr>
    `;
  });

  table += `
          </tbody>
        </table>
      </div>
    </div>
  `;

  return table;
}

// Function to switch between issue tabs
function showIssueTab(type) {
  const openContent = document.getElementById('openIssuesContent');
  const closedContent = document.getElementById('closedIssuesContent');
  const openTab = document.getElementById('openTab');
  const closedTab = document.getElementById('closedTab');

  if (type === 'open') {
    openContent.style.display = 'block';
    closedContent.style.display = 'none';
    openTab.style.background = '#1976d2';
    closedTab.style.background = '#666';
  } else {
    openContent.style.display = 'none';
    closedContent.style.display = 'block';
    openTab.style.background = '#666';
    closedTab.style.background = '#388e3c';
  }
}

// Function to export all issues to Excel
function exportAllIssues() {
  if (!excelData || excelData.length === 0) {
    alert('No data to export.');
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelData);
  XLSX.utils.book_append_sheet(wb, ws, 'All PURESKY Issues');
  XLSX.writeFile(wb, `PURESKY_All_Issues_${new Date().toISOString().split('T')[0]}.xlsx`);
}
