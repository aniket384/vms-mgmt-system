import { beforeEach, describe, expect, it } from "vitest";
import { useUiStore } from "@/store/ui-store";

describe("ui store", () => {
  beforeEach(() => {
    useUiStore.setState({ sidebarCollapsed: false, mobileSidebarOpen: false });
  });

  it("toggles desktop sidebar collapsed state", () => {
    useUiStore.getState().toggleSidebar();
    expect(useUiStore.getState().sidebarCollapsed).toBe(true);
    useUiStore.getState().toggleSidebar();
    expect(useUiStore.getState().sidebarCollapsed).toBe(false);
  });

  it("opens and closes the mobile sidebar independently", () => {
    useUiStore.getState().openMobileSidebar();
    expect(useUiStore.getState().mobileSidebarOpen).toBe(true);
    expect(useUiStore.getState().sidebarCollapsed).toBe(false);

    useUiStore.getState().closeMobileSidebar();
    expect(useUiStore.getState().mobileSidebarOpen).toBe(false);
  });
});
