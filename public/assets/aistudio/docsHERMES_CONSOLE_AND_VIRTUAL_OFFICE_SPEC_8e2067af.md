# HERMES CONSOLE & VIRTUAL OFFICE — MASTER ADDENDUM v2.1
> **Status:** PROPOSED addendum · ยังไม่ใช่ขอบเขต Phase 1 · เริ่มได้เมื่อ Phase 1 milestone M8 เขียวและเจ้าของไฟเขียว
> **Systems:** Hermes Console (command deck shell) · Hermes Virtual Office (real-time 3D walkable sandbox)
> **2026-10-19 owner amendment:** The real-3D sandbox requirement in §0.1 is ACCEPTED. Other proposed features and implementation gates retain their existing status. See HERMES_MASTER_SPEC_AMENDMENTS.md, OFFICE-3D-001.
> **Precedence:** `HERMES_MASTER_SPEC.md` Part D > addendum นี้ (ถ้าขัดกันในส่วนของ Phase 1) · addendum นี้เป็น normative สำหรับโมดูล Console/Office
> **Audience:** เจ้าของ (ส่วนไทย) + Codex CLI (ส่วนอังกฤษ) · Keywords MUST/SHOULD/MAY ตาม RFC 2119
> **รวมไอเดียจาก:** MASTER_SPEC v1 · HANDOFF pack · ภาพ ref: OpenClaw pixel office, Agent Office Dashboard, Sanook AI OS (console + clean isometric), office game จีน · ภาพเจนชุด "3D World Multi-Agent Orchestrator" · ความต้องการล่าสุด: **แบ่งฝ่ายชัด / สไตล์ 3D Anime Ikemen / Console ดู+สั่ง+ซอยหลังบ้านพร้อมกัน**

---

# 0. สิ่งที่ไฟล์นี้เพิ่มเข้ามาก่อนหน้า (gap closure)

| ความต้องการ | สถานะในไฟล์ v1 | ไฟล์นี้ |
|---|---|---|
| Virtual Office sandbox เดินเล่นได้ | ❌ ไม่มี | ✅ Part 4; v2.1 requires real 3D geometry, orbit camera and owner movement |
| แบ่งโซน/แบ่งฝ่ายชัด (Sanook-style zoning) | ❌ ไม่มี | ✅ Part 4.1 |
| สไตล์ตัวละคร 3D Anime Ikemen | ❌ (มีแต่ธีม Matrix) | ✅ Part 4.3 + Part 5 |
| Console shell: sidebar เมนู + ⌘K palette + inspector | ❌ (มีแต่ /viz read-only) | ✅ Part 3 |
| ดูและสั่งการพร้อมกัน + ซอยหลังบ้าน (raw event/audit/DLQ) | ❌ | ✅ Part 3.4–3.6 |
| เมนูสำคัญครบชุด (ออกแบบจากตัวอย่าง Sanook) | ❌ | ✅ Part 3.2 |

ทุกอย่างอื่นใน MASTER_SPEC v1 (state machine, approval proof, outbox, RBAC, D-001…D-038) **คงเดิมทั้งหมด** ไฟล์นี้ไม่แก้ มีแต่เสริม

---

## 0.1 Accepted owner amendment — OFFICE-3D-001 (2026-10-19)

The product target is an explorable real-time **3D sandbox office**. The owner
explicitly confirmed camera rotation and walking in this chat. This amendment
supersedes the v2.0 sprite-only/2:1 fixed-scene runtime choices in L-6, §4.3,
§4.4, §4.5 and the Office document's D-042. It does not adopt similarly numbered
playbook decisions or mark the rest of this proposed addendum approved.

The Office MUST render actual 3D room, prop and character geometry, allow camera
orbit around the scene, zoom/pan, and owner-avatar movement in walkable areas.
Clicking a desk/character MUST open its mapped inspector. Isometric is an
optional initial camera composition, not a restriction to a fixed 2D view.
Existing image references specify visual direction; they are not deliverable
3D assets. A photograph, flat image, sprite-only scene or animated billboard
cannot by itself meet this requirement.

Hermes/PostgreSQL remains the source of business truth. Camera/movement are
presentation state; any business action still uses the existing REST/RBAC/
approval/idempotency gates. Label fixture/mock and live modes distinctly. This
specification update does not itself start implementation, choose an engine,
approve an asset purchase, or resolve the existing C0/Office rollout gate.
The already authorized B-001A static Console preview remains a reusable shell
prototype, not evidence that the real-3D Office acceptance has passed.

# 1. วิสัยทัศน์รวม (ไทย)

