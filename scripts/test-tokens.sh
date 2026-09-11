#!/bin/bash
# Test script for unified design tokens across eznrg/website and eznrg/eznrg-platform
# 
# This script validates that the new unified token set works correctly on both sites.
# Run from the root of eznrg/website after the tokens-unified.css file is in place.

set -e

echo "==============================================================="
echo "Testing Unified Design Tokens"
echo "==============================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Verify tokens-unified.css exists in website
echo -e "${YELLOW}[1/6]${NC} Checking tokens-unified.css exists in website..."
if [ -f "static/shared/tokens-unified.css" ]; then
    echo -e "${GREEN}✓${NC} tokens-unified.css found at static/shared/tokens-unified.css"
else
    echo -e "${RED}✗${NC} tokens-unified.css NOT found. Exiting."
    exit 1
fi
echo ""

# Test 2: Verify CSS syntax
echo -e "${YELLOW}[2/6]${NC} Validating CSS syntax..."
# Basic check: look for unmatched braces
OPEN_BRACES=$(grep -o '{' static/shared/tokens-unified.css | wc -l)
CLOSE_BRACES=$(grep -o '}' static/shared/tokens-unified.css | wc -l)
if [ "$OPEN_BRACES" -eq "$CLOSE_BRACES" ]; then
    echo -e "${GREEN}✓${NC} CSS braces balanced ($OPEN_BRACES pairs)"
else
    echo -e "${RED}✗${NC} CSS braces unbalanced (open: $OPEN_BRACES, close: $CLOSE_BRACES)"
    exit 1
fi
echo ""

# Test 3: Verify key tokens exist in light mode
echo -e "${YELLOW}[3/6]${NC} Checking light mode tokens..."
REQUIRED_TOKENS=(
    "--color-ground"
    "--color-accent"
    "--color-ink"
    "--text-base"
    "--font-sans"
    "--radius-lg"
    "--primary"  # Legacy alias
    "--bg"       # Legacy alias
)

MISSING_TOKENS=()
for token in "${REQUIRED_TOKENS[@]}"; do
    if grep -q "$token:" static/shared/tokens-unified.css; then
        echo -e "${GREEN}✓${NC} $token"
    else
        echo -e "${RED}✗${NC} $token MISSING"
        MISSING_TOKENS+=("$token")
    fi
done

if [ ${#MISSING_TOKENS[@]} -gt 0 ]; then
    echo -e "${RED}✗${NC} Missing tokens: ${MISSING_TOKENS[*]}"
    exit 1
fi
echo ""

# Test 4: Verify dark mode (:root[data-theme="dark"]) exists
echo -e "${YELLOW}[4/6]${NC} Checking dark mode selector..."
if grep -q ':root\[data-theme="dark"\]' static/shared/tokens-unified.css; then
    echo -e "${GREEN}✓${NC} Dark mode selector found"
else
    echo -e "${RED}✗${NC} Dark mode selector NOT found"
    exit 1
fi

# Count dark mode token overrides (should be ~40+)
DARK_MODE_TOKENS=$(sed -n '/:root\[data-theme="dark"\]/,/^}/p' static/shared/tokens-unified.css | grep -c ':' || true)
if [ "$DARK_MODE_TOKENS" -gt 30 ]; then
    echo -e "${GREEN}✓${NC} Dark mode has $DARK_MODE_TOKENS token definitions"
else
    echo -e "${YELLOW}⚠${NC} Dark mode has only $DARK_MODE_TOKENS definitions (expected ~40+)"
fi
echo ""

# Test 5: Verify backward compatibility (legacy names exist)
echo -e "${YELLOW}[5/6]${NC} Checking backward compatibility aliases..."
LEGACY_ALIASES=(
    "--primary"
    "--bg"
    "--text"
    "--muted"
    "--border"
)

for alias in "${LEGACY_ALIASES[@]}"; do
    if grep -q "$alias:" static/shared/tokens-unified.css; then
        echo -e "${GREEN}✓${NC} $alias (legacy alias preserved)"
    else
        echo -e "${RED}✗${NC} $alias MISSING"
        exit 1
    fi
done
echo ""

# Test 6: Verify pages can be loaded
echo -e "${YELLOW}[6/6]${NC} Validating HTML pages link to tokens correctly..."
PAGES=(
    "static/hospitality/index.html"
    "static/residential/index.html"
)

for page in "${PAGES[@]}"; do
    if [ -f "$page" ]; then
        if grep -q '/static/tokens.css' "$page"; then
            echo -e "${GREEN}✓${NC} $page links to tokens.css"
        else
            echo -e "${RED}✗${NC} $page does NOT link to tokens.css"
            exit 1
        fi
    fi
done
echo ""

# Summary
echo "==============================================================="
echo -e "${GREEN}All tests passed! ✓${NC}"
echo "==============================================================="
echo ""
echo "Next steps:"
echo ""
echo "1. DEVELOPMENT: Test pages locally with npm run dev"
echo "   - Navigate to: http://localhost:4173/hospitality"
echo "   - Navigate to: http://localhost:4173/residential"
echo "   - Verify pages render correctly with new tokens"
echo ""
echo "2. VISUAL INSPECTION:"
echo "   - Check that colors match platform aesthetic (teal accents)"
echo "   - Verify text is readable and properly styled"
echo "   - Test hover states on buttons and cards"
echo ""
echo "3. DARK MODE TEST (optional):"
echo "   - Open browser DevTools console and run:"
echo "     document.documentElement.setAttribute('data-theme', 'dark')"
echo "   - Pages should switch to mint theme"
echo ""
echo "4. PRODUCTION DEPLOYMENT:"
echo "   - Commit tokens-unified.css to main branch"
echo "   - Deploy website to Vercel"
echo "   - Verify standalone pages render at /hospitality, /residential, /commercial"
echo ""
echo "5. SYNC WITH PLATFORM:"
echo "   - If design changes are made, update three files:"
echo "     a) eznrg-platform/frontend/src/index.css (@theme block)"
echo "     b) eznrg-platform/frontend/src/tokens-unified.css"
echo "     c) eznrg/website/static/shared/tokens-unified.css"
echo ""
