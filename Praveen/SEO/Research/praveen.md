COMPETITOR_SITES =  https://www.spyfu.com/
TOP_PAGES_COUNT = 30
TYPE_OF_PAGES = tools
COUNTRY=US
Optional - my_website = sc-domain:nextgrowthlabs.com,appvector.io
Persona : Think like SEO manager with 10+ years of experience. 

# Task

Use SEMRush MCP, and get the {TOP_PAGES_COUNT} of the {COMPETITOR_SITES}. And then group the competitor pages - based on 
/similarity - of the url-keywords. My goal is to identify all the individual pages, that I can use in target category (as specified in {TYPE_OF_PAGES}). 
, and I want an output like this: (Important: For keyword_metrics with difficulty, USE AV_STAGING MCP ONLy! there is a function for it. )
1. Topic, Traffic, Pages, Slug_keyword, get_keyword_metrics_with_difficulty (You can use av_staging mcp for it)
Example row - "serp checker", 1001010, examplesite.com/serp-checker, examplesite1.com/serp-checker,slug_keyword, 32 (yes, extracted keyword from the URL slug )
#### Important:
in the above, take only the traffic that is max - so if two pages have serp-rank-checker-in-usa, then take the one that has highest traffic. 
You don't need to tell me the traffic source - i.e. which page the max traffic came from.

## Phase 2 (Optional - ONLY if {my_website} is given)
## Important - for this analysis - USE AV_STAGING MCP ONLY. DO NOT USE SEMRUSH MCP for this analysis. 
Important - Please make sure that you check today's date - before running the API call. As we want to take the end date as today's date. 
Once you are done with the above analysis, you can then use av_staging MCP, and get top 1000 urls by querying search analytics, and create one more column - if the tool is already present on my website, so the final table will be like this. 

Topic, Traffic, Pages, Slug_keyword, get_keyword_metrics_with_difficulty, url_if_present_in_{my_website} else blank
Example row - "serp checker", 1001010, examplesite.com/serp-checker, examplesite1.com/serp-checker,slug_keyword, 32, abc.com/1234 
## Phase 3 (for competitors )
Get the all tools pages on the tool or product slug, products, pages from the competitors with the montly volume - and list as table example pages name, link, montly traffic and keywords (get_keyword_metrics_with_difficulty by using av_staging mcp ))
get the list of all slug_keywords With tools and  make with if the tool is already present on my website,  ( already in phase 2)