1. **Console** = ห้องควบคุมแบบ Sanook AI OS: เมนูซ้าย, ช่องคำสั่ง ⌘K, เนื้อหากลาง, ลิ้นชัก inspector ขวา — **ดูสด + สั่งงาน + เปิดดูหลังบ้าน** ได้ในจอเดียว ไม่ต้องสลับหน้าต่าง
2. **Virtual Office** = โลก 3D sandbox ที่หมุนกล้องรอบฉาก ซูม และเดินสำรวจได้จริง (เริ่มจากมุมภาพรวมแบบ isometric ได้): แต่ละฝ่ายนั่งทำงานในโซนของตัวเอง เห็น Hermes เดินแจกงาน เห็นตั๋วไหลเป็นเอกสาร/ท่อ เห็น approval ค้างที่ห้องประทับ เห็นงานพังไปนั่งซ่อมในสวน bug
3. **Art direction** = 3D Anime สไตล์ ikemen (หนุ่มหล่อ semi-real) สำหรับ staff ทั้งออฟฟิศ + ไกด์ Vtuber สาวเท่ (ตามวิสัยทัศน์เดิม) เป็น cameo — พื้นหลังออฟฟิศ clean isometric โทน Sanook, กลางคืนสลับ skin Matrix Kiwi ได้
4. ทั้งหมดเป็น **ภาพฉาย (projection)** ของความจริงใน Postgres — โลกนี้ไม่เคยเป็น source of truth และไม่เคยโพสต์/อนุมัติอะไรเอง

---

# 2. กฎเหล็ก (immutable laws)

- **L-1 Projection only:** Office/Console อ่านจาก Hub DB + event catalog เท่านั้น ห้ามเขียน state ใหม่ของโลก simulation ลง Postgres
- **L-2 No new events:** ห้ามเพิ่ม event type เพื่อ Office; ใช้ catalog เดิม (+ reserved) ; projection แปลง event → ท่าทาง/ตำแหน่งเอง
- **L-3 Writes via existing gates:** ทุกปุ่มสั่งการใน Console ยิง REST endpoint เดิมของ Part D7 พร้อม confirm modal / RBAC / idempotency key — approve/reject ยังต้องผ่าน `expected_sha256` (D5.3)
- **L-4 No free-text destructive:** นโยบาย D-018/RF-20 ใช้กับ ⌘K palette ด้วย — ข้อความอิสระสร้างได้แต่ต้องกดยืนยัน, ห้าม approve/cancel/publish/role จากข้อความ
- **L-5 Auth guard:** `/console` และ `/viz/office` อยู่ใต้ guard เดียวกับ D14.1/D-029 (PUBLIC_EXPOSURE=true + AUTH=none → refuse boot)
- **L-6 Real 3D scene; retain no-Node-build constraint:** Jinja2 + HTMX provide the Console shell; a browser 3D renderer provides actual scene geometry, rigged 3D characters, camera orbit/zoom/pan and owner navigation. Use pinned dependencies. PixiJS/sprite billboards or a flat office image do not satisfy the core Office deliverable. Engine, asset pipeline and any change to the existing no-Node-build constraint require an architecture decision before implementation.
- **L-7 Skins:** `kiwi-matrix` (default, D14.3) + `sanook-clean` (light, ใหม่) — token ชุดเดียวใช้ทั้ง Console และ Office
- **L-8 Perf & a11y:** Keep projection/state updates separate from the render frame loop. Pause rendering when hidden; use reduced-motion static character poses and on-demand rendering for explicit camera/navigation input. No compulsory camera drift. Contrast ≥4.5:1 ทั้งสอง skin. Reference hardware, render-rate and asset budgets require a measured architecture decision; the old 10 Hz projection limit is not a 10 fps camera requirement.

---

# 3. HERMES CONSOLE (normative, EN)

## 3.1 Shell layout
Grid: `sidebar 240px (collapsible) · topbar 56px · content router · inspector drawer 420px (overlay <1280px)`.
Route root: `/console` ; `/` และ `/viz` redirect ไป `/console/home`.
Split "watch & command" mode (≥1600px): content area แบ่งซ้าย = Office canvas / ขวา = list page ใดก็ได้

## 3.2 Menu information architecture (server-driven from `/console/api/menu`, RBAC-filtered)

