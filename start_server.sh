#!/bin/bash
# ==============================================================================
# Lokaler Testserver für wodniok_website
# ==============================================================================

PORT=8000
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "--------------------------------------------------------"
echo "🚀 Starte lokalen Webserver für wodniok.de..."
echo "📂 Verzeichnis: $DIR"
echo "🌐 URL:         http://localhost:$PORT"
echo "--------------------------------------------------------"
echo "Tippen Sie STRG+C um den Server zu beenden."
echo ""

cd "$DIR"

# Check if Python 3 is available
if command -v python3 &>/dev/null; then
    python3 -m http.server $PORT
elif command -v python &>/dev/null; then
    python -m SimpleHTTPServer $PORT
elif command -v npx &>/dev/null; then
    npx serve . -p $PORT
else
    echo "Fehler: Weder Python noch Node/npx gefunden."
    exit 1
fi
