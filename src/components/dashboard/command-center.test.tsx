import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AiInsightsPanel, CommandCenterHero, SiteHealthGrid } from "@/components/dashboard/command-center";
import { vmsService } from "@/services/vms-service";

describe("command center widgets", () => {
  it("renders executive command center KPIs", () => {
    render(<CommandCenterHero totalCameras={8} openEvents={3} healthScore={75} />);

    expect(screen.getByText("Unified surveillance intelligence across every site.")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("renders site health and AI insights from service data", () => {
    render(
      <>
        <SiteHealthGrid sites={vmsService.getSiteHealth()} />
        <AiInsightsPanel insights={vmsService.getAiInsights()} />
      </>,
    );

    expect(screen.getByText("Corporate HQ")).toBeInTheDocument();
    expect(screen.getByText("Repeated motion after-hours")).toBeInTheDocument();
  });
});
