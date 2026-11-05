import { Alert, Platform } from "react-native";

// Alert.alert KHÔNG hoạt động trên bản web của React Native → bọc lại để chạy được cả 3 nền tảng.

export function showMessage(title: string, message?: string, onOk?: () => void) {
  if (Platform.OS === "web") {
    if (typeof document !== "undefined") {
      let overlay = document.getElementById("custom-alert-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "custom-alert-overlay";
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
      overlay.innerHTML = `
        <div style="background:#fff; border-radius:16px; padding:22px; width:290px; box-shadow:0 10px 25px rgba(0,0,0,0.25); font-family:sans-serif; text-align:center;">
          <div style="font-weight:700; font-size:17px; color:#0B1F5C; margin-bottom:6px;">${title}</div>
          ${message ? `<div style="font-size:14px; color:#64748B; margin-bottom:18px; line-height:1.4;">${message}</div>` : ""}
          <button id="alert-ok-btn" style="width:100%; padding:10px; border-radius:8px; border:none; background:#3B3FD8; color:#fff; font-weight:700; cursor:pointer;">OK</button>
        </div>
      `;
      overlay.style.display = "flex";
      const okBtn = document.getElementById("alert-ok-btn");
      if (okBtn) {
        okBtn.onclick = () => {
          if (overlay) overlay.style.display = "none";
          onOk?.();
        };
      }
    } else {
      window.alert(message ? `${title}\n${message}` : title);
      onOk?.();
    }
  } else {
    Alert.alert(title, message, [{ text: "OK", onPress: onOk }]);
  }
}

export function confirmDialog(title: string, message: string, onConfirm: () => void, confirmText = "Xóa") {
  if (Platform.OS === "web") {
    if (typeof document !== "undefined") {
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
      overlay.innerHTML = `
        <div style="background:#fff; border-radius:16px; padding:22px; width:290px; box-shadow:0 10px 25px rgba(0,0,0,0.25); font-family:sans-serif; text-align:center;">
          <div style="font-size:32px; margin-bottom:8px;">🗑️</div>
          <div style="font-weight:700; font-size:17px; color:#0B1F5C; margin-bottom:6px;">${title}</div>
          <div style="font-size:14px; color:#64748B; margin-bottom:18px; line-height:1.4;">${message}</div>
          <div style="display:flex; gap:10px; justify-content:center;">
            <button id="confirm-cancel-btn" style="flex:1; padding:10px; border-radius:8px; border:1px solid #CBD5E1; background:#F8FAFC; color:#475569; font-weight:700; cursor:pointer;">Hủy</button>
            <button id="confirm-ok-btn" style="flex:1; padding:10px; border-radius:8px; border:none; background:#DC2626; color:#fff; font-weight:700; cursor:pointer;">${confirmText}</button>
          </div>
        </div>
      `;
      overlay.style.display = "flex";
      const cancelBtn = document.getElementById("confirm-cancel-btn");
      const okBtn = document.getElementById("confirm-ok-btn");
      if (cancelBtn) {
        cancelBtn.onclick = () => {
          if (overlay) overlay.style.display = "none";
        };
      }
      if (okBtn) {
        okBtn.onclick = () => {
          if (overlay) overlay.style.display = "none";
          onConfirm();
        };
      }
    } else {
      if (window.confirm(`${title}\n${message}`)) onConfirm();
    }
  } else {
    Alert.alert(title, message, [
      { text: "Hủy", style: "cancel" },
      { text: confirmText, style: "destructive", onPress: onConfirm },
    ]);
  }
}
