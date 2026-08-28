import re

with open('src/government/screens/LiveMap.tsx', 'r') as f:
    content = f.read()

# 1. Import CircleMarker and MOCK_ISSUES
if 'CircleMarker' not in content:
    content = content.replace('Marker, Popup, useMap } from \'react-leaflet\'', 'Marker, CircleMarker, Popup, useMap } from \'react-leaflet\'')
if 'MOCK_ISSUES' not in content:
    content = content.replace('import { DashboardService } from \'../../services/api\';', 'import { DashboardService } from \'../../services/api\';\nimport { MOCK_ISSUES } from \'../../data\';')

# 2. Remove CityLabels
city_labels_pattern = r'const CityLabels = \(\) => \{[\s\S]*?return \([\s\S]*?cities\.map[\s\S]*?<\/>\n  \);\n\};'
content = re.sub(city_labels_pattern, '', content)

# 3. Add Fallback to MOCK_ISSUES
fallback_pattern = r'const \[mapRes, heatRes\] = await Promise\.all\(\[\n\s*DashboardService\.getMap\(\),\n\s*DashboardService\.getHeatmap\(\)\n\s*\]\);\n\s*setMapIssues\(mapRes\);\n\s*setHeatmapPoints\(heatRes\);\n\s*\} catch \(e\) \{\n\s*console\.error\("Failed to fetch map data", e\);\n\s*\}'
new_fetch = '''const [mapRes, heatRes] = await Promise.all([
          DashboardService.getMap(),
          DashboardService.getHeatmap()
        ]);
        setMapIssues(mapRes);
        setHeatmapPoints(heatRes);
      } catch (e) {
        console.error("Failed to fetch map data", e);
        // Fallback to MOCK_ISSUES for map rendering when backend is unreachable
        setMapIssues(MOCK_ISSUES);
        // For heatmap, just create some mock points if unavailable
        setHeatmapPoints(MOCK_ISSUES.map(i => [i.lat, i.lng, 0.8]));
      }'''
if 'setMapIssues(MOCK_ISSUES);' not in content:
    content = re.sub(fallback_pattern, new_fetch, content)

# 4. Remove CityLabels from rendering
content = content.replace('<CityLabels />\n', '')
content = content.replace('<CityLabels />', '')

# 5. Replace getIcon with getIssueColor
icon_pattern = r'const getIcon = \(priority: string\) => \{[\s\S]*?\}\);\n  \};'
new_color = '''const getIssueColor = (priority: string) => {
    if (priority === 'Critical') return '#ef4444';
    if (priority === 'High') return '#f97316';
    return '#3b82f6';
  };'''
content = re.sub(icon_pattern, new_color, content)

# 6. Replace Marker with CircleMarker
marker_render = r'<Marker\s*key=\{issue\.id\}\s*position=\{\[issue\.lat, issue\.lng\]\}\s*icon=\{getIcon\(issue\.priority\)\}\s*>'
new_marker = '''<CircleMarker 
                    key={issue.id} 
                    center={[issue.lat, issue.lng]}
                    radius={6}
                    pathOptions={{
                      color: getIssueColor(issue.priority),
                      fillColor: getIssueColor(issue.priority),
                      fillOpacity: 0.8,
                      weight: 2
                    }}
                  >'''
content = re.sub(marker_render, new_marker, content)

# Close Marker tag needs to be CircleMarker
content = content.replace('</Marker>', '</CircleMarker>')

with open('src/government/screens/LiveMap.tsx', 'w') as f:
    f.write(content)
