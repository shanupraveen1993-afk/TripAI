#!/usr/bin/env python3
"""
Script to upload content gap analysis to Google Sheets
This script creates a new Google Sheet and populates it with the CSV data
"""

import csv
import os

# File paths
csv_files = {
    'Content Gaps': '/home/coder/Praveen/SEO/Research/Indiagoldtga/content_gaps.csv',
    'Indiagold Current Pages': '/home/coder/Praveen/SEO/Research/Indiagoldtga/indiagold_current_pages.csv',
    'Priority Recommendations': '/home/coder/Praveen/SEO/Research/Indiagoldtga/priority_recommendations.csv',
    'Competitor Summary': '/home/coder/Praveen/SEO/Research/Indiagoldtga/competitor_summary.csv'
}

def read_csv_to_list(file_path):
    """Read CSV file and return as list of lists"""
    data = []
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            data.append(row)
    return data

def main():
    print("=" * 80)
    print("Content Gap Analysis - Google Sheets Upload")
    print("=" * 80)
    print()
    print("CSV Files Created:")
    print("-" * 80)

    for sheet_name, file_path in csv_files.items():
        if os.path.exists(file_path):
            data = read_csv_to_list(file_path)
            print(f"✓ {sheet_name}: {len(data)-1} rows (+ header)")
            print(f"  Location: {file_path}")
        else:
            print(f"✗ {sheet_name}: File not found")

    print()
    print("=" * 80)
    print("MANUAL IMPORT INSTRUCTIONS:")
    print("=" * 80)
    print()
    print("1. Go to https://sheets.google.com")
    print("2. Create a new blank spreadsheet")
    print("3. Name it: 'Indiagold.co - Content Gap Analysis vs Competitors'")
    print()
    print("4. For each CSV file, create a new sheet and import:")
    print()

    for i, (sheet_name, file_path) in enumerate(csv_files.items(), 1):
        print(f"   Sheet {i}: {sheet_name}")
        print(f"   - Click '+' to add new sheet, rename to '{sheet_name}'")
        print(f"   - File > Import > Upload > Select: {os.path.basename(file_path)}")
        print(f"   - Import location: 'Replace current sheet'")
        print(f"   - Separator: 'Comma'")
        print()

    print("=" * 80)
    print("QUICK LINKS TO CSV FILES:")
    print("=" * 80)
    for sheet_name, file_path in csv_files.items():
        print(f"{sheet_name}:")
        print(f"  {file_path}")
    print()

if __name__ == "__main__":
    main()
