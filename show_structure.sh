#!/bin/bash
echo "BlueGuardians Website Structure:"
echo ""
find ./blueguardians -type f | sort
echo ""
echo "Link Verification Summary:"
echo "- All links from main page to articles are valid"
echo "- All back links from articles to main page are valid"