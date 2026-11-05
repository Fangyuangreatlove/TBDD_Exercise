const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const screenshotDir = path.join(__dirname, '..', 'screenshots');

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const userDataDir = 'C:\\TBDD\\chrome_cdp_profile_sub';
  
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (e) {}

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--window-size=412,915',
    'http://localhost:8081',
  ]);

  await sleep(2500);

  const targetsRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await targetsRes.json();
  const pageTarget = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const currentId = msgId++;
      const onMsg = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.id === currentId) {
            ws.removeEventListener('message', onMsg);
            if (msg.error) reject(msg.error);
            else resolve(msg.result);
          }
        } catch (e) {
          reject(e);
        }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id: currentId, method, params }));
    });
  }

  async function evaluate(code) {
    const res = await send('Runtime.evaluate', {
      expression: code,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result?.value;
  }

  async function snap(filename) {
    console.log(`Capturing ${filename}...`);
    await sleep(700);
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    const filepath = path.join(screenshotDir, filename);
    fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
    console.log(`Saved ${filename} (${Math.round(data.length * 0.75 / 1024)} KB)`);
  }

  try {
    for (let i = 0; i < 20; i++) {
      const ready = await evaluate(`!!window.appNav && !!window.appStore`);
      if (ready) break;
      await sleep(1000);
    }
    await sleep(1500);

    // ==========================================
    // Refine 6: Cart Screen Quantity & Coupon Applied
    // ==========================================
    console.log('--- Refine 6. Cart Screen Quantity & Coupon Applied ---');
    await evaluate(`
      window.appStore.dispatch({
        type: 'cart/addItem',
        payload: {
          bookId: 1,
          title: 'Dế Mèn Phiêu Lưu Ký',
          price: 65000,
          emoji: '🦗',
          color: '#16A34A',
          stock: 12
        }
      });
      window.appStore.dispatch({
        type: 'cart/addItem',
        payload: {
          bookId: 2,
          title: 'Nhà Giả Kim',
          price: 79000,
          emoji: '🏜️',
          color: '#F59E0B',
          stock: 8
        }
      });
      window.appStore.dispatch({
        type: 'cart/setQuantity',
        payload: { bookId: 1, quantity: 2 }
      });
      window.appNav.navigate('Tabs', { screen: 'Cart' });
    `);
    await sleep(1200);

    await evaluate(`
      if (window.__applyCartCoupon) {
        window.__applyCartCoupon('SALE10');
      }
    `);
    await sleep(800);
    await snap('06_cart_quantity_coupon.png');

    console.log('Done refining 06!');
  } finally {
    ws.close();
    chromeProc.kill();
  }
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
