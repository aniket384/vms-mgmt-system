import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LiveGrid } from "@/components/video/live-grid";

describe("LiveGrid", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      configurable: true,
      value: vi.fn().mockResolvedValue(undefined),
    });
    Object.defineProperty(HTMLMediaElement.prototype, "pause", {
      configurable: true,
      value: vi.fn(),
    });
  });

  it("switches layouts and exposes real camera controls", async () => {
    const user = userEvent.setup();
    render(<LiveGrid />);

    await user.click(screen.getByRole("button", { name: "1x1" }));
    expect(screen.getByLabelText("Pause Main Gate ANPR")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Pause Main Gate ANPR"));
    expect(screen.getByLabelText("Play Main Gate ANPR")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Unmute Main Gate ANPR"));
    expect(screen.getByLabelText("Mute Main Gate ANPR")).toBeInTheDocument();
  });
});
