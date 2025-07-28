# 🌟 PURESKY ENERGY Dashboard

![Dashboard Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![Version](https://img.shields.io/badge/Version-2.0-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

A comprehensive, modern web dashboard for managing energy projects and tracking issues across PURESKY ENERGY's renewable energy portfolio. Built with vanilla JavaScript, HTML5, and CSS3 for optimal performance and compatibility.

## 🚀 Features

### 🔐 **Secure Authentication System**
- Login protection with session management
- 24-hour automatic session timeout
- Secure logout functionality
- Credential: `admin` / `puresky2024`

### ⚡ **Energy Portfolio Management**
- **35 Energy Sites**: Complete portfolio including solar installations and energy storage systems
- **Detailed Specifications**: Power output (MWp/MW) and storage capacity (MWh) for each site
- **Site Categories**: Solar farms, ground mounts, and hybrid storage systems
- **Real-time Status**: Visual indicators for sites with active issues

### 📊 **Advanced Issue Tracking**
- **Comprehensive Overview**: "All Issues" button to view system-wide status
- **Smart Categorization**: Automatic separation of open and closed issues
- **Priority Management**: Color-coded priority levels (High/Medium/Low)
- **Detailed Information**: Site, description, assignee, dates, and status tracking
- **Export Functionality**: Download complete issue reports as Excel files

### 🔍 **Intelligent Search System**
- **Real-time Filtering**: Instant site search as you type
- **Smart Matching**: Case-insensitive partial name matching
- **Live Results**: Dynamic counter showing filtered results
- **Quick Clear**: Escape key to instantly reset search
- **Responsive Design**: Works seamlessly on all devices

### 📈 **Excel Integration**
- **File Upload**: Support for .xlsx and .xls formats
- **Data Processing**: Automatic parsing and validation
- **Table Display**: Clean, sortable data presentation
- **Export Options**: Download processed data in Excel format
- **Error Handling**: Graceful handling of file format issues

## 🏗️ **Architecture**

### **Tech Stack**
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Libraries**: SheetJS (XLSX processing)
- **Storage**: LocalStorage for session management
- **Design**: Responsive CSS Grid and Flexbox

### **File Structure**
```
PSE Dashboard/
├── index.html          # Main dashboard interface
├── login.html          # Authentication page
├── script.js           # Core functionality
├── README.md           # Documentation
├── netlify.toml        # Deployment configuration
└── .gitignore          # Git ignore rules
```

## 🚀 **Quick Start**

### **Option 1: Local Development**
```bash
# Clone the repository
git clone https://github.com/yourusername/pse-dashboard.git
cd pse-dashboard

# Start local server (Python)
python -m http.server 8000

# Or use Node.js
npx serve .

# Open browser
open http://localhost:8000
```

### **Option 2: Direct File Access**
1. Download or clone the repository
2. Open `index.html` in your web browser
3. Login with credentials: `admin` / `puresky2024`

## 📋 **Usage Guide**

### **1. Authentication**
- Navigate to the dashboard URL
- Enter credentials: `admin` / `puresky2024`
- Session automatically expires after 24 hours

### **2. Site Management**
- Browse 35 energy sites with detailed specifications
- Use search bar to quickly find specific sites
- Click on issue buttons to manage site-specific problems

### **3. Issue Tracking**
- Upload Excel files with issue data
- View comprehensive "All Issues" overview
- Switch between open and closed issues
- Export complete reports

### **4. Excel File Format**
Your Excel files should include these columns:
| Column | Description | Required |
|--------|-------------|----------|
| Site/Site Name | Energy site identifier | ✅ |
| Issue/Description | Problem description | ✅ |
| Status/Issue Status | Current status | ✅ |
| Priority | High/Medium/Low | ⚪ |
| Assignee/Assigned To | Responsible person | ⚪ |
| Date Created/Created | Issue creation date | ⚪ |
| Date Resolved/Resolved | Resolution date | ⚪ |

## 🌍 **Energy Sites Portfolio**

The dashboard manages 35 renewable energy installations:

**Solar Installations:**
- Adirondack, Blossom B, Clayton, Dover, Dudley
- Cedar Hill Solar, Clover Meadow, Oak Hill Solar 1 & 2
- White River Solar, Elmbrook Solar, and more

**Hybrid Systems (Solar + Storage):**
- Cotuit: 4.36MWp / 3.11MW + 1.50MW / 4.2MWh
- East Brookfield Adams: 7.03MWp / 4.66MW + 3.0MW / 6.3MWh
- Oak Hill Solar: 8.30MWp / 5.0MW + 4.50MW / 9MWh each

## 🔧 **Configuration**

### **Authentication Settings**
```javascript
// In login.html - modify credentials
if (username === 'admin' && password === 'puresky2024') {
    // Update credentials here
}
```

### **Session Timeout**
```javascript
// In index.html - modify timeout duration
const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
```

## 🚀 **Deployment**

### **Netlify (Recommended)**
1. Connect your GitHub repository to Netlify
2. Deploy automatically with included `netlify.toml`
3. Custom domain and HTTPS included

### **Other Platforms**
- **GitHub Pages**: Enable in repository settings
- **Vercel**: Import repository and deploy
- **Firebase Hosting**: Use Firebase CLI

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

For support, email support@pureskyenergy.com or create an issue in this repository.

## 🙏 **Acknowledgments**

- Built for PURESKY ENERGY renewable portfolio management
- SheetJS library for Excel processing
- Modern web standards for optimal performance

---

**Made with ❤️ for sustainable energy management**
