import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity,
  ChevronRight,
  Circle,
  Download,
  Eraser,
  FileCode2,
  Gauge,
  Info,
  Lock,
  Play,
  RefreshCw,
  Settings2,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YT_DOWNLOAD_CONSOLE — Terminal YouTube Downloader" },
      {
        name: "description",
        content:
          "A local-only cyberpunk terminal console for fetching YouTube video metadata, formats and download progress.",
      },
      { property: "og:title", content: "YT_DOWNLOAD_CONSOLE" },
      {
        property: "og:description",
        content:
          "Dark terminal console UI for a personal YouTube downloader: formats, quality options and live download progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Console,
});

const MODES = ["DEFAULT", "AUDIO_ONLY", "FOCUS", "AI_ANALYZE"] as const;

const BUFFER: { text: string; flag?: boolean; dim?: boolean; accent?: boolean }[] = [
  { text: "> paste_url --target youtube", dim: true },
  { text: "https://www.youtube.com/watch?v=8xK2n_Qd91A", accent: true, flag: true },
  { text: "", dim: true },
  { text: "[fetch] resolving metadata ......... OK", dim: true },
  { text: "TITLE    : Building a Synthwave Render Pipeline in 40 Minutes" },
  { text: "CHANNEL  : nullbyte.studio" },
  { text: "DURATION : 00:41:17" },
  { text: "UPLOADED : 2026-07-29" },
  { text: "", dim: true },
  { text: "[probe] enumerating streams ....... 18 found", dim: true },
  { text: "best_video : 2160p60 / vp9 / 1.42 GB" },
  { text: "best_audio : opus 160kbps / 47.3 MB" },
  { text: "", dim: true },
  { text: "> _", accent: true },
];

function SectionHead({ icon: Icon, label }: { icon: typeof Info; label: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <Icon className="size-3 text-primary" strokeWidth={1.5} />
      <span className="label-xs text-primary/80">{label}</span>
    </div>
  );
}

function Console() {
  const [mode, setMode] = useState<string>("DEFAULT");
  const [url, setUrl] = useState<string>("");
  const [isInitiating, setIsInitiating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isInitiating) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setIsInitiating(false);
          return 100;
        }
        return p + Math.random() * 12;
      });
    }, 300);
    return () => clearInterval(id);
  }, [isInitiating]);

  const handleInitiate = () => {
    if (!url.trim()) return;
    setProgress(0);
    setIsInitiating(true);
  };

  const pct = Math.min(100, Math.round(progress));
  const filled = Math.floor((pct / 100) * 20);
  const progressBar = `[${"█".repeat(filled)}${"░".repeat(20 - filled)}] ${pct}%`;

  const terminalLines = isInitiating || pct >= 100
    ? [
        { text: "> paste_url --target youtube", dim: true },
        { text: url, accent: true, flag: true },
        { text: "", dim: true },
        ...(isInitiating && pct < 100
          ? [
              { text: "[fetch] resolving metadata ......... IN_PROGRESS", dim: true },
              { text: progressBar, accent: true },
              { text: "", dim: true },
              { text: "> _", accent: true },
            ]
          : []),
        ...(pct >= 100
          ? [
              { text: "[fetch] resolving metadata ......... OK", dim: true },
              { text: "", dim: true },
              { text: "TITLE    : Building a Synthwave Render Pipeline in 40 Minutes" },
              { text: "CHANNEL  : nullbyte.studio" },
              { text: "DURATION : 00:41:17" },
              { text: "UPLOADED : 2026-07-29" },
              { text: "", dim: true },
              { text: "[probe] enumerating streams ....... 18 found", dim: true },
              { text: "best_video : 2160p60 / vp9 / 1.42 GB" },
              { text: "best_audio : opus 160kbps / 47.3 MB" },
              { text: "", dim: true },
              { text: "> _", accent: true },
            ]
          : []),
      ]
    : BUFFER;



  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col px-5 py-4">
        {/* TOP BAR */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[15px] font-bold tracking-[0.18em] text-primary drop-shadow-[0_0_8px_var(--ring)]">
              [ YT_DOWNLOAD_CONSOLE ]
            </h1>
            <p className="label-xs mt-1">STREAM_STABLE // LOCAL_ACCESS</p>
          </div>
          <nav className="flex items-center gap-2">
            <button className="pill pill-active">
              <Circle className="size-2 fill-current" strokeWidth={0} />
              SERVER_ACTIVE
            </button>
            <button className="pill">
              <Settings2 className="size-3" strokeWidth={1.5} />
              SETTINGS
            </button>
            <button className="pill">
              <Eraser className="size-3" strokeWidth={1.5} />
              CLEAR
            </button>
          </nav>
        </header>

        <div className="divider my-3" />

        {/* BREADCRUMB */}
        <div className="label-xs mb-3 flex items-center gap-1">
          LOCATION:
          <ChevronRight className="size-3" strokeWidth={1.5} />
          <span className="text-primary/70">URL_INPUT</span>
        </div>

        {/* MAIN GRID */}
        <main className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
          {/* CONSOLE PANEL */}
          <section className="panel flex flex-col">
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
              <span className="label-xs text-foreground/70">
                SESSION 2026.08.16 // 16:03:44Z
              </span>
              <span className="pill pill-active">SAVED</span>
              <div className="ml-auto flex flex-wrap gap-1.5">
                {MODES.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={mode === m ? "pill pill-active" : "pill"}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-[46px_1fr]">
                <div className="border-r border-border bg-panel-tint/40 py-3">
                  {BUFFER.map((l, i) => (
                    <div
                      key={i}
                      className="relative flex h-[22px] items-center justify-end pr-2 text-[11px] text-muted-foreground/60"
                    >
                      {l.flag && (
                        <Circle
                          className="absolute left-2 size-2 fill-flag text-flag drop-shadow-[0_0_6px_var(--flag)]"
                          strokeWidth={0}
                        />
                      )}
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  ))}
                </div>
                <div className="py-3 pl-4">
                  {BUFFER.map((l, i) => (
                    <div
                      key={i}
                      className={`h-[22px] whitespace-pre text-[12.5px] leading-[22px] ${
                        l.accent
                          ? "text-primary"
                          : l.dim
                            ? "text-muted-foreground"
                            : "text-foreground/85"
                      }`}
                    >
                      {l.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border px-3 py-2">
              <div className="h-[3px] w-full bg-panel-tint">
                <div className="h-full w-1/3 bg-primary/70 shadow-[var(--glow-md)]" />
              </div>
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className="flex flex-col gap-3">
            <section className="panel">
              <div className="border-b border-border px-3 py-2">
                <span className="label-xs text-primary/80">[ TARGET_URL ]</span>
              </div>
              <div className="p-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-background/60 border border-border px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:shadow-[var(--glow-sm)] transition-all"
                />
                <button
                  onClick={handleInitiate}
                  disabled={isInitiating || !url.trim()}
                  className="pill pill-active mt-3 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="size-3" strokeWidth={1.5} />
                  {isInitiating ? `[ RESOLVING ${Math.min(100, Math.round(progress))}% ]` : "[ INITIATE ]"}
                </button>

                {isInitiating && (
                  <div className="mt-3">
                    <div className="h-[3px] w-full bg-panel-tint">
                      <div
                        className="h-full bg-primary/70 shadow-[var(--glow-md)] transition-all duration-300"
                        style={{ width: `${Math.min(100, progress)}%` }}
                      />
                    </div>
                    <div className="label-xs mt-1.5 flex justify-between text-muted-foreground">
                      <span>PROBE_STREAMS</span>
                      <span>{Math.min(100, Math.round(progress))}%</span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="panel">
              <div className="border-b border-border px-3 py-2">
                <span className="label-xs text-primary/80">[ DOWNLOAD_STATS ]</span>
              </div>
              <div className="grid grid-cols-2">
                <div className="border-r border-border px-3 py-4">
                  <div className="label-xs">FORMATS</div>
                  <div className="mt-1 text-2xl text-primary drop-shadow-[0_0_10px_var(--ring)]">
                    18
                  </div>
                </div>
                <div className="px-3 py-4">
                  <div className="label-xs">QUALITY_OPTIONS</div>
                  <div className="mt-1 text-2xl text-primary drop-shadow-[0_0_10px_var(--ring)]">
                    07
                  </div>
                </div>
              </div>
            </section>

            <section className="panel flex-1">
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <span className="label-xs text-primary/80">[ AI_SUMMARY ]</span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <RefreshCw className="size-3 hover:text-primary" strokeWidth={1.5} />
                  <SlidersHorizontal
                    className="size-3 hover:text-primary"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <div className="space-y-4 px-3 py-3">
                <div>
                  <SectionHead icon={Info} label="OVERVIEW" />
                  <p className="text-[12px] leading-5 text-muted-foreground">
                    Long-form technical walkthrough of a GPU render pipeline. Heavy
                    screen-share segments; 2160p source retains legible terminal text.
                  </p>
                </div>

                <div className="divider" />

                <div>
                  <SectionHead icon={FileCode2} label="FORMAT_DETAILS" />
                  <dl className="space-y-1 text-[12px] text-muted-foreground">
                    {[
                      ["RESOLUTION", "3840x2160 @60"],
                      ["CONTAINER", "mkv / vp9+opus"],
                      ["EST_FILESIZE", "1.47 GB"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <span className="label-xs">{k}</span>
                        <span className="text-foreground/80">{v}</span>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="divider" />

                <div>
                  <SectionHead icon={Gauge} label="DOWNLOAD_PROGRESS" />
                  <div className="tint-box space-y-1 text-[12px] text-primary">
                    <div className="whitespace-pre">[████████░░░░░░░░░░░░] 41%</div>
                    <div className="label-xs text-muted-foreground">
                      612 MB / 1.47 GB — 7.8 MB/s — ETA 01:52
                    </div>
                  </div>
                </div>

                <div>
                  <SectionHead icon={Sparkles} label="NEXT_STEP" />
                  <div className="tint-box text-[12px] text-foreground/85">
                    Click{" "}
                    <span className="text-primary">[ INITIATE ]</span> to begin download
                    into ./cache/local.
                  </div>
                </div>

                <button className="pill pill-active w-full justify-center py-2.5">
                  <Download className="size-3.5" strokeWidth={1.5} />
                  [ INITIATE_DOWNLOAD ]
                </button>
              </div>
            </section>
          </aside>
        </main>

        <div className="divider my-3" />

        {/* FOOTER */}
        <footer className="label-xs flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Activity className="size-3 text-primary" strokeWidth={1.5} />
            USER: LOCAL_SESSION
          </span>
          <span>QUEUE: 0</span>
          <span className="flex items-center gap-1.5">
            <Lock className="size-3 text-primary" strokeWidth={1.5} />
            ENCRYPTED_LOCAL_CACHE
          </span>
        </footer>
      </div>
    </div>
  );
}
