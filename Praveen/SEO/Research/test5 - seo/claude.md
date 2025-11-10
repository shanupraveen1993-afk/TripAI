/* ============================================================
   COMPLETE DESIGN SYSTEM - Ready for Automated Wireframe Generation
   Brand: #FF5722 • Font: Inter • Icons: Material Symbols

   This is the FINAL, PRODUCTION-READY design system.
   Use this single file to generate all 20+ wireframes without errors.
   ============================================================ */

/* ---------- TOKENS ---------- */
:root{
  /* Brand */
  --brand-50:#FFF3E0;--brand-100:#FFE0B2;--brand-200:#FFCC80;--brand-300:#FFB74D;
  --brand-400:#FFA726;--brand-500:#FF5722;--brand-600:#F4511E;--brand-700:#E64A19;
  --brand-800:#D84315;--brand-900:#BF360C;

  /* Neutrals */
  --neutral-25:#FCFCFD;--neutral-50:#F9FAFB;--neutral-100:#F3F4F6;--neutral-200:#E5E7EB;
  --neutral-300:#D1D5DB;--neutral-400:#9CA3AF;--neutral-500:#6B7280;--neutral-600:#4B5563;
  --neutral-700:#374151;--neutral-800:#1F2937;--neutral-850:#171E2C;--neutral-900:#111827;--neutral-950:#0A0E16;

  /* M3 role mapping (LIGHT) */
  --md-sys-color-primary:var(--brand-500);
  --md-sys-color-on-primary:#FFFFFF;
  --md-sys-color-primary-container:var(--brand-50);
  --md-sys-color-on-primary-container:#4F1C0F;

  --md-sys-color-secondary:var(--neutral-700);
  --md-sys-color-on-secondary:#FFFFFF;
  --md-sys-color-secondary-container:var(--neutral-100);
  --md-sys-color-on-secondary-container:var(--neutral-800);

  --md-sys-color-tertiary:var(--brand-700);
  --md-sys-color-on-tertiary:#FFFFFF;
  --md-sys-color-tertiary-container:var(--brand-100);
  --md-sys-color-on-tertiary-container:#4F1C0F;

  --md-sys-color-error:#DC2626;
  --md-sys-color-on-error:#FFFFFF;
  --md-sys-color-error-container:#FEE2E2;
  --md-sys-color-on-error-container:#7F1D1D;

  --md-sys-color-background:#FFFFFF;
  --md-sys-color-on-background:var(--neutral-900);
  --md-sys-color-surface:#FFFFFF;
  --md-sys-color-on-surface:var(--neutral-900);
  --md-sys-color-surface-variant:var(--neutral-50);
  --md-sys-color-on-surface-variant:var(--neutral-600);
  --md-sys-color-outline:var(--neutral-200);
  --md-sys-color-outline-variant:var(--neutral-300);
  --md-sys-color-inverse-surface:var(--neutral-900);
  --md-sys-color-inverse-on-surface:#F4F6F8;
  --md-sys-color-inverse-primary:var(--brand-300);
  --md-sys-color-scrim:rgba(0,0,0,.55);

  /* Typography */
  --md-font:"Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  --md-type-display-lg:57px/64px 600;
  --md-type-display-sm:36px/44px 600;
  --md-type-headline-lg:32px/40px 600;
  --md-type-title-lg:22px/28px 600;
  --md-type-label-lg:14px/20px 600;
  --md-type-body-lg:16px/24px 400;
  --md-type-body-sm:14px/20px 400;

  /* Shape */
  --md-sys-shape-corner-xs:4px;--md-sys-shape-corner-sm:6px;--md-sys-shape-corner-md:8px;
  --md-sys-shape-corner-lg:12px;--md-sys-shape-corner-xl:16px;--md-sys-shape-corner-2xl:20px;
  --md-sys-shape-corner-3xl:24px;--md-sys-shape-corner-full:9999px;

  /* Elevation */
  --md-sys-elevation-0:none;
  --md-sys-elevation-1:0 1px 3px 0 rgb(0 0 0/.10),0 1px 2px -1px rgb(0 0 0/.10);
  --md-sys-elevation-2:0 4px 6px -1px rgb(0 0 0/.10),0 2px 4px -2px rgb(0 0 0/.10);
  --md-sys-elevation-3:0 10px 15px -3px rgb(0 0 0/.10),0 4px 6px -4px rgb(0 0 0/.10);
  --md-sys-elevation-4:0 20px 25px -5px rgb(0 0 0/.10),0 8px 10px -6px rgb(0 0 0/.10);
  --md-sys-elevation-5:0 25px 50px -12px rgb(0 0 0/.25);

  /* Specials */
  --shadow-brand-glow:0 0 0 1px rgb(255 87 34/.10),0 8px 16px -4px rgb(255 87 34/.30);
  --md-sys-motion-duration-short:150ms;
  --md-sys-motion-duration-medium:250ms;
  --md-sys-motion-duration-long:300ms;
  --md-sys-motion-ease-standard:cubic-bezier(.4,0,.2,1);

  /* Spacing (4pt) */
  --space-0:0px;--space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;
  --space-5:20px;--space-6:24px;--space-7:28px;--space-8:32px;--space-9:40px;--space-10:48px;

  /* Focus */
  --md-sys-focus-ring:0 0 0 3px rgb(255 87 34/.50);
}

