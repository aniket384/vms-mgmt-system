import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/layout/header";

const push = vi.fn();
const setTheme = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
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
  useTheme: () => ({ resolvedTheme: "dark", setTheme }),
}));

describe("Header", () => {
  beforeEach(() => {
    push.mockClear();
    setTheme.mockClear();
  });

  it("toggles theme using the resolved theme", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByLabelText("Toggle theme"));

    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("opens notifications from a click instead of relying on hover", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const button = screen.getByLabelText("Notifications");
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Warehouse Aisle 4 is offline")).toBeInTheDocument();
  });

  it("closes open menus with Escape and outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Header />
        <main>Outside content</main>
      </div>,
    );

    const notifications = screen.getByLabelText("Notifications");
    await user.click(notifications);
    expect(notifications).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(notifications).toHaveAttribute("aria-expanded", "false");

    const userMenu = screen.getByLabelText("User menu");
    await user.click(userMenu);
    expect(userMenu).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByText("Outside content"));
    expect(userMenu).toHaveAttribute("aria-expanded", "false");
  });

  it("opens user menu and routes to login on sign out", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByLabelText("User menu"));
    await user.click(screen.getByText("Sign out"));

    expect(push).toHaveBeenCalledWith("/login");
  });
});
