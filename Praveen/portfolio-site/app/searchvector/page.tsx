import {
  CaseStudyPage, BackLink, CaseHeader, Section,
  Para, Highlight, DecisionList, OutcomeGrid,
  Callout, TableBlock, Split, SplitBlock,
  ImageSlot, ImageRow, DocLink, HandoverSlider,
} from "../components/CaseStudyLayout";

export const metadata = {
  title: "SearchVector — Shanmuga Praveen",
  description: "Full-cycle UX design on a live B2B SEO analytics platform — iterative improvements, codebase migration rebuild across 8 tools, GSC connection redesign, and a UX SOP adopted by the dev team.",
};

export default function SearchVectorCase() {
  return (
    <CaseStudyPage>
      <BackLink />

      <CaseHeader
        tag="Project 05 — B2B SaaS · SEO Analytics Platform · Multivariate.ai"
        title="SearchVector"
        tagline={<>
          SearchVector is a search intelligence platform where I improved existing user workflows, onboarding, and dashboard experiences through UX optimization. As the product transitioned to AI-assisted development, I established scalable design processes, documentation, and workflows to support future product evolution.
          <br /><br />
          <span className="text-white font-medium">Let&apos;s see how it played out →</span>
        </>}
        meta={[
          { label: "Role",    value: "UX Designer — sole designer across 8 tools" },
          { label: "Team",    value: "2 Frontend Devs · 1 Backend Dev · CEO · cross-functional" },
          { label: "Tools",   value: "Figma · Claude Code · PostHog · OpenReplay · SQL" },
          { label: "Type",    value: "B2B SaaS · SEO Platform · Competitor: Ahrefs, Semrush" },
        ]}
      />

      {/* ── §00 Impact ──────────────────────────────────────────────────── */}
      <Section n="00" title="Impact" accent="green">
        <OutcomeGrid
          items={[
            { n: "2.5×",  label: "GSC impression growth in week 1 post-launch" },
            { n: "10k+",  label: "Impressions crossed after launch" },
            { n: "8+",    label: "Tools redesigned end-to-end" },
            { n: "1 SOP", label: "UX diagnostic framework adopted by dev team" },
          ]}
        />
        <Callout type="green">
          The rebuild shipped a live product that outperforms the old one on conversion. As a side effect, engineering now has a UX audit template they run before every release.
        </Callout>

        <Para>
          This is what the rebuilt product looks like — and the differentiator that puts it
          ahead of Ahrefs. The full story of how it got here is below.
        </Para>

        <ImageRow
          slots={[
            {
              label: "GSC Insights live — 1.23M clicks · 45.20M impressions · 2.73% CTR · 12.40 avg position",
              src: "/sv-screens/live-gsc.png",
              alt: "SearchVector GSC Insights — 1.23M total clicks, 45.20M impressions, 2.73% CTR, 12.40 avg position — the core product value delivered post-rebuild",
            },
            {
              label: "Campaign Overview — 66.45K spend · 55.23K clicks · what Ahrefs doesn't have",
              src: "/sv-screens/live-campaign.png",
              alt: "SearchVector Campaign Overview — 66.45K total spend, 55.23K clicks, 2112 conversions, 1.20 avg CPC across 12 campaigns",
            },
          ]}
        />
      </Section>

      {/* ── §06 Dashboard — 3-State UX ──────────────────────────────────── */}
      <Section n="06" title="Dashboard — 3-State UX">
        <Callout type="blue" label="The break">
          Post-migration audit flagged it directly: &ldquo;Dashboard — no state
          differentiation — demo, added, and connected looked identical.&rdquo; That was the break.
          What follows is how it was rebuilt — from a flat, stateless layout to a system that
          guides users from first visit to fully connected without any support required.
        </Callout>
        <Para>
          The dashboard is the entry point for every user. After migration,
          it had no state differentiation — demo data, a newly added project,
          and a fully connected project all looked the same.
        </Para>
        <Para>
          I designed a clear <Highlight>3-state progressive disclosure system</Highlight>{" "}
          that guides users from first visit to fully connected — without
          requiring any manual reading or support.
        </Para>
        <DecisionList
          items={[
            {
              title: "State 1 — First visit (Demo data)",
              body: "User lands on a fully functional dashboard with demo project data. All 3 tool buttons (GSC Insight, Rank Tracker, Audit) are visible and active. A demo banner with 'Clear demo data' CTA is always visible below the page title. New users see a 'Create project' button below the demo card — clicking it highlights the add website search bar at the top.",
            },
            {
              title: "State 2 — Project added, GSC not connected",
              body: "Real project card appears. GSC data section is blurred with a 'Connect GSC' button visible. The blur communicates locked real data — not a broken feature. Demo data remains below as reference.",
            },
            {
              title: "State 3 — GSC connected",
              body: "Live GSC metrics replace blurred state. 'Connect GSC' button changes to 'Connected ✓'. Demo data removed. Country selection appears next to the project selector for Rank Tracker.",
            },
          ]}
        />
        <ImageSlot
          label="New dashboard — collapsible sidebar, live GSC metrics, delta indicators"
          src="/searchvector-dashboard.png"
          alt="New SearchVector My Projects dashboard — collapsible category sidebar, dark topbar, live GSC data with period-over-period change"
        />
      </Section>

      {/* ── §07 GSC Console Connection Redesign ─────────────────────────── */}
      <Section n="07" title="GSC Console Connection — Value Before Commitment">
        <Callout type="blue" label="Where this connects">
          The competitive audit named this explicitly: &ldquo;Console connection — the biggest
          UX gap. Both Ahrefs and Semrush surface value before asking for OAuth. SearchVector
          asked users to commit before showing what they&rsquo;d get.&rdquo; This is the redesign that fixed it —
          and the single most impactful UX change in the entire project.
        </Callout>
        <Para>
          Most SearchVector users added a website project and chose &ldquo;Google SERP&rdquo; — the
          path that required no OAuth connection. They never returned to connect GSC.
          Without GSC connected, they saw no real performance data.
          The product&rsquo;s core value — impressions, CTR, cannibalization, low-hanging keywords —
          was locked behind a connection step users were never motivated to take.
        </Para>

        <Callout type="amber" label="First fix — still wrong">
          The first redesign made the GSC option visually louder in the existing modal — blue highlight, stronger CTA text, a brief description of what GSC would unlock. Connection rate barely moved. Session recordings showed why: users had already mentally committed to SERP as the &ldquo;easy path&rdquo; the moment they saw two choices side by side. Visual weight didn&rsquo;t change the decision frame. The problem was not how the choices looked — it was that showing choices at all was the wrong pattern. We scrapped the modal entirely.
        </Callout>

        <Callout type="amber" label="The root cause">
          The old Add Website modal asked users to choose a project type before showing them
          what each type would unlock. Users picked SERP (no OAuth required) because the
          value of GSC connection was invisible at the decision moment.
        </Callout>

        <ImageRow
          slots={[
            {
              label: "Before — Add Website modal: choice before value",
              src: "/mv/console-old.png",
              alt: "Old SearchVector Add Website modal — users choose Google SERP or Google Search Console without seeing what GSC unlocks",
            },
            {
              label: "After — GSC Insights page: value before commitment",
              src: "/mv/console-new.png",
              alt: "New SearchVector GSC Insights connection page — shows 4 specific benefits before the Connect CTA, with demo data fallback",
            },
          ]}
        />

        <Split>
          <SplitBlock label="Before — commit first, value appears after" accent="before">
            <p>User adds website → chooses project type (no context).</p>
            <p>Picks SERP (no OAuth needed) — path of least resistance.</p>
            <p>GSC value is invisible at decision moment.</p>
            <p>Users don&rsquo;t return to connect — they already &ldquo;set up&rdquo; their project.</p>
          </SplitBlock>
          <SplitBlock label="After — preview first, then connect" accent="after">
            <p>Dedicated &ldquo;GSC Insights&rdquo; page with hero benefit section.</p>
            <p>4 specific unlocks shown: Real-time Metrics, Cannibalization Detection, Low-Hanging Fruit, Page Fluctuation.</p>
            <p>&ldquo;Want to see it first?&rdquo; path — demo data fallback removes commitment anxiety.</p>
            <p>Internal <code>&lt;a href&gt;</code> links within benefit descriptions = SEO internal link equity for SearchVector&rsquo;s own organic ranking.</p>
          </SplitBlock>
        </Split>

        <Callout type="green">
          The principle: show value before asking for action. GSC connection is now a destination page with a clear benefit hierarchy — not a modal step buried in the project setup flow.
        </Callout>
      </Section>

      {/* ── Figma Handover — Teaser ──────────────────────────────────────── */}
      <Section n="FH" title="Figma Handover — GA4 Connection Flow">
        <ImageSlot
          label="Figma handover — GA4 authenticated state · screen 2 of 8"
          src="/sv-screens/handover-2.png"
          alt="GA4 connection modal — authenticated state, Next button active"
        />
      </Section>

      {/* ── §12B Wireframe & Figma Handover ─────────────────────────────── */}
      <Section n="12B" title="Wireframe &amp; Figma Handover">
        <Callout type="blue" label="Where this connects">
          The two connection flows redesigned in §07 — the GSC Add Website flow and the GA4
          integration — are the exact flows documented in these 8 handover screens. This is
          what &ldquo;value before commitment&rdquo; looks like when it gets handed to engineering:
          every modal state, every disabled vs active CTA, every OAuth step specced before
          a single line of production code was written.
        </Callout>
        <Para>
          As SearchVector migrated to an AI-assisted development stack, the UX workflow
          shifted to match. Wireframes were built live in{" "}
          <Highlight>Claude Code + VS Code</Highlight> and pushed to GitHub for the
          team to review in the browser — no waiting on static Figma shares. Once the
          layout was validated, full Figma handover specs were produced for engineering.
        </Para>

        <Callout type="blue" label="The new workflow">
          Prompt → live wireframe in VS Code → push to GitHub → team reviews in browser
          → iterate → Figma handover → ClickUp ticket. Every connection flow went through
          this loop before a single line of production code was written.
        </Callout>

        <ImageSlot
          label="AI-built live wireframe — My Projects dashboard · Claude Code + VS Code → pushed to GitHub for review"
          src="/sv-screens/ai-wireframe.png"
          alt="SearchVector My Projects dashboard built live with Claude Code in VS Code — shows Domain Rating, Backlinks, Organic Traffic, GSC Insights metrics with demo.searchvector.io project"
        />

        <Para>
          Once the wireframe was approved, two multi-step connection flows were specced
          in Figma and handed off — the{" "}
          <Highlight>GA4 integration flow</Highlight> (Connect Google Analytics → select
          property → complete setup) and the{" "}
          <Highlight>GSC Add Website flow</Highlight> (Connect Search Console → OAuth →
          select domains → setup dashboard). 8 screens total covering every state.
        </Para>

        <HandoverSlider
          label="Figma handover — 8 screens · GA4 + GSC connection flows"
          screens={[
            { src: "/sv-screens/handover-1.png", label: "GA4 — Step 1: Connect Google Analytics (empty state)", alt: "GA4 connection modal — Step 1 Connect Google Analytics, Continue with Google CTA" },
            { src: "/sv-screens/handover-2.png", label: "GA4 — Step 1: Successfully authenticated", alt: "GA4 connection modal — authenticated state, Next button active" },
            { src: "/sv-screens/handover-3.png", label: "GA4 — Step 2: Select GA4 property (empty dropdown)", alt: "GA4 connection modal — Step 2 Select Property dropdown, Complete GA4 Integration disabled" },
            { src: "/sv-screens/handover-4.png", label: "GA4 — Step 2: Property selected (sc-domain:multivariate.tech)", alt: "GA4 connection modal — sc-domain:multivariate.tech selected, Complete GA4 Integration active" },
            { src: "/sv-screens/handover-5.png", label: "GSC — Step 1: Add website · Connect Search Console", alt: "GSC Add website modal — Step 1 Connect Search Console, Continue with Google CTA" },
            { src: "/sv-screens/handover-6.png", label: "GSC — Step 1: Successfully authenticated", alt: "GSC modal — authenticated with Google Search Console, Next button active" },
            { src: "/sv-screens/handover-7.png", label: "GSC — Step 2: Select websites (domains checked)", alt: "GSC modal — Select websites to sync, multivariate.tech and nextgrowthlabs.com checked" },
            { src: "/sv-screens/handover-8.png", label: "GSC — Step 2: Select websites (all unchecked, Setup disabled)", alt: "GSC modal — all domains unchecked, Setup dashboard button disabled" },
          ]}
        />
      </Section>

      {/* ── §02 Competitive Research ─────────────────────────────────────── */}
      <Section n="02" title="Competitive Research — SearchVector vs Ahrefs">
        <Para>
          Before redesigning anything, I ran a structured side-by-side audit of SearchVector
          against Ahrefs across every core SEO workflow. The goal was not to copy Ahrefs — it
          was to find where SearchVector already had an advantage and where it had parity gaps.
        </Para>

        <DecisionList
          items={[
            {
              title: "Keyword Research — SearchVector wins on breadth",
              body: "Ahrefs uses a single-source model (Google). SearchVector ships multi-source tabs: Google, LLM, YouTube, Amazon, Google Play, App Store. For content teams working across platforms, this is a genuine differentiator. The UX needed to surface this — not bury it in a tab row that looked like an afterthought.",
            },
            {
              title: "Backlink Analysis — parity gap",
              body: "Ahrefs' Domain Rating (DR) model is the industry benchmark. SearchVector's backlink data was present but not framed against a comparable authority score. Filed as a product gap — UX can't solve a data problem, but it can surface the gap clearly to the product team.",
            },
            {
              title: "Rank Tracking — different model, different value",
              body: "Ahrefs uses crawl-based snapshot ranking. SearchVector uses live SERP rank at query time. This is not worse — it's different. Users who need real-time rank verification (not historical tracking) prefer the live model. The UX problem: this distinction was not explained anywhere in the product. Users were comparing like-for-like with Ahrefs and not seeing the unique value.",
            },
            {
              title: "Google Ads Integration — SearchVector wins, Ahrefs doesn't have it",
              body: "Ahrefs offers zero paid campaign intelligence. SearchVector ships Campaign Overview, Search Ads Insights, and Multi Keyword Gap Analysis — giving SEO and SEM teams a unified platform. This is the single largest differentiator. It was buried in the sidebar under 'Google Ads' with no callout in onboarding.",
            },
            {
              title: "Console connection — the biggest UX gap",
              body: "Both Ahrefs and Semrush surface value before asking for OAuth connection. SearchVector's GSC connection flow asked users to choose a project type before showing what GSC would unlock — users defaulted to the SERP option (no OAuth needed) and never returned to connect. The redesign of this flow became the most impactful single UX change in the project.",
            },
          ]}
        />

        {/* ── Feature Priority Matrix ── */}
        <div className="mt-6 overflow-x-auto rounded-2xl" style={{ border: "1px solid #1e1e1e", background: "#0a0a0a" }}>
          <div className="px-4 py-3 flex items-baseline justify-between flex-wrap gap-2" style={{ borderBottom: "1px solid #1e1e1e" }}>
            <div>
              <p className="text-[10px] font-mono text-[#9ca3af] tracking-widest uppercase">Feature Priority Matrix — 25 Functional Groups Scored</p>
              <p className="text-xs text-[#e5e7eb] mt-0.5">Traffic × Finance potential · Ahrefs · SEMrush · SE Ranking · Writesonic</p>
            </div>
            <span className="text-[10px] font-mono text-[#4b5563]">Top 14 shown · sorted by score</span>
          </div>
          <table className="w-full text-xs border-collapse" style={{ minWidth: "640px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                <th className="text-center py-2.5 px-3 font-mono text-[#9ca3af] tracking-widest uppercase text-[10px]" style={{ width: "56px" }}>Score</th>
                <th className="text-left py-2.5 px-4 font-mono text-[#9ca3af] tracking-widest uppercase text-[10px]">Functional Group</th>
                <th className="text-left py-2.5 px-3 font-mono text-[#9ca3af] tracking-widest uppercase text-[10px]" style={{ width: "200px" }}>Competitors</th>
                <th className="text-center py-2.5 px-3 font-mono text-[#9ca3af] tracking-widest uppercase text-[10px]" style={{ width: "110px" }}>SV Status</th>
              </tr>
            </thead>
            <tbody>
              {([
                { score: 10, group: "Keyword Research & Discovery",          comps: "Ahrefs · SEMrush · SE Ranking",   status: "possible" },
                { score: 10, group: "Traffic Analytics & Audience Insights", comps: "SEMrush · SE Ranking",            status: "partial" },
                { score: 10, group: "Backlink Analysis & Link Building",     comps: "Ahrefs · SEMrush · SE Ranking",   status: "difficult" },
                { score: 10, group: "AI Search & ChatGPT Tracking",         comps: "SE Ranking · SEMrush",            status: "possible" },
                { score: 10, group: "AI Content Creation & Writing",        comps: "SEMrush · Writesonic",            status: "possible" },
                { score: 9,  group: "Competitive Intelligence & Domain",    comps: "Ahrefs · SEMrush · SE Ranking",   status: "partial" },
                { score: 9,  group: "Gap Analysis (Content / KW / Links)",  comps: "Ahrefs · SEMrush · Writesonic",   status: "consider" },
                { score: 9,  group: "PPC & Paid Advertising Research",      comps: "Ahrefs · SEMrush · SE Ranking",   status: "consider" },
                { score: 8,  group: "Rank Tracking & Position Monitoring",  comps: "SEMrush · SE Ranking",            status: "ready" },
                { score: 8,  group: "Site Audit & Technical SEO",           comps: "SEMrush · SE Ranking · Writesonic", status: "planned" },
                { score: 8,  group: "Content Optimization & SEO Writing",   comps: "SEMrush · SE Ranking · Writesonic", status: "consider" },
                { score: 8,  group: "Reporting & Analytics (GSC)",          comps: "SE Ranking · Writesonic",         status: "in-review" },
                { score: 8,  group: "Keyword Organization & Management",    comps: "SE Ranking",                      status: "planned" },
                { score: 8,  group: "Content Performance Analysis",         comps: "Ahrefs · SEMrush",                status: "consider" },
              ] as const).map((row, ri) => {
                const scoreColor = row.score === 10 ? "#4ade80" : row.score === 9 ? "#facc15" : "#93c5fd";
                const sv: Record<string, { label: string; color: string; bg: string }> = {
                  ready:     { label: "Ready ●",    color: "#4ade80", bg: "rgba(74,222,128,0.08)" },
                  partial:   { label: "Partial ◐",  color: "#facc15", bg: "rgba(250,204,21,0.08)" },
                  possible:  { label: "Possible",   color: "#60a5fa", bg: "rgba(96,165,250,0.08)" },
                  planned:   { label: "Planned",    color: "#a78bfa", bg: "rgba(167,139,250,0.08)" },
                  consider:  { label: "Consider",   color: "#f97316", bg: "rgba(249,115,22,0.08)" },
                  "in-review": { label: "In Review", color: "#e879f9", bg: "rgba(232,121,249,0.08)" },
                  difficult: { label: "Not P1",     color: "#374151", bg: "transparent" },
                };
                const { label, color, bg } = sv[row.status];
                return (
                  <tr key={row.group} style={{ borderBottom: "1px solid #111", background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block text-sm font-bold tabular-nums" style={{ color: scoreColor }}>{row.score}</span>
                      <div className="mt-0.5 mx-auto h-0.5 rounded-full" style={{ width: `${row.score * 10}%`, background: scoreColor, opacity: 0.4 }} />
                    </td>
                    <td className="py-2.5 px-4 text-[#e5e7eb] font-medium text-xs">{row.group}</td>
                    <td className="py-2.5 px-3 text-[#6b7280] text-[11px] leading-snug">{row.comps}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-mono font-medium" style={{ color, background: bg }}>{label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-4 py-3 flex gap-5 flex-wrap items-center" style={{ borderTop: "1px solid #1e1e1e" }}>
            {[
              { color: "#4ade80", label: "Ready" },
              { color: "#facc15", label: "Partial" },
              { color: "#60a5fa", label: "Possible — roadmap" },
              { color: "#a78bfa", label: "Planned" },
              { color: "#f97316", label: "Consider — CEO input needed" },
              { color: "#e879f9", label: "In Review" },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[10px] font-mono text-[#6b7280]">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                {label}
              </span>
            ))}
            <span className="ml-auto text-[10px] font-mono text-[#4b5563]">25 groups · scored by traffic × finance potential</span>
          </div>
        </div>

        <DocLink href="/docs/ahrefs-vs-searchvector.pdf" label="Ahrefs vs SearchVector — structured feature comparison (HTML deliverable for product + sales teams)" />
      </Section>

      {/* ── §09 Migration Evidence — Before & After ─────────────────────── */}
      <Section n="09" title="Migration Evidence — Before &amp; After">
        <Para>
          The migration was not just a visual refresh — it was a complete restructure of how the
          product communicates its value. The before/after shows the shift from a flat, generic
          dashboard to a data-dense, state-aware product.
        </Para>

        <ImageRow
          slots={[
            {
              label: "Old dashboard — flat sidebar, blurred GSC, minimal project cards",
              src: "/sv-screens/dashboard-old.png",
              alt: "Old SearchVector My Projects dashboard — flat sidebar categories, basic SEO Score/Backlinks/Traffic/Keywords cards, orange accent on white",
            },
            {
              label: "New dashboard — collapsible sidebar, live GSC metrics, delta indicators",
              src: "/searchvector-dashboard.png",
              alt: "New SearchVector My Projects dashboard — collapsible category sidebar, dark topbar, live GSC data with period-over-period change",
            },
          ]}
        />

        <Callout type="blue" label="What changed and why">
          Collapsible sidebar solves cognitive overload from a flat 12-item list.
          Real delta metrics (+12.5%, +6.7%) frame data as actionable.
          Demo project resolves the cold-start problem — users see a populated dashboard instantly.
          Dark header matches AppVector&rsquo;s design language — product family consistency.
        </Callout>

        <ImageRow
          slots={[
            {
              label: "New keyword research — bulk mode, multi-source, filter system",
              src: "/sv-screens/kw-new.png",
              alt: "New SearchVector Keyword Research with Single Keyword + Bulk Research tabs, Google/LLM/YouTube/Amazon/Play/App Store sources, filter system with Match Type/Volume/Competition",
            },
            {
              label: "Session bug — false project limit banner",
              src: "/sv-screens/session-bug.png",
              alt: "SearchVector dashboard showing 'Project limit reached' warning banner while user already has projects visible below — false urgency trigger",
            },
          ]}
        />

        <Callout type="amber" label="Session bug — recommendation filed">
          The &ldquo;Project limit reached&rdquo; banner appeared on every dashboard load regardless of actual
          quota state. Recommendation: suppress on page load, show only on &ldquo;Add Website&rdquo; action.
          Reframe from &ldquo;limit reached&rdquo; to &ldquo;You&rsquo;re on [plan] — manage or upgrade for more.&rdquo;
        </Callout>
      </Section>

      {/* ── §03 What Broke and Why ──────────────────────────────────────── */}
      <Section n="03" title="What Broke — and Why">
        <Para>
          SearchVector was already a live, released product. I had been doing iterative
          UX improvements on the existing platform — fixing flows, improving tool layouts,
          running session diagnostics — when the company made a strategic decision to migrate
          the entire codebase to a new AI-assisted stack using Claude Code. The goal was faster
          development velocity and full cloud architecture.
        </Para>
        <Para>
          The technical migration was completed by the AI tooling. But{" "}
          <Highlight>the logic transferred — the UX didn&rsquo;t.</Highlight>{" "}
          Component states got collapsed. Edge cases disappeared. Interactions
          that relied on specific sequencing broke silently. The product
          looked functional on the surface, but users couldn&rsquo;t complete basic flows.
          Every tool in the product needed a UX audit and rebuild simultaneously.
        </Para>
        <TableBlock
          headers={["Area", "What broke"]}
          rows={[
            ["Dashboard", "No state differentiation — demo, added, and connected looked identical"],
            ["Onboarding", "No guidance for new users — blank state with no next step"],
            ["GSC Integration", "Connect flow had no progressive disclosure — users had no idea what state they were in"],
            ["Google Ads", "Table layout broke — filter, search, and export had no visual hierarchy"],
            ["Rank Tracker", "Auto-setup defaults missing — users had to manually configure everything"],
            ["Sidebar", "Navigation hierarchy was flat — no grouping, no active states"],
            ["Demo Mode", "No clear demo/live distinction — users didn't know if data was real"],
            ["Profile", "Settings scattered across tabs — integration and limits not visible on first view"],
          ]}
        />
        <Callout type="amber">
          The company culture is speed-first — ship fast, fix later. UX had always been an afterthought. The migration made this visible across the entire product at once.
        </Callout>
      </Section>

      {/* ── §04 Diagnosis ───────────────────────────────────────────────── */}
      <Section n="04" title="Diagnosis — How I Found Every Break">
        <Para>
          Before redesigning anything, I needed a complete picture of where
          and why the UX had failed. I used three sources in parallel.
        </Para>
        <DecisionList
          items={[
            {
              title: "Session DB queries — user behaviour at the data level",
              body: "Ran SQL queries directly on the company account database to extract page visits, session duration, click rates, user entry points, and email IDs of churned users. This gave a ground-truth view of where users were going and where they stopped.",
            },
            {
              title: "PostHog + OpenReplay — session-level UX diagnosis",
              body: "Used PostHog for funnel data and event tracking. Used OpenReplay for session recordings — watching real user sessions to identify entry points, roaming behaviour, exit points, and drop-off patterns. Every tool in the product was reviewed through recordings.",
            },
            {
              title: "Manual flow audit — state-by-state walkthrough",
              body: "Walked through every tool manually, documenting every broken state: missing empty states, unclear CTAs, missing feedback on actions, inconsistent component behaviour across tools.",
            },
          ]}
        />
        <Callout type="blue">
          The combination gave actual cause, not just symptoms — which screen broke the flow and what in the product structure caused it.
        </Callout>
      </Section>

      {/* ── §05 Design System ───────────────────────────────────────────── */}
      <Section n="05" title="Design System — Built from Scratch">
        <Para>
          The migration had produced an inconsistent visual system —
          components from the old codebase mixed with auto-generated patterns
          from Claude Code. The first step was establishing a unified foundation.
        </Para>
        <DecisionList
          items={[
            {
              title: "Material-3 token mapping",
              body: "Mapped the existing brand palette (primary orange #FF5722, premium neutral scale) to Material Design 3 role tokens — primary, secondary, surface, error, outline. Light and dark scheme both defined.",
            },
            {
              title: "Typography + spacing system",
              body: "Inter font family across all weights. 4px base grid for all spacing. Type scale from display (57px) down to caption (12px). Line heights and letter spacing defined per role.",
            },
            {
              title: "Component elevation system",
              body: "5-level shadow scale (elevation-0 to elevation-5). Brand glow reserved for hero CTAs only. Dark mode shadow adjustments defined separately.",
            },
            {
              title: "Premium SaaS design guidelines for the dev team",
              body: "Documented a full design guide for engineering — spacing rules, button hierarchy, card patterns, interaction timing, focus states, and what to avoid. This became the foundation for the UX SOP.",
            },
          ]}
        />
      </Section>

      {/* ── §08 8 Tools Redesigned ──────────────────────────────────────── */}
      <Section n="08" title="8 Tools Redesigned">
        <TableBlock
          headers={["Tool", "Key UX fix"]}
          rows={[
            ["Keyword Research", "Search + filter + export hierarchy restored. Light grey background on search above table. Suggestion selection added to header."],
            ["Live SERP Rank Tracker", "Auto-setup defaults added (competitor, keyword, US, English, Desktop). Export moved to top. Last scroll issue fixed."],
            ["GSC Insights Overview", "Demo banner added with 'Connect GSC' button. Search field with grey background above table. Action column removed — campaign name made clickable with hover underline."],
            ["GSC Index Status Checker", "Tooltip for tick/X indicators. Filter border reduced. Select all checkbox added with count display. Export moved to secondary button position."],
            ["Google Ads Campaign", "Demo entry screen removed — direct to demo data. Border container around search/export removed. Filter border weight increased for visual strength. Pagination border removed."],
            ["Apple Search Ads", "Consistent table layout with Google Ads. Demo banner maintained."],
            ["Sitemap Analyzer", "Export CSV moved to secondary button. Demo banner consistent with other tools."],
            ["Title Optimizer", "Manage (select all) disabled in demo with tooltip. Performance report insight numbers darkened. Export disabled in demo mode consistently."],
          ]}
        />
        <Callout type="blue">
          Every fix followed the same pattern: session data or recording identified the break → root cause documented → Figma redesign → SVG wireframe → HTML prototype → dev handoff via ClickUp ticket.
        </Callout>
      </Section>

      {/* ── §10 Live Product — Current Screens ──────────────────────────── */}
      <Section n="10" title="Live Product — Current Screens">
        <Para>
          These are the 4 core screens in the live SearchVector product today — each showing
          the new design system, the Google Ads integration (SearchVector&rsquo;s primary
          differentiator vs Ahrefs), and the GSC connected state.
        </Para>

        <ImageRow
          slots={[
            {
              label: "Google Ads — Campaign Overview (demo data)",
              src: "/sv-screens/live-campaign.png",
              alt: "SearchVector Campaign Overview showing 66.45K total spend, 55.23K clicks, 2112 conversions, 1.20 avg CPC across 12 campaigns",
            },
            {
              label: "Google Search Ads Insights — keyword-level breakdown",
              src: "/sv-screens/live-ads.png",
              alt: "SearchVector Google Search Ads Insights showing Profitable Keywords tab with keyword-level CLK/IMP/CTR/CPC/Cost data",
            },
          ]}
        />

        <ImageRow
          slots={[
            {
              label: "Multi Keyword Gap Analysis — competitor intelligence",
              src: "/sv-screens/live-gap.png",
              alt: "SearchVector Multi Keyword Gap Analysis showing your domain vs competitor domain with shared/exclusive keyword breakdown",
            },
            {
              label: "GSC Insights — connected state (1.23M clicks)",
              src: "/sv-screens/live-gsc.png",
              alt: "SearchVector GSC Insights showing 1.23M total clicks, 45.20M impressions, 2.73% CTR, 12.40 avg position for demo.searchvector.io",
            },
          ]}
        />

        <Callout type="green" label="Google Ads integration = the differentiator">
          Ahrefs does not offer paid campaign intelligence. SearchVector ships Campaign Overview,
          Search Ads Insights, and Multi Keyword Gap Analysis — giving SEO and SEM teams
          a unified platform. This is the single largest competitive advantage, and it is
          now surfaced clearly in the navigation and onboarding flow.
        </Callout>
      </Section>

      {/* ── §11 Supporting UX ───────────────────────────────────────────── */}
      <Section n="11" title="Supporting UX — Sidebar, Profile, Pricing, Alerts">
        <DecisionList
          items={[
            {
              title: "Sidebar redesign",
              body: "Rebuilt navigation hierarchy with proper grouping and active states. Google My Business moved to the bottom. Country selection moved next to project selector.",
            },
            {
              title: "Profile page",
              body: "Removed tab-based layout for integration and credit/limit sections. Credit, project count, API call count, and integration info placed next to profile name — visible on first fold. Project settings: 'Edit' renamed to 'Manage'. Archive project text set to red. Integration section moved to right side of project settings.",
            },
            {
              title: "Pricing + alerts",
              body: "Upgrade CTA set as primary button, Pricing as secondary on all alert popups. Alert text shortened and colour-coded. Three pricing tiers defined: growing businesses, mid-sized, large.",
            },
            {
              title: "Demo mode restrictions",
              body: "All export buttons disabled in demo mode. Analyse and submit buttons disabled with tooltip 'Add your project to use this'. Input fields disabled in demo mode across all tools.",
            },
          ]}
        />
      </Section>

      {/* ── §12 Landing Pages ───────────────────────────────────────────── */}
      <Section n="12" title="Landing Pages — Tool-Specific Pages">
        <Para>
          Alongside the dashboard rebuild, I designed a landing page system
          for SearchVector&rsquo;s individual tools — Keyword Research, ASO,
          Rank Tracker — using a shared layout that adapts per tool.
        </Para>
        <Para>
          Process: competitor landing page analysis → fold-by-fold component
          selection → low-fidelity SVG wireframe → HTML prototype → design
          system application → dev handoff.
        </Para>
        <Para>
          The shared layout approach meant each tool page only needed the
          hero input field and screenshots to change — the value proposition
          structure, social proof placement, and CTA hierarchy remained consistent.
        </Para>
      </Section>

      {/* ── §13 The UX SOP ──────────────────────────────────────────────── */}
      <Section n="13" title="The UX SOP — Built for a Speed-First Team">
        <Para>
          Fixing the product once wasn&rsquo;t enough. The company ships fast —
          new features go out without UX review. Without a system, the same
          breaks would reappear on every new feature.
        </Para>
        <Para>
          I wrote a <Highlight>UX diagnostic SOP</Highlight> — a step-by-step
          process the development team now follows when building or updating
          any feature.
        </Para>

        <DecisionList
          items={[
            {
              title: "Phase 1 — Research & Audit",
              body: "• Audit dashboard against Ahrefs/Semrush UX patterns\n• Build structured competitor comparison (HTML deliverable for product + sales)\n• Identify product differentiators vs competitors\n• Map the funnel: Add Website → Visit GSC page → Connect Console → See real data",
            },
            {
              title: "Phase 2 — Console Connection Redesign",
              body: "• Document old flow — identify choice-before-value problem\n• Design new GSC Insights page: hero benefits, 4 feature bullets, OAuth CTA, demo fallback\n• Add SEO-intentional internal links within benefit descriptions for link equity\n• Cross-link from related feature pages to the connection page",
            },
            {
              title: "Phase 3 — Dashboard Rebuild",
              body: "• Redesign project cards with live GSC metrics and period-over-period delta\n• Restructure sidebar from flat list to collapsible category groups\n• Add dark header for visual consistency across the platform\n• Add pre-populated demo project for cold-start resolution\n• Verify demo data mode labelling is consistent across all inner pages",
            },
            {
              title: "Phase 4 — Keyword Research Rebuild",
              body: "• Add Bulk Research tab alongside Single Keyword\n• Build filter system: Match Type, Volume, Competition, Word Count, + Add Filter\n• Add Select All Visible + Export for power users\n• Make difficulty score load on-demand to avoid blocking page render\n• Validate all 6 source tabs: Google, LLM, YouTube, Amazon, Google Play, App Store",
            },
            {
              title: "Phase 5 — QA & Bug Identification",
              body: "• Identify session state bug: limit banner firing on every dashboard load regardless of quota — documented with screenshot, filed fix\n• Verify all demo data labels present on inner feature pages\n• Confirm GSC connected state shows full data across all tools\n• Run OpenReplay session check on rebuilt flows",
            },
            {
              title: "Phase 6 — Documentation & Handoff",
              body: "• Produce Ahrefs vs SearchVector comparison HTML for sales and product team\n• Document cross-feature navigation map as a product spec\n• Every fix has a written brief before becoming a ClickUp ticket — no verbal-only handoffs",
            },
          ]}
        />

        <Callout type="green" label="Adopted by the dev team">
          The SOP is now the standard process at Multivariate.ai for new feature UX. Developer and designer use the same diagnostic checklist before shipping anything user-facing.
        </Callout>
      </Section>

      {/* ── §14 Outcome ─────────────────────────────────────────────────── */}
      <Section n="14" title="Outcome" accent="green">
        <OutcomeGrid
          items={[
            { n: "2.5×",  label: "GSC impression growth in week 1 post-launch" },
            { n: "10k+",  label: "Impressions crossed after launch" },
            { n: "8+",    label: "Tools redesigned end-to-end" },
            { n: "1 SOP", label: "UX framework now followed by dev team" },
          ]}
        />
        <Callout type="green" label="Source — Deepak Shah, May 28">
          &ldquo;2.5x growth in SV impressions in a week, will cross 10k today.&rdquo;
        </Callout>
        <Para>
          The GSC Insights page and Campaign Overview you saw at the top of this case study —
          those are the two features that drove this growth. The GSC connection redesign in §07
          turned a buried modal into a destination page that shows users exactly what
          they&rsquo;re unlocking before asking for OAuth. The Google Ads module moved from
          a sidebar item to SearchVector&rsquo;s lead differentiator — the one thing Ahrefs
          doesn&rsquo;t have. The dashboard 3-state system in §06 means users who land
          without connecting anything still see a populated, functional product.
        </Para>
        <Para>
          The impression growth reflects the landing page redesign (SEO-structured pages
          replacing broken layouts) and the onboarding fix (users reaching the product and
          not immediately dropping off). The SOP means the next feature ships with UX
          quality built in, not fixed after the fact.
        </Para>
        <Callout type="blue" label="The full arc">
          SearchVector went from a post-migration UX breakdown across 8 tools — blank states,
          broken flows, no state differentiation — to a coherent, data-dense product with
          measurable growth and a repeatable design process. Dashboard rebuilt (§06),
          GSC connection redesigned (§07), 8 tools audited (§08), SOP adopted (§13).
          Every fix diagnosed from session data, not assumption.
        </Callout>
      </Section>

    </CaseStudyPage>
  );
}