@media(prefers-color-scheme:dark){
  :root{
    --md-sys-color-background:var(--neutral-950);
    --md-sys-color-on-background:var(--neutral-50);
    --md-sys-color-surface:var(--neutral-900);
    --md-sys-color-on-surface:var(--neutral-50);
    --md-sys-color-surface-variant:var(--neutral-850);
    --md-sys-color-on-surface-variant:var(--neutral-400);
    --md-sys-color-outline:var(--neutral-800);
    --md-sys-color-outline-variant:var(--neutral-700);

    --md-sys-color-primary:var(--brand-400);
    --md-sys-color-on-primary:#2B0B03;
    --md-sys-color-primary-container:var(--brand-900);
    --md-sys-color-on-primary-container:#FFEADF;

    --md-sys-color-secondary:var(--neutral-400);
    --md-sys-color-on-secondary:var(--neutral-950);
    --md-sys-color-secondary-container:var(--neutral-800);
    --md-sys-color-on-secondary-container:var(--neutral-100);

    --md-sys-color-tertiary:var(--brand-300);
    --md-sys-color-on-tertiary:#2B0B03;
    --md-sys-color-tertiary-container:var(--brand-800);
    --md-sys-color-on-tertiary-container:#FFEADF;
  }
}

/* ---------- BASE ---------- */
*{box-sizing:border-box}
html,body{height:100%}
html{font-family:var(--md-font);font-size:16px}
body{margin:0;background:var(--md-sys-color-background);color:var(--md-sys-color-on-background)}
h1{font:var(--md-type-headline-lg);margin:0 0 var(--space-6)}
h2{font:var(--md-type-headline-lg);margin:0 0 var(--space-5)}
h3{font:var(--md-type-title-lg);margin:0 0 var(--space-4)}
p,li{font:var(--md-type-body-lg)}
a{color:var(--md-sys-color-primary);text-decoration:none}
a:hover{text-decoration:underline}
:focus-visible{outline:0;box-shadow:var(--md-sys-focus-ring);border-radius:6px}

/* ---------- LAYOUT UTILITIES ---------- */
.container{width:min(1200px,100%);margin-inline:auto}
@media(max-width:599px){.container{padding-inline:16px}}
@media(min-width:600px) and (max-width:1023px){.container{padding-inline:24px}}
@media(min-width:1024px){.container{padding-inline:32px}}
.section{padding-block:56px}
.hero{padding-block:56px}
.surface{background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface)}
.surface-variant{background:var(--md-sys-color-surface-variant);color:var(--md-sys-color-on-surface-variant)}
.elev-0{box-shadow:var(--md-sys-elevation-0)}.elev-1{box-shadow:var(--md-sys-elevation-1)}
.elev-2{box-shadow:var(--md-sys-elevation-2)}.elev-3{box-shadow:var(--md-sys-elevation-3)}
.elev-4{box-shadow:var(--md-sys-elevation-4)}.elev-5{box-shadow:var(--md-sys-elevation-5)}
.visually-hidden{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(1px,1px,1px,1px)}

/* Grid System */
.grid { display: grid; gap: var(--space-4); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }
.grid-auto { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}

/* Grid Gaps */
.gap-0 { gap: 0; }
.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-3 { gap: var(--space-3); }
.gap-4 { gap: var(--space-4); }
.gap-5 { gap: var(--space-5); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }

/* Flex Utilities */
.flex { display: flex; gap: var(--space-4); }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.flex-between { justify-content: space-between; }
.flex-center { justify-content: center; align-items: center; }
.flex-start { justify-content: flex-start; align-items: flex-start; }
.flex-end { justify-content: flex-end; align-items: flex-end; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.flex-1 { flex: 1; }

/* Spacing (Margin) */
.m-0 { margin: 0; }
.mt-1 { margin-top: var(--space-1); }
.mt-2 { margin-top: var(--space-2); }
.mt-3 { margin-top: var(--space-3); }
.mt-4 { margin-top: var(--space-4); }
.mt-5 { margin-top: var(--space-5); }
.mt-6 { margin-top: var(--space-6); }
.mt-8 { margin-top: var(--space-8); }
.mt-10 { margin-top: var(--space-10); }
.mb-1 { margin-bottom: var(--space-1); }
.mb-2 { margin-bottom: var(--space-2); }
.mb-3 { margin-bottom: var(--space-3); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-5 { margin-bottom: var(--space-5); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }
.mb-10 { margin-bottom: var(--space-10); }
.ml-1 { margin-left: var(--space-1); }
.ml-2 { margin-left: var(--space-2); }
.ml-3 { margin-left: var(--space-3); }
.ml-4 { margin-left: var(--space-4); }
.ml-auto { margin-left: auto; }
.mr-1 { margin-right: var(--space-1); }
.mr-2 { margin-right: var(--space-2); }
.mr-3 { margin-right: var(--space-3); }
.mr-4 { margin-right: var(--space-4); }
.mr-auto { margin-right: auto; }
.mx-auto { margin-left: auto; margin-right: auto; }
.my-4 { margin-top: var(--space-4); margin-bottom: var(--space-4); }
.my-6 { margin-top: var(--space-6); margin-bottom: var(--space-6); }
.my-8 { margin-top: var(--space-8); margin-bottom: var(--space-8); }

/* Spacing (Padding) */
.p-0 { padding: 0; }
.p-2 { padding: var(--space-2); }
.p-3 { padding: var(--space-3); }
.p-4 { padding: var(--space-4); }
.p-5 { padding: var(--space-5); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }
.pt-4 { padding-top: var(--space-4); }
.pt-6 { padding-top: var(--space-6); }
.pt-8 { padding-top: var(--space-8); }
.pb-4 { padding-bottom: var(--space-4); }
.pb-6 { padding-bottom: var(--space-6); }
.pb-8 { padding-bottom: var(--space-8); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }
.px-6 { padding-left: var(--space-6); padding-right: var(--space-6); }
.px-8 { padding-left: var(--space-8); padding-right: var(--space-8); }
.py-4 { padding-top: var(--space-4); padding-bottom: var(--space-4); }
.py-6 { padding-top: var(--space-6); padding-bottom: var(--space-6); }
.py-8 { padding-top: var(--space-8); padding-bottom: var(--space-8); }

/* Text & Display */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.hidden { display: none; }

/* Width */
.w-full { width: 100%; }
.w-auto { width: auto; }
.max-w-sm { max-width: 480px; }
.max-w-md { max-width: 640px; }
.max-w-lg { max-width: 800px; }
.max-w-xl { max-width: 1024px; }

/* Responsive Visibility */
@media (max-width: 768px) {
  .hide-mobile { display: none !important; }
}
@media (min-width: 769px) {
  .hide-desktop { display: none !important; }
  .show-mobile { display: none !important; }
}

/* ---------- APP SHELL & SIDEBAR ---------- */
.app-shell {
  display: grid;
  grid-template-areas: "sidebar header" "sidebar main";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  height: 100vh;
  overflow: hidden;
}
.app-shell__sidebar {
  grid-area: sidebar;
  background: var(--md-sys-color-surface-variant);
  border-right: 1px solid var(--md-sys-color-outline);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.app-shell__header {
  grid-area: header;
  background: var(--md-sys-color-surface);
  border-bottom: 1px solid var(--md-sys-color-outline);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: 0 var(--space-6);
}
.app-shell__main {
  grid-area: main;
  overflow-y: auto;
  background: var(--md-sys-color-background);
  padding: var(--space-6);
}

@media (max-width: 768px) {
  .app-shell {
    grid-template-areas: "header" "main";
    grid-template-columns: 1fr;
    grid-template-rows: 64px 1fr;
  }
  .app-shell__sidebar {
    position: fixed;
    left: -240px;
    top: 0;
    bottom: 0;
    width: 240px;
    z-index: 1000;
    transition: left var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard);
  }
  .app-shell__sidebar[data-open="true"] {
    left: 0;
    box-shadow: var(--md-sys-elevation-5);
  }
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4);
}
.sidebar-nav__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--md-sys-shape-corner-lg);
  color: var(--md-sys-color-on-surface-variant);
  font: var(--md-type-body-lg);
  cursor: pointer;
  transition: background var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard);
}
.sidebar-nav__item:hover {
  background: var(--md-sys-color-surface);
}
.sidebar-nav__item[aria-current="page"] {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  font-weight: 600;
}
.sidebar-nav__icon { width: 24px; height: 24px; flex-shrink: 0; }
.sidebar-nav__label { flex: 1; }
.sidebar-nav__badge {
  font: var(--md-type-label-lg);
  padding: 2px 8px;
  border-radius: 9999px;
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  font-size: 12px;
}
.sidebar-divider { height: 1px; background: var(--md-sys-color-outline); margin: var(--space-4) 0; }
.sidebar-section {
  padding: var(--space-2) var(--space-4);
  color: var(--md-sys-color-on-surface-variant);
  font: var(--md-type-label-lg);
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

/* ---------- NAV ---------- */
.topbar{position:sticky;top:0;height:64px;display:flex;align-items:center;gap:16px;padding:0 16px;background:var(--md-sys-color-surface);z-index:100}

/* ---------- BUTTONS ---------- */
.btn{display:inline-flex;align-items:center;gap:8px;justify-content:center;
  min-height:40px;padding:10px 16px;border-radius:var(--md-sys-shape-corner-lg);
  border:1px solid transparent;cursor:pointer;font:var(--md-type-label-lg);
  transition:transform var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard),
             box-shadow var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard),
             filter var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard)}
.btn-sm{min-height:36px;padding:8px 12px}
.btn-lg{min-height:48px;padding:12px 20px}
.btn:focus-visible{outline:0;box-shadow:var(--md-sys-focus-ring)}
.btn:disabled{opacity:.38;pointer-events:none}
.btn-filled{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);box-shadow:var(--md-sys-elevation-1)}
.btn-filled:hover{filter:brightness(.97)}
.btn-filled.hero{box-shadow:var(--shadow-brand-glow)}
.btn-outlined{background:transparent;color:var(--md-sys-color-primary);border-color:var(--md-sys-color-outline)}
.btn-text{background:transparent;color:var(--md-sys-color-primary)}
.icon-btn{width:40px;height:40px;padding:0;display:inline-grid;place-items:center}

/* ---------- INPUTS & CONTROLS ---------- */
.textfield{display:block}
.textfield label{display:block;color:var(--md-sys-color-on-surface-variant);font:var(--md-type-label-lg);margin-bottom:4px}
.textfield input,.textfield select{
  width:100%;height:56px;padding:0 16px;border-radius:var(--md-sys-shape-corner-lg);
  border:1px solid var(--md-sys-color-outline);background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface)
}
.textfield input::placeholder{color:var(--md-sys-color-on-surface-variant)}
.textfield select{
  appearance:none;
  background-image:linear-gradient(45deg,transparent 50%,var(--md-sys-color-on-surface-variant) 50%),
                   linear-gradient(135deg,var(--md-sys-color-on-surface-variant) 50%,transparent 50%);
  background-position:calc(100% - 18px) 52%, calc(100% - 12px) 52%;
  background-size:6px 6px,6px 6px;background-repeat:no-repeat
}
.textfield input:focus-visible,.textfield select:focus-visible{outline:0;box-shadow:var(--md-sys-focus-ring)}
.helper{margin-top:4px;color:var(--md-sys-color-on-surface-variant);font:var(--md-type-body-sm)}
.error{margin-top:4px;color:var(--md-sys-color-error);font:var(--md-type-body-sm)}
.textfield input[aria-invalid="true"]{border-color:var(--md-sys-color-error)}

.control{display:flex;align-items:center;gap:8px;font:var(--md-type-body-lg);color:var(--md-sys-color-on-surface)}
.control input[type="checkbox"],.control input[type="radio"]{width:18px;height:18px}
.control input:focus-visible{outline:0;box-shadow:var(--md-sys-focus-ring);border-radius:4px}

