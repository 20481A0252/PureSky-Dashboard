import pandas as pd
from datetime import datetime

# Sample data with the correct column structure
data = [
    # SL.No, Site Name, PV/BESS, Equipment, Equipment Num, Issue Type, Init Date & T, Issue Description, Open & close
    [1, "Adirondack - Connecticut River", "PV", "Inverter", "INV-001", "Maintenance", "2024-01-15 10:30", "Routine maintenance required", "open"],
    [2, "Adirondack - Connecticut River", "BESS", "Battery", "BAT-002", "Fault", "2024-01-20 14:45", "Battery voltage low", "closed"],
    [3, "Clayton", "PV", "Panel", "PNL-003", "Cleaning", "2024-01-25 09:15", "Solar panel cleaning needed", "open"],
    [4, "Clayton", "PV", "Inverter", "INV-004", "Repair", "2024-01-28 16:20", "Inverter fault detected", "closed"],
    [5, "Dover - Buckmaster Pond", "PV", "Monitoring", "MON-005", "Calibration", "2024-02-01 11:00", "Monitoring system calibration", "open"],
    [6, "Dover - Buckmaster Pond", "BESS", "Controller", "CTL-006", "Update", "2024-02-05 13:30", "Software update required", "closed"],
    [7, "Lake Waconia", "PV", "Transformer", "TRF-007", "Inspection", "2024-02-10 08:45", "Annual transformer inspection", "open"],
    [8, "Lake Waconia", "PV", "Cable", "CBL-008", "Replacement", "2024-02-12 15:15", "Cable replacement needed", "open"],
    [9, "New Germany", "BESS", "Cooling", "COL-009", "Maintenance", "2024-02-15 12:00", "Cooling system maintenance", "closed"],
    [10, "New Germany", "PV", "Inverter", "INV-010", "Fault", "2024-02-18 10:30", "Inverter communication error", "open"],
    [11, "Canandaigua", "PV", "Panel", "PNL-011", "Cleaning", "2024-02-20 14:00", "Panel efficiency drop", "open"],
    [12, "Canandaigua", "BESS", "Battery", "BAT-012", "Testing", "2024-02-22 09:30", "Battery performance test", "closed"],
    [13, "Cedar Hill Solar", "PV", "Monitoring", "MON-013", "Repair", "2024-02-25 11:45", "Data logger malfunction", "open"],
    [14, "Cedar Hill Solar", "PV", "Inverter", "INV-014", "Maintenance", "2024-02-28 16:00", "Scheduled maintenance", "closed"],
    [15, "Veseli", "BESS", "Controller", "CTL-015", "Configuration", "2024-03-01 10:15", "Controller reconfiguration", "open"]
]

# Create DataFrame with proper column names
columns = ["SL.No", "Site Name", "PV/BESS", "Equipment", "Equipment Num", "Issue Type", "Init Date & T", "Issue Description", "Open & close"]
df = pd.DataFrame(data, columns=columns)

# Save to Excel file
output_file = "sample_issues_test.xlsx"
df.to_excel(output_file, index=False, sheet_name="Issues")

print(f"Sample Excel file created: {output_file}")
print(f"Total rows: {len(df)}")
print(f"Columns: {', '.join(columns)}")
print("\nSample data preview:")
print(df.head())

# Show distribution of open/closed issues by site
print("\n--- Issue Status by Site ---")
status_summary = df.groupby(['Site Name', 'Open & close']).size().unstack(fill_value=0)
print(status_summary)
