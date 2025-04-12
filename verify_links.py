import os
import re
from pathlib import Path

def extract_links(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract href attributes
    href_pattern = re.compile(r'href=[\'"]([^\'"]*)[\'"]')
    links = href_pattern.findall(content)
    return links

def verify_link(base_path, link):
    # Handle relative links
    if link.startswith('./'):
        link = link[2:]  # Remove './'
    elif link.startswith('../'):
        # Go up one directory
        base_path = os.path.dirname(os.path.dirname(base_path))
        link = link[3:]  # Remove '../'
    
    target_path = os.path.join(os.path.dirname(base_path), link)
    exists = os.path.exists(target_path)
    return {
        'source': base_path,
        'link': link,
        'target': target_path,
        'exists': exists
    }

def main():
    base_dir = './blueguardians'
    
    # Find all HTML files
    html_files = []
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    print(f"Found {len(html_files)} HTML files")
    
    # Check links in each file
    all_links_valid = True
    for html_file in html_files:
        print(f"\nChecking links in {html_file}:")
        links = extract_links(html_file)
        
        for link in links:
            # Skip external links or anchors
            if link.startswith('http') or link.startswith('#'):
                continue
                
            result = verify_link(html_file, link)
            status = "✓ Valid" if result['exists'] else "✗ BROKEN"
            if not result['exists']:
                all_links_valid = False
            print(f"  {status}: {link} -> {result['target']}")
    
    print("\nSummary:")
    if all_links_valid:
        print("All links are valid!")
    else:
        print("Some links are broken. Please check the details above.")

if __name__ == "__main__":
    main()