.switch{position:relative;width:44px;height:24px;background:var(--neutral-200);border-radius:9999px;cursor:pointer;transition:background var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard)}
.switch::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:9999px;background:#fff;transition:left var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard)}
.switch[aria-checked="true"]{background:var(--md-sys-color-primary)}
.switch[aria-checked="true"]::after{left:22px}
.switch:focus-visible{box-shadow:var(--md-sys-focus-ring)}

.chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:9999px;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);border:1px solid var(--md-sys-color-outline);cursor:pointer;font:var(--md-type-label-lg)}
.chip[aria-pressed="true"]{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary)}
.chip .remove{width:18px;height:18px;display:inline-grid;place-items:center;border-radius:9999px}
.chip .remove:focus-visible{box-shadow:var(--md-sys-focus-ring)}

.filterbar{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.filterbar .textfield{min-width:200px}
.filterbar .btn-group{display:flex;gap:8px;flex-wrap:wrap}

/* ---------- BREADCRUMBS ---------- */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font: var(--md-type-body-sm);
  color: var(--md-sys-color-on-surface-variant);
  flex-wrap: wrap;
}
.breadcrumb__item { display: flex; align-items: center; gap: var(--space-2); }
.breadcrumb__link { color: var(--md-sys-color-on-surface-variant); text-decoration: none; }
.breadcrumb__link:hover { color: var(--md-sys-color-primary); text-decoration: underline; }
.breadcrumb__separator { color: var(--md-sys-color-outline); }
.breadcrumb__current { color: var(--md-sys-color-on-surface); font-weight: 600; }

/* ---------- AVATAR ---------- */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  display: grid;
  place-items: center;
  font: var(--md-type-label-lg);
  font-weight: 600;
  flex-shrink: 0;
}
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar--sm { width: 32px; height: 32px; font-size: 12px; }
.avatar--lg { width: 48px; height: 48px; font-size: 18px; }
.avatar--xl { width: 64px; height: 64px; font-size: 24px; }
.avatar-group { display: flex; align-items: center; }
.avatar-group .avatar { margin-left: -8px; border: 2px solid var(--md-sys-color-surface); }
.avatar-group .avatar:first-child { margin-left: 0; }

/* ---------- ALERT / BANNER ---------- */
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--md-sys-shape-corner-lg);
  border-left: 4px solid;
  font: var(--md-type-body-lg);
}
.alert__icon { width: 24px; height: 24px; flex-shrink: 0; }
.alert__content { flex: 1; }
.alert__title { font: var(--md-type-label-lg); margin-bottom: var(--space-1); }
.alert__message { color: inherit; opacity: 0.9; }
.alert__actions { display: flex; gap: var(--space-2); margin-top: var(--space-2); }
.alert--info { background: color-mix(in oklab, var(--brand-500) 8%, var(--md-sys-color-surface)); color: var(--brand-900); border-color: var(--brand-500); }
.alert--success { background: color-mix(in oklab, #10B981 8%, var(--md-sys-color-surface)); color: #064E3B; border-color: #10B981; }
.alert--warning { background: color-mix(in oklab, #F59E0B 8%, var(--md-sys-color-surface)); color: #7C3E00; border-color: #F59E0B; }
.alert--error { background: color-mix(in oklab, var(--md-sys-color-error) 8%, var(--md-sys-color-surface)); color: var(--md-sys-color-on-error-container); border-color: var(--md-sys-color-error); }

/* ---------- EMPTY STATE ---------- */
.empty-state {
  display: grid;
  place-items: center;
  padding: var(--space-10) var(--space-6);
  text-align: center;
  color: var(--md-sys-color-on-surface-variant);
}
.empty-state__icon { width: 120px; height: 120px; margin-bottom: var(--space-6); opacity: 0.4; }
.empty-state__title { font: var(--md-type-headline-lg); color: var(--md-sys-color-on-surface); margin-bottom: var(--space-3); }
.empty-state__description { font: var(--md-type-body-lg); max-width: 480px; margin-bottom: var(--space-6); }
.empty-state__actions { display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap; }

/* ---------- LOADING ---------- */
@keyframes spin { to { transform: rotate(360deg); }}
.spinner { width: 40px; height: 40px; border: 4px solid var(--md-sys-color-outline); border-top-color: var(--md-sys-color-primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
.spinner--sm { width: 24px; height: 24px; border-width: 3px; }
.spinner--lg { width: 56px; height: 56px; border-width: 5px; }
.loading-container { display: grid; place-items: center; padding: var(--space-10); min-height: 200px; }

@keyframes skeleton-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; }}
.skeleton { background: var(--md-sys-color-surface-variant); border-radius: var(--md-sys-shape-corner-sm); animation: skeleton-pulse 2s ease-in-out infinite; }
.skeleton--text { height: 16px; width: 100%; margin-bottom: var(--space-2); }
.skeleton--title { height: 24px; width: 60%; margin-bottom: var(--space-4); }
.skeleton--circle { width: 40px; height: 40px; border-radius: 50%; }
.skeleton--rect { height: 200px; width: 100%; }

/* ---------- PROGRESS BAR ---------- */
.progress { height: 8px; background: var(--md-sys-color-surface-variant); border-radius: var(--md-sys-shape-corner-full); overflow: hidden; position: relative; }
.progress__bar { height: 100%; background: var(--md-sys-color-primary); border-radius: var(--md-sys-shape-corner-full); transition: width var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard); }
.progress--lg { height: 12px; }
.progress--sm { height: 4px; }

@keyframes progress-indeterminate { 0% { left: -40%; } 100% { left: 100%; }}
.progress--indeterminate .progress__bar { width: 40%; position: absolute; animation: progress-indeterminate 1.5s ease-in-out infinite; }

/* ---------- STEPPER ---------- */
.stepper { display: flex; align-items: center; gap: 0; margin-bottom: var(--space-8); }
.stepper__step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
.stepper__step:not(:last-child)::after { content: ""; position: absolute; top: 20px; left: 50%; right: -50%; height: 2px; background: var(--md-sys-color-outline); z-index: -1; }
.stepper__step[data-state="completed"]::after { background: var(--md-sys-color-primary); }
.stepper__circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--md-sys-color-surface-variant);
  color: var(--md-sys-color-on-surface-variant);
  border: 2px solid var(--md-sys-color-outline);
  display: grid;
  place-items: center;
  font: var(--md-type-label-lg);
  font-weight: 600;
  margin-bottom: var(--space-2);
  z-index: 1;
}
.stepper__step[data-state="active"] .stepper__circle { background: var(--md-sys-color-primary); color: var(--md-sys-color-on-primary); border-color: var(--md-sys-color-primary); }
.stepper__step[data-state="completed"] .stepper__circle { background: var(--md-sys-color-primary); color: var(--md-sys-color-on-primary); border-color: var(--md-sys-color-primary); }
.stepper__label { font: var(--md-type-body-sm); color: var(--md-sys-color-on-surface-variant); text-align: center; }
.stepper__step[data-state="active"] .stepper__label { color: var(--md-sys-color-on-surface); font-weight: 600; }

@media (max-width: 768px) {
  .stepper { justify-content: center; }
  .stepper__label { display: none; }
  .stepper__step { flex: 0 0 auto; }
}

/* ---------- FILE UPLOAD ---------- */
.file-upload {
  border: 2px dashed var(--md-sys-color-outline);
  border-radius: var(--md-sys-shape-corner-xl);
  padding: var(--space-8);
  text-align: center;
  cursor: pointer;
  transition: border-color var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard), background var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard);
}
.file-upload:hover, .file-upload[data-dragover="true"] { border-color: var(--md-sys-color-primary); background: color-mix(in oklab, var(--md-sys-color-primary) 4%, transparent); }
.file-upload__icon { width: 64px; height: 64px; margin: 0 auto var(--space-4); color: var(--md-sys-color-on-surface-variant); }
.file-upload__title { font: var(--md-type-title-lg); color: var(--md-sys-color-on-surface); margin-bottom: var(--space-2); }
.file-upload__description { font: var(--md-type-body-lg); color: var(--md-sys-color-on-surface-variant); margin-bottom: var(--space-4); }
.file-upload__input { display: none; }
.file-upload__browse { color: var(--md-sys-color-primary); font-weight: 600; text-decoration: underline; }

.file-list { display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-4); }
.file-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--md-sys-color-surface-variant);
  border-radius: var(--md-sys-shape-corner-lg);
}
.file-item__icon { width: 24px; height: 24px; color: var(--md-sys-color-on-surface-variant); }
.file-item__name { flex: 1; font: var(--md-type-body-lg); color: var(--md-sys-color-on-surface); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-item__size { font: var(--md-type-body-sm); color: var(--md-sys-color-on-surface-variant); }
.file-item__remove { width: 32px; height: 32px; display: grid; place-items: center; cursor: pointer; border-radius: var(--md-sys-shape-corner-sm); color: var(--md-sys-color-on-surface-variant); }
.file-item__remove:hover { background: var(--md-sys-color-error-container); color: var(--md-sys-color-error); }

/* ---------- DATE PICKER ---------- */
.date-picker { position: relative; }
.date-picker input[type="date"], .date-picker input[type="datetime-local"] {
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border-radius: var(--md-sys-shape-corner-lg);
  border: 1px solid var(--md-sys-color-outline);
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  font: var(--md-type-body-lg);
}
.date-picker input::-webkit-calendar-picker-indicator { cursor: pointer; filter: opacity(0.6); }
.date-range { display: flex; align-items: center; gap: var(--space-3); }
.date-range__separator { color: var(--md-sys-color-on-surface-variant); font: var(--md-type-body-lg); }

/* ---------- SEARCH ---------- */
.search { position: relative; width: 100%; max-width: 600px; }
.search__input {
  width: 100%;
  height: 48px;
  padding: 0 48px 0 48px;
  border-radius: var(--md-sys-shape-corner-full);
  border: 1px solid var(--md-sys-color-outline);
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  font: var(--md-type-body-lg);
  transition: border-color var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard), box-shadow var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard);
}
.search__input:focus { outline: 0; border-color: var(--md-sys-color-primary); box-shadow: var(--md-sys-focus-ring); }
.search__icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; color: var(--md-sys-color-on-surface-variant); pointer-events: none; }
.search__clear { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; display: grid; place-items: center; cursor: pointer; border-radius: 50%; color: var(--md-sys-color-on-surface-variant); opacity: 0; transition: opacity var(--md-sys-motion-duration-short) var(--md-sys-motion-ease-standard); }
.search__input:not(:placeholder-shown) ~ .search__clear { opacity: 1; }
.search__clear:hover { background: var(--md-sys-color-surface-variant); }

.search__results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--md-sys-color-surface);
  border: 1px solid var(--md-sys-color-outline);
  border-radius: var(--md-sys-shape-corner-xl);
  box-shadow: var(--md-sys-elevation-3);
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
}
.search__result-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  border-bottom: 1px solid var(--md-sys-color-outline);
}
.search__result-item:last-child { border-bottom: none; }
.search__result-item:hover { background: var(--md-sys-color-surface-variant); }

/* ---------- CARDS ---------- */
.card{border-radius:var(--md-sys-shape-corner-xl);padding:24px;background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);box-shadow:var(--md-sys-elevation-1)}
.card-hover:hover{transform:translateY(-2px);box-shadow:var(--md-sys-elevation-2);transition:transform var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard), box-shadow var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard)}

/* ---------- TABS ---------- */
.tabs{display:flex;gap:24px;border-bottom:1px solid var(--md-sys-color-outline)}
.tab{position:relative;padding:12px 0;font:var(--md-type-title-lg);color:var(--md-sys-color-on-surface);background:none;border:0;cursor:pointer}
.tab[aria-selected="true"]{color:var(--md-sys-color-primary)}
.tab[aria-selected="true"]::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--md-sys-color-primary)}

/* ---------- TABLES ---------- */
.table{width:100%;border-collapse:collapse}
.table thead{background:var(--md-sys-color-surface-variant);color:var(--md-sys-color-on-surface)}
.table th{text-align:left;padding:12px 16px;font:var(--md-type-label-lg)}
.table td{padding:16px;border-top:1px solid var(--md-sys-color-outline);font:var(--md-type-body-lg)}
.table tr:hover{background:color-mix(in oklab,var(--md-sys-color-primary) 6%, transparent)}
.badge{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:9999px;font:var(--md-type-label-lg);border:1px solid var(--md-sys-color-outline);background:var(--md-sys-color-surface-variant);color:var(--md-sys-color-on-surface-variant)}
.badge--success{background:color-mix(in oklab,#10B981 12%,white);color:#064E3B;border-color:color-mix(in oklab,#10B981 35%,white)}
.badge--warn{background:color-mix(in oklab,#F59E0B 14%,white);color:#7C3E00;border-color:color-mix(in oklab,#F59E0B 35%,white)}
.badge--danger{background:color-mix(in oklab,#EF4444 12%,white);color:#7F1D1D;border-color:color-mix(in oklab,#EF4444 35%,white)}

.toolbar{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.pager{display:flex;align-items:center;gap:8px}
.pager .page{min-width:36px;height:36px;border-radius:8px;border:1px solid var(--md-sys-color-outline);display:grid;place-items:center;background:var(--md-sys-color-surface)}
.pager .page[aria-current="true"]{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);border-color:transparent}

.table-container { overflow-x: auto; border-radius: var(--md-sys-shape-corner-xl); border: 1px solid var(--md-sys-color-outline); }
@media (max-width: 768px) {
  .table thead { display: none; }
  .table tr { display: flex; flex-direction: column; border-bottom: 2px solid var(--md-sys-color-outline); padding: var(--space-4); }
  .table td { display: flex; justify-content: space-between; padding: var(--space-2) 0; border: none; }
  .table td::before { content: attr(data-label); font-weight: 600; color: var(--md-sys-color-on-surface-variant); }
}

/* ---------- PRICING ---------- */
.pricing{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;align-items:stretch;max-width:1100px;margin-inline:auto}
.price-card{position:relative;display:grid;grid-template-rows:auto auto 1fr auto;gap:16px;padding:24px;border-radius:var(--md-sys-shape-corner-xl);background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);border:1px solid var(--md-sys-color-outline);box-shadow:var(--md-sys-elevation-1);overflow:hidden;transition:transform var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard),box-shadow var(--md-sys-motion-duration-medium) var(--md-sys-motion-ease-standard)}
.price-card:hover{box-shadow:var(--md-sys-elevation-2);transform:translateY(-2px)}
.price-card__head h3{margin:0 0 4px;font:var(--md-type-title-lg)}
.price-card__sub{color:var(--md-sys-color-on-surface-variant);font:var(--md-type-body-sm)}
.price-card__badge{position:absolute;top:0;left:50%;transform:translate(-50%,-50%);background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);padding:6px 12px;border-radius:9999px;font:var(--md-type-label-lg);box-shadow:var(--shadow-brand-glow);pointer-events:none}
.price-card--popular{border-color:var(--md-sys-color-primary);box-shadow:var(--shadow-brand-glow)}
.price{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.price__value{font:var(--md-type-display-sm);line-height:1.05;letter-spacing:-0.02em;white-space:nowrap}
.price__period{color:var(--md-sys-color-on-surface-variant);font:var(--md-type-body-lg)}
.price__features{display:grid;gap:12px;margin:8px 0 0 0;align-content:start}
.price__features li{display:flex;gap:8px;align-items:flex-start;color:var(--md-sys-color-on-surface-variant);font:var(--md-sys-type-body-sm, var(--md-type-body-sm))}
.price__cta{align-self:end;width:100%}
.price-card .btn{width:100%}.price-card .btn.btn-filled{padding:12px 20px;min-height:48px}
@media (max-width:360px){.price__value{font:var(--md-type-headline-lg)}}
.price__divider{height:1px;width:100%;background:var(--md-sys-color-outline);margin:8px 0}

/* ---------- PREVIEWS & KPIs ---------- */
.preview{display:grid;gap:12px;padding:16px;border-radius:var(--md-sys-shape-corner-lg);background:var(--md-sys-color-surface);border:1px solid var(--md-sys-color-outline)}
.preview__thumb{width:100%;aspect-ratio:16/9;border-radius:var(--md-sys-shape-corner-md);background:var(--neutral-100);overflow:hidden}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.kpi{padding:20px;border-radius:var(--md-sys-shape-corner-xl);background:var(--md-sys-color-surface);box-shadow:var(--md-sys-elevation-1);border:1px solid var(--md-sys-color-outline)}
.kpi__label{color:var(--md-sys-color-on-surface-variant);font:var(--md-type-body-sm)}
.kpi__value{font:var(--md-type-headline-lg)}

/* ---------- STAT CARD WITH TRENDS ---------- */
.stat-card {
  padding: var(--space-5);
  border-radius: var(--md-sys-shape-corner-xl);
  background: var(--md-sys-color-surface);
  box-shadow: var(--md-sys-elevation-1);
  border: 1px solid var(--md-sys-color-outline);
}
.stat-card__header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4); }
.stat-card__label { color: var(--md-sys-color-on-surface-variant); font: var(--md-type-body-sm); text-transform: uppercase; letter-spacing: 0.5px; }
.stat-card__icon { width: 40px; height: 40px; padding: var(--space-2); border-radius: var(--md-sys-shape-corner-lg); background: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); }
.stat-card__value { font: var(--md-type-display-sm); color: var(--md-sys-color-on-surface); margin-bottom: var(--space-2); line-height: 1.1; }
.stat-card__trend { display: inline-flex; align-items: center; gap: var(--space-1); padding: 4px 8px; border-radius: var(--md-sys-shape-corner-sm); font: var(--md-type-label-lg); font-size: 13px; }
.stat-card__trend--up { background: color-mix(in oklab, #10B981 12%, transparent); color: #065F46; }
.stat-card__trend--down { background: color-mix(in oklab, #EF4444 12%, transparent); color: #991B1B; }
.stat-card__trend--neutral { background: var(--md-sys-color-surface-variant); color: var(--md-sys-color-on-surface-variant); }
.stat-card__trend-icon { width: 16px; height: 16px; }
.stat-card__comparison { font: var(--md-type-body-sm); color: var(--md-sys-color-on-surface-variant); margin-top: var(--space-2); }

/* ---------- MODAL & POPUPS ---------- */
.modal-root{position:fixed;inset:0;display:grid;place-items:center;z-index:1000}
.modal-root .backdrop{position:absolute;inset:0;background:var(--md-sys-color-scrim)}
.modal{width:min(560px,calc(100vw - 2rem));border-radius:var(--md-sys-shape-corner-2xl);background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);box-shadow:var(--md-sys-elevation-5);padding:24px}

.tooltip{position:absolute;z-index:1100;pointer-events:none;background:var(--md-sys-color-inverse-surface);color:var(--md-sys-color-inverse-on-surface);font:var(--md-type-body-sm);padding:6px 8px;border-radius:6px;box-shadow:var(--md-sys-elevation-3);transform:translate(-50%,-8px);white-space:nowrap}
.tooltip[data-pos="bottom"]{transform:translate(-50%,8px)}

.popover{position:absolute;z-index:1100;min-width:240px;max-width:360px;background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);border:1px solid var(--md-sys-color-outline);border-radius:var(--md-sys-shape-corner-lg);box-shadow:var(--md-sys-elevation-3);padding:12px}
.popover__header{font:var(--md-type-title-lg);margin-bottom:8px}
.popover__body{font:var(--md-type-body-lg);color:var(--md-sys-color-on-surface-variant)}
.popover__footer{margin-top:12px;display:flex;gap:8px;justify-content:flex-end}
.popover::after{content:"";position:absolute;width:10px;height:10px;background:inherit;border:inherit;transform:rotate(45deg);top:-6px;left:24px;border-right:none;border-bottom:none}

.menu{position:absolute;z-index:1100;min-width:200px;background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);border:1px solid var(--md-sys-color-outline);border-radius:var(--md-sys-shape-corner-lg);box-shadow:var(--md-sys-elevation-3);padding:6px;overflow:hidden}
.menu__item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;cursor:pointer;font:var(--md-type-body-lg)}
.menu__item:hover,.menu__item[aria-current="true"]{background:var(--md-sys-color-surface-variant)}
.menu__separator{height:1px;background:var(--md-sys-color-outline);margin:6px 0}

.drawer{position:fixed;inset:0;z-index:1200;display:grid;grid-template-columns:1fr auto}
.drawer__scrim{grid-column:1/2;background:var(--md-sys-color-scrim)}
.drawer__panel{grid-column:2/3;width:min(420px,100vw);height:100%;padding:20px;background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);border-left:1px solid var(--md-sys-color-outline);box-shadow:var(--md-sys-elevation-4);display:grid;grid-template-rows:auto 1fr auto;gap:16px}
.drawer__title{font:var(--md-type-title-lg)}
.drawer__body{overflow:auto;color:var(--md-sys-color-on-surface-variant)}
.drawer__footer{display:flex;gap:8px;justify-content:flex-end}
[hidden]{display:none!important}

.snackbar{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);padding:12px 16px;border-radius:12px;background:var(--md-sys-color-inverse-surface);color:var(--md-sys-color-inverse-on-surface);box-shadow:var(--md-sys-elevation-3);display:flex;gap:12px;align-items:center;z-index:1100}

/* ---------- PAGE HEADER ---------- */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}
.page-header__title { font: var(--md-type-headline-lg); color: var(--md-sys-color-on-surface); margin: 0; }
.page-header__subtitle { font: var(--md-type-body-lg); color: var(--md-sys-color-on-surface-variant); margin-top: var(--space-1); }
.page-header__actions { display: flex; gap: var(--space-3); align-items: center; }

/* ---------- COMPARISON VIEW ---------- */
.comparison { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
@media (max-width: 768px) { .comparison { grid-template-columns: 1fr; }}
.comparison__side { border: 1px solid var(--md-sys-color-outline); border-radius: var(--md-sys-shape-corner-xl); padding: var(--space-5); background: var(--md-sys-color-surface); }
.comparison__side--highlighted { border-color: var(--md-sys-color-primary); box-shadow: var(--shadow-brand-glow); }
.comparison__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4); padding-bottom: var(--space-4); border-bottom: 1px solid var(--md-sys-color-outline); }
.comparison__title { font: var(--md-type-title-lg); color: var(--md-sys-color-on-surface); }
.comparison__metrics { display: flex; flex-direction: column; gap: var(--space-3); }
.comparison__metric { display: flex; justify-content: space-between; align-items: center; }
.comparison__metric-label { font: var(--md-type-body-lg); color: var(--md-sys-color-on-surface-variant); }
.comparison__metric-value { font: var(--md-type-title-lg); color: var(--md-sys-color-on-surface); }

