import re

with open('src/government/screens/LiveMap.tsx', 'r') as f:
    content = f.read()

content = content.replace('<MarkerClusterGroup chunkedLoading>', '')
content = content.replace('</MarkerClusterGroup>', '')

with open('src/government/screens/LiveMap.tsx', 'w') as f:
    f.write(content)
