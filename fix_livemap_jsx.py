import re

with open('src/government/screens/LiveMap.tsx', 'r') as f:
    content = f.read()

bad_jsx = r"\{viewMode === 'markers' && \(\s*\{filteredIssues\.map\(\(issue\)"
good_jsx = "{viewMode === 'markers' && (\n            <>\n              {filteredIssues.map((issue)"

content = re.sub(bad_jsx, good_jsx, content)

bad_close = r"\}\)\}\s*\)\}\s*</MapContainer>"
good_close = "})}</>\n          )}\n        </MapContainer>"

content = re.sub(bad_close, good_close, content)

with open('src/government/screens/LiveMap.tsx', 'w') as f:
    f.write(content)
