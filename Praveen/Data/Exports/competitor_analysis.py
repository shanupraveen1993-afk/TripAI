#!/usr/bin/env python3
import pandas as pd
import re
from urllib.parse import urlparse
import json

# Data from SEMRush
asodesk_data = [
    {"url": "https://asodesk.com/", "keywords_count": 60, "traffic": 64, "traffic_percentage": 33.68},
    {"url": "https://asodesk.com/free-tools", "keywords_count": 59, "traffic": 8, "traffic_percentage": 4.21},
    {"url": "https://asodesk.com/app-store-optimization", "keywords_count": 29, "traffic": 2, "traffic_percentage": 1.05},
    {"url": "https://asodesk.com/app-monitoring", "keywords_count": 3, "traffic": 1, "traffic_percentage": 0.52},
    {"url": "https://asodesk.com/competitor-research", "keywords_count": 26, "traffic": 1, "traffic_percentage": 0.52},
    {"url": "http://asodesk.com/aso-tools", "keywords_count": 21, "traffic": 0, "traffic_percentage": 0},
    {"url": "https://asodesk.com/keyword-boost", "keywords_count": 18, "traffic": 0, "traffic_percentage": 0}
]

appfigures_data = [
    {"url": "https://appfigures.com/", "keywords_count": 362, "traffic": 2207, "traffic_percentage": 14.24},
    {"url": "https://appfigures.com/top-apps", "keywords_count": 1251, "traffic": 1935, "traffic_percentage": 12.49},
    {"url": "https://appfigures.com/app-intelligence", "keywords_count": 11, "traffic": 59, "traffic_percentage": 0.38},
    {"url": "https://appfigures.com/analytics/mobile-ranks-and-top-apps", "keywords_count": 65, "traffic": 63, "traffic_percentage": 0.4},
    {"url": "https://appfigures.com/analytics/integrations/stores/ios-app-store", "keywords_count": 58, "traffic": 73, "traffic_percentage": 0.47}
]

def extract_slug_keyword(url):
    """Extract main keyword from URL slug"""
    parsed = urlparse(url)
    path = parsed.path.strip('/')

    # Handle root URLs
    if not path:
        domain = parsed.netloc.replace('www.', '')
        return domain.split('.')[0]

    # Get the main path segment
    segments = path.split('/')
    main_segment = segments[0] if segments else ''

    # Clean and process the segment
    keyword = main_segment.replace('-', ' ').replace('_', ' ')
    return keyword

def categorize_tool_type(url, slug_keyword):
    """Categorize the type of tool based on URL and keyword"""
    url_lower = url.lower()
    keyword_lower = slug_keyword.lower()

    tool_categories = {
        'aso-tools': ['aso', 'optimization', 'app-store', 'keyword'],
        'analytics': ['analytics', 'intelligence', 'data', 'insights'],
        'monitoring': ['monitoring', 'tracking', 'watch'],
        'research': ['research', 'competitor', 'analysis'],
        'ranking': ['ranks', 'ranking', 'top-apps'],
        'free-tools': ['free-tools', 'tools'],
        'integrations': ['integrations', 'api', 'connect']
    }

    for category, keywords in tool_categories.items():
        if any(kw in url_lower or kw in keyword_lower for kw in keywords):
            return category

    return 'other'

def process_competitor_data(data, domain_name):
    """Process competitor data and extract tool-related pages"""
    processed = []

    for item in data:
        url = item['url']
        traffic = item['traffic']
        slug_keyword = extract_slug_keyword(url)
        tool_category = categorize_tool_type(url, slug_keyword)

        # Focus on tool-related pages
        if tool_category != 'other' or 'tool' in url.lower():
            processed.append({
                'domain': domain_name,
                'url': url,
                'traffic': traffic,
                'slug_keyword': slug_keyword,
                'tool_category': tool_category,
                'keywords_count': item['keywords_count']
            })

    return processed

# Process both competitors
asodesk_processed = process_competitor_data(asodesk_data, 'asodesk.com')
appfigures_processed = process_competitor_data(appfigures_data, 'appfigures.com')

# Combine and group by similar topics
all_processed = asodesk_processed + appfigures_processed

# Group by tool category and find max traffic per category
grouped_data = {}
for item in all_processed:
    category = item['tool_category']
    if category not in grouped_data:
        grouped_data[category] = []
    grouped_data[category].append(item)

# Create final output - keeping only max traffic per category
final_results = []
for category, items in grouped_data.items():
    # Sort by traffic and take the highest
    max_traffic_item = max(items, key=lambda x: x['traffic'])

    # Collect all pages in this category
    pages = [item['url'] for item in items]

    final_results.append({
        'topic': category.replace('-', ' ').title(),
        'traffic': max_traffic_item['traffic'],
        'pages': ', '.join(pages),
        'slug_keyword': max_traffic_item['slug_keyword'],
        'max_traffic_url': max_traffic_item['url']
    })

# Sort by traffic descending
final_results.sort(key=lambda x: x['traffic'], reverse=True)

print("Tool-focused Analysis Results:")
print("=" * 80)
for result in final_results:
    print(f"Topic: {result['topic']}")
    print(f"Max Traffic: {result['traffic']}")
    print(f"Main Slug Keyword: {result['slug_keyword']}")
    print(f"Pages: {result['pages']}")
    print(f"Top Traffic URL: {result['max_traffic_url']}")
    print("-" * 40)

# Save processed data for next steps
with open('/home/coder/Praveen/Data/Exports/tool_analysis_results.json', 'w') as f:
    json.dump(final_results, f, indent=2)

print(f"\nSaved {len(final_results)} tool categories to tool_analysis_results.json")