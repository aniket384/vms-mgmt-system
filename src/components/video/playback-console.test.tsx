import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlaybackConsole } from "@/components/video/playback-console";

describe("PlaybackConsole", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      configurable: true,
      value: vi.fn().mockResolvedValue(undefined),
    });
    Object.defineProperty(HTMLMediaElement.prototype, "pause", {
      configurable: true,
      value: vi.fn(),
    });
    Object.defineProperty(HTMLMediaElement.prototype, "duration", {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(HTMLMediaElement.prototype, "requestFullscreen", {
      configurable: true,
      value: vi.fn().mockResolvedValue(undefined),
    });
  });

  it("plays, pauses, seeks, mutes, and changes volume", async () => {
    const user = userEvent.setup();
    render(<PlaybackConsole />);
    const video = document.querySelector("video") as HTMLVideoElement;

    await user.click(screen.getByLabelText("Play recording"));
    expect(video.play).toHaveBeenCalled();

    await user.click(screen.getByLabelText("Pause recording"));
    expect(video.pause).toHaveBeenCalled();

    await user.click(screen.getByLabelText("Forward 10 seconds"));
    expect(video.currentTime).toBe(10);

    await user.click(screen.getByLabelText("Mute recording"));
    expect(video.muted).toBe(true);

    fireEvent.change(screen.getByLabelText("Recording volume"), { target: { value: "0.5" } });
    expect(video.volume).toBe(0.5);
  });
});
