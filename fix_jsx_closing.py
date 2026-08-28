import re

with open('src/government/screens/LiveMap.tsx', 'r') as f:
    content = f.read()

bad_close = r"\}\)\}\s*\)\}"
good_close = r"})}</>)}"

content = re.sub(bad_close, good_close, content)

with open('src/government/screens/LiveMap.tsx', 'w') as f:
    f.write(content)