| Group | Menu (TH / EN) | Route | Reads | Actions (min role) | Refresh |
|---|---|---|---|---|---|
| OVERVIEW | หน้าบัญชาการ / Command Deck | /console/home | KPI tiles, approvals queue, ops strip, office mini-canvas, report today preview | run report (owner, confirm) | 10 s |
| OVERVIEW | สำนักงานสด / Live Office | /console/office | office state + deltas | click entity → inspector | SSE |
| OVERVIEW | แผนที่ระบบ / System Map | /console/system | mermaid arch + connector health overlay | click node → inspector | 30 s |
| WORK | โปรเจกต์ / Projects | /console/projects | projects + counts | create (owner) | 10 s |
| WORK | ตั๋วงาน / Tickets | /console/tickets | table + kanban | start·cancel·resume·retry·reopen (approver, reason modal); add task/artifact | 10 s |
| WORK | รออนุมัติ / Approvals | /console/approvals | pending + preview + hash12 + TTL | Approve / Request changes / Reject buttons only (approver+) | 10 s |
| WORK | งานย่อย / Tasks | /console/tasks | cross-ticket tasks | done/fail/retry (approver) | 10 s |
| WORK | ตารางเวลา / Schedules | /console/schedules | cron/once + missed | enable/disable/fire-now (owner, confirm) | 30 s |
| AUTOMATION | เวิร์กโฟลว์ / Workflows | /console/workflows | defs + runs + step inspector | reload/run (owner, confirm) | 10 s |
| AUTOMATION | ตัวเชื่อม / Connectors | /console/connectors | manifests + health + rate limits | test health, enable/disable (owner) | 30 s |
| AUTOMATION | แม่แบบ / Templates | /console/templates | workflow/report/prompt templates | copy-to-new (owner) | manual |
| BACKSTAGE | เหตุการณ์ & Outbox / Events & DLQ | /console/events | stream table + filters + DLQ tab | requeue dead letter (owner) | 10 s |
| BACKSTAGE | ประวัติการกระทำ / Audit Log | /console/audit | actor/action/entity filters | export CSV (viewer) | 10 s |
| BACKSTAGE | รายงาน / Reports | /console/reports | snapshots + rendered Thai + delta | run for date (owner) | manual |
| BACKSTAGE | ฐานความรู้ / Knowledge | /console/kb | docs/*.md render + search | — | manual |
| RESOURCES | โควต้า & ลิมิต / Limits | /console/limits | gauges + live countdown | record usage (owner modal) | 30 s |
| RESOURCES | เอเจนต์ & Workers / Agents | /console/agents | loop heartbeats + avatar roster link | — | 10 s |
| RESOURCES | ผู้ใช้ & สิทธิ์ / Users & Roles | /console/users | role matrix | set role, create token (owner, shown once) | manual |
| SYSTEM | วินิจฉัย / Diagnostics | /console/diagnostics | healthz/readyz, version, depths, SSE, DB latency | — | 10 s |
| SYSTEM | ตั้งค่า / Settings | /console/settings | prefs + masked env | own prefs (skin/lang/rain/density/tz) | manual |
| SYSTEM | คู่มือ / Runbook & Docs | /console/docs | RUNBOOK + Part D + decisions | — | manual |

**Topbar:** ⌘K palette · global search (jump by `TMK-0001`, `evt_…`, `apr_…`, `drf_…`) · Live Ops chip · skin switch · TH/EN · user chip + role badge

## 3.3 Command palette (⌘K / Ctrl+K)
Sources: (1) navigation, (2) entity jump by code/id, (3) read commands (`status`, `report today`, `limits`), (4) mutating commands that **open a confirm modal** (never execute on Enter).
Safety matrix mirrors D12: `approve|reject|request_changes|cancel|retry|resume|reopen|publish|role_set|token|workflow_reload` → palette ได้แค่เปิดหน้า/เปิด modal เท่านั้น
Every execution inserts `commands(source=console)` + `intent_logs(parser=palette)`. Fuzzy TH+EN; keyboard-only; last-used pinned per user.

## 3.4 Inspector drawer ("ดูหลังบ้าน")
Opens for kinds: ticket, task, approval, artifact, event, delivery, workflow_run, connector, limit, schedule, user, report, **office_avatar** (maps to task/ticket ref).
Tabs: `Overview · Timeline (events อ้างอิง id/correlation นี้) · Audit · Raw JSON · Actions(RBAC)`.
Raw JSON = payload จริงจาก API, redact keys matching `*token*|*secret*|*signature*` → `"***"`.
Click `correlation_id`/`causation_id` → กระโดดไป Events filter = chain เต็ม (Weibo post → story → ticket → draft → approval → publication).

## 3.5 Live Ops chip + panel
Chip: SSE dot (green/reconnecting/red) · worker heartbeat `Xs ago` · depths `outbox/deliveries/dlq` · office fps+entities (เมื่อ mount) · REPLAY badge.
Panel (`/console/api/ops`): per-loop table (loop, last_tick, errors_5m) + 24 h depth chart. ห้าม expose secrets.

## 3.6 Watch & command simultaneity
- Row actions ทุกตารางเปิด modal ยืนยันพร้อม reason (บังคับใน cancel/reopen)
- Office canvas คลิก avatar/desk → เปิด inspector ของ task/ticket จริง → กด action จาก drawer ได้เลย (ยังคง L-3)
- Approvals page แสดง preview + `content_sha256` 12 ตัวแรก + TTL countdown คู่กับปุ่มตัดสินใจ

## 3.7 RBAC visibility
เมนูถูกตัดฝั่ง server จาก `/console/api/menu` ตาม matrix D5.1 (ไม่ใช่ซ่อน CSS); viewer เห็นกลุ่ม OVERVIEW/WORK(read)/BACKSTAGE/RESOURCES(read)/SYSTEM(read); approver + actions งาน; owner เท่านั้นสำหรับ users/settings-server/requeue/reload/enable-disable/usage.

## 3.8 API additions (read models only)
```
GET /console/api/menu            → role-filtered tree
GET /console/api/ops             → loops + depths + sse status
GET /console/api/inspector/{kind}/{id}
GET /console/api/search?q=       → jump results (tickets/events/connectors/avatars)
POST /console/api/prefs          → own prefs
```
Mutations ทั้งหมดใช้ endpoint เดิมใน D7 (ไม่สร้าง endpoint เขียนใหม่)

## 3.9 Theme tokens (เพิ่ม skin ที่ 2)
| Token | kiwi-matrix (default) | sanook-clean |
|---|---|---|
| --bg | #05080A | #F6F7FB |
| --panel | #0B1418 | #FFFFFF |
| --primary | #6A8D52 (kiwi) | #4F46E5 (indigo) |
| --text | #9CBA70 | #1F2937 |
| --accent | #B5D25D | #7C3AED |
| --info / in_progress | #00B3FF | #2563EB |
| --warn / blocked | #F5C542 | #D97706 |
| --danger / failed | #FF4D6D | #DC2626 |
| --muted | #5C6370 | #6B7280 |
Font: matrix = JetBrains Mono · clean = Noto Sans Thai + Inter. Rain/scanline มีเฉพาะ matrix. Skin persist ใน cookie ต่อ user.

## 3.10 Console acceptance tests
- C1: menu payload ของ viewer ไม่มี Users/Settings-server; เข้า URL ตรง → 403 page
- C2: palette พิมพ์ "อนุมัติ TMK-0001" → ไม่ execute, เปิด Approvals page + hint; พิมพ์ "สร้างตั๋ว TMK ทดสอบ" → modal → ticket เกิดหลังกด confirm เท่านั้น
- C3: inspector ticket แสดง timeline ครบ chain จาก correlation_id เดียวกัน
- C4: raw JSON redact signature/token ทุกกรณี
- C5: split mode mount office + tickets พร้อมกัน, SSE ไม่ชน HTMX polling (pause เมื่อ hidden)
- C6: requeue DLQ จาก Events tab ต้องเป็น owner + confirm + audit บันทึก
- C7: สลับ skin → axe-core contrast ผ่านทั้งสอง skin, rain หายใน clean
- C8: PUBLIC_EXPOSURE=true + VISUALIZER_AUTH=none → boot refuse (คลุม /console ด้วย)

---

# 4. HERMES VIRTUAL OFFICE (normative, EN)

## 4.1 Zone map — แบ่งฝ่ายชัดเจน (frozen zone ids)

| zone_id | Name (TH/EN) | Owner service | Entities/avatars ที่นั่งอยู่ | Visual cue |
|---|---|---|---|---|
| zone.hub_bridge | สะพานบัญชาการ / Command Bridge | hub | HERMES + kanban wall + tube junction | โต๊ะกลมจอโค้ง, ท่อออก 4 ทิศ |
| zone.tamkoa_collector | ฝ่ายสืบข่าว / Collection Desk | tamkoa | SCOUT avatars, satellite dish, inbox funnel | จานดาวเทียม + funnel รับ paper-birds |
| zone.tamkoa_enricher | ฝ่ายแปล-วิเคราะห์ / Enrich Bench | tamkoa | ANALYST avatars, batch trays | จอแปลไทย/คะแนนลอย |
| zone.tamkoa_story | โต๊ะรวมเรื่อง / Story Builder | tamkoa | STORY-WEAVER, thread board | กระดานปักหมุดเชื่อมข่าว |
| zone.tumkao_creative | ฝ่ายครีเอทีฟ / Creative Pod | tumkao | CREATIVE-LEAD, roadmap wall | กระดาน roadmap + sticky |
| zone.tumkao_content | ฝ่ายเขียน / Content Desks | tumkao | WRITER avatars, typewriters hologram | จอ caption หลายแพลตฟอร์ม |
| zone.tumkao_seo | ฝ่าย SEO & Analytics / Growth Bay | tumkao | SEO-ANALYST, chart holos | กราฟ hashtag/prime-time |
| zone.tumkao_design | ฝ่ายศิลป์ & มาสคอต / Art Studio | tumkao | DESIGN avatar, mascot posters | easel + poster มาสคอต |
| zone.tumkao_production | ฝ่ายตัดต่อ / Media Bay | tumkao | MEDIA-EDITOR, timeline racks | timeline hologram + subtitle strip |
| zone.tumkao_bd | ฝ่าย BD & AE / Partner Lounge | tumkao | BD avatar, CRM board (reserved pre-Phase5 → pod ว่างป้าย "RESERVED") | โต๊ะประชุมเล็ก + lead board |
| zone.tumkao_pm | สำนักงาน PM / Coordination Desk | tumkao→hub | PM avatar รวมถาดรอตรวจ | ถาด "รอเจ้าของตรวจ" |
| zone.approval_chamber | ห้องอนุมัติ / Approval Chamber | hub | OWNER chair + stamp desk + tray pulses | ห้องกระจก, ตราประทับ, ปุ่ม ✅❌ holo |
| zone.ops_limits | ห้องโควต้า / Breaker Room | hub | OPS avatar + breaker panel gauges | แผงเบรกเกอร์ + countdown |
| zone.watchtower | หอเฝ้าระบบ / Watchtower | hub | SENTRY + connector racks | rack server + lamp เขียว/แดง |
| zone.bug_garden | สวนบั๊ก / Bug Garden (failed+DLQ) | hub | MECHANIC kneeling, cones, bug sprites, dead-letter mailbox | หญ้า+กรวย+mailbox ธงขึ้น |
| zone.lounge | พักคอย / Lounge (idle, waiting_quota) | — | avatars resting, coffee queue countdown | โซฟา+เครื่องชงกาแฟ |
| zone.broadcast_stage | เวทีเผยแพร่ / Broadcast Stage | tumkao | PUBLISHER avatar, paper planesออกหน้าต่าง | เวที+ไฟ spot |
| zone.archive_shelf | คลังเก็บ / Archive Shelf | hub | boxes ตาม ticket archived | ชั้นกล่องป้าย |
| zone.print_room | ห้องรายงาน / Print Room | hub | printer anim ตอน midnight report | เครื่องพิมพ์+กองกระดาษ |
| zone.owner_path | เส้นทางเจ้าของ / Owner Walk | client | OWNER avatar (walkable V2) | เส้นประ navmesh |

## 4.2 Fact → pose mapping (projection rules)

| Hub fact / event | Zone & pose | Badge |
|---|---|---|
| task running (executor mock/connector) | desk ของ zone ฝ่ายนั้น, sit_type anim | busy (ส้ม) |
| task pending + limit exhausted | lounge coffee queue, wait anim + countdown จาก `limits.reset_at` | waiting (amber) |
| ticket awaiting_approval | เอกสารเข้า tray ที่ approval_chamber, chair pulse | approval (cyan) |
| approval granted | stamp anim ที่ stamp desk, slip วิ่งกลับท่อ | done flash (accent) |
| approved → publishing | stage lights on, plane taxi | publishing (blue pulse) |
| publication.published | plane ออกหน้าต่าง, confetti จาง 2 s | online (เขียว) |
| publication.failed / task failed final | avatar เดินไป bug_garden, kneel + cone ขึ้น | failed (แดง) |
| hub.dlq.dead_lettered | mailbox ใน garden ธงขึ้น | failed |
| connector health down | rack ใน watchtower spark + smoke จาง | failed |
| schedule fired | clock tower chime pulse ไป zone เป้า | info |
| hub.report.daily | print_room พิมพ์ + วางกองที่ owner desk | info |
| ticket archived | box เลื่อนเข้า shelf | muted |
| ไม่มีงาน | lounge นั่งพัก/นอนพิง | idle (ฟ้า) |

## 4.3 Avatar roster & art direction — **3D Anime Ikemen**

Style guide (binder ให้ทุก asset):
- Semi-real 3D anime render (ไม่ใช่ chibi), สัดส่วน ikemen: สูง ไหล่กว้าง คางคม ผมสไตล์ชัด
- ผิว matte, soft studio key light + rim light สีโซน, เงาอ่อน isometric 30°
- ชุดยูนิฟอร์มตามโซน + พร็อพประจำตัว (ดูตาราง), palette ผูกกับ token skin
- คง identity ข้ามช็อต: same render pass, same face seed ต่อตัว, ห้ามเปลี่ยนสีผม
- Runtime deliverables MUST include 3D character geometry that is coherent from every permitted camera angle, with rigs/animation clips for walk, sit_type, idle_rest, wait_queue, fail_kneel, stamp, present and celebrate. Character sheets are visual references; cropping/mirroring them does not create a runtime 3D model. Exact asset format, topology and animation budgets are decided in the architecture/asset contract.

| avatar_id | ชื่อ | โซน | ลุค ikemen | สีผูก |
|---|---|---|---|---|
| av.hermes | HERMES | hub_bridge | ผมดำไฮไลท์cyan เสื้อฮู้ดขาว หูฟังไมค์ ถือ clipboard holo | --info |
| av.scout | SCOUT | tamkoa_collector | เวสต์ข่าว press badge กล้องเดี่ยวไหล่ | --kiwi |
| av.analyst | ANALYST | tamkoa_enricher | แว่นกรอบเงิน เสื้อเชิ้ตแขนพับ | --kiwi |
| av.weaver | WEAVE | tamkoa_story | เสื้อกั๊กไหม + เข็มหมุดบอร์ด | --accent |
| av.creative | CREATIVE | tumkao_creative | โค้ทยาวสไตล์ producer ผมสีอ่อน | --accent |
| av.writer | WRITER | tumkao_content | เสื้อยืด+แจ็กเก็ตบาง คีย์บอร์ดกลไก | --primary |
| av.seo | GROWTH | tumkao_seo | เชิ้ตพับแขน + แท็บกราฟ | --primary |
| av.design | ARTIST | tumkao_design | ผ้ากันเปื้อนสตูดิโอ + สไตลัส | --accent |
| av.media | EDITOR | tumkao_production | หูฟังครอบคอ + ถุงมือครึ่งนิ้ว | --info |
| av.bd | PARTNER | tumkao_bd | สลิมสูท เข็มนาฬิกาเงิน | --primary |
| av.pm | COORD | tumkao_pm | เสื้อเชิ้ต+สายวัดเวลา ถาดเอกสาร | --warn |
| av.compliance | SHIELD | tumkao_content (gate) | เสื้อกั๊ก ufficer แสงโล่ | --danger/--ok |
| av.ops | VOLTS | ops_limits | ชุดช่าง + ถุงมือฉนวน | --warn |
| av.sentry | SENTRY | watchtower | แจ็กเก็ตเทค + แว่นโมโนเคิล | --info |
| av.mechanic | WRENCH | bug_garden | เอี๊ยมช่าง คราบน้ำมันจาง | --danger |
| av.publisher | STAGE | broadcast_stage | สูทพิธีกร ไมค์ขาตั้ง | --ok |
| av.owner | YOU (ปรับได้) | owner_path | ลำลอง ถือแล็ปท็อป | user-set |
| av.guide | GUIDE (V3 cameo) | floating | **Vtuber สาวเท่ คูล หูฟัง ไฮไลท์ฟ้า ฮู้ดขาว** (ตามวิสัยทัศน์เดิม) | --accent |

## 4.4 Simulation engine
- Server: `office_projection` service ใน hub — poll DB 1 Hz + subscribe event bus → คำนวณ entity poses → push delta ผ่าน SSE (`/viz/api/office/stream`), snapshot (`/viz/api/office/state`)
- Client: actual 3D scene graph for office rooms, desks, props and characters; orbit camera with azimuth rotation, bounded elevation, zoom and pan. An isometric-like initial view is permitted but MUST be rotatable to show different object sides. Interpolate projection updates independently of rendering. Scene picking maps stable entity IDs to the existing inspector. Owner navigation uses designated walkable areas and collision boundaries; exact engine/navigation implementation remains an architecture decision.
- LOD: entities > 40 → collapse เป็น zone badge + count; label เป็น DOM overlay เท่านั้น (canvas ห้าม render free text)
- Replay (V2): `/viz/api/office/replay?from&to&speed` สร้าง delta จาก `audit_log`+`outbox` เท่านั้น, deterministic (hash เฟรมเท่ากันเมื่อรันซ้ำ), watermark "REPLAY"
- Owner walk: provide a controllable owner avatar and click-to-move within walkable areas, respecting walls/props and remaining inside the office. Camera orbit and owner walk MUST coexist without accidental inspector commands. Position/camera are client-side presentation state (sessionStorage only), never Hub business state. Additional keyboard/gamepad controls are pending product decisions.

## 4.5 Milestones (ลำดับหลัง Console C0–C2)
- **V0 3D Sandbox Foundation:** graybox 3D office, visible 3D owner placeholder, orbit/zoom/pan, bounded owner walking, collision boundaries and clickable desk/character → inspector. Explicitly labelled fixture data is permitted only under the existing local preview exception. A static image/SVG is a UI mockup, not V0 acceptance.
- **V1 Animated 3D Office:** replace approved placeholders with optimized 3D office/character assets, Hermes locomotion and event-to-animation mappings from §4.2; maintain camera/navigation and click → inspector. Live integration requires the applicable real-data and projection contracts.
- **V2 Live Sandbox & Time Travel:** refine navigation and live projection, then add replay scrubber under an agreed replay contract. Camera orbit and basic owner walking are V0 requirements, not deferred to V2. Camera distance limits are set from scene scale rather than an assumed 2D zoom factor.
- **V3 Skins & Guide:** sanook-clean polish, guide cameo + TTS toggle (ผูก Phase 5 TTS), sound pack default OFF

## 4.6 Office acceptance tests

- V0-3D-01: orbit the camera through a full horizontal turn and change elevation; desks/characters reveal coherent front, side and back geometry with correct occlusion. Provide reset-to-overview.
- V0-3D-02: zoom/pan within configured bounds, then move the owner avatar between at least two designated office zones without passing through solid walls/desks or leaving walkable bounds.
- V0-3D-03: click a 3D desk/character from two different viewing angles → the same mapped inspector/entity; camera gestures and walking do not issue business mutations.
- V0-3D-04: fixtures are visibly labelled Mock; Live errors remain Live errors. The current static preview is not counted as 3D sandbox completion.
- V0-3D-05: reduced-motion/hidden-tab behavior follows L-8; provide a DOM route to inspect the same tasks without requiring precise 3D picking. Benchmark render/asset budgets on agreed hardware before declaring performance acceptance.
- V1: emit story (score 85) → ภายใน 3 s เห็น slip ที่ bridge, Weaver ปักบอร์ด, tray pulse ที่ chamber
- V2: approve → stamp anim + slip กลับท่อ; mutate-draft แล้ว publish → mech kneeling + mailbox flag
- V3: limit exhausted → avatar ไปต่อคิวกาแฟพร้อม countdown ตรง `reset_at`; unlock → เดินกลับโต๊ะ
- V4: connector down → rack spark + watchtower lamp แดง; health ok → กลับเขียว
- V5: replay the same inputs twice → equal canonical projected scene-state hashes at equal logical times; do not require pixel-identical GPU frames or include freely controlled camera/owner position in the hash.
- V6: reduced-motion → static character poses, no autonomous effects/camera movement or continuous idle render loop; explicit camera/navigation input may request frames. Hidden tabs pause rendering.
- V7: SSE ตาย 5 s → reconnect ≤3 s ไม่พลาด pose (Last-Event-ID)
- V8: RBAC viewer เห็น office ได้แต่ drawer ไม่มี Actions tab

---

# 5. ART & IMAGE MASTER PROMPTS (สำหรับเจน asset/hero image)

## 5.0 Global directive (ใช้ทุก variant)
```
Clean modern isometric office world, 2:1 grid, soft ambient occlusion.
Characters: semi-real 3D ANIME IKEMEN style — tall handsome males, sharp jawlines,
styled hair, matte skin, soft studio key light + zone-colored rim light.
One female Vtuber guide cameo allowed (cool girl, headset, blue-highlight hair, white hoodie).
Zone accents follow token palette; conduits = translucent tubes with glowing packets.
In-image text: MAX one-word English labels (HUB, TAMKOA, TUMKAO, APPROVAL, BUGS, LOUNGE,
STAGE, ARCHIVE, CREATIVE, SEO, MEDIA, BD). No Thai script in image, no paragraphs.
8k, flat-shaded gradients, no photorealism, no pixel art.
Set consistency: same seed & style tokens across variants; more variants will be requested.
```
## 5.1 Variant A — Whole zoned office (day, sanook-clean)
Establishing shot: bridge กลาง + ปีก TAMKOA (dish+funnel+thread board) + ปีก TUMKAO แบ่ง pod ชัด: CREATIVE / CONTENT / SEO / ART / MEDIA / BD(reservedป้าย) / PM + ห้องกระจก APPROVAL (stamp+tray) + corner zones BUGS/LOUNGE/STAGE/ARCHIVE/PRINT + breaker room + watchtower racks. Ikemen staff นั่งทำงานตาม pose, status bubbles (online/busy/idle/failed/wwaiting). Tubes เชื่อม HUB→ทุกโซน, tube แดง HUB→BUGS.
## 5.2 Variant B — Night shift bridge (kiwi-matrix)
Background #05080A, kiwi edges, cyber-blue tubes, katakana rain 7% บนกระจก, HERMES โปรย orb ลงท่อ, approval holo ✅❌ + กองเอกสาร, breaker gauge + countdown 00:07:23, mechanic กับ bug sprites, avatar นอน lounge (idle).
## 5.3 Variant C — Lifecycle diorama (walkable feel)
Cutaway vignettes ตามเส้นประ: THINKING desk → IDLE sofa → FAIL garden (kneel+wrench+cones) → LIVE stage (paper plane) → OWNER เดินถือแล็ปท็อป + drawer card ลอย + legend THINK/IDLE/FAIL/LIVE.
## 5.4 Variant D — Ikemen character sheet
Grid 4×4 busts/full-body ของ roster 4.3: แต่ละช่องพื้นหลังสีโซน, ยูนิฟอร์ม+พร็อพตามตาราง, หน้าคงที่ข้ามช่อง, แถบชื่อ avatar_id เล็ก ๆ (post-overlay ได้)
## 5.5 Iteration notes
ล็อก seed/style token; ถ้า text เพี้ยนให้เจนแบบไม่มีป้ายแล้ว overlay ทีหลัง; ใช้ Variant A เป็น hero ใน README + mockup `/console/office`; Variant D เป็น visual reference สำหรับสร้าง/rig โมเดล 3D ที่เห็นได้รอบด้าน; ห้ามถือว่าการ crop/mirror ภาพสร้างโมเดล 3D หรือมุมด้านหลังจริงได้

---

# 6. INTEGRATION กับ MASTER_SPEC ที่ LOCKED

## 6.1 Decision log ใหม่ (เสนอเพิ่มใน Part C)
| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-039 | Console เป็น web shell เดียว; หน้า D14 เดิมย้ายใต้ /console (redirect /viz) | กันสอง UI คู่ขนาน |
| D-040 | Office = projection เท่านั้น, replay อ่านจาก audit/outbox | กัน source of truth ซ้ำ (RF-22) |
| D-041 | Zone ids ตาม 4.1 แช่แข็ง, BD pod เป็น RESERVED ก่อน Phase 5 | แบ่งฝ่ายชัดแต่ไม่สร้างฟีเจอร์ล้ำเฟส |
| D-042 | Art = semi-real 3D anime ikemen with actual runtime 3D geometry/rigs; guide remains female Vtuber | Superseded sprite-only choice by accepted owner amendment OFFICE-3D-001; performance is handled by measured asset budgets |
| D-043 | เพิ่ม skin sanook-clean คู่ kiwi-matrix; rain มีเฉพาะ matrix | เจ้าของชอบโทน Sanook แต่คง identity Matrix |
| D-044 | เมนู server-driven + RBAC filter ที่ payload | กันซ่อน CSS แล้วหลุดสิทธิ์ |
| D-045 | Palette ใช้ policy เดียวกับ D12/D-018 | RF-20 |
| D-046 | Console/Office = Phase 1.5/2 เริ่มหลัง M8 เขียว | ป้องกัน scope แทรก Phase 1 |

## 6.2 Folder / env เพิ่ม
```
services/hub/app/console/      routes.py, menu.py, ops.py, inspector.py
services/hub/app/office/       projection.py, mapping.py, layout.py, replay.py
services/hub/app/static/office/ models/, textures/, animations/, scene.js (provisional; engine/format contract pending)
services/hub/app/templates/console/  shell.html, drawers/, pages/
```
env: `CONSOLE_ENABLED=false·true`, `OFFICE_ENABLED=false·true`, `OFFICE_TICK_MS=1000`, `OFFICE_MAX_ENTITIES=60`, `OFFICE_REPLAY_MAX_DAYS=7`, `OFFICE_SKIN_FOLLOW=true`

## 6.3 ลำดับงานแนะนำ
Phase 1 M0–M8 (LOCKED) → **C0 shell → C1 inspector/palette-nav → C2 palette-mutating+split** → **V0 → V1 → V2 → V3**
แต่ละขั้น = tasks ใน docs/TASKS.md, 1 task = 1 commit, gate `make verify` (D-023 คงเดิม)

## 6.4 คำสั่งพร้อมวางให้ Codex (ใช้เมื่อถึงคิวเท่านั้น)
```
Implement addendum docs/HERMES_CONSOLE_AND_VIRTUAL_OFFICE_SPEC.md, milestone C0 only.
Build the console shell: sidebar menu from /console/api/menu (RBAC-filtered),
topbar with ⌘K palette (navigation + jump only in C0), content router wrapping the
existing D14 pages under /console, inspector drawer skeleton, Live Ops chip,
skin tokens for kiwi-matrix + sanook-clean, auth guard extended (C8).
Do NOT implement office canvas, palette mutations, or any new write endpoints.
Tests C1, C4, C7, C8 must pass. make verify green. One commit per task.
```

---

# 7. คำถามเปิด (ไม่ขวาง C0)
1. เสียงใน office (chime/stamp/rain) ต้องการไหม — default OFF
2. มือถือ: Console เป็น tablet-only ก่อน, phone เฉพาะ Approvals queue ใช่ไหม
3. จำนวน avatar พร้อมกันสูงสุดที่ยอมรับได้ (perf) — เสนอ 40 ก่อน LOD
4. GUIDE cameo ผูก TTS Phase 5 — ยืนยันลำดับ
5. ใครผลิตโมเดล 3D/rig/animation จาก reference, สิทธิ์ใช้งานและงบประมาณเท่าไร — ยังต้องตัดสินใจก่อน asset production; sprite sheets ไม่ใช่ runtime หลัก

# 8. Owner pre-flight checklist
- [ ] Phase 1 M8 เขียว + E1–E17 ผ่าน CI
- [ ] เลือก seed/style token สำหรับชุดภาพ A–D แล้วล็อก
- [ ] Approve canonical character roster/identity and a 3D asset/rig/animation production contract before final character production
- [ ] ตัดสินใจคำถามเปิดข้อ 1–3
- [ ] ไฟเขียว milestone C0 ใน docs/TASKS.md