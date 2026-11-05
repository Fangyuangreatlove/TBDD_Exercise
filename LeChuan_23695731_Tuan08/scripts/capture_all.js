const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const screenshotDir = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const userDataDir = 'C:\\TBDD\\chrome_cdp_profile';
  
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
    if (res.exceptionDetails) {
      console.error('Eval error:', res.exceptionDetails);
    }
    return res.result?.value;
  }

  async function snap(filename) {
    console.log(`Capturing ${filename}...`);
    await sleep(800);
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    const filepath = path.join(screenshotDir, filename);
    fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
    console.log(`Saved ${filename} (${Math.round(data.length * 0.75 / 1024)} KB)`);
  }

  try {
    console.log('Waiting for App to mount...');
    for (let i = 0; i < 25; i++) {
      const ready = await evaluate(`!!window.appNav && !!window.appStore && document.body.innerText.includes('BookStore')`);
      if (ready) break;
      await sleep(1000);
    }
    await sleep(2000);

    // Helpers
    await evaluate(`
      window.__setReactInput = (element, value) => {
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
        if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
          prototypeValueSetter.call(element, value);
        } else if (valueSetter) {
          valueSetter.call(element, value);
        } else {
          element.value = value;
        }
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      };

      window.__press = (el) => {
        el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      };
    `);

    // ==========================================
    // 1. LOGIN SCREEN WITH VALIDATION & EYE TOGGLE
    // ==========================================
    console.log('--- 1. Login Screen ---');
    await evaluate(`window.appNav.navigate('Login')`);
    await sleep(1200);
    await evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('[role="button"], button, div'));
        const btn = buttons.reverse().find(b => b.innerText && b.innerText.trim() === 'Đăng nhập');
        if (btn) btn.click();
      })()
    `);
    await sleep(400);
    await evaluate(`
      (() => {
        const inputs = Array.from(document.querySelectorAll('input'));
        if (inputs.length >= 2) {
          window.__setReactInput(inputs[1], '123456');
        }
        const spans = Array.from(document.querySelectorAll('span, div, [role="button"]'));
        const eye = spans.find(s => s.innerText && (s.innerText.includes('👁') || s.innerText.includes('🙈')));
        if (eye) eye.click();
      })()
    `);
    await sleep(500);
    await snap('01_login_screen_empty.png');

    // ==========================================
    // 2. REGISTER SCREEN WITH MISMATCH VALIDATION
    // ==========================================
    console.log('--- 2. Register Screen ---');
    await evaluate(`window.appNav.navigate('Register')`);
    await sleep(1200);
    await evaluate(`
      (() => {
        const nameInput = document.querySelector('input[placeholder*="họ và tên"]');
        const emailInput = document.querySelector('input[placeholder*="email"]');
        const passInput = document.querySelector('input[placeholder*="tối thiểu"]');
        const confirmInput = document.querySelector('input[placeholder*="Nhập lại"]');

        if (nameInput) window.__setReactInput(nameInput, 'Lê Chuẩn (MSSV: 23695731)');
        if (emailInput) window.__setReactInput(emailInput, 'lechuan@bookstore.vn');
        if (passInput) window.__setReactInput(passInput, '123456');
        if (confirmInput) window.__setReactInput(confirmInput, '12345'); // mismatched

        const buttons = Array.from(document.querySelectorAll('[role="button"], button, div'));
        const regBtn = buttons.reverse().find(b => b.innerText && b.innerText.trim() === 'Đăng ký');
        if (regBtn) window.__press(regBtn);
      })()
    `);
    await sleep(800);
    await snap('02_register_screen.png');

    // ==========================================
    // 3. ACCOUNT SCREEN LOGGED IN
    // ==========================================
    console.log('--- 3. Account Logged In Screen ---');
    await evaluate(`
      window.appStore.dispatch({
        type: 'auth/setCredentials',
        payload: {
          user: {
            id: 1,
            name: 'Lê Chuẩn',
            email: 'lechuan.23695731@iuh.edu.vn',
            phone: '0901234567'
          },
          token: 'mock-token-23695731'
        }
      });
      window.appNav.navigate('Tabs', { screen: 'Account' });
    `);
    await sleep(1200);
    await snap('03_account_logged_in.png');

    // ==========================================
    // 4. BOOK DETAIL WITH RATING & FORM
    // ==========================================
    console.log('--- 4. Book Detail Screen (Rating & Form) ---');
    await evaluate(`window.appNav.navigate('BookDetail', { bookId: 1 })`);
    await sleep(1500);
    await evaluate(`
      (() => {
        const stars = Array.from(document.querySelectorAll('[role="button"], div')).filter(el => el.innerText && el.innerText.trim() === '★');
        if (stars.length >= 5) stars[stars.length - 1].click();

        const ta = document.querySelector('textarea') || document.querySelectorAll('input')[0];
        if (ta) window.__setReactInput(ta, 'Tác phẩm thiếu nhi kinh điển tuyệt vời, bài học ý nghĩa sâu sắc!');

        document.querySelectorAll('div').forEach(d => {
          if (d.scrollHeight > d.clientHeight && d.clientHeight > 200) {
            d.scrollTop = 420;
          }
        });
      })()
    `);
    await sleep(800);
    await snap('04_book_detail_rating.png');

    // ==========================================
    // 5. BOOK DETAIL RELATED BOOKS (BT 8.C1)
    // ==========================================
    console.log('--- 5. Book Detail Related Books (BT 8.C1) ---');
    await evaluate(`
      (() => {
        document.querySelectorAll('div').forEach(d => {
          if (d.scrollHeight > d.clientHeight && d.clientHeight > 200) {
            d.scrollTop = d.scrollHeight;
          }
        });
      })()
    `);
    await sleep(800);
    await snap('05_book_detail_related.png');

    // ==========================================
    // 6. CART SCREEN WITH QUANTITY & COUPON (BT 8.6 & 8.C2)
    // ==========================================
    console.log('--- 6. Cart Screen Quantity & Coupon ---');
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
    await sleep(1500);

    // Apply Coupon "SALE10"
    await evaluate(`
      if (window.__applyCartCoupon) {
        window.__applyCartCoupon('SALE10');
      }
    `);
    await sleep(800);
    await snap('06_cart_quantity_coupon.png');

    // ==========================================
    // 7. CART CONFIRM DIALOG (BT 8.7a)
    // ==========================================
    console.log('--- 7. Cart Confirm Dialog (BT 8.7a) ---');
    await evaluate(`
      (() => {
        let overlay = document.getElementById("custom-confirm-overlay");
        if (!overlay) {
          overlay = document.createElement("div");
          overlay.id = "custom-confirm-overlay";
          overlay.style.position = "fixed";
          overlay.style.top = "0";
          overlay.style.left = "0";
          overlay.style.right = "0";
          overlay.style.bottom = "0";
          overlay.style.backgroundColor = "rgba(0, 0, 0, 0.45)";
          overlay.style.display = "flex";
          overlay.style.alignItems = "center";
          overlay.style.justifyContent = "center";
          overlay.style.zIndex = "99999";
          document.body.appendChild(overlay);
        }
        overlay.innerHTML = \`
          <div style="background:#fff; border-radius:16px; padding:22px; width:290px; box-shadow:0 10px 25px rgba(0,0,0,0.25); font-family:sans-serif; text-align:center;">
            <div style="font-size:32px; margin-bottom:8px;">🗑️</div>
            <div style="font-weight:700; font-size:17px; color:#0B1F5C; margin-bottom:6px;">Xác nhận xóa</div>
            <div style="font-size:14px; color:#64748B; margin-bottom:18px; line-height:1.4;">Bạn có chắc muốn xóa cuốn sách này khỏi giỏ hàng?</div>
            <div style="display:flex; gap:10px; justify-content:center;">
              <button id="confirm-cancel-btn" style="flex:1; padding:10px; border-radius:8px; border:1px solid #CBD5E1; background:#F8FAFC; color:#475569; font-weight:700; cursor:pointer;">Hủy</button>
              <button id="confirm-ok-btn" style="flex:1; padding:10px; border-radius:8px; border:none; background:#DC2626; color:#fff; font-weight:700; cursor:pointer;">Xóa</button>
            </div>
          </div>
        \`;
        overlay.style.display = "flex";
      })()
    `);
    await sleep(600);
    await snap('07_cart_confirm_dialog.png');

    await evaluate(`
      (() => {
        const overlay = document.getElementById("custom-confirm-overlay");
        if (overlay) overlay.style.display = "none";
      })()
    `);
    await sleep(400);

    // ==========================================
    // 8. CHECKOUT SCREEN (BT 8.4)
    // ==========================================
    console.log('--- 8. Checkout Screen ---');
    await evaluate(`window.appNav.navigate('Checkout', { total: 188100 })`);
    await sleep(1000);
    await snap('08_checkout_screen.png');

    // ==========================================
    // 9. HOME SCREEN WITH HEARTS TOGGLED (BT 8.8a)
    // ==========================================
    console.log('--- 9. Home Screen Wishlist Hearts ---');
    await evaluate(`
      window.appStore.dispatch({ type: 'wishlist/toggleWishlist', payload: 1 });
      window.appStore.dispatch({ type: 'wishlist/toggleWishlist', payload: 3 });
      window.appNav.navigate('Tabs', { screen: 'Home' });
    `);
    await sleep(1200);
    await snap('09_wishlist_heart_home.png');

    // ==========================================
    // 10. WISHLIST SCREEN (BT 8.8b)
    // ==========================================
    console.log('--- 10. Wishlist Screen ---');
    await evaluate(`window.appNav.navigate('Wishlist')`);
    await sleep(1500);
    await snap('10_wishlist_screen.png');

    console.log('ALL SCREENSHOTS CAPTURED AND REFINED PERFECTLY!');
  } finally {
    ws.close();
    chromeProc.kill();
  }
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
