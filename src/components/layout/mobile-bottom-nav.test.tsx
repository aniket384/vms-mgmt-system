import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/live-view",
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("MobileBottomNav", () => {
  it("renders mobile primary navigation entries", () => {
    render(<MobileBottomNav />);

    expect(screen.getByLabelText("Mobile primary navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Live" })).toHaveAttribute("href", "/dashboard/live-view");
    expect(screen.getByRole("link", { name: "Events" })).toHaveAttribute("href", "/dashboard/events");
  });
});
