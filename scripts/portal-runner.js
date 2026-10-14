import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const out = path.resolve('artifacts');
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
try {
  await page.setContent(`<!doctype html><html><head><title>Demo Vendor Portal</title>
  <style>body{font:18px system-ui;background:#f3f6fb;padding:50px;color:#17223b}.card{background:white;padding:30px;border-radius:14px;max-width:700px;margin:auto;box-shadow:0 8px 30px #ccd3e0}button{padding:12px 18px;background:#275df5;color:white;border:0;border-radius:8px}</style></head>
  <body><div class="card"><h1>Supplier Central</h1><p id="status">Shipment status: awaiting carrier scan</p><button id="refresh" onclick="document.querySelector('#status').textContent='Shipment status: in transit'">Refresh shipment status</button></div></body></html>`);
  await page.getByRole('button', { name: 'Refresh shipment status' }).click();
  await page.screenshot({ path: path.join(out, 'supplier-central-success.png'), fullPage: true });
  console.log('Portal demo succeeded; screenshot saved to artifacts/supplier-central-success.png');
} catch (error) {
  await page.screenshot({ path: path.join(out, 'portal-failure.png'), fullPage: true }).catch(() => {});
  console.error('Portal run failed; screenshot saved when possible.', error);
  process.exitCode = 1;
} finally {
  await browser.close();
}
