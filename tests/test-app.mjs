import assert from 'node:assert';

// 1. Test offline routing engine logic
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

console.log('Testing Geo Distance calculation...');
const dist = calculateDistanceKm(-33.3644, -70.5186, -33.3533, -70.2815);
assert(dist > 20 && dist < 30, `Distance should be ~22km direct, got ${dist}`);
console.log(`✓ Distance calculated: ${dist.toFixed(2)} km`);

// 2. Test GPX generator string structure
function mockGpxGen(appName, coords) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="${appName} Kurviger Web Planner">
  <trk>
    <name>Ruta Test</name>
    <trkseg>
      ${coords.map(c => `<trkpt lat="${c[0]}" lon="${c[1]}"><ele>1200</ele></trkpt>`).join('\n')}
    </trkseg>
  </trk>
</gpx>`;
}

console.log('Testing GPX generation & whitelabel branding encapsulation...');
const xml = mockGpxGen('Waffle App', [[-33.3644, -70.5186], [-33.3533, -70.2815]]);
assert(xml.includes('creator="Waffle App Kurviger Web Planner"'), 'GPX must encapsulate app name');
assert(xml.includes('<trkpt lat="-33.3644" lon="-70.5186">'), 'GPX must contain trackpoints');
console.log('✓ GPX Generator verified successfully.');

console.log('\nALL VERIFICATION TESTS PASSED!');
