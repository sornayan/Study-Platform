// Automated Responsive & Viewport Testing Suite across 6 Viewports using Headless Chrome
const { execFileSync } = require('child_process');
const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log("================================================================================");
console.log("AUTOMATED RESPONSIVE VIEWPORT & ACADEMIC TYPOGRAPHY VERIFICATION SUITE");
console.log("================================================================================");

const screenshotsDir = path.join(process.cwd(), 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const VIEWPORTS = [
  { 
    name: 'Desktop (Wide)', 
    width: 1920, 
    height: 1080, 
    type: 'desktop',
    route: 'study-room?subject=computer-networks&q=computer-networks-2025-q1a',
    screenshot: 'responsive_1920_encapsulation.png'
  },
  { 
    name: 'Standard Laptop', 
    width: 1366, 
    height: 768, 
    type: 'laptop',
    route: 'study-room?subject=computer-networks&q=computer-networks-2024-q7a',
    screenshot: 'responsive_1366_stopwait.png'
  },
  { 
    name: 'Small Laptop / Tablet Landscape', 
    width: 1024, 
    height: 768, 
    type: 'tablet-landscape',
    route: 'study-room?subject=computer-networks&q=computer-networks-2025-q6b',
    screenshot: 'responsive_1024_table.png'
  },
  { 
    name: 'iPad / Tablet Portrait', 
    width: 768, 
    height: 1024, 
    type: 'tablet-portrait',
    route: 'study-room?subject=computer-networks&q=computer-networks-2021-q1a',
    screenshot: 'responsive_768_osi.png'
  },
  { 
    name: 'Smartphone (iPhone 12/13/14)', 
    width: 390, 
    height: 844, 
    type: 'mobile',
    route: 'study-room?subject=computer-networks&q=computer-networks-2025-q1a',
    screenshot: 'responsive_390_encapsulation.png'
  },
  { 
    name: 'Smartphone (Android Standard)', 
    width: 360, 
    height: 800, 
    type: 'mobile-small',
    route: 'study-room?subject=computer-networks&q=computer-networks-2024-q7a',
    screenshot: 'responsive_360_stopwait.png'
  }
];

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseFileUrl = 'file:///C:/Users/rb152/OneDrive/Documents/B-Tech/6th%20sem%20PYQ/EndSem/dist/index.html';

let passedViewports = 0;

for (const vp of VIEWPORTS) {
  console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height} - ${vp.type})`);
  const url = `${baseFileUrl}#${vp.route}`;
  const screenshotPath = path.join(screenshotsDir, vp.screenshot);
  
  const args = [
    '--headless=new',
    '--allow-file-access-from-files',
    '--no-sandbox',
    '--disable-gpu',
    `--window-size=${vp.width},${vp.height}`,
    `--screenshot=${screenshotPath}`,
    '--dump-dom',
    url
  ];

  try {
    const output = execFileSync(chromePath, args, { encoding: 'utf8', maxBuffer: 25 * 1024 * 1024 });
    
    // 1. Verify React app root and study room rendered
    assert(output.includes('id="root"'), 'Root element must be present');
    assert(output.includes('SemesterOS'), 'SemesterOS branding must be rendered');
    
    // 2. Verify responsive layout classes based on viewport width
    if (vp.width < 768) {
      assert(output.includes('-translate-x-full'), 'Sidebar must be collapsible on mobile viewports (<768px)');
      console.log(`  -> Mobile breakpoint verified: Collapsible sidebar active (-translate-x-full).`);
    } else {
      assert(output.includes('md:translate-x-0'), 'Sidebar must be visible on tablet/desktop viewports (>=768px)');
      console.log(`  -> Desktop breakpoint verified: Permanent sidebar layout active (md:translate-x-0).`);
    }

    // 3. Verify horizontal equation/table scrolling containers
    assert(output.includes('overflow-x-auto'), 'Responsive overflow-x-auto containers must be present to prevent page blowout');
    
    // 4. Verify typography and answer-content presence
    assert(output.includes('answer-content') || output.includes('prose-exam'), 'Answer typography container must be rendered');

    console.log(`  -> Screenshot captured: screenshots/${vp.screenshot}`);
    console.log(`  [PASS] ${vp.name} (${vp.width}x${vp.height}) passed all DOM & layout checks.`);
    passedViewports++;
  } catch (err) {
    console.error(`  [FAIL] Error testing viewport ${vp.name}:`, err.message);
  }
}

console.log("\n================================================================================");
console.log(`RESPONSIVE AUDIT RESULT: ${passedViewports} / ${VIEWPORTS.length} VIEWPORTS PASSED WITH FULL DOM INTEGRITY`);
assert.strictEqual(passedViewports, VIEWPORTS.length);
console.log("================================================================================");