/* ---------- TAGS ---------- */
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 4px 10px;
  border-radius: var(--md-sys-shape-corner-sm);
  font: var(--md-type-label-lg);
  font-size: 12px;
  background: var(--md-sys-color-surface-variant);
  color: var(--md-sys-color-on-surface-variant);
  border: 1px solid var(--md-sys-color-outline);
}
.tag--primary { background: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); border-color: transparent; }
.tag--success { background: color-mix(in oklab, #10B981 15%, transparent); color: #065F46; border-color: #10B981; }
.tag--warning { background: color-mix(in oklab, #F59E0B 15%, transparent); color: #7C3E00; border-color: #F59E0B; }
.tag--error { background: color-mix(in oklab, #EF4444 15%, transparent); color: #991B1B; border-color: #EF4444; }

/* ---------- MISC COMPONENTS ---------- */
.logo { display: flex; align-items: center; gap: var(--space-2); font: var(--md-type-title-lg); font-weight: 700; color: var(--md-sys-color-on-surface); text-decoration: none; }
.logo__icon { width: 32px; height: 32px; color: var(--md-sys-color-primary); }
.logo__text { color: var(--md-sys-color-on-surface); }

.divider { height: 1px; background: var(--md-sys-color-outline); margin: var(--space-4) 0; }
.divider--vertical { width: 1px; height: auto; margin: 0 var(--space-4); }

.list-group { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--md-sys-color-outline); border-radius: var(--md-sys-shape-corner-lg); overflow: hidden; }
.list-group__item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); background: var(--md-sys-color-surface); border-bottom: 1px solid var(--md-sys-color-outline); }
.list-group__item:last-child { border-bottom: none; }
.list-group__item:hover { background: var(--md-sys-color-surface-variant); }

.overflow-menu { position: relative; display: inline-block; }
.overflow-menu__trigger { width: 32px; height: 32px; display: grid; place-items: center; cursor: pointer; border-radius: var(--md-sys-shape-corner-sm); color: var(--md-sys-color-on-surface-variant); }
.overflow-menu__trigger:hover { background: var(--md-sys-color-surface-variant); }

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--md-sys-color-surface);
  border-top-left-radius: var(--md-sys-shape-corner-2xl);
  border-top-right-radius: var(--md-sys-shape-corner-2xl);
  box-shadow: var(--md-sys-elevation-5);
  padding: var(--space-6);
  z-index: 1000;
  max-height: 80vh;
  overflow-y: auto;
}
.bottom-sheet__handle { width: 40px; height: 4px; background: var(--md-sys-color-outline); border-radius: 9999px; margin: 0 auto var(--space-4); }

.icon { width: 24px; height: 24px; display: inline-block; flex-shrink: 0; }
.icon--sm { width: 16px; height: 16px; }
.icon--md { width: 24px; height: 24px; }
.icon--lg { width: 32px; height: 32px; }
.icon--xl { width: 40px; height: 40px; }

/* ---------- UTILITY CLASSES ---------- */
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.font-bold { font-weight: 600; }
.font-normal { font-weight: 400; }
.uppercase { text-transform: uppercase; }
.capitalize { text-transform: capitalize; }
.rounded { border-radius: var(--md-sys-shape-corner-lg); }
.rounded-full { border-radius: 9999px; }
.border { border: 1px solid var(--md-sys-color-outline); }
.border-top { border-top: 1px solid var(--md-sys-color-outline); }
.border-bottom { border-bottom: 1px solid var(--md-sys-color-outline); }
.cursor-pointer { cursor: pointer; }
.cursor-not-allowed { cursor: not-allowed; }
.opacity-50 { opacity: 0.5; }
.opacity-75 { opacity: 0.75; }
.pointer-events-none { pointer-events: none; }
.select-none { user-select: none; }
.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
.overflow-scroll { overflow: scroll; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-50 { z-index: 50; }

.text-primary { color: var(--md-sys-color-primary); }
.text-secondary { color: var(--md-sys-color-on-surface-variant); }
.text-error { color: var(--md-sys-color-error); }
.text-success { color: #10B981; }
.text-warning { color: #F59E0B; }
.bg-primary { background: var(--md-sys-color-primary); }
.bg-surface { background: var(--md-sys-color-surface); }
.bg-surface-variant { background: var(--md-sys-color-surface-variant); }

/* ---------- HERO RULES ---------- */
.hero h1{font:var(--md-type-display-sm)}
@media(min-width:1024px){.hero h1{font:var(--md-type-display-lg)}}

/* ---------- COMPACT DENSITY ---------- */
.compact .btn{min-height:36px;padding:8px 12px}
.compact .textfield input,.compact .textfield select{height:48px}
.compact .card{padding:16px}
.compact .table th{padding:8px 12px}
.compact .table td{padding:10px 12px}

/* ---------- ACCESSIBILITY & STATES ---------- */
[aria-busy="true"]{opacity:.8;pointer-events:none}
[disabled]{opacity:.5;pointer-events:none}

/* ---------- PRINT ---------- */
@media print{
  .topbar,.snackbar,.modal-root,.drawer,.popover,.menu,.tooltip{display:none!important}
  .card,.price-card,.kpi{box-shadow:none;border:1px solid var(--md-sys-color-outline)}
}

/* ============================================================
   FINAL DESIGN SYSTEM - 100% Complete
   Ready for automated wireframe generation without errors
   ============================================================ */
