import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useUiStore } from "@/store/ui-store";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  ),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
}));

describe("responsive sidebar", () => {
  beforeEach(() => {
    useUiStore.setState({ sidebarCollapsed: false, mobileSidebarOpen: false });
  });

  it("opens and closes the mobile navigation drawer from header controls", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Sidebar />
        <Header />
      </>,
    );

    expect(screen.getByLabelText("Mobile navigation")).toHaveAttribute("aria-hidden", "true");

    await user.click(screen.getByLabelText("Open navigation menu"));
    expect(screen.getByLabelText("Mobile navigation")).toHaveAttribute("aria-hidden", "false");

    await user.click(screen.getByLabelText("Close navigation menu"));
    expect(screen.getByLabelText("Mobile navigation")).toHaveAttribute("aria-hidden", "true");
  });

  it("closes the mobile drawer after selecting a navigation item", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Sidebar />
        <Header />
      </>,
    );

    await user.click(screen.getByLabelText("Open navigation menu"));
    await user.click(screen.getAllByRole("link", { name: "Live View" })[1]);

    expect(screen.getByLabelText("Mobile navigation")).toHaveAttribute("aria-hidden", "true");
  });
});
