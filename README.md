# PURESKY ENERGY Dashboard

A modern web dashboard for managing energy project issues with Excel data integration.

## Features

- **Energy Project Cards**: Display 16 energy sites with their power specifications
- **Excel Data Integration**: Load and display data from Excel files (.xlsx, .xls)
- **Modal Interface**: Clean, modern modal popup for viewing data
- **Export Functionality**: Export displayed data back to Excel format
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

### 1. Opening the Dashboard
- Open `index.html` in your web browser
- The dashboard will display all energy project cards

### 2. Loading Excel Data
1. Click on any issue button (Open Issues, Closed Issues, Previous Issues) on any project card
2. A modal will open with a file selection option
3. Click "Select Excel File" and choose your Excel file (.xlsx or .xls)
4. The data will be loaded and displayed in a table format

### 3. Expected Excel File Format
Your Excel file should have:
- **Header row**: Column titles (e.g., "Issue ID", "Description", "Status", "Date", etc.)
- **Data rows**: Actual issue data
- **First sheet**: The application reads the first sheet of the Excel file

### Example Excel Structure:
| Issue ID | Description | Status | Priority | Date | Assigned To |
|----------|-------------|--------|----------|------|-------------|
| ISS-001  | Inverter malfunction | Open | High | 2024-01-15 | John Doe |
| ISS-002  | Panel cleaning needed | Closed | Medium | 2024-01-10 | Jane Smith |
| ISS-003  | Connection issue | Open | Low | 2024-01-12 | Mike Johnson |

### 4. Features Available
- **View Data**: See all Excel data in a formatted table
- **Data Summary**: Shows row and column count
- **Load Different File**: Switch to a different Excel file
- **Export Data**: Download the current data as a new Excel file
- **Close Modal**: Click X, press Escape, or click outside the modal

## Technical Details

### Files Structure
- `index.html` - Main dashboard page with styling
- `script.js` - JavaScript functionality for Excel handling
- `README.md` - This documentation file

### Dependencies
- **SheetJS (XLSX)**: For Excel file reading and writing
- **CDN Link**: `https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js`

### Browser Compatibility
- Modern browsers with FileReader API support
- Chrome, Firefox, Safari, Edge (latest versions)

## Energy Projects Included

The dashboard includes 16 energy projects:

1. **Adirondack - Connecticut River** (7.06MWp / 5.00MW)
2. **Blossom B - Hamilton Brook** (6.44MWp / 4.50MW)
3. **Clayton** (1.68MWp / 1.25MW)
4. **Dover - Buckmaster Pond** (1.42MWp / 1.00MW)
5. **Dudley Ground Mount (1-3)** (4.11MWp / 3.00MW)
6. **Gouverneur I** (1.94MWp / 1.48MW)
7. **Grand Island A** (2.11MWp / 1.62MW)
8. **Joe Jenny** (2.04MWp / 1.50MW)
9. **Lake Waconia** (2.69MWp / 2.00MW)
10. **Mendon Cape Road - Box Pond** (3.24MWp / 2.60MW)
11. **New Germany** (1.30MWp / 1.00MW)
12. **Veseli** (1.30MWp / 1.00MW)
13. **Westport A - Bass River** (2.79MWp / 2.00MW)
14. **Zumbro** (1.30MWp / 1.00MW)
15. **Canandaigua** (4.62MWp / 4.0MW)
16. **Cedar Hill Solar** (7.51MWp / 5.0MW)

## Troubleshooting

### Common Issues:
1. **File not loading**: Ensure the file is a valid Excel format (.xlsx or .xls)
2. **No data displayed**: Check if your Excel file has data in the first sheet
3. **Modal not closing**: Try pressing the Escape key or clicking outside the modal
4. **Export not working**: Make sure you have data loaded before trying to export

### Browser Console Commands:
- `getStoredData()` - View all loaded Excel data
- `clearStoredData()` - Clear all stored data

## Customization

You can easily customize the dashboard by:
- Modifying the `energySites` array in `script.js` to add/remove projects
- Updating the CSS styles in `index.html` for different colors/themes
- Adding more functionality to the Excel data processing

## Security Notes

- All Excel processing happens client-side in the browser
- No data is sent to external servers
- Files are read locally and not uploaded anywhere 