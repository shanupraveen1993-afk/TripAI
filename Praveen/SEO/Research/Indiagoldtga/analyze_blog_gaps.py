#!/usr/bin/env python3
"""
Analyze blog content gaps for indiagold.co vs competitors
Focus only on blog-related content
"""

# Indiagold blog pages
indiagold_blogs = {
    "sbi-gold-loan-per-gram-rate": {"url": "https://indiagold.co/blogs/sbi-gold-loan-per-gram-rate", "traffic": 2588},
    "canara-bank-gold-loan-per-gram": {"url": "https://indiagold.co/blogs/canara-bank-gold-loan-per-gram", "traffic": 1745},
    "iifl-gold-loan-interest-rate": {"url": "https://indiagold.co/blogs/iifl-gold-loan-interest-rate", "traffic": 1044},
    "iob-gold-loan-interest-rate": {"url": "https://indiagold.co/blogs/iob-gold-loan-interest-rate", "traffic": 456},
    "hallmark-gold": {"url": "https://indiagold.co/blogs/hallmark-gold-pay-for-what-it-s-worth", "traffic": 370},
    "chai-sutta-bar-franchise": {"url": "https://indiagold.co/blogs/complete-guide-on-how-to-start-a-chai-sutta-bar-franchise", "traffic": 298},
    "idbi-bank-gold-loan": {"url": "https://indiagold.co/blogs/idbi-bank-gold-loan-interest-rate", "traffic": 234},
    "petrol-pump-business": {"url": "https://indiagold.co/blogs/how-to-get-a-loan-to-start-your-own-petrol-pump-business", "traffic": 135},
    "check-gold-purity": {"url": "https://indiagold.co/blogs/how-to-check-gold-purity-simple-methods-to-know-what-you-re-buying", "traffic": 111},
    "what-is-916-gold": {"url": "https://indiagold.co/blogs/what-is-916-gold", "traffic": 87},
    "sovereign-gold-bond": {"url": "https://indiagold.co/blogs/sovereign-gold-bond-calculator", "traffic": 76},
    "lender-comparison": {"url": "https://indiagold.co/blogs/iifl-vs-shriram-vs-capri-loans", "traffic": 43},
    "gst-on-gold": {"url": "https://indiagold.co/blogs/gst-on-gold", "traffic": 29},
}

# Competitor blog content gaps
content_gaps = [
    {
        "topic": "Udyam Registration Guide for Business Loans",
        "max_traffic": 35631,
        "competitors": ["IIFL"],
        "urls": ["https://www.iifl.com/blogs/business-loan/what-is-udyam-registration-and-its-benefits"]
    },
    {
        "topic": "How Many Grams in 1 Tola of Gold",
        "max_traffic": 14720,
        "competitors": ["IIFL", "Capriloans"],
        "urls": ["https://www.iifl.com/blogs/gold-loan/how-many-grams-is-1-tola-of-gold", "https://www.capriloans.in/blogs/how-many-grams-are-in-1-tola-of-gold-and-its-value-in-india"]
    },
    {
        "topic": "What is Business - Comprehensive Guide",
        "max_traffic": 13889,
        "competitors": ["IIFL"],
        "urls": ["https://www.iifl.com/blogs/business-loan/what-is-business"]
    },
    {
        "topic": "Best Way to Invest Rs 10 Lakhs",
        "max_traffic": 5404,
        "competitors": ["IIFL"],
        "urls": ["https://www.iifl.com/blogs/other/what-ideal-way-invest-rs-10-lakhs"]
    },
    {
        "topic": "How to Start a Hardware Shop Business",
        "max_traffic": 5299,
        "competitors": ["IIFL"],
        "urls": ["https://www.iifl.com/blogs/business-loan/how-to-start-a-hardware-shop-business"]
    },
    {
        "topic": "How to Check Purity of 20 Carat Gold",
        "max_traffic": 4048,
        "competitors": ["IIFL"],
        "urls": ["https://www.iifl.com/blogs/gold-loan/how-to-check-purity-of-20-carat-gold"]
    },
    {
        "topic": "Gold Price History in India",
        "max_traffic": 4008,
        "competitors": ["IIFL"],
        "urls": ["https://www.iifl.com/blogs/gold-loan/gold-price-history-in-india"]
    },
    {
        "topic": "What is 24K and 22K Gold",
        "max_traffic": 3850,
        "competitors": ["IIFL", "Capriloans"],
        "urls": ["https://www.iifl.com/blogs/gold-loan/what-is-24k-and-22k-gold", "https://www.capriloans.in/blogs/key-differences-between-24k-and-22k-gold"]
    },
    {
        "topic": "Director Identification Number (DIN)",
        "max_traffic": 3022,
        "competitors": ["IIFL"],
        "urls": ["https://www.iifl.com/blogs/business-loan/director-identification-number"]
    },
    {
        "topic": "How to Check Hallmark on Gold",
        "max_traffic": 2565,
        "competitors": ["IIFL"],
        "urls": ["https://www.iifl.com/blogs/gold-loan/how-to-check-hallmark-on-gold"]
    },
    {
        "topic": "How to Calculate Gold Loan Eligibility",
        "max_traffic": 1045,
        "competitors": ["Manappuram"],
        "urls": ["https://www.manappuram.com/blogs/how-to-calculate-gold-loan-eligibility"]
    },
    {
        "topic": "Minimum Weight Required for Gold Loan",
        "max_traffic": 1016,
        "competitors": ["Manappuram"],
        "urls": ["https://www.manappuram.com/blogs/minimum-weight-required-for-gold-loan"]
    },
    {
        "topic": "RBI Gold Loan Guidelines",
        "max_traffic": 782,
        "competitors": ["Manappuram"],
        "urls": ["https://www.manappuram.com/blogs/rbi-gold-loan-guidelines"]
    },
    {
        "topic": "How Gold Prices Affect Gold Loan",
        "max_traffic": 356,
        "competitors": ["Manappuram"],
        "urls": ["https://www.manappuram.com/blogs/how-gold-prices-affect-gold-loan"]
    },
    {
        "topic": "NBFC Gold Loans vs Bank Gold Loans",
        "max_traffic": 349,
        "competitors": ["Manappuram"],
        "urls": ["https://www.manappuram.com/blogs/nbfc-gold-loans-vs-bank-gold-loans"]
    },
    {
        "topic": "Instant Gold Loan Complete Guide",
        "max_traffic": 330,
        "competitors": ["Manappuram"],
        "urls": ["https://www.manappuram.com/blogs/instant-gold-loan-complete-guide"]
    },
    {
        "topic": "How to Transfer Gold Loan to Another Lender",
        "max_traffic": 268,
        "competitors": ["Manappuram"],
        "urls": ["https://www.manappuram.com/blogs/how-to-transfer-your-gold-loan-to-another-lender"]
    },
    {
        "topic": "Typical Duration of a Gold Loan",
        "max_traffic": 227,
        "competitors": ["Manappuram"],
        "urls": ["https://www.manappuram.com/blogs/typical-duration-of-a-gold-loan"]
    },
    {
        "topic": "Can a Home Loan be Transferred",
        "max_traffic": 77,
        "competitors": ["Capriloans"],
        "urls": ["https://www.capriloans.in/blogs/can-a-home-loan-be-transferred-from-one-individual-to-another"]
    },
    {
        "topic": "Gold Loan - Smart Way to Keep Gold Safe",
        "max_traffic": 8,
        "competitors": ["Capriloans"],
        "urls": ["https://www.capriloans.in/blogs/gold-loan-a-smart-way-to-keep-your-gold-safe"]
    },
]

# Generate CSV
print("topic,max_traffic,competitors_covering,urls")
for gap in content_gaps:
    competitors_str = ", ".join(gap["competitors"])
    urls_str = ", ".join(gap["urls"])
    print(f'"{gap["topic"]}",{gap["max_traffic"]},"{competitors_str}","{urls_str}"')
