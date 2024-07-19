import * as SecureStore from "expo-secure-store";

export const secureSave = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const secureGet = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};

export const secureRemove = async (key: string): Promise<void> => {
  return await SecureStore.deleteItemAsync(key);
};

export const logout = async (): Promise<void> => {
  try {
    const accessToken = await secureGet("accessToken");

    // TODO: call backend logout route (if such exists)

    await secureRemove("accessToken");

    // if (accessToken) {
    //   await logoutApi(serverURL, { Authorization: `Bearer ${accessToken}` });
    // } else {
    //   throw new Error("No Access token provided");
    // }
  } catch (err) {
    console.log("failed to request logout from backend:", err);
  } finally {
    await Promise.all(
      ["accessToken", "publicKey", "privateKey", "homieKey"].map((key) =>
        SecureStore.deleteItemAsync(key)
      )
    );
  }
};
