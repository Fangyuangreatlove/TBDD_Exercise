import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { setTokenProvider } from "./src/api/client";
import { usePersistence } from "./src/hooks/usePersistence";
import { LoadingView } from "./src/components/LoadingView";
import { RootStackParamList } from "./src/navigation/types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Interceptor của axios lấy token từ store qua hàm này
setTokenProvider(() => store.getState().auth.token);

if (typeof window !== "undefined") {
  (window as any).appStore = store;
  (window as any).appNav = navigationRef;
}

function Root() {
  const ready = usePersistence(); // đọc AsyncStorage → tự đăng nhập
  if (!ready) return <LoadingView label="Đang khởi động…" />;
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style="light" />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Root />
      </SafeAreaProvider>
    </Provider>
  );
}
