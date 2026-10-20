# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
```
- Type regex: `^[a-z]+\.[a-z_]+\.[a-z_]+## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
.
- `source` MUST equal the namespace prefix, except connector-sourced stubs, which use their namespace (`tamkoa`, `tumkao`).

### D6.2 Registry
- `shared/events/catalog.yaml` lists `type, version, producer, status(active|reserved), payload_model`.
- Each payload is a Pydantic model in `hermes_common.events.payloads`. `make schemas` exports JSON Schemas to `shared/events/<type>.v<n>.json` and `shared/schemas/`. CI fails if the exported files are stale.
- `EventBus.publish()` MUST raise `UnregisteredEventType` for types not `active`, and MUST validate the payload.

### D6.3 Active events (Phase 1)
| Type | Payload (required fields) |
|---|---|
| hub.project.created | project_id, key, name |
| hub.ticket.created | ticket_id, display_code, project_id, type, priority, approval_required, requested_by |
| hub.ticket.state_changed | ticket_id, display_code, from, to, reason?, blocked_reason? |
| hub.ticket.updated | ticket_id, changed_fields[] |
| hub.task.created | task_id, ticket_id, seq, executor |
| hub.task.state_changed | task_id, ticket_id, from, to, error? |
| hub.artifact.created | artifact_id, ticket_id, kind, version, content_sha256 |
| hub.approval.requested | approval_id, ticket_id, artifact_id, content_sha256, expires_at, priority |
| hub.approval.granted | approval_id, ticket_id, decided_by, proof |
| hub.approval.rejected | approval_id, ticket_id, decided_by, reason? |
| hub.approval.changes_requested | approval_id, ticket_id, decided_by, feedback, revision_count |
| hub.approval.expired | approval_id, ticket_id |
| hub.connector.registered | connector_id, version |
| hub.connector.health_changed | connector_id, from, to |
| hub.workflow.started / completed | run_id, workflow_id, trigger_event_id? |
| hub.workflow.failed | run_id, workflow_id, step_id, error |
| hub.limit.warning | limit_id, resource, reason(usage\|reset_soon), used_pct, reset_at? |
| hub.limit.exhausted | limit_id, resource, reset_at? |
| hub.limit.unlocked | limit_id, resource |
| hub.schedule.fired | schedule_id, action_kind, result_ref |
| hub.report.daily | report_date, metrics |
| hub.dlq.dead_lettered | event_id, event_type, subscriber, error |
| tamkoa.story.created / updated | story_id, title_th, summary_th, final_score (0–100), alert_level(urgent\|important\|none), sources[], rights{media_reuse} |
| tamkoa.alert.raised | story_id, level, title_th |
| tamkoa.health.warning | source_id, reason |
| tamkoa.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |
| tumkao.draft.ready_for_approval | ticket_id, task_id, draft_id, version, content, content_sha256 |
| tumkao.draft.compliance_failed | ticket_id, task_id, draft_id, findings[] |
| tumkao.publication.published | ticket_id, draft_id, version, publication_id, platform, url |
| tumkao.publication.failed | ticket_id, draft_id, retriable, error_code, message |
| tumkao.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |

**Reserved (Phase 2+, status `reserved`):**
- tamkoa: item.ingested, opportunity.detected, opportunity.deadline_soon, trend.spike
- tumkao: brief.created, publication.scheduled, metrics.updated, sponsor.lead_created

**Deleted forever:** `tumkao.draft.requested`, `tumkao.approval.requested`, `tumkao.content.published`, `tamkoa.alert.urgent`, `tamkoa.alert.important` (replaced by `alert.raised{level}`).

### D6.4 Transport (PostgresOutboxBus)
- **Publish:** `bus.publish(session, envelope)` inserts into `outbox` within the caller's transaction. It never commits by itself.
- **Fan-out:** for each `fanned_out=false` row, insert an `event_deliveries` row per matching subscriber, then set `fanned_out=true`.
- **Dispatch:**
  1. `SELECT … FROM event_deliveries WHERE state='pending' AND next_attempt_at<=now ORDER BY event_id LIMIT 50 FOR UPDATE SKIP LOCKED`.
  2. For each row, open a transaction, run the handler, and set `state='done'` in the **same** transaction. DB-side effects are therefore exactly-once. External side effects (Discord) are at-least-once, deduped by storing `discord_message_id` keyed by event_id.
- **Retry:** on failure, `attempts += 1` and `next_attempt_at = now + 5 s × 2^attempts`. After 5 attempts the delivery is `dead`, and the bus emits `hub.dlq.dead_lettered`. A handler of `hub.dlq.*` MUST NOT trigger another DLQ event.
- **Ordering:** best effort by event_id. Handlers MUST be idempotent and MUST re-check current state before acting.
- **Port:** `EventBus` protocol = `publish`, `run_fanout_once`, `run_dispatch_once`, `requeue_dead(event_id, subscriber)`. A future `RedisStreamsBus` implements the same protocol.

### D6.5 Phase 1 subscribers
| Subscriber | Consumes | Action |
|---|---|---|
| `lifecycle` | tumkao.*, tamkoa.command.*, hub.limit.unlocked | task completion, artifact creation, T05/T12/T13, auto-resume |
| `workflow_engine` | `*` | trigger matching + event_waiters |
| `discord_notifier` | see D9.4 | post/edit Discord messages |
| `connector_forwarder` | events in an enabled http connector's `consumes` | HTTP POST (no-op in Phase 1, since stubs are inprocess) |

## D7. REST API (`/v1`, JSON, Bearer or bot headers)

| Method & path | Role | Input | Output |
|---|---|---|---|
| GET /healthz · /readyz | public | — | 200 / 503 (DB + migrations at head) |
| GET /v1/me | any | — | user + role |
| POST /v1/projects | owner | key, name, description? | 201 Project |
| GET /v1/projects · /{key} | viewer+ | — | list / detail + counts by state |
| POST /v1/tickets | approver+ | project_key, title, type, priority, approval_required, publish_target?, description?, due_at?, tags?, dependencies?, tasks?[{title, executor, input}] | 201 Ticket |
| GET /v1/tickets | viewer+ | ?project&state&priority&cursor&limit≤100 | page |
| GET /v1/tickets/{id\|code} | viewer+ | — | ticket + tasks + artifacts + approvals + audit |
| POST /v1/tickets/{id}/actions/{start\|cancel\|resume\|retry\|reopen} | approver+ | reason? | 200 Ticket \| 409 |
| POST /v1/tickets/{id}/tasks | approver+ | title, executor, input? | 201 Task |
| POST /v1/tasks/{id}/actions/{done\|fail} | approver+ | note? / reason | 200 Task |
| POST /v1/tickets/{id}/artifacts | approver+ | kind, content | 201 Artifact (hash computed server-side) |
| GET /v1/approvals?state=pending | viewer+ | — | list |
| POST /v1/approvals/{id}/decision | approver+ | action, expected_sha256, reason?, feedback? | 200 Approval \| 403 \| 409 |
| POST /v1/commands | per intent | text \| {name, args} | 202 {command_id, state, result?} |
| POST /v1/commands/{id}/confirm | creator | — | 200 |
| GET/POST/PATCH /v1/limits · POST /v1/limits/{id}/usage | viewer+/owner | — / limit fields / amount, source | Limit |
| GET/POST/DELETE /v1/schedules | viewer+/owner | name, kind, cron_expr\|run_at, action | Schedule |
| GET /v1/workflows · POST /v1/workflows/reload · POST /v1/workflows/{id}/run | viewer+/owner/owner | — / — / payload | defs / reload report / run |
| GET /v1/reports/daily?date= · POST /v1/reports/daily/run | viewer+/owner | date | snapshot |
| GET /v1/connectors · POST /v1/connectors/register | viewer+/owner | manifest | Connector \| 422 MANIFEST_INVALID |
| POST /v1/webhooks/{connector_id} | HMAC | envelope | 202 \| 200 duplicate \| 401/403/413/422 |
| GET /v1/events?type&state · POST /v1/events/{event_id}/requeue | viewer+/owner | — | page / 200 |
| POST /v1/users/role · POST /v1/users/{id}/token | owner | discord_id, role / — | User / token (once) |
| POST /v1/dev/emit · POST /v1/dev/stub/tumkao/mutate-draft | owner, dev only | envelope / draft_id, patch | 202 |

- **Idempotency:** every POST that creates something or changes state MUST accept an `Idempotency-Key` header.
  - Same `(actor, key)` with the same request hash → return the stored response.
  - Same key with a different hash → 422 `IDEMPOTENCY_KEY_REUSED`.
  - The bot always sends `Idempotency-Key = interaction.id`.

## D8. Connectors & Webhooks

### D8.1 Ports (`app/connectors/base.py`)
```python
class ConnectorAdapter(Protocol):
    id: str
    manifest: ConnectorManifest
    async def send_command(self, cmd: ConnectorCommand) -> CommandAck: ...   # accepted|rejected(+reason)
    async def health(self) -> HealthStatus: ...

class PublisherAdapter(Protocol):
    platform: str
    def validate(self, content: dict) -> list[ValidationIssue]: ...
    async def publish(self, content: dict, proof: ApprovalProof) -> PublishResult: ...
```
`ConnectorCommand = {command_id, name, args, ticket_id?, task_id?, correlation_id, idempotency_key}`.

### D8.2 Manifest (`connectors/<id>/manifest.json`, validated by `hermes_common.manifest`)
```json
{
  "manifest_version": 1, "id": "tumkao", "name": "Tumkao Content Studio", "version": "0.1.0",
  "kind": ["worker", "publisher"], "transport": "inprocess", "base_url": null,
  "commands": [
    {"name": "draft.create", "args_schema": {"type": "object", "required": ["brief"]}},
    {"name": "draft.revise", "args_schema": {"type": "object", "required": ["draft_id", "feedback"]}},
    {"name": "publication.create", "args_schema": {"type": "object", "required": ["draft_id", "proof"]}}
  ],
  "emits": ["tumkao.draft.ready_for_approval", "tumkao.draft.compliance_failed",
            "tumkao.publication.published", "tumkao.publication.failed",
            "tumkao.command.completed", "tumkao.command.failed"],
  "consumes": [],
  "webhook": {"secret_env": "CONNECTOR_SECRET_TUMKAO"},
  "health": {"interval_s": 60},
  "rate_limits": {"commands_per_min": 30}
}
```
- **Rejection (422) if:** schema invalid; `id` ≠ folder name; any `emits`/`consumes` type not in the catalog (active or reserved); an emitted type's namespace ≠ the connector id (except `mock_publisher`, which emits nothing); `transport=http` without `base_url`.
- **Loading:** all manifests in `connectors/*/manifest.json` are loaded on API startup (upsert). Changes emit `hub.connector.registered`.
- **Shipped manifests:** `tamkoa` (commands: `research.run`; emits `tamkoa.story.created|updated`, `tamkoa.alert.raised`, `tamkoa.health.warning`, `tamkoa.command.*`), `tumkao` (above), `mock_publisher` (kind `publisher`, no commands).

### D8.3 Webhook intake
- **Headers:** `X-Hermes-Timestamp` (unix seconds) and `X-Hermes-Signature: sha256=<hex(HMAC_SHA256(secret, f"{ts}.{raw_body}"))>`.
- **Checks, in order:**
  1. Connector exists and is enabled (404/403).
  2. Body ≤ 256 KB (413).
  3. `|now − ts| ≤ 300 s` (401 `STALE_TIMESTAMP`).
  4. Constant-time signature compare (401 `BAD_SIGNATURE`).
  5. Envelope valid (422).
  6. `type ∈ manifest.emits` and `source == connector id` (403 `NOT_ALLOWED_EVENT`).
  7. Insert into outbox with `origin=external`. If `event_id` already exists → 200 `{"status":"duplicate"}`.
- **Output:** 202 `{"status":"accepted","event_id":…}`.

### D8.4 Stubs (Phase 1, `app/connectors/stubs/`)
- **TumkaoStub:**
  - `draft.create` → after `MOCK_WORKER_DELAY_S`, creates a `stub_tumkao_drafts` v1 with deterministic Thai mock content `{caption, hashtags[], attribution{source_url}, compliance{status:"pass",risk_level:"low"}}`, then emits `tumkao.draft.ready_for_approval`.
  - `draft.revise` → v+1, with feedback echoed into the caption.
  - `publication.create` → loads the **current** draft, calls `MockPublisher.publish(content, proof)` (which calls `verify_approval_proof`), then emits `published` or `failed`.
  - `STUB_PUBLISH_FAIL_MODE=none|retriable_once|permanent` exists for tests.
- **TamkoaStub:**
  - `research.run` → emits `tamkoa.command.completed{result:{summary_th}}`. Lifecycle stores it as a `note` artifact.
  - `/dev emit-story score:<0-100> title:<…> level:<…>` emits `tamkoa.story.created`, and then, if `level == urgent`, `tamkoa.alert.raised` (in this order, same correlation_id).
- **MockPublisher:** records calls in memory and in `stub_tumkao_publications`, and returns `url = "https://mock.local/p/{pub_id}"`.

## D9. Discord Bot

### D9.1 Setup
- discord.py 2.x, with commands synced per guild (`DISCORD_GUILD_ID`).
- Every interaction is deferred within 3 s. Errors are ephemeral.
- All user-facing strings live in `app/notifier/templates_th.py` (Thai).

### D9.2 Slash commands
| Command | Role |
|---|---|
| `/help` | anyone |
| `/status` | viewer+ — counts by state, pending approvals, limits summary, worker heartbeat |
| `/project create key name [description]` · `/project list` · `/project show key` | owner · viewer+ · viewer+ |
| `/ticket create project title type priority approval [publish_target] [description]` | approver+ |
| `/ticket list [project] [state]` · `/ticket show code` | viewer+ |
| `/ticket start\|cancel\|resume\|retry\|reopen code [reason]` | approver+ |
| `/task add ticket title executor` · `/task list ticket` · `/task done id [note]` · `/task fail id reason` | approver+ / viewer+ |
| `/artifact add ticket text` (stored as a `draft`, content `{caption:text}`) | approver+ |
| `/approval list` | viewer+ |
| `/limit list` · `/limit set resource max [reset_at] [period]` · `/limit use resource amount` | viewer+ · owner · owner |
| `/schedule add name (cron\|at) action...` · `/schedule list` · `/schedule remove id` | owner · viewer+ · owner |
| `/workflow list` · `/workflow reload` · `/workflow run id [payload_json]` | viewer+ · owner · owner |
| `/report today` (preview, not stored) · `/report run date` | viewer+ · owner |
| `/role set user role` · `/token create` | owner |
| `/dev emit-story` · `/dev mutate-draft` | owner, dev only |

### D9.3 Free text (`#hermes-command` only; D12 policy)
- Read intents run when confidence ≥ 0.85.
- Create intents show a **confirm card** with buttons `nl:{command_id}:{ok|no}:{tag}`, valid for 10 minutes.
- Confidence 0.60–0.85 → "หมายถึง … ใช่ไหม?" with a confirm button.
- Confidence < 0.60 → a clarifying question plus `/help`.
- Forbidden intents → "คำสั่งนี้ต้องใช้ปุ่มหรือ slash command: `/ticket cancel …`".

### D9.4 Notifications (worker → Discord REST; honour 429 `retry_after`)
| Event | Channel | Content (Thai) |
|---|---|---|
| hub.approval.requested | #hermes-approvals | Card: `ขออนุมัติ: {code} {title}` · โปรเจกต์ · ลำดับความสำคัญ · ความเสี่ยง · แหล่งที่มา · หมดอายุ `<t:unix:R>` · hash 12 ตัว · preview (≤ 1000 chars) · buttons ✅ อนุมัติ / ✏️ ขอแก้ / ❌ ปฏิเสธ |
| hub.approval.* decided/expired | #hermes-approvals | edit the original card, disable buttons |
| ticket → blocked / failed | #hermes-alerts | reason + suggested command |
| ticket → done | #hermes-command | short confirmation (+ URL if published) |
| hub.limit.warning / exhausted / unlocked | #hermes-alerts | resource, %, countdown |
| hub.workflow.failed, hub.dlq.dead_lettered, hub.connector.health_changed(down), worker loop crash | #hermes-alerts | error summary + `/v1/events/{id}/requeue` hint |
| tamkoa.alert.raised(urgent) | #hermes-alerts | 🚨 title + story id |
| hub.report.daily | #hermes-reports | the report embed |

## D10. Workflow Engine & Schedules

### D10.1 YAML schema (`workflows/*.yaml`)
```yaml
workflow_id: news-to-content          # ^[a-z0-9-]+$
version: 1                            # int; bump on change
enabled: true
trigger:
  events: [tamkoa.story.created, tamkoa.story.updated]
  condition: {">=": [{"var": "event.payload.final_score"}, 80]}   # JSONLogic subset
  once_per: "{{ event.subject.id }}"  # optional → workflow_runs.subject_key
steps:
  - id: ticket
    type: create_ticket
    with:
      project_key: TMK
      title: "คอนเทนต์จากข่าว: {{ event.payload.title_th }}"
      type: content
      priority: "{{ 'P1' if event.payload.alert_level == 'urgent' else 'P2' }}"
      approval_required: true
      publish_target: tumkao
      subject_ref: {kind: story, id: "{{ event.subject.id }}"}
  - id: draft
    type: create_task
    with:
      ticket_id: "{{ steps.ticket.output.ticket_id }}"
      title: "ร่างโพสต์"
      executor: "connector:tumkao:draft.create"
      input: {brief: {story_id: "{{ event.subject.id }}", summary_th: "{{ event.payload.summary_th }}"}}
on_failure: notify_and_fail   # notify_and_fail | ignore
```

### D10.2 Rules
- **Step types (closed set):** `create_ticket`, `create_task`, `send_command`, `wait_for_event` (`event`, `match`, `timeout` ISO-8601), `emit_event` (hub namespace only), `transition_ticket` (must be a legal transition), `notify` (`channel`, `template`).
- **Per-step defaults:** `timeout: PT2M`, `retries: 3` (backoff 5/20/60 s).
- **Templating:** Jinja2 `SandboxedEnvironment` with `StrictUndefined`. Context = `event`, `steps.<id>.output`, `run`. Rendering errors fail the step.
- **JSONLogic subset (in-house, no eval):** `var, ==, !=, >, >=, <, <=, and, or, !, in, missing`. Unknown operator → workflow load error.
- **Loading:** at startup and on `/workflow reload`. Invalid files are skipped and reported to #hermes-alerts. A changed checksum without a version bump is a load error. Running runs keep their version.
- **once_per:** a duplicate key → silently skip (debug log); this is not an error.
- **Shipped workflows:** `news-to-content.yaml` (above), `urgent-alert.yaml` (trigger `tamkoa.alert.raised` with level `urgent` → `notify #hermes-alerts`), `daily-research.yaml` (manual/schedule → ticket in `TMK` with task `connector:tamkoa:research.run`, `approval_required:false`).

### D10.3 Schedules
- **Actions:** `{kind: create_ticket, with: {...}}` | `{kind: run_workflow, workflow_id, payload}` | `{kind: command, name, args}`.
- **Cron** uses `croniter` in the schedule's timezone. `once` uses `run_at`.
- **Firing:** claim due rows with `SKIP LOCKED`, execute, set `last_run_at`, compute `next_run_at`, emit `hub.schedule.fired`.
- **Missed runs:** if more than one occurrence was missed, run **once** (catch-up) and log `missed_count`.
- **System schedules (seeded, `is_system=true`, undeletable):** `daily-report` `0 0 * * *` Asia/Bangkok.

## D11. Limits

- **Seed:** `config/limits.seed.yaml` defines the initial limits (e.g. `codex_plus`, `claude_pro`, `gemini_api`, `qwen`) and `executor_limits`. It is idempotent upsert by `resource` and never overwrites `quota_used`.
- **Usage:**
  - **Input:** `/limit use`, `POST /v1/limits/{id}/usage`, or automatic (each Gemini intent call adds 1 to `gemini_api`).
  - **Process:** insert into `limit_usage`; `quota_used += amount`; `pct = used/max`. Each threshold in `warn_usage_pct` crossed for the first time this period → `hub.limit.warning`. If `pct ≥ 1.0` → `state=exhausted`, emit `hub.limit.exhausted`.
  - **Output:** the updated Limit.
- **Reset loop:** when `now ≥ reset_at`:
  1. Set `quota_used=0`, `state=ok`, clear `warned`.
  2. Advance `reset_at += reset_period` until it is in the future.
  3. If the limit was exhausted → emit `hub.limit.unlocked`.
  4. If `action_on_unlock=resume_blocked`, resume tickets that are `blocked(quota, blocked_ref=limit_id)` (T04).
- **Reset-soon:** for each `d` in `warn_before_reset`, when `reset_at − now ≤ d` → warning once per period, `reason=reset_soon`, message "โควต้า {resource} จะรีเซ็ตใน {d} ยังใช้ไป {pct}%".
- **Countdown:** displayed with Discord `<t:unix:R>` and on the Visualizer.
- Codex/Claude subscription usage cannot be read by API, so it is tracked manually (`/limit use`). This is expected behaviour.

## D12. Intent Parser

- **Port:** `IntentParser.parse(text, actor) -> IntentResult{intent, confidence 0–1, entities, parser}`.
- **Intents:** `help, status, project_list, project_show, project_create, ticket_list, ticket_show, ticket_create, task_add, task_list, approval_list, limit_list, report_today, schedule_list, unknown`.
- **Forbidden (never executed from free text):** `approve, reject, request_changes, cancel, retry, resume, reopen, publish, role_set, limit_set, workflow_reload`.
- **GeminiIntentParser** (used when `USE_LLM_INTENT_PARSER=true` and `GEMINI_API_KEY` is set):
  - httpx call to the Gemini `generateContent` REST endpoint with `responseMimeType=application/json` and a response schema mirroring `IntentResult`.
  - System prompt lists the intents and entity schemas, plus Thai and English examples.
  - Timeout 15 s, 2 retries. On error, exhausted `gemini_api` limit, or invalid JSON → fall back to RegexIntentParser and log `fallback_reason`.
  - Model name comes from `GEMINI_MODEL`.
- **RegexIntentParser** (default; forced in pytest via conftest env): case-insensitive, Thai and English. A match gives confidence 1.0; no match → `unknown` with 0.0. Minimum grammar:

| Intent | Pattern (examples) |
|---|---|
| status | `^(status\|สถานะ)## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
```
- Type regex: `^[a-z]+\.[a-z_]+\.[a-z_]+## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
.
- `source` MUST equal the namespace prefix, except connector-sourced stubs, which use their namespace (`tamkoa`, `tumkao`).

### D6.2 Registry
- `shared/events/catalog.yaml` lists `type, version, producer, status(active|reserved), payload_model`.
- Each payload is a Pydantic model in `hermes_common.events.payloads`. `make schemas` exports JSON Schemas to `shared/events/<type>.v<n>.json` and `shared/schemas/`. CI fails if the exported files are stale.
- `EventBus.publish()` MUST raise `UnregisteredEventType` for types not `active`, and MUST validate the payload.

### D6.3 Active events (Phase 1)
| Type | Payload (required fields) |
|---|---|
| hub.project.created | project_id, key, name |
| hub.ticket.created | ticket_id, display_code, project_id, type, priority, approval_required, requested_by |
| hub.ticket.state_changed | ticket_id, display_code, from, to, reason?, blocked_reason? |
| hub.ticket.updated | ticket_id, changed_fields[] |
| hub.task.created | task_id, ticket_id, seq, executor |
| hub.task.state_changed | task_id, ticket_id, from, to, error? |
| hub.artifact.created | artifact_id, ticket_id, kind, version, content_sha256 |
| hub.approval.requested | approval_id, ticket_id, artifact_id, content_sha256, expires_at, priority |
| hub.approval.granted | approval_id, ticket_id, decided_by, proof |
| hub.approval.rejected | approval_id, ticket_id, decided_by, reason? |
| hub.approval.changes_requested | approval_id, ticket_id, decided_by, feedback, revision_count |
| hub.approval.expired | approval_id, ticket_id |
| hub.connector.registered | connector_id, version |
| hub.connector.health_changed | connector_id, from, to |
| hub.workflow.started / completed | run_id, workflow_id, trigger_event_id? |
| hub.workflow.failed | run_id, workflow_id, step_id, error |
| hub.limit.warning | limit_id, resource, reason(usage\|reset_soon), used_pct, reset_at? |
| hub.limit.exhausted | limit_id, resource, reset_at? |
| hub.limit.unlocked | limit_id, resource |
| hub.schedule.fired | schedule_id, action_kind, result_ref |
| hub.report.daily | report_date, metrics |
| hub.dlq.dead_lettered | event_id, event_type, subscriber, error |
| tamkoa.story.created / updated | story_id, title_th, summary_th, final_score (0–100), alert_level(urgent\|important\|none), sources[], rights{media_reuse} |
| tamkoa.alert.raised | story_id, level, title_th |
| tamkoa.health.warning | source_id, reason |
| tamkoa.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |
| tumkao.draft.ready_for_approval | ticket_id, task_id, draft_id, version, content, content_sha256 |
| tumkao.draft.compliance_failed | ticket_id, task_id, draft_id, findings[] |
| tumkao.publication.published | ticket_id, draft_id, version, publication_id, platform, url |
| tumkao.publication.failed | ticket_id, draft_id, retriable, error_code, message |
| tumkao.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |

**Reserved (Phase 2+, status `reserved`):**
- tamkoa: item.ingested, opportunity.detected, opportunity.deadline_soon, trend.spike
- tumkao: brief.created, publication.scheduled, metrics.updated, sponsor.lead_created

**Deleted forever:** `tumkao.draft.requested`, `tumkao.approval.requested`, `tumkao.content.published`, `tamkoa.alert.urgent`, `tamkoa.alert.important` (replaced by `alert.raised{level}`).

### D6.4 Transport (PostgresOutboxBus)
- **Publish:** `bus.publish(session, envelope)` inserts into `outbox` within the caller's transaction. It never commits by itself.
- **Fan-out:** for each `fanned_out=false` row, insert an `event_deliveries` row per matching subscriber, then set `fanned_out=true`.
- **Dispatch:**
  1. `SELECT … FROM event_deliveries WHERE state='pending' AND next_attempt_at<=now ORDER BY event_id LIMIT 50 FOR UPDATE SKIP LOCKED`.
  2. For each row, open a transaction, run the handler, and set `state='done'` in the **same** transaction. DB-side effects are therefore exactly-once. External side effects (Discord) are at-least-once, deduped by storing `discord_message_id` keyed by event_id.
- **Retry:** on failure, `attempts += 1` and `next_attempt_at = now + 5 s × 2^attempts`. After 5 attempts the delivery is `dead`, and the bus emits `hub.dlq.dead_lettered`. A handler of `hub.dlq.*` MUST NOT trigger another DLQ event.
- **Ordering:** best effort by event_id. Handlers MUST be idempotent and MUST re-check current state before acting.
- **Port:** `EventBus` protocol = `publish`, `run_fanout_once`, `run_dispatch_once`, `requeue_dead(event_id, subscriber)`. A future `RedisStreamsBus` implements the same protocol.

### D6.5 Phase 1 subscribers
| Subscriber | Consumes | Action |
|---|---|---|
| `lifecycle` | tumkao.*, tamkoa.command.*, hub.limit.unlocked | task completion, artifact creation, T05/T12/T13, auto-resume |
| `workflow_engine` | `*` | trigger matching + event_waiters |
| `discord_notifier` | see D9.4 | post/edit Discord messages |
| `connector_forwarder` | events in an enabled http connector's `consumes` | HTTP POST (no-op in Phase 1, since stubs are inprocess) |

## D7. REST API (`/v1`, JSON, Bearer or bot headers)

| Method & path | Role | Input | Output |
|---|---|---|---|
| GET /healthz · /readyz | public | — | 200 / 503 (DB + migrations at head) |
| GET /v1/me | any | — | user + role |
| POST /v1/projects | owner | key, name, description? | 201 Project |
| GET /v1/projects · /{key} | viewer+ | — | list / detail + counts by state |
| POST /v1/tickets | approver+ | project_key, title, type, priority, approval_required, publish_target?, description?, due_at?, tags?, dependencies?, tasks?[{title, executor, input}] | 201 Ticket |
| GET /v1/tickets | viewer+ | ?project&state&priority&cursor&limit≤100 | page |
| GET /v1/tickets/{id\|code} | viewer+ | — | ticket + tasks + artifacts + approvals + audit |
| POST /v1/tickets/{id}/actions/{start\|cancel\|resume\|retry\|reopen} | approver+ | reason? | 200 Ticket \| 409 |
| POST /v1/tickets/{id}/tasks | approver+ | title, executor, input? | 201 Task |
| POST /v1/tasks/{id}/actions/{done\|fail} | approver+ | note? / reason | 200 Task |
| POST /v1/tickets/{id}/artifacts | approver+ | kind, content | 201 Artifact (hash computed server-side) |
| GET /v1/approvals?state=pending | viewer+ | — | list |
| POST /v1/approvals/{id}/decision | approver+ | action, expected_sha256, reason?, feedback? | 200 Approval \| 403 \| 409 |
| POST /v1/commands | per intent | text \| {name, args} | 202 {command_id, state, result?} |
| POST /v1/commands/{id}/confirm | creator | — | 200 |
| GET/POST/PATCH /v1/limits · POST /v1/limits/{id}/usage | viewer+/owner | — / limit fields / amount, source | Limit |
| GET/POST/DELETE /v1/schedules | viewer+/owner | name, kind, cron_expr\|run_at, action | Schedule |
| GET /v1/workflows · POST /v1/workflows/reload · POST /v1/workflows/{id}/run | viewer+/owner/owner | — / — / payload | defs / reload report / run |
| GET /v1/reports/daily?date= · POST /v1/reports/daily/run | viewer+/owner | date | snapshot |
| GET /v1/connectors · POST /v1/connectors/register | viewer+/owner | manifest | Connector \| 422 MANIFEST_INVALID |
| POST /v1/webhooks/{connector_id} | HMAC | envelope | 202 \| 200 duplicate \| 401/403/413/422 |
| GET /v1/events?type&state · POST /v1/events/{event_id}/requeue | viewer+/owner | — | page / 200 |
| POST /v1/users/role · POST /v1/users/{id}/token | owner | discord_id, role / — | User / token (once) |
| POST /v1/dev/emit · POST /v1/dev/stub/tumkao/mutate-draft | owner, dev only | envelope / draft_id, patch | 202 |

- **Idempotency:** every POST that creates something or changes state MUST accept an `Idempotency-Key` header.
  - Same `(actor, key)` with the same request hash → return the stored response.
  - Same key with a different hash → 422 `IDEMPOTENCY_KEY_REUSED`.
  - The bot always sends `Idempotency-Key = interaction.id`.

## D8. Connectors & Webhooks

### D8.1 Ports (`app/connectors/base.py`)
```python
class ConnectorAdapter(Protocol):
    id: str
    manifest: ConnectorManifest
    async def send_command(self, cmd: ConnectorCommand) -> CommandAck: ...   # accepted|rejected(+reason)
    async def health(self) -> HealthStatus: ...

class PublisherAdapter(Protocol):
    platform: str
    def validate(self, content: dict) -> list[ValidationIssue]: ...
    async def publish(self, content: dict, proof: ApprovalProof) -> PublishResult: ...
```
`ConnectorCommand = {command_id, name, args, ticket_id?, task_id?, correlation_id, idempotency_key}`.

### D8.2 Manifest (`connectors/<id>/manifest.json`, validated by `hermes_common.manifest`)
```json
{
  "manifest_version": 1, "id": "tumkao", "name": "Tumkao Content Studio", "version": "0.1.0",
  "kind": ["worker", "publisher"], "transport": "inprocess", "base_url": null,
  "commands": [
    {"name": "draft.create", "args_schema": {"type": "object", "required": ["brief"]}},
    {"name": "draft.revise", "args_schema": {"type": "object", "required": ["draft_id", "feedback"]}},
    {"name": "publication.create", "args_schema": {"type": "object", "required": ["draft_id", "proof"]}}
  ],
  "emits": ["tumkao.draft.ready_for_approval", "tumkao.draft.compliance_failed",
            "tumkao.publication.published", "tumkao.publication.failed",
            "tumkao.command.completed", "tumkao.command.failed"],
  "consumes": [],
  "webhook": {"secret_env": "CONNECTOR_SECRET_TUMKAO"},
  "health": {"interval_s": 60},
  "rate_limits": {"commands_per_min": 30}
}
```
- **Rejection (422) if:** schema invalid; `id` ≠ folder name; any `emits`/`consumes` type not in the catalog (active or reserved); an emitted type's namespace ≠ the connector id (except `mock_publisher`, which emits nothing); `transport=http` without `base_url`.
- **Loading:** all manifests in `connectors/*/manifest.json` are loaded on API startup (upsert). Changes emit `hub.connector.registered`.
- **Shipped manifests:** `tamkoa` (commands: `research.run`; emits `tamkoa.story.created|updated`, `tamkoa.alert.raised`, `tamkoa.health.warning`, `tamkoa.command.*`), `tumkao` (above), `mock_publisher` (kind `publisher`, no commands).

### D8.3 Webhook intake
- **Headers:** `X-Hermes-Timestamp` (unix seconds) and `X-Hermes-Signature: sha256=<hex(HMAC_SHA256(secret, f"{ts}.{raw_body}"))>`.
- **Checks, in order:**
  1. Connector exists and is enabled (404/403).
  2. Body ≤ 256 KB (413).
  3. `|now − ts| ≤ 300 s` (401 `STALE_TIMESTAMP`).
  4. Constant-time signature compare (401 `BAD_SIGNATURE`).
  5. Envelope valid (422).
  6. `type ∈ manifest.emits` and `source == connector id` (403 `NOT_ALLOWED_EVENT`).
  7. Insert into outbox with `origin=external`. If `event_id` already exists → 200 `{"status":"duplicate"}`.
- **Output:** 202 `{"status":"accepted","event_id":…}`.

### D8.4 Stubs (Phase 1, `app/connectors/stubs/`)
- **TumkaoStub:**
  - `draft.create` → after `MOCK_WORKER_DELAY_S`, creates a `stub_tumkao_drafts` v1 with deterministic Thai mock content `{caption, hashtags[], attribution{source_url}, compliance{status:"pass",risk_level:"low"}}`, then emits `tumkao.draft.ready_for_approval`.
  - `draft.revise` → v+1, with feedback echoed into the caption.
  - `publication.create` → loads the **current** draft, calls `MockPublisher.publish(content, proof)` (which calls `verify_approval_proof`), then emits `published` or `failed`.
  - `STUB_PUBLISH_FAIL_MODE=none|retriable_once|permanent` exists for tests.
- **TamkoaStub:**
  - `research.run` → emits `tamkoa.command.completed{result:{summary_th}}`. Lifecycle stores it as a `note` artifact.
  - `/dev emit-story score:<0-100> title:<…> level:<…>` emits `tamkoa.story.created`, and then, if `level == urgent`, `tamkoa.alert.raised` (in this order, same correlation_id).
- **MockPublisher:** records calls in memory and in `stub_tumkao_publications`, and returns `url = "https://mock.local/p/{pub_id}"`.

## D9. Discord Bot

### D9.1 Setup
- discord.py 2.x, with commands synced per guild (`DISCORD_GUILD_ID`).
- Every interaction is deferred within 3 s. Errors are ephemeral.
- All user-facing strings live in `app/notifier/templates_th.py` (Thai).

### D9.2 Slash commands
| Command | Role |
|---|---|
| `/help` | anyone |
| `/status` | viewer+ — counts by state, pending approvals, limits summary, worker heartbeat |
| `/project create key name [description]` · `/project list` · `/project show key` | owner · viewer+ · viewer+ |
| `/ticket create project title type priority approval [publish_target] [description]` | approver+ |
| `/ticket list [project] [state]` · `/ticket show code` | viewer+ |
| `/ticket start\|cancel\|resume\|retry\|reopen code [reason]` | approver+ |
| `/task add ticket title executor` · `/task list ticket` · `/task done id [note]` · `/task fail id reason` | approver+ / viewer+ |
| `/artifact add ticket text` (stored as a `draft`, content `{caption:text}`) | approver+ |
| `/approval list` | viewer+ |
| `/limit list` · `/limit set resource max [reset_at] [period]` · `/limit use resource amount` | viewer+ · owner · owner |
| `/schedule add name (cron\|at) action...` · `/schedule list` · `/schedule remove id` | owner · viewer+ · owner |
| `/workflow list` · `/workflow reload` · `/workflow run id [payload_json]` | viewer+ · owner · owner |
| `/report today` (preview, not stored) · `/report run date` | viewer+ · owner |
| `/role set user role` · `/token create` | owner |
| `/dev emit-story` · `/dev mutate-draft` | owner, dev only |

### D9.3 Free text (`#hermes-command` only; D12 policy)
- Read intents run when confidence ≥ 0.85.
- Create intents show a **confirm card** with buttons `nl:{command_id}:{ok|no}:{tag}`, valid for 10 minutes.
- Confidence 0.60–0.85 → "หมายถึง … ใช่ไหม?" with a confirm button.
- Confidence < 0.60 → a clarifying question plus `/help`.
- Forbidden intents → "คำสั่งนี้ต้องใช้ปุ่มหรือ slash command: `/ticket cancel …`".

### D9.4 Notifications (worker → Discord REST; honour 429 `retry_after`)
| Event | Channel | Content (Thai) |
|---|---|---|
| hub.approval.requested | #hermes-approvals | Card: `ขออนุมัติ: {code} {title}` · โปรเจกต์ · ลำดับความสำคัญ · ความเสี่ยง · แหล่งที่มา · หมดอายุ `<t:unix:R>` · hash 12 ตัว · preview (≤ 1000 chars) · buttons ✅ อนุมัติ / ✏️ ขอแก้ / ❌ ปฏิเสธ |
| hub.approval.* decided/expired | #hermes-approvals | edit the original card, disable buttons |
| ticket → blocked / failed | #hermes-alerts | reason + suggested command |
| ticket → done | #hermes-command | short confirmation (+ URL if published) |
| hub.limit.warning / exhausted / unlocked | #hermes-alerts | resource, %, countdown |
| hub.workflow.failed, hub.dlq.dead_lettered, hub.connector.health_changed(down), worker loop crash | #hermes-alerts | error summary + `/v1/events/{id}/requeue` hint |
| tamkoa.alert.raised(urgent) | #hermes-alerts | 🚨 title + story id |
| hub.report.daily | #hermes-reports | the report embed |

## D10. Workflow Engine & Schedules

### D10.1 YAML schema (`workflows/*.yaml`)
```yaml
workflow_id: news-to-content          # ^[a-z0-9-]+$
version: 1                            # int; bump on change
enabled: true
trigger:
  events: [tamkoa.story.created, tamkoa.story.updated]
  condition: {">=": [{"var": "event.payload.final_score"}, 80]}   # JSONLogic subset
  once_per: "{{ event.subject.id }}"  # optional → workflow_runs.subject_key
steps:
  - id: ticket
    type: create_ticket
    with:
      project_key: TMK
      title: "คอนเทนต์จากข่าว: {{ event.payload.title_th }}"
      type: content
      priority: "{{ 'P1' if event.payload.alert_level == 'urgent' else 'P2' }}"
      approval_required: true
      publish_target: tumkao
      subject_ref: {kind: story, id: "{{ event.subject.id }}"}
  - id: draft
    type: create_task
    with:
      ticket_id: "{{ steps.ticket.output.ticket_id }}"
      title: "ร่างโพสต์"
      executor: "connector:tumkao:draft.create"
      input: {brief: {story_id: "{{ event.subject.id }}", summary_th: "{{ event.payload.summary_th }}"}}
on_failure: notify_and_fail   # notify_and_fail | ignore
 |
| ticket_list | `^(list\|ดู)\s*(tickets?\|ตั๋ว\|งาน)(\s+(?P<project>[A-Z]{2,6}))?## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
```
- Type regex: `^[a-z]+\.[a-z_]+\.[a-z_]+## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
.
- `source` MUST equal the namespace prefix, except connector-sourced stubs, which use their namespace (`tamkoa`, `tumkao`).

### D6.2 Registry
- `shared/events/catalog.yaml` lists `type, version, producer, status(active|reserved), payload_model`.
- Each payload is a Pydantic model in `hermes_common.events.payloads`. `make schemas` exports JSON Schemas to `shared/events/<type>.v<n>.json` and `shared/schemas/`. CI fails if the exported files are stale.
- `EventBus.publish()` MUST raise `UnregisteredEventType` for types not `active`, and MUST validate the payload.

### D6.3 Active events (Phase 1)
| Type | Payload (required fields) |
|---|---|
| hub.project.created | project_id, key, name |
| hub.ticket.created | ticket_id, display_code, project_id, type, priority, approval_required, requested_by |
| hub.ticket.state_changed | ticket_id, display_code, from, to, reason?, blocked_reason? |
| hub.ticket.updated | ticket_id, changed_fields[] |
| hub.task.created | task_id, ticket_id, seq, executor |
| hub.task.state_changed | task_id, ticket_id, from, to, error? |
| hub.artifact.created | artifact_id, ticket_id, kind, version, content_sha256 |
| hub.approval.requested | approval_id, ticket_id, artifact_id, content_sha256, expires_at, priority |
| hub.approval.granted | approval_id, ticket_id, decided_by, proof |
| hub.approval.rejected | approval_id, ticket_id, decided_by, reason? |
| hub.approval.changes_requested | approval_id, ticket_id, decided_by, feedback, revision_count |
| hub.approval.expired | approval_id, ticket_id |
| hub.connector.registered | connector_id, version |
| hub.connector.health_changed | connector_id, from, to |
| hub.workflow.started / completed | run_id, workflow_id, trigger_event_id? |
| hub.workflow.failed | run_id, workflow_id, step_id, error |
| hub.limit.warning | limit_id, resource, reason(usage\|reset_soon), used_pct, reset_at? |
| hub.limit.exhausted | limit_id, resource, reset_at? |
| hub.limit.unlocked | limit_id, resource |
| hub.schedule.fired | schedule_id, action_kind, result_ref |
| hub.report.daily | report_date, metrics |
| hub.dlq.dead_lettered | event_id, event_type, subscriber, error |
| tamkoa.story.created / updated | story_id, title_th, summary_th, final_score (0–100), alert_level(urgent\|important\|none), sources[], rights{media_reuse} |
| tamkoa.alert.raised | story_id, level, title_th |
| tamkoa.health.warning | source_id, reason |
| tamkoa.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |
| tumkao.draft.ready_for_approval | ticket_id, task_id, draft_id, version, content, content_sha256 |
| tumkao.draft.compliance_failed | ticket_id, task_id, draft_id, findings[] |
| tumkao.publication.published | ticket_id, draft_id, version, publication_id, platform, url |
| tumkao.publication.failed | ticket_id, draft_id, retriable, error_code, message |
| tumkao.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |

**Reserved (Phase 2+, status `reserved`):**
- tamkoa: item.ingested, opportunity.detected, opportunity.deadline_soon, trend.spike
- tumkao: brief.created, publication.scheduled, metrics.updated, sponsor.lead_created

**Deleted forever:** `tumkao.draft.requested`, `tumkao.approval.requested`, `tumkao.content.published`, `tamkoa.alert.urgent`, `tamkoa.alert.important` (replaced by `alert.raised{level}`).

### D6.4 Transport (PostgresOutboxBus)
- **Publish:** `bus.publish(session, envelope)` inserts into `outbox` within the caller's transaction. It never commits by itself.
- **Fan-out:** for each `fanned_out=false` row, insert an `event_deliveries` row per matching subscriber, then set `fanned_out=true`.
- **Dispatch:**
  1. `SELECT … FROM event_deliveries WHERE state='pending' AND next_attempt_at<=now ORDER BY event_id LIMIT 50 FOR UPDATE SKIP LOCKED`.
  2. For each row, open a transaction, run the handler, and set `state='done'` in the **same** transaction. DB-side effects are therefore exactly-once. External side effects (Discord) are at-least-once, deduped by storing `discord_message_id` keyed by event_id.
- **Retry:** on failure, `attempts += 1` and `next_attempt_at = now + 5 s × 2^attempts`. After 5 attempts the delivery is `dead`, and the bus emits `hub.dlq.dead_lettered`. A handler of `hub.dlq.*` MUST NOT trigger another DLQ event.
- **Ordering:** best effort by event_id. Handlers MUST be idempotent and MUST re-check current state before acting.
- **Port:** `EventBus` protocol = `publish`, `run_fanout_once`, `run_dispatch_once`, `requeue_dead(event_id, subscriber)`. A future `RedisStreamsBus` implements the same protocol.

### D6.5 Phase 1 subscribers
| Subscriber | Consumes | Action |
|---|---|---|
| `lifecycle` | tumkao.*, tamkoa.command.*, hub.limit.unlocked | task completion, artifact creation, T05/T12/T13, auto-resume |
| `workflow_engine` | `*` | trigger matching + event_waiters |
| `discord_notifier` | see D9.4 | post/edit Discord messages |
| `connector_forwarder` | events in an enabled http connector's `consumes` | HTTP POST (no-op in Phase 1, since stubs are inprocess) |

## D7. REST API (`/v1`, JSON, Bearer or bot headers)

| Method & path | Role | Input | Output |
|---|---|---|---|
| GET /healthz · /readyz | public | — | 200 / 503 (DB + migrations at head) |
| GET /v1/me | any | — | user + role |
| POST /v1/projects | owner | key, name, description? | 201 Project |
| GET /v1/projects · /{key} | viewer+ | — | list / detail + counts by state |
| POST /v1/tickets | approver+ | project_key, title, type, priority, approval_required, publish_target?, description?, due_at?, tags?, dependencies?, tasks?[{title, executor, input}] | 201 Ticket |
| GET /v1/tickets | viewer+ | ?project&state&priority&cursor&limit≤100 | page |
| GET /v1/tickets/{id\|code} | viewer+ | — | ticket + tasks + artifacts + approvals + audit |
| POST /v1/tickets/{id}/actions/{start\|cancel\|resume\|retry\|reopen} | approver+ | reason? | 200 Ticket \| 409 |
| POST /v1/tickets/{id}/tasks | approver+ | title, executor, input? | 201 Task |
| POST /v1/tasks/{id}/actions/{done\|fail} | approver+ | note? / reason | 200 Task |
| POST /v1/tickets/{id}/artifacts | approver+ | kind, content | 201 Artifact (hash computed server-side) |
| GET /v1/approvals?state=pending | viewer+ | — | list |
| POST /v1/approvals/{id}/decision | approver+ | action, expected_sha256, reason?, feedback? | 200 Approval \| 403 \| 409 |
| POST /v1/commands | per intent | text \| {name, args} | 202 {command_id, state, result?} |
| POST /v1/commands/{id}/confirm | creator | — | 200 |
| GET/POST/PATCH /v1/limits · POST /v1/limits/{id}/usage | viewer+/owner | — / limit fields / amount, source | Limit |
| GET/POST/DELETE /v1/schedules | viewer+/owner | name, kind, cron_expr\|run_at, action | Schedule |
| GET /v1/workflows · POST /v1/workflows/reload · POST /v1/workflows/{id}/run | viewer+/owner/owner | — / — / payload | defs / reload report / run |
| GET /v1/reports/daily?date= · POST /v1/reports/daily/run | viewer+/owner | date | snapshot |
| GET /v1/connectors · POST /v1/connectors/register | viewer+/owner | manifest | Connector \| 422 MANIFEST_INVALID |
| POST /v1/webhooks/{connector_id} | HMAC | envelope | 202 \| 200 duplicate \| 401/403/413/422 |
| GET /v1/events?type&state · POST /v1/events/{event_id}/requeue | viewer+/owner | — | page / 200 |
| POST /v1/users/role · POST /v1/users/{id}/token | owner | discord_id, role / — | User / token (once) |
| POST /v1/dev/emit · POST /v1/dev/stub/tumkao/mutate-draft | owner, dev only | envelope / draft_id, patch | 202 |

- **Idempotency:** every POST that creates something or changes state MUST accept an `Idempotency-Key` header.
  - Same `(actor, key)` with the same request hash → return the stored response.
  - Same key with a different hash → 422 `IDEMPOTENCY_KEY_REUSED`.
  - The bot always sends `Idempotency-Key = interaction.id`.

## D8. Connectors & Webhooks

### D8.1 Ports (`app/connectors/base.py`)
```python
class ConnectorAdapter(Protocol):
    id: str
    manifest: ConnectorManifest
    async def send_command(self, cmd: ConnectorCommand) -> CommandAck: ...   # accepted|rejected(+reason)
    async def health(self) -> HealthStatus: ...

class PublisherAdapter(Protocol):
    platform: str
    def validate(self, content: dict) -> list[ValidationIssue]: ...
    async def publish(self, content: dict, proof: ApprovalProof) -> PublishResult: ...
```
`ConnectorCommand = {command_id, name, args, ticket_id?, task_id?, correlation_id, idempotency_key}`.

### D8.2 Manifest (`connectors/<id>/manifest.json`, validated by `hermes_common.manifest`)
```json
{
  "manifest_version": 1, "id": "tumkao", "name": "Tumkao Content Studio", "version": "0.1.0",
  "kind": ["worker", "publisher"], "transport": "inprocess", "base_url": null,
  "commands": [
    {"name": "draft.create", "args_schema": {"type": "object", "required": ["brief"]}},
    {"name": "draft.revise", "args_schema": {"type": "object", "required": ["draft_id", "feedback"]}},
    {"name": "publication.create", "args_schema": {"type": "object", "required": ["draft_id", "proof"]}}
  ],
  "emits": ["tumkao.draft.ready_for_approval", "tumkao.draft.compliance_failed",
            "tumkao.publication.published", "tumkao.publication.failed",
            "tumkao.command.completed", "tumkao.command.failed"],
  "consumes": [],
  "webhook": {"secret_env": "CONNECTOR_SECRET_TUMKAO"},
  "health": {"interval_s": 60},
  "rate_limits": {"commands_per_min": 30}
}
```
- **Rejection (422) if:** schema invalid; `id` ≠ folder name; any `emits`/`consumes` type not in the catalog (active or reserved); an emitted type's namespace ≠ the connector id (except `mock_publisher`, which emits nothing); `transport=http` without `base_url`.
- **Loading:** all manifests in `connectors/*/manifest.json` are loaded on API startup (upsert). Changes emit `hub.connector.registered`.
- **Shipped manifests:** `tamkoa` (commands: `research.run`; emits `tamkoa.story.created|updated`, `tamkoa.alert.raised`, `tamkoa.health.warning`, `tamkoa.command.*`), `tumkao` (above), `mock_publisher` (kind `publisher`, no commands).

### D8.3 Webhook intake
- **Headers:** `X-Hermes-Timestamp` (unix seconds) and `X-Hermes-Signature: sha256=<hex(HMAC_SHA256(secret, f"{ts}.{raw_body}"))>`.
- **Checks, in order:**
  1. Connector exists and is enabled (404/403).
  2. Body ≤ 256 KB (413).
  3. `|now − ts| ≤ 300 s` (401 `STALE_TIMESTAMP`).
  4. Constant-time signature compare (401 `BAD_SIGNATURE`).
  5. Envelope valid (422).
  6. `type ∈ manifest.emits` and `source == connector id` (403 `NOT_ALLOWED_EVENT`).
  7. Insert into outbox with `origin=external`. If `event_id` already exists → 200 `{"status":"duplicate"}`.
- **Output:** 202 `{"status":"accepted","event_id":…}`.

### D8.4 Stubs (Phase 1, `app/connectors/stubs/`)
- **TumkaoStub:**
  - `draft.create` → after `MOCK_WORKER_DELAY_S`, creates a `stub_tumkao_drafts` v1 with deterministic Thai mock content `{caption, hashtags[], attribution{source_url}, compliance{status:"pass",risk_level:"low"}}`, then emits `tumkao.draft.ready_for_approval`.
  - `draft.revise` → v+1, with feedback echoed into the caption.
  - `publication.create` → loads the **current** draft, calls `MockPublisher.publish(content, proof)` (which calls `verify_approval_proof`), then emits `published` or `failed`.
  - `STUB_PUBLISH_FAIL_MODE=none|retriable_once|permanent` exists for tests.
- **TamkoaStub:**
  - `research.run` → emits `tamkoa.command.completed{result:{summary_th}}`. Lifecycle stores it as a `note` artifact.
  - `/dev emit-story score:<0-100> title:<…> level:<…>` emits `tamkoa.story.created`, and then, if `level == urgent`, `tamkoa.alert.raised` (in this order, same correlation_id).
- **MockPublisher:** records calls in memory and in `stub_tumkao_publications`, and returns `url = "https://mock.local/p/{pub_id}"`.

## D9. Discord Bot

### D9.1 Setup
- discord.py 2.x, with commands synced per guild (`DISCORD_GUILD_ID`).
- Every interaction is deferred within 3 s. Errors are ephemeral.
- All user-facing strings live in `app/notifier/templates_th.py` (Thai).

### D9.2 Slash commands
| Command | Role |
|---|---|
| `/help` | anyone |
| `/status` | viewer+ — counts by state, pending approvals, limits summary, worker heartbeat |
| `/project create key name [description]` · `/project list` · `/project show key` | owner · viewer+ · viewer+ |
| `/ticket create project title type priority approval [publish_target] [description]` | approver+ |
| `/ticket list [project] [state]` · `/ticket show code` | viewer+ |
| `/ticket start\|cancel\|resume\|retry\|reopen code [reason]` | approver+ |
| `/task add ticket title executor` · `/task list ticket` · `/task done id [note]` · `/task fail id reason` | approver+ / viewer+ |
| `/artifact add ticket text` (stored as a `draft`, content `{caption:text}`) | approver+ |
| `/approval list` | viewer+ |
| `/limit list` · `/limit set resource max [reset_at] [period]` · `/limit use resource amount` | viewer+ · owner · owner |
| `/schedule add name (cron\|at) action...` · `/schedule list` · `/schedule remove id` | owner · viewer+ · owner |
| `/workflow list` · `/workflow reload` · `/workflow run id [payload_json]` | viewer+ · owner · owner |
| `/report today` (preview, not stored) · `/report run date` | viewer+ · owner |
| `/role set user role` · `/token create` | owner |
| `/dev emit-story` · `/dev mutate-draft` | owner, dev only |

### D9.3 Free text (`#hermes-command` only; D12 policy)
- Read intents run when confidence ≥ 0.85.
- Create intents show a **confirm card** with buttons `nl:{command_id}:{ok|no}:{tag}`, valid for 10 minutes.
- Confidence 0.60–0.85 → "หมายถึง … ใช่ไหม?" with a confirm button.
- Confidence < 0.60 → a clarifying question plus `/help`.
- Forbidden intents → "คำสั่งนี้ต้องใช้ปุ่มหรือ slash command: `/ticket cancel …`".

### D9.4 Notifications (worker → Discord REST; honour 429 `retry_after`)
| Event | Channel | Content (Thai) |
|---|---|---|
| hub.approval.requested | #hermes-approvals | Card: `ขออนุมัติ: {code} {title}` · โปรเจกต์ · ลำดับความสำคัญ · ความเสี่ยง · แหล่งที่มา · หมดอายุ `<t:unix:R>` · hash 12 ตัว · preview (≤ 1000 chars) · buttons ✅ อนุมัติ / ✏️ ขอแก้ / ❌ ปฏิเสธ |
| hub.approval.* decided/expired | #hermes-approvals | edit the original card, disable buttons |
| ticket → blocked / failed | #hermes-alerts | reason + suggested command |
| ticket → done | #hermes-command | short confirmation (+ URL if published) |
| hub.limit.warning / exhausted / unlocked | #hermes-alerts | resource, %, countdown |
| hub.workflow.failed, hub.dlq.dead_lettered, hub.connector.health_changed(down), worker loop crash | #hermes-alerts | error summary + `/v1/events/{id}/requeue` hint |
| tamkoa.alert.raised(urgent) | #hermes-alerts | 🚨 title + story id |
| hub.report.daily | #hermes-reports | the report embed |

## D10. Workflow Engine & Schedules

### D10.1 YAML schema (`workflows/*.yaml`)
```yaml
workflow_id: news-to-content          # ^[a-z0-9-]+$
version: 1                            # int; bump on change
enabled: true
trigger:
  events: [tamkoa.story.created, tamkoa.story.updated]
  condition: {">=": [{"var": "event.payload.final_score"}, 80]}   # JSONLogic subset
  once_per: "{{ event.subject.id }}"  # optional → workflow_runs.subject_key
steps:
  - id: ticket
    type: create_ticket
    with:
      project_key: TMK
      title: "คอนเทนต์จากข่าว: {{ event.payload.title_th }}"
      type: content
      priority: "{{ 'P1' if event.payload.alert_level == 'urgent' else 'P2' }}"
      approval_required: true
      publish_target: tumkao
      subject_ref: {kind: story, id: "{{ event.subject.id }}"}
  - id: draft
    type: create_task
    with:
      ticket_id: "{{ steps.ticket.output.ticket_id }}"
      title: "ร่างโพสต์"
      executor: "connector:tumkao:draft.create"
      input: {brief: {story_id: "{{ event.subject.id }}", summary_th: "{{ event.payload.summary_th }}"}}
on_failure: notify_and_fail   # notify_and_fail | ignore
 |
| ticket_show | `^(show\|ดู)\s+(?P<code>[A-Z]{2,6}-\d{4})## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
```
- Type regex: `^[a-z]+\.[a-z_]+\.[a-z_]+## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
.
- `source` MUST equal the namespace prefix, except connector-sourced stubs, which use their namespace (`tamkoa`, `tumkao`).

### D6.2 Registry
- `shared/events/catalog.yaml` lists `type, version, producer, status(active|reserved), payload_model`.
- Each payload is a Pydantic model in `hermes_common.events.payloads`. `make schemas` exports JSON Schemas to `shared/events/<type>.v<n>.json` and `shared/schemas/`. CI fails if the exported files are stale.
- `EventBus.publish()` MUST raise `UnregisteredEventType` for types not `active`, and MUST validate the payload.

### D6.3 Active events (Phase 1)
| Type | Payload (required fields) |
|---|---|
| hub.project.created | project_id, key, name |
| hub.ticket.created | ticket_id, display_code, project_id, type, priority, approval_required, requested_by |
| hub.ticket.state_changed | ticket_id, display_code, from, to, reason?, blocked_reason? |
| hub.ticket.updated | ticket_id, changed_fields[] |
| hub.task.created | task_id, ticket_id, seq, executor |
| hub.task.state_changed | task_id, ticket_id, from, to, error? |
| hub.artifact.created | artifact_id, ticket_id, kind, version, content_sha256 |
| hub.approval.requested | approval_id, ticket_id, artifact_id, content_sha256, expires_at, priority |
| hub.approval.granted | approval_id, ticket_id, decided_by, proof |
| hub.approval.rejected | approval_id, ticket_id, decided_by, reason? |
| hub.approval.changes_requested | approval_id, ticket_id, decided_by, feedback, revision_count |
| hub.approval.expired | approval_id, ticket_id |
| hub.connector.registered | connector_id, version |
| hub.connector.health_changed | connector_id, from, to |
| hub.workflow.started / completed | run_id, workflow_id, trigger_event_id? |
| hub.workflow.failed | run_id, workflow_id, step_id, error |
| hub.limit.warning | limit_id, resource, reason(usage\|reset_soon), used_pct, reset_at? |
| hub.limit.exhausted | limit_id, resource, reset_at? |
| hub.limit.unlocked | limit_id, resource |
| hub.schedule.fired | schedule_id, action_kind, result_ref |
| hub.report.daily | report_date, metrics |
| hub.dlq.dead_lettered | event_id, event_type, subscriber, error |
| tamkoa.story.created / updated | story_id, title_th, summary_th, final_score (0–100), alert_level(urgent\|important\|none), sources[], rights{media_reuse} |
| tamkoa.alert.raised | story_id, level, title_th |
| tamkoa.health.warning | source_id, reason |
| tamkoa.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |
| tumkao.draft.ready_for_approval | ticket_id, task_id, draft_id, version, content, content_sha256 |
| tumkao.draft.compliance_failed | ticket_id, task_id, draft_id, findings[] |
| tumkao.publication.published | ticket_id, draft_id, version, publication_id, platform, url |
| tumkao.publication.failed | ticket_id, draft_id, retriable, error_code, message |
| tumkao.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |

**Reserved (Phase 2+, status `reserved`):**
- tamkoa: item.ingested, opportunity.detected, opportunity.deadline_soon, trend.spike
- tumkao: brief.created, publication.scheduled, metrics.updated, sponsor.lead_created

**Deleted forever:** `tumkao.draft.requested`, `tumkao.approval.requested`, `tumkao.content.published`, `tamkoa.alert.urgent`, `tamkoa.alert.important` (replaced by `alert.raised{level}`).

### D6.4 Transport (PostgresOutboxBus)
- **Publish:** `bus.publish(session, envelope)` inserts into `outbox` within the caller's transaction. It never commits by itself.
- **Fan-out:** for each `fanned_out=false` row, insert an `event_deliveries` row per matching subscriber, then set `fanned_out=true`.
- **Dispatch:**
  1. `SELECT … FROM event_deliveries WHERE state='pending' AND next_attempt_at<=now ORDER BY event_id LIMIT 50 FOR UPDATE SKIP LOCKED`.
  2. For each row, open a transaction, run the handler, and set `state='done'` in the **same** transaction. DB-side effects are therefore exactly-once. External side effects (Discord) are at-least-once, deduped by storing `discord_message_id` keyed by event_id.
- **Retry:** on failure, `attempts += 1` and `next_attempt_at = now + 5 s × 2^attempts`. After 5 attempts the delivery is `dead`, and the bus emits `hub.dlq.dead_lettered`. A handler of `hub.dlq.*` MUST NOT trigger another DLQ event.
- **Ordering:** best effort by event_id. Handlers MUST be idempotent and MUST re-check current state before acting.
- **Port:** `EventBus` protocol = `publish`, `run_fanout_once`, `run_dispatch_once`, `requeue_dead(event_id, subscriber)`. A future `RedisStreamsBus` implements the same protocol.

### D6.5 Phase 1 subscribers
| Subscriber | Consumes | Action |
|---|---|---|
| `lifecycle` | tumkao.*, tamkoa.command.*, hub.limit.unlocked | task completion, artifact creation, T05/T12/T13, auto-resume |
| `workflow_engine` | `*` | trigger matching + event_waiters |
| `discord_notifier` | see D9.4 | post/edit Discord messages |
| `connector_forwarder` | events in an enabled http connector's `consumes` | HTTP POST (no-op in Phase 1, since stubs are inprocess) |

## D7. REST API (`/v1`, JSON, Bearer or bot headers)

| Method & path | Role | Input | Output |
|---|---|---|---|
| GET /healthz · /readyz | public | — | 200 / 503 (DB + migrations at head) |
| GET /v1/me | any | — | user + role |
| POST /v1/projects | owner | key, name, description? | 201 Project |
| GET /v1/projects · /{key} | viewer+ | — | list / detail + counts by state |
| POST /v1/tickets | approver+ | project_key, title, type, priority, approval_required, publish_target?, description?, due_at?, tags?, dependencies?, tasks?[{title, executor, input}] | 201 Ticket |
| GET /v1/tickets | viewer+ | ?project&state&priority&cursor&limit≤100 | page |
| GET /v1/tickets/{id\|code} | viewer+ | — | ticket + tasks + artifacts + approvals + audit |
| POST /v1/tickets/{id}/actions/{start\|cancel\|resume\|retry\|reopen} | approver+ | reason? | 200 Ticket \| 409 |
| POST /v1/tickets/{id}/tasks | approver+ | title, executor, input? | 201 Task |
| POST /v1/tasks/{id}/actions/{done\|fail} | approver+ | note? / reason | 200 Task |
| POST /v1/tickets/{id}/artifacts | approver+ | kind, content | 201 Artifact (hash computed server-side) |
| GET /v1/approvals?state=pending | viewer+ | — | list |
| POST /v1/approvals/{id}/decision | approver+ | action, expected_sha256, reason?, feedback? | 200 Approval \| 403 \| 409 |
| POST /v1/commands | per intent | text \| {name, args} | 202 {command_id, state, result?} |
| POST /v1/commands/{id}/confirm | creator | — | 200 |
| GET/POST/PATCH /v1/limits · POST /v1/limits/{id}/usage | viewer+/owner | — / limit fields / amount, source | Limit |
| GET/POST/DELETE /v1/schedules | viewer+/owner | name, kind, cron_expr\|run_at, action | Schedule |
| GET /v1/workflows · POST /v1/workflows/reload · POST /v1/workflows/{id}/run | viewer+/owner/owner | — / — / payload | defs / reload report / run |
| GET /v1/reports/daily?date= · POST /v1/reports/daily/run | viewer+/owner | date | snapshot |
| GET /v1/connectors · POST /v1/connectors/register | viewer+/owner | manifest | Connector \| 422 MANIFEST_INVALID |
| POST /v1/webhooks/{connector_id} | HMAC | envelope | 202 \| 200 duplicate \| 401/403/413/422 |
| GET /v1/events?type&state · POST /v1/events/{event_id}/requeue | viewer+/owner | — | page / 200 |
| POST /v1/users/role · POST /v1/users/{id}/token | owner | discord_id, role / — | User / token (once) |
| POST /v1/dev/emit · POST /v1/dev/stub/tumkao/mutate-draft | owner, dev only | envelope / draft_id, patch | 202 |

- **Idempotency:** every POST that creates something or changes state MUST accept an `Idempotency-Key` header.
  - Same `(actor, key)` with the same request hash → return the stored response.
  - Same key with a different hash → 422 `IDEMPOTENCY_KEY_REUSED`.
  - The bot always sends `Idempotency-Key = interaction.id`.

## D8. Connectors & Webhooks

### D8.1 Ports (`app/connectors/base.py`)
```python
class ConnectorAdapter(Protocol):
    id: str
    manifest: ConnectorManifest
    async def send_command(self, cmd: ConnectorCommand) -> CommandAck: ...   # accepted|rejected(+reason)
    async def health(self) -> HealthStatus: ...

class PublisherAdapter(Protocol):
    platform: str
    def validate(self, content: dict) -> list[ValidationIssue]: ...
    async def publish(self, content: dict, proof: ApprovalProof) -> PublishResult: ...
```
`ConnectorCommand = {command_id, name, args, ticket_id?, task_id?, correlation_id, idempotency_key}`.

### D8.2 Manifest (`connectors/<id>/manifest.json`, validated by `hermes_common.manifest`)
```json
{
  "manifest_version": 1, "id": "tumkao", "name": "Tumkao Content Studio", "version": "0.1.0",
  "kind": ["worker", "publisher"], "transport": "inprocess", "base_url": null,
  "commands": [
    {"name": "draft.create", "args_schema": {"type": "object", "required": ["brief"]}},
    {"name": "draft.revise", "args_schema": {"type": "object", "required": ["draft_id", "feedback"]}},
    {"name": "publication.create", "args_schema": {"type": "object", "required": ["draft_id", "proof"]}}
  ],
  "emits": ["tumkao.draft.ready_for_approval", "tumkao.draft.compliance_failed",
            "tumkao.publication.published", "tumkao.publication.failed",
            "tumkao.command.completed", "tumkao.command.failed"],
  "consumes": [],
  "webhook": {"secret_env": "CONNECTOR_SECRET_TUMKAO"},
  "health": {"interval_s": 60},
  "rate_limits": {"commands_per_min": 30}
}
```
- **Rejection (422) if:** schema invalid; `id` ≠ folder name; any `emits`/`consumes` type not in the catalog (active or reserved); an emitted type's namespace ≠ the connector id (except `mock_publisher`, which emits nothing); `transport=http` without `base_url`.
- **Loading:** all manifests in `connectors/*/manifest.json` are loaded on API startup (upsert). Changes emit `hub.connector.registered`.
- **Shipped manifests:** `tamkoa` (commands: `research.run`; emits `tamkoa.story.created|updated`, `tamkoa.alert.raised`, `tamkoa.health.warning`, `tamkoa.command.*`), `tumkao` (above), `mock_publisher` (kind `publisher`, no commands).

### D8.3 Webhook intake
- **Headers:** `X-Hermes-Timestamp` (unix seconds) and `X-Hermes-Signature: sha256=<hex(HMAC_SHA256(secret, f"{ts}.{raw_body}"))>`.
- **Checks, in order:**
  1. Connector exists and is enabled (404/403).
  2. Body ≤ 256 KB (413).
  3. `|now − ts| ≤ 300 s` (401 `STALE_TIMESTAMP`).
  4. Constant-time signature compare (401 `BAD_SIGNATURE`).
  5. Envelope valid (422).
  6. `type ∈ manifest.emits` and `source == connector id` (403 `NOT_ALLOWED_EVENT`).
  7. Insert into outbox with `origin=external`. If `event_id` already exists → 200 `{"status":"duplicate"}`.
- **Output:** 202 `{"status":"accepted","event_id":…}`.

### D8.4 Stubs (Phase 1, `app/connectors/stubs/`)
- **TumkaoStub:**
  - `draft.create` → after `MOCK_WORKER_DELAY_S`, creates a `stub_tumkao_drafts` v1 with deterministic Thai mock content `{caption, hashtags[], attribution{source_url}, compliance{status:"pass",risk_level:"low"}}`, then emits `tumkao.draft.ready_for_approval`.
  - `draft.revise` → v+1, with feedback echoed into the caption.
  - `publication.create` → loads the **current** draft, calls `MockPublisher.publish(content, proof)` (which calls `verify_approval_proof`), then emits `published` or `failed`.
  - `STUB_PUBLISH_FAIL_MODE=none|retriable_once|permanent` exists for tests.
- **TamkoaStub:**
  - `research.run` → emits `tamkoa.command.completed{result:{summary_th}}`. Lifecycle stores it as a `note` artifact.
  - `/dev emit-story score:<0-100> title:<…> level:<…>` emits `tamkoa.story.created`, and then, if `level == urgent`, `tamkoa.alert.raised` (in this order, same correlation_id).
- **MockPublisher:** records calls in memory and in `stub_tumkao_publications`, and returns `url = "https://mock.local/p/{pub_id}"`.

## D9. Discord Bot

### D9.1 Setup
- discord.py 2.x, with commands synced per guild (`DISCORD_GUILD_ID`).
- Every interaction is deferred within 3 s. Errors are ephemeral.
- All user-facing strings live in `app/notifier/templates_th.py` (Thai).

### D9.2 Slash commands
| Command | Role |
|---|---|
| `/help` | anyone |
| `/status` | viewer+ — counts by state, pending approvals, limits summary, worker heartbeat |
| `/project create key name [description]` · `/project list` · `/project show key` | owner · viewer+ · viewer+ |
| `/ticket create project title type priority approval [publish_target] [description]` | approver+ |
| `/ticket list [project] [state]` · `/ticket show code` | viewer+ |
| `/ticket start\|cancel\|resume\|retry\|reopen code [reason]` | approver+ |
| `/task add ticket title executor` · `/task list ticket` · `/task done id [note]` · `/task fail id reason` | approver+ / viewer+ |
| `/artifact add ticket text` (stored as a `draft`, content `{caption:text}`) | approver+ |
| `/approval list` | viewer+ |
| `/limit list` · `/limit set resource max [reset_at] [period]` · `/limit use resource amount` | viewer+ · owner · owner |
| `/schedule add name (cron\|at) action...` · `/schedule list` · `/schedule remove id` | owner · viewer+ · owner |
| `/workflow list` · `/workflow reload` · `/workflow run id [payload_json]` | viewer+ · owner · owner |
| `/report today` (preview, not stored) · `/report run date` | viewer+ · owner |
| `/role set user role` · `/token create` | owner |
| `/dev emit-story` · `/dev mutate-draft` | owner, dev only |

### D9.3 Free text (`#hermes-command` only; D12 policy)
- Read intents run when confidence ≥ 0.85.
- Create intents show a **confirm card** with buttons `nl:{command_id}:{ok|no}:{tag}`, valid for 10 minutes.
- Confidence 0.60–0.85 → "หมายถึง … ใช่ไหม?" with a confirm button.
- Confidence < 0.60 → a clarifying question plus `/help`.
- Forbidden intents → "คำสั่งนี้ต้องใช้ปุ่มหรือ slash command: `/ticket cancel …`".

### D9.4 Notifications (worker → Discord REST; honour 429 `retry_after`)
| Event | Channel | Content (Thai) |
|---|---|---|
| hub.approval.requested | #hermes-approvals | Card: `ขออนุมัติ: {code} {title}` · โปรเจกต์ · ลำดับความสำคัญ · ความเสี่ยง · แหล่งที่มา · หมดอายุ `<t:unix:R>` · hash 12 ตัว · preview (≤ 1000 chars) · buttons ✅ อนุมัติ / ✏️ ขอแก้ / ❌ ปฏิเสธ |
| hub.approval.* decided/expired | #hermes-approvals | edit the original card, disable buttons |
| ticket → blocked / failed | #hermes-alerts | reason + suggested command |
| ticket → done | #hermes-command | short confirmation (+ URL if published) |
| hub.limit.warning / exhausted / unlocked | #hermes-alerts | resource, %, countdown |
| hub.workflow.failed, hub.dlq.dead_lettered, hub.connector.health_changed(down), worker loop crash | #hermes-alerts | error summary + `/v1/events/{id}/requeue` hint |
| tamkoa.alert.raised(urgent) | #hermes-alerts | 🚨 title + story id |
| hub.report.daily | #hermes-reports | the report embed |

## D10. Workflow Engine & Schedules

### D10.1 YAML schema (`workflows/*.yaml`)
```yaml
workflow_id: news-to-content          # ^[a-z0-9-]+$
version: 1                            # int; bump on change
enabled: true
trigger:
  events: [tamkoa.story.created, tamkoa.story.updated]
  condition: {">=": [{"var": "event.payload.final_score"}, 80]}   # JSONLogic subset
  once_per: "{{ event.subject.id }}"  # optional → workflow_runs.subject_key
steps:
  - id: ticket
    type: create_ticket
    with:
      project_key: TMK
      title: "คอนเทนต์จากข่าว: {{ event.payload.title_th }}"
      type: content
      priority: "{{ 'P1' if event.payload.alert_level == 'urgent' else 'P2' }}"
      approval_required: true
      publish_target: tumkao
      subject_ref: {kind: story, id: "{{ event.subject.id }}"}
  - id: draft
    type: create_task
    with:
      ticket_id: "{{ steps.ticket.output.ticket_id }}"
      title: "ร่างโพสต์"
      executor: "connector:tumkao:draft.create"
      input: {brief: {story_id: "{{ event.subject.id }}", summary_th: "{{ event.payload.summary_th }}"}}
on_failure: notify_and_fail   # notify_and_fail | ignore
 |
| ticket_create | `^(new ticket\|สร้างตั๋ว\|สร้างงาน)\s+(?P<project>[A-Z]{2,6})\s+(?P<title>.+)## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
```
- Type regex: `^[a-z]+\.[a-z_]+\.[a-z_]+## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
.
- `source` MUST equal the namespace prefix, except connector-sourced stubs, which use their namespace (`tamkoa`, `tumkao`).

### D6.2 Registry
- `shared/events/catalog.yaml` lists `type, version, producer, status(active|reserved), payload_model`.
- Each payload is a Pydantic model in `hermes_common.events.payloads`. `make schemas` exports JSON Schemas to `shared/events/<type>.v<n>.json` and `shared/schemas/`. CI fails if the exported files are stale.
- `EventBus.publish()` MUST raise `UnregisteredEventType` for types not `active`, and MUST validate the payload.

### D6.3 Active events (Phase 1)
| Type | Payload (required fields) |
|---|---|
| hub.project.created | project_id, key, name |
| hub.ticket.created | ticket_id, display_code, project_id, type, priority, approval_required, requested_by |
| hub.ticket.state_changed | ticket_id, display_code, from, to, reason?, blocked_reason? |
| hub.ticket.updated | ticket_id, changed_fields[] |
| hub.task.created | task_id, ticket_id, seq, executor |
| hub.task.state_changed | task_id, ticket_id, from, to, error? |
| hub.artifact.created | artifact_id, ticket_id, kind, version, content_sha256 |
| hub.approval.requested | approval_id, ticket_id, artifact_id, content_sha256, expires_at, priority |
| hub.approval.granted | approval_id, ticket_id, decided_by, proof |
| hub.approval.rejected | approval_id, ticket_id, decided_by, reason? |
| hub.approval.changes_requested | approval_id, ticket_id, decided_by, feedback, revision_count |
| hub.approval.expired | approval_id, ticket_id |
| hub.connector.registered | connector_id, version |
| hub.connector.health_changed | connector_id, from, to |
| hub.workflow.started / completed | run_id, workflow_id, trigger_event_id? |
| hub.workflow.failed | run_id, workflow_id, step_id, error |
| hub.limit.warning | limit_id, resource, reason(usage\|reset_soon), used_pct, reset_at? |
| hub.limit.exhausted | limit_id, resource, reset_at? |
| hub.limit.unlocked | limit_id, resource |
| hub.schedule.fired | schedule_id, action_kind, result_ref |
| hub.report.daily | report_date, metrics |
| hub.dlq.dead_lettered | event_id, event_type, subscriber, error |
| tamkoa.story.created / updated | story_id, title_th, summary_th, final_score (0–100), alert_level(urgent\|important\|none), sources[], rights{media_reuse} |
| tamkoa.alert.raised | story_id, level, title_th |
| tamkoa.health.warning | source_id, reason |
| tamkoa.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |
| tumkao.draft.ready_for_approval | ticket_id, task_id, draft_id, version, content, content_sha256 |
| tumkao.draft.compliance_failed | ticket_id, task_id, draft_id, findings[] |
| tumkao.publication.published | ticket_id, draft_id, version, publication_id, platform, url |
| tumkao.publication.failed | ticket_id, draft_id, retriable, error_code, message |
| tumkao.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |

**Reserved (Phase 2+, status `reserved`):**
- tamkoa: item.ingested, opportunity.detected, opportunity.deadline_soon, trend.spike
- tumkao: brief.created, publication.scheduled, metrics.updated, sponsor.lead_created

**Deleted forever:** `tumkao.draft.requested`, `tumkao.approval.requested`, `tumkao.content.published`, `tamkoa.alert.urgent`, `tamkoa.alert.important` (replaced by `alert.raised{level}`).

### D6.4 Transport (PostgresOutboxBus)
- **Publish:** `bus.publish(session, envelope)` inserts into `outbox` within the caller's transaction. It never commits by itself.
- **Fan-out:** for each `fanned_out=false` row, insert an `event_deliveries` row per matching subscriber, then set `fanned_out=true`.
- **Dispatch:**
  1. `SELECT … FROM event_deliveries WHERE state='pending' AND next_attempt_at<=now ORDER BY event_id LIMIT 50 FOR UPDATE SKIP LOCKED`.
  2. For each row, open a transaction, run the handler, and set `state='done'` in the **same** transaction. DB-side effects are therefore exactly-once. External side effects (Discord) are at-least-once, deduped by storing `discord_message_id` keyed by event_id.
- **Retry:** on failure, `attempts += 1` and `next_attempt_at = now + 5 s × 2^attempts`. After 5 attempts the delivery is `dead`, and the bus emits `hub.dlq.dead_lettered`. A handler of `hub.dlq.*` MUST NOT trigger another DLQ event.
- **Ordering:** best effort by event_id. Handlers MUST be idempotent and MUST re-check current state before acting.
- **Port:** `EventBus` protocol = `publish`, `run_fanout_once`, `run_dispatch_once`, `requeue_dead(event_id, subscriber)`. A future `RedisStreamsBus` implements the same protocol.

### D6.5 Phase 1 subscribers
| Subscriber | Consumes | Action |
|---|---|---|
| `lifecycle` | tumkao.*, tamkoa.command.*, hub.limit.unlocked | task completion, artifact creation, T05/T12/T13, auto-resume |
| `workflow_engine` | `*` | trigger matching + event_waiters |
| `discord_notifier` | see D9.4 | post/edit Discord messages |
| `connector_forwarder` | events in an enabled http connector's `consumes` | HTTP POST (no-op in Phase 1, since stubs are inprocess) |

## D7. REST API (`/v1`, JSON, Bearer or bot headers)

| Method & path | Role | Input | Output |
|---|---|---|---|
| GET /healthz · /readyz | public | — | 200 / 503 (DB + migrations at head) |
| GET /v1/me | any | — | user + role |
| POST /v1/projects | owner | key, name, description? | 201 Project |
| GET /v1/projects · /{key} | viewer+ | — | list / detail + counts by state |
| POST /v1/tickets | approver+ | project_key, title, type, priority, approval_required, publish_target?, description?, due_at?, tags?, dependencies?, tasks?[{title, executor, input}] | 201 Ticket |
| GET /v1/tickets | viewer+ | ?project&state&priority&cursor&limit≤100 | page |
| GET /v1/tickets/{id\|code} | viewer+ | — | ticket + tasks + artifacts + approvals + audit |
| POST /v1/tickets/{id}/actions/{start\|cancel\|resume\|retry\|reopen} | approver+ | reason? | 200 Ticket \| 409 |
| POST /v1/tickets/{id}/tasks | approver+ | title, executor, input? | 201 Task |
| POST /v1/tasks/{id}/actions/{done\|fail} | approver+ | note? / reason | 200 Task |
| POST /v1/tickets/{id}/artifacts | approver+ | kind, content | 201 Artifact (hash computed server-side) |
| GET /v1/approvals?state=pending | viewer+ | — | list |
| POST /v1/approvals/{id}/decision | approver+ | action, expected_sha256, reason?, feedback? | 200 Approval \| 403 \| 409 |
| POST /v1/commands | per intent | text \| {name, args} | 202 {command_id, state, result?} |
| POST /v1/commands/{id}/confirm | creator | — | 200 |
| GET/POST/PATCH /v1/limits · POST /v1/limits/{id}/usage | viewer+/owner | — / limit fields / amount, source | Limit |
| GET/POST/DELETE /v1/schedules | viewer+/owner | name, kind, cron_expr\|run_at, action | Schedule |
| GET /v1/workflows · POST /v1/workflows/reload · POST /v1/workflows/{id}/run | viewer+/owner/owner | — / — / payload | defs / reload report / run |
| GET /v1/reports/daily?date= · POST /v1/reports/daily/run | viewer+/owner | date | snapshot |
| GET /v1/connectors · POST /v1/connectors/register | viewer+/owner | manifest | Connector \| 422 MANIFEST_INVALID |
| POST /v1/webhooks/{connector_id} | HMAC | envelope | 202 \| 200 duplicate \| 401/403/413/422 |
| GET /v1/events?type&state · POST /v1/events/{event_id}/requeue | viewer+/owner | — | page / 200 |
| POST /v1/users/role · POST /v1/users/{id}/token | owner | discord_id, role / — | User / token (once) |
| POST /v1/dev/emit · POST /v1/dev/stub/tumkao/mutate-draft | owner, dev only | envelope / draft_id, patch | 202 |

- **Idempotency:** every POST that creates something or changes state MUST accept an `Idempotency-Key` header.
  - Same `(actor, key)` with the same request hash → return the stored response.
  - Same key with a different hash → 422 `IDEMPOTENCY_KEY_REUSED`.
  - The bot always sends `Idempotency-Key = interaction.id`.

## D8. Connectors & Webhooks

### D8.1 Ports (`app/connectors/base.py`)
```python
class ConnectorAdapter(Protocol):
    id: str
    manifest: ConnectorManifest
    async def send_command(self, cmd: ConnectorCommand) -> CommandAck: ...   # accepted|rejected(+reason)
    async def health(self) -> HealthStatus: ...

class PublisherAdapter(Protocol):
    platform: str
    def validate(self, content: dict) -> list[ValidationIssue]: ...
    async def publish(self, content: dict, proof: ApprovalProof) -> PublishResult: ...
```
`ConnectorCommand = {command_id, name, args, ticket_id?, task_id?, correlation_id, idempotency_key}`.

### D8.2 Manifest (`connectors/<id>/manifest.json`, validated by `hermes_common.manifest`)
```json
{
  "manifest_version": 1, "id": "tumkao", "name": "Tumkao Content Studio", "version": "0.1.0",
  "kind": ["worker", "publisher"], "transport": "inprocess", "base_url": null,
  "commands": [
    {"name": "draft.create", "args_schema": {"type": "object", "required": ["brief"]}},
    {"name": "draft.revise", "args_schema": {"type": "object", "required": ["draft_id", "feedback"]}},
    {"name": "publication.create", "args_schema": {"type": "object", "required": ["draft_id", "proof"]}}
  ],
  "emits": ["tumkao.draft.ready_for_approval", "tumkao.draft.compliance_failed",
            "tumkao.publication.published", "tumkao.publication.failed",
            "tumkao.command.completed", "tumkao.command.failed"],
  "consumes": [],
  "webhook": {"secret_env": "CONNECTOR_SECRET_TUMKAO"},
  "health": {"interval_s": 60},
  "rate_limits": {"commands_per_min": 30}
}
```
- **Rejection (422) if:** schema invalid; `id` ≠ folder name; any `emits`/`consumes` type not in the catalog (active or reserved); an emitted type's namespace ≠ the connector id (except `mock_publisher`, which emits nothing); `transport=http` without `base_url`.
- **Loading:** all manifests in `connectors/*/manifest.json` are loaded on API startup (upsert). Changes emit `hub.connector.registered`.
- **Shipped manifests:** `tamkoa` (commands: `research.run`; emits `tamkoa.story.created|updated`, `tamkoa.alert.raised`, `tamkoa.health.warning`, `tamkoa.command.*`), `tumkao` (above), `mock_publisher` (kind `publisher`, no commands).

### D8.3 Webhook intake
- **Headers:** `X-Hermes-Timestamp` (unix seconds) and `X-Hermes-Signature: sha256=<hex(HMAC_SHA256(secret, f"{ts}.{raw_body}"))>`.
- **Checks, in order:**
  1. Connector exists and is enabled (404/403).
  2. Body ≤ 256 KB (413).
  3. `|now − ts| ≤ 300 s` (401 `STALE_TIMESTAMP`).
  4. Constant-time signature compare (401 `BAD_SIGNATURE`).
  5. Envelope valid (422).
  6. `type ∈ manifest.emits` and `source == connector id` (403 `NOT_ALLOWED_EVENT`).
  7. Insert into outbox with `origin=external`. If `event_id` already exists → 200 `{"status":"duplicate"}`.
- **Output:** 202 `{"status":"accepted","event_id":…}`.

### D8.4 Stubs (Phase 1, `app/connectors/stubs/`)
- **TumkaoStub:**
  - `draft.create` → after `MOCK_WORKER_DELAY_S`, creates a `stub_tumkao_drafts` v1 with deterministic Thai mock content `{caption, hashtags[], attribution{source_url}, compliance{status:"pass",risk_level:"low"}}`, then emits `tumkao.draft.ready_for_approval`.
  - `draft.revise` → v+1, with feedback echoed into the caption.
  - `publication.create` → loads the **current** draft, calls `MockPublisher.publish(content, proof)` (which calls `verify_approval_proof`), then emits `published` or `failed`.
  - `STUB_PUBLISH_FAIL_MODE=none|retriable_once|permanent` exists for tests.
- **TamkoaStub:**
  - `research.run` → emits `tamkoa.command.completed{result:{summary_th}}`. Lifecycle stores it as a `note` artifact.
  - `/dev emit-story score:<0-100> title:<…> level:<…>` emits `tamkoa.story.created`, and then, if `level == urgent`, `tamkoa.alert.raised` (in this order, same correlation_id).
- **MockPublisher:** records calls in memory and in `stub_tumkao_publications`, and returns `url = "https://mock.local/p/{pub_id}"`.

## D9. Discord Bot

### D9.1 Setup
- discord.py 2.x, with commands synced per guild (`DISCORD_GUILD_ID`).
- Every interaction is deferred within 3 s. Errors are ephemeral.
- All user-facing strings live in `app/notifier/templates_th.py` (Thai).

### D9.2 Slash commands
| Command | Role |
|---|---|
| `/help` | anyone |
| `/status` | viewer+ — counts by state, pending approvals, limits summary, worker heartbeat |
| `/project create key name [description]` · `/project list` · `/project show key` | owner · viewer+ · viewer+ |
| `/ticket create project title type priority approval [publish_target] [description]` | approver+ |
| `/ticket list [project] [state]` · `/ticket show code` | viewer+ |
| `/ticket start\|cancel\|resume\|retry\|reopen code [reason]` | approver+ |
| `/task add ticket title executor` · `/task list ticket` · `/task done id [note]` · `/task fail id reason` | approver+ / viewer+ |
| `/artifact add ticket text` (stored as a `draft`, content `{caption:text}`) | approver+ |
| `/approval list` | viewer+ |
| `/limit list` · `/limit set resource max [reset_at] [period]` · `/limit use resource amount` | viewer+ · owner · owner |
| `/schedule add name (cron\|at) action...` · `/schedule list` · `/schedule remove id` | owner · viewer+ · owner |
| `/workflow list` · `/workflow reload` · `/workflow run id [payload_json]` | viewer+ · owner · owner |
| `/report today` (preview, not stored) · `/report run date` | viewer+ · owner |
| `/role set user role` · `/token create` | owner |
| `/dev emit-story` · `/dev mutate-draft` | owner, dev only |

### D9.3 Free text (`#hermes-command` only; D12 policy)
- Read intents run when confidence ≥ 0.85.
- Create intents show a **confirm card** with buttons `nl:{command_id}:{ok|no}:{tag}`, valid for 10 minutes.
- Confidence 0.60–0.85 → "หมายถึง … ใช่ไหม?" with a confirm button.
- Confidence < 0.60 → a clarifying question plus `/help`.
- Forbidden intents → "คำสั่งนี้ต้องใช้ปุ่มหรือ slash command: `/ticket cancel …`".

### D9.4 Notifications (worker → Discord REST; honour 429 `retry_after`)
| Event | Channel | Content (Thai) |
|---|---|---|
| hub.approval.requested | #hermes-approvals | Card: `ขออนุมัติ: {code} {title}` · โปรเจกต์ · ลำดับความสำคัญ · ความเสี่ยง · แหล่งที่มา · หมดอายุ `<t:unix:R>` · hash 12 ตัว · preview (≤ 1000 chars) · buttons ✅ อนุมัติ / ✏️ ขอแก้ / ❌ ปฏิเสธ |
| hub.approval.* decided/expired | #hermes-approvals | edit the original card, disable buttons |
| ticket → blocked / failed | #hermes-alerts | reason + suggested command |
| ticket → done | #hermes-command | short confirmation (+ URL if published) |
| hub.limit.warning / exhausted / unlocked | #hermes-alerts | resource, %, countdown |
| hub.workflow.failed, hub.dlq.dead_lettered, hub.connector.health_changed(down), worker loop crash | #hermes-alerts | error summary + `/v1/events/{id}/requeue` hint |
| tamkoa.alert.raised(urgent) | #hermes-alerts | 🚨 title + story id |
| hub.report.daily | #hermes-reports | the report embed |

## D10. Workflow Engine & Schedules

### D10.1 YAML schema (`workflows/*.yaml`)
```yaml
workflow_id: news-to-content          # ^[a-z0-9-]+$
version: 1                            # int; bump on change
enabled: true
trigger:
  events: [tamkoa.story.created, tamkoa.story.updated]
  condition: {">=": [{"var": "event.payload.final_score"}, 80]}   # JSONLogic subset
  once_per: "{{ event.subject.id }}"  # optional → workflow_runs.subject_key
steps:
  - id: ticket
    type: create_ticket
    with:
      project_key: TMK
      title: "คอนเทนต์จากข่าว: {{ event.payload.title_th }}"
      type: content
      priority: "{{ 'P1' if event.payload.alert_level == 'urgent' else 'P2' }}"
      approval_required: true
      publish_target: tumkao
      subject_ref: {kind: story, id: "{{ event.subject.id }}"}
  - id: draft
    type: create_task
    with:
      ticket_id: "{{ steps.ticket.output.ticket_id }}"
      title: "ร่างโพสต์"
      executor: "connector:tumkao:draft.create"
      input: {brief: {story_id: "{{ event.subject.id }}", summary_th: "{{ event.payload.summary_th }}"}}
on_failure: notify_and_fail   # notify_and_fail | ignore
 |
| project_create | `^(new project\|สร้างโปรเจกต์)\s+(?P<key>[A-Z]{2,6})\s+(?P<name>.+)## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
```
- Type regex: `^[a-z]+\.[a-z_]+\.[a-z_]+## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
.
- `source` MUST equal the namespace prefix, except connector-sourced stubs, which use their namespace (`tamkoa`, `tumkao`).

### D6.2 Registry
- `shared/events/catalog.yaml` lists `type, version, producer, status(active|reserved), payload_model`.
- Each payload is a Pydantic model in `hermes_common.events.payloads`. `make schemas` exports JSON Schemas to `shared/events/<type>.v<n>.json` and `shared/schemas/`. CI fails if the exported files are stale.
- `EventBus.publish()` MUST raise `UnregisteredEventType` for types not `active`, and MUST validate the payload.

### D6.3 Active events (Phase 1)
| Type | Payload (required fields) |
|---|---|
| hub.project.created | project_id, key, name |
| hub.ticket.created | ticket_id, display_code, project_id, type, priority, approval_required, requested_by |
| hub.ticket.state_changed | ticket_id, display_code, from, to, reason?, blocked_reason? |
| hub.ticket.updated | ticket_id, changed_fields[] |
| hub.task.created | task_id, ticket_id, seq, executor |
| hub.task.state_changed | task_id, ticket_id, from, to, error? |
| hub.artifact.created | artifact_id, ticket_id, kind, version, content_sha256 |
| hub.approval.requested | approval_id, ticket_id, artifact_id, content_sha256, expires_at, priority |
| hub.approval.granted | approval_id, ticket_id, decided_by, proof |
| hub.approval.rejected | approval_id, ticket_id, decided_by, reason? |
| hub.approval.changes_requested | approval_id, ticket_id, decided_by, feedback, revision_count |
| hub.approval.expired | approval_id, ticket_id |
| hub.connector.registered | connector_id, version |
| hub.connector.health_changed | connector_id, from, to |
| hub.workflow.started / completed | run_id, workflow_id, trigger_event_id? |
| hub.workflow.failed | run_id, workflow_id, step_id, error |
| hub.limit.warning | limit_id, resource, reason(usage\|reset_soon), used_pct, reset_at? |
| hub.limit.exhausted | limit_id, resource, reset_at? |
| hub.limit.unlocked | limit_id, resource |
| hub.schedule.fired | schedule_id, action_kind, result_ref |
| hub.report.daily | report_date, metrics |
| hub.dlq.dead_lettered | event_id, event_type, subscriber, error |
| tamkoa.story.created / updated | story_id, title_th, summary_th, final_score (0–100), alert_level(urgent\|important\|none), sources[], rights{media_reuse} |
| tamkoa.alert.raised | story_id, level, title_th |
| tamkoa.health.warning | source_id, reason |
| tamkoa.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |
| tumkao.draft.ready_for_approval | ticket_id, task_id, draft_id, version, content, content_sha256 |
| tumkao.draft.compliance_failed | ticket_id, task_id, draft_id, findings[] |
| tumkao.publication.published | ticket_id, draft_id, version, publication_id, platform, url |
| tumkao.publication.failed | ticket_id, draft_id, retriable, error_code, message |
| tumkao.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |

**Reserved (Phase 2+, status `reserved`):**
- tamkoa: item.ingested, opportunity.detected, opportunity.deadline_soon, trend.spike
- tumkao: brief.created, publication.scheduled, metrics.updated, sponsor.lead_created

**Deleted forever:** `tumkao.draft.requested`, `tumkao.approval.requested`, `tumkao.content.published`, `tamkoa.alert.urgent`, `tamkoa.alert.important` (replaced by `alert.raised{level}`).

### D6.4 Transport (PostgresOutboxBus)
- **Publish:** `bus.publish(session, envelope)` inserts into `outbox` within the caller's transaction. It never commits by itself.
- **Fan-out:** for each `fanned_out=false` row, insert an `event_deliveries` row per matching subscriber, then set `fanned_out=true`.
- **Dispatch:**
  1. `SELECT … FROM event_deliveries WHERE state='pending' AND next_attempt_at<=now ORDER BY event_id LIMIT 50 FOR UPDATE SKIP LOCKED`.
  2. For each row, open a transaction, run the handler, and set `state='done'` in the **same** transaction. DB-side effects are therefore exactly-once. External side effects (Discord) are at-least-once, deduped by storing `discord_message_id` keyed by event_id.
- **Retry:** on failure, `attempts += 1` and `next_attempt_at = now + 5 s × 2^attempts`. After 5 attempts the delivery is `dead`, and the bus emits `hub.dlq.dead_lettered`. A handler of `hub.dlq.*` MUST NOT trigger another DLQ event.
- **Ordering:** best effort by event_id. Handlers MUST be idempotent and MUST re-check current state before acting.
- **Port:** `EventBus` protocol = `publish`, `run_fanout_once`, `run_dispatch_once`, `requeue_dead(event_id, subscriber)`. A future `RedisStreamsBus` implements the same protocol.

### D6.5 Phase 1 subscribers
| Subscriber | Consumes | Action |
|---|---|---|
| `lifecycle` | tumkao.*, tamkoa.command.*, hub.limit.unlocked | task completion, artifact creation, T05/T12/T13, auto-resume |
| `workflow_engine` | `*` | trigger matching + event_waiters |
| `discord_notifier` | see D9.4 | post/edit Discord messages |
| `connector_forwarder` | events in an enabled http connector's `consumes` | HTTP POST (no-op in Phase 1, since stubs are inprocess) |

## D7. REST API (`/v1`, JSON, Bearer or bot headers)

| Method & path | Role | Input | Output |
|---|---|---|---|
| GET /healthz · /readyz | public | — | 200 / 503 (DB + migrations at head) |
| GET /v1/me | any | — | user + role |
| POST /v1/projects | owner | key, name, description? | 201 Project |
| GET /v1/projects · /{key} | viewer+ | — | list / detail + counts by state |
| POST /v1/tickets | approver+ | project_key, title, type, priority, approval_required, publish_target?, description?, due_at?, tags?, dependencies?, tasks?[{title, executor, input}] | 201 Ticket |
| GET /v1/tickets | viewer+ | ?project&state&priority&cursor&limit≤100 | page |
| GET /v1/tickets/{id\|code} | viewer+ | — | ticket + tasks + artifacts + approvals + audit |
| POST /v1/tickets/{id}/actions/{start\|cancel\|resume\|retry\|reopen} | approver+ | reason? | 200 Ticket \| 409 |
| POST /v1/tickets/{id}/tasks | approver+ | title, executor, input? | 201 Task |
| POST /v1/tasks/{id}/actions/{done\|fail} | approver+ | note? / reason | 200 Task |
| POST /v1/tickets/{id}/artifacts | approver+ | kind, content | 201 Artifact (hash computed server-side) |
| GET /v1/approvals?state=pending | viewer+ | — | list |
| POST /v1/approvals/{id}/decision | approver+ | action, expected_sha256, reason?, feedback? | 200 Approval \| 403 \| 409 |
| POST /v1/commands | per intent | text \| {name, args} | 202 {command_id, state, result?} |
| POST /v1/commands/{id}/confirm | creator | — | 200 |
| GET/POST/PATCH /v1/limits · POST /v1/limits/{id}/usage | viewer+/owner | — / limit fields / amount, source | Limit |
| GET/POST/DELETE /v1/schedules | viewer+/owner | name, kind, cron_expr\|run_at, action | Schedule |
| GET /v1/workflows · POST /v1/workflows/reload · POST /v1/workflows/{id}/run | viewer+/owner/owner | — / — / payload | defs / reload report / run |
| GET /v1/reports/daily?date= · POST /v1/reports/daily/run | viewer+/owner | date | snapshot |
| GET /v1/connectors · POST /v1/connectors/register | viewer+/owner | manifest | Connector \| 422 MANIFEST_INVALID |
| POST /v1/webhooks/{connector_id} | HMAC | envelope | 202 \| 200 duplicate \| 401/403/413/422 |
| GET /v1/events?type&state · POST /v1/events/{event_id}/requeue | viewer+/owner | — | page / 200 |
| POST /v1/users/role · POST /v1/users/{id}/token | owner | discord_id, role / — | User / token (once) |
| POST /v1/dev/emit · POST /v1/dev/stub/tumkao/mutate-draft | owner, dev only | envelope / draft_id, patch | 202 |

- **Idempotency:** every POST that creates something or changes state MUST accept an `Idempotency-Key` header.
  - Same `(actor, key)` with the same request hash → return the stored response.
  - Same key with a different hash → 422 `IDEMPOTENCY_KEY_REUSED`.
  - The bot always sends `Idempotency-Key = interaction.id`.

## D8. Connectors & Webhooks

### D8.1 Ports (`app/connectors/base.py`)
```python
class ConnectorAdapter(Protocol):
    id: str
    manifest: ConnectorManifest
    async def send_command(self, cmd: ConnectorCommand) -> CommandAck: ...   # accepted|rejected(+reason)
    async def health(self) -> HealthStatus: ...

class PublisherAdapter(Protocol):
    platform: str
    def validate(self, content: dict) -> list[ValidationIssue]: ...
    async def publish(self, content: dict, proof: ApprovalProof) -> PublishResult: ...
```
`ConnectorCommand = {command_id, name, args, ticket_id?, task_id?, correlation_id, idempotency_key}`.

### D8.2 Manifest (`connectors/<id>/manifest.json`, validated by `hermes_common.manifest`)
```json
{
  "manifest_version": 1, "id": "tumkao", "name": "Tumkao Content Studio", "version": "0.1.0",
  "kind": ["worker", "publisher"], "transport": "inprocess", "base_url": null,
  "commands": [
    {"name": "draft.create", "args_schema": {"type": "object", "required": ["brief"]}},
    {"name": "draft.revise", "args_schema": {"type": "object", "required": ["draft_id", "feedback"]}},
    {"name": "publication.create", "args_schema": {"type": "object", "required": ["draft_id", "proof"]}}
  ],
  "emits": ["tumkao.draft.ready_for_approval", "tumkao.draft.compliance_failed",
            "tumkao.publication.published", "tumkao.publication.failed",
            "tumkao.command.completed", "tumkao.command.failed"],
  "consumes": [],
  "webhook": {"secret_env": "CONNECTOR_SECRET_TUMKAO"},
  "health": {"interval_s": 60},
  "rate_limits": {"commands_per_min": 30}
}
```
- **Rejection (422) if:** schema invalid; `id` ≠ folder name; any `emits`/`consumes` type not in the catalog (active or reserved); an emitted type's namespace ≠ the connector id (except `mock_publisher`, which emits nothing); `transport=http` without `base_url`.
- **Loading:** all manifests in `connectors/*/manifest.json` are loaded on API startup (upsert). Changes emit `hub.connector.registered`.
- **Shipped manifests:** `tamkoa` (commands: `research.run`; emits `tamkoa.story.created|updated`, `tamkoa.alert.raised`, `tamkoa.health.warning`, `tamkoa.command.*`), `tumkao` (above), `mock_publisher` (kind `publisher`, no commands).

### D8.3 Webhook intake
- **Headers:** `X-Hermes-Timestamp` (unix seconds) and `X-Hermes-Signature: sha256=<hex(HMAC_SHA256(secret, f"{ts}.{raw_body}"))>`.
- **Checks, in order:**
  1. Connector exists and is enabled (404/403).
  2. Body ≤ 256 KB (413).
  3. `|now − ts| ≤ 300 s` (401 `STALE_TIMESTAMP`).
  4. Constant-time signature compare (401 `BAD_SIGNATURE`).
  5. Envelope valid (422).
  6. `type ∈ manifest.emits` and `source == connector id` (403 `NOT_ALLOWED_EVENT`).
  7. Insert into outbox with `origin=external`. If `event_id` already exists → 200 `{"status":"duplicate"}`.
- **Output:** 202 `{"status":"accepted","event_id":…}`.

### D8.4 Stubs (Phase 1, `app/connectors/stubs/`)
- **TumkaoStub:**
  - `draft.create` → after `MOCK_WORKER_DELAY_S`, creates a `stub_tumkao_drafts` v1 with deterministic Thai mock content `{caption, hashtags[], attribution{source_url}, compliance{status:"pass",risk_level:"low"}}`, then emits `tumkao.draft.ready_for_approval`.
  - `draft.revise` → v+1, with feedback echoed into the caption.
  - `publication.create` → loads the **current** draft, calls `MockPublisher.publish(content, proof)` (which calls `verify_approval_proof`), then emits `published` or `failed`.
  - `STUB_PUBLISH_FAIL_MODE=none|retriable_once|permanent` exists for tests.
- **TamkoaStub:**
  - `research.run` → emits `tamkoa.command.completed{result:{summary_th}}`. Lifecycle stores it as a `note` artifact.
  - `/dev emit-story score:<0-100> title:<…> level:<…>` emits `tamkoa.story.created`, and then, if `level == urgent`, `tamkoa.alert.raised` (in this order, same correlation_id).
- **MockPublisher:** records calls in memory and in `stub_tumkao_publications`, and returns `url = "https://mock.local/p/{pub_id}"`.

## D9. Discord Bot

### D9.1 Setup
- discord.py 2.x, with commands synced per guild (`DISCORD_GUILD_ID`).
- Every interaction is deferred within 3 s. Errors are ephemeral.
- All user-facing strings live in `app/notifier/templates_th.py` (Thai).

### D9.2 Slash commands
| Command | Role |
|---|---|
| `/help` | anyone |
| `/status` | viewer+ — counts by state, pending approvals, limits summary, worker heartbeat |
| `/project create key name [description]` · `/project list` · `/project show key` | owner · viewer+ · viewer+ |
| `/ticket create project title type priority approval [publish_target] [description]` | approver+ |
| `/ticket list [project] [state]` · `/ticket show code` | viewer+ |
| `/ticket start\|cancel\|resume\|retry\|reopen code [reason]` | approver+ |
| `/task add ticket title executor` · `/task list ticket` · `/task done id [note]` · `/task fail id reason` | approver+ / viewer+ |
| `/artifact add ticket text` (stored as a `draft`, content `{caption:text}`) | approver+ |
| `/approval list` | viewer+ |
| `/limit list` · `/limit set resource max [reset_at] [period]` · `/limit use resource amount` | viewer+ · owner · owner |
| `/schedule add name (cron\|at) action...` · `/schedule list` · `/schedule remove id` | owner · viewer+ · owner |
| `/workflow list` · `/workflow reload` · `/workflow run id [payload_json]` | viewer+ · owner · owner |
| `/report today` (preview, not stored) · `/report run date` | viewer+ · owner |
| `/role set user role` · `/token create` | owner |
| `/dev emit-story` · `/dev mutate-draft` | owner, dev only |

### D9.3 Free text (`#hermes-command` only; D12 policy)
- Read intents run when confidence ≥ 0.85.
- Create intents show a **confirm card** with buttons `nl:{command_id}:{ok|no}:{tag}`, valid for 10 minutes.
- Confidence 0.60–0.85 → "หมายถึง … ใช่ไหม?" with a confirm button.
- Confidence < 0.60 → a clarifying question plus `/help`.
- Forbidden intents → "คำสั่งนี้ต้องใช้ปุ่มหรือ slash command: `/ticket cancel …`".

### D9.4 Notifications (worker → Discord REST; honour 429 `retry_after`)
| Event | Channel | Content (Thai) |
|---|---|---|
| hub.approval.requested | #hermes-approvals | Card: `ขออนุมัติ: {code} {title}` · โปรเจกต์ · ลำดับความสำคัญ · ความเสี่ยง · แหล่งที่มา · หมดอายุ `<t:unix:R>` · hash 12 ตัว · preview (≤ 1000 chars) · buttons ✅ อนุมัติ / ✏️ ขอแก้ / ❌ ปฏิเสธ |
| hub.approval.* decided/expired | #hermes-approvals | edit the original card, disable buttons |
| ticket → blocked / failed | #hermes-alerts | reason + suggested command |
| ticket → done | #hermes-command | short confirmation (+ URL if published) |
| hub.limit.warning / exhausted / unlocked | #hermes-alerts | resource, %, countdown |
| hub.workflow.failed, hub.dlq.dead_lettered, hub.connector.health_changed(down), worker loop crash | #hermes-alerts | error summary + `/v1/events/{id}/requeue` hint |
| tamkoa.alert.raised(urgent) | #hermes-alerts | 🚨 title + story id |
| hub.report.daily | #hermes-reports | the report embed |

## D10. Workflow Engine & Schedules

### D10.1 YAML schema (`workflows/*.yaml`)
```yaml
workflow_id: news-to-content          # ^[a-z0-9-]+$
version: 1                            # int; bump on change
enabled: true
trigger:
  events: [tamkoa.story.created, tamkoa.story.updated]
  condition: {">=": [{"var": "event.payload.final_score"}, 80]}   # JSONLogic subset
  once_per: "{{ event.subject.id }}"  # optional → workflow_runs.subject_key
steps:
  - id: ticket
    type: create_ticket
    with:
      project_key: TMK
      title: "คอนเทนต์จากข่าว: {{ event.payload.title_th }}"
      type: content
      priority: "{{ 'P1' if event.payload.alert_level == 'urgent' else 'P2' }}"
      approval_required: true
      publish_target: tumkao
      subject_ref: {kind: story, id: "{{ event.subject.id }}"}
  - id: draft
    type: create_task
    with:
      ticket_id: "{{ steps.ticket.output.ticket_id }}"
      title: "ร่างโพสต์"
      executor: "connector:tumkao:draft.create"
      input: {brief: {story_id: "{{ event.subject.id }}", summary_th: "{{ event.payload.summary_th }}"}}
on_failure: notify_and_fail   # notify_and_fail | ignore
 |
| approval_list | `^(approvals?\|รออนุมัติ)## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
```
- Type regex: `^[a-z]+\.[a-z_]+\.[a-z_]+## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
.
- `source` MUST equal the namespace prefix, except connector-sourced stubs, which use their namespace (`tamkoa`, `tumkao`).

### D6.2 Registry
- `shared/events/catalog.yaml` lists `type, version, producer, status(active|reserved), payload_model`.
- Each payload is a Pydantic model in `hermes_common.events.payloads`. `make schemas` exports JSON Schemas to `shared/events/<type>.v<n>.json` and `shared/schemas/`. CI fails if the exported files are stale.
- `EventBus.publish()` MUST raise `UnregisteredEventType` for types not `active`, and MUST validate the payload.

### D6.3 Active events (Phase 1)
| Type | Payload (required fields) |
|---|---|
| hub.project.created | project_id, key, name |
| hub.ticket.created | ticket_id, display_code, project_id, type, priority, approval_required, requested_by |
| hub.ticket.state_changed | ticket_id, display_code, from, to, reason?, blocked_reason? |
| hub.ticket.updated | ticket_id, changed_fields[] |
| hub.task.created | task_id, ticket_id, seq, executor |
| hub.task.state_changed | task_id, ticket_id, from, to, error? |
| hub.artifact.created | artifact_id, ticket_id, kind, version, content_sha256 |
| hub.approval.requested | approval_id, ticket_id, artifact_id, content_sha256, expires_at, priority |
| hub.approval.granted | approval_id, ticket_id, decided_by, proof |
| hub.approval.rejected | approval_id, ticket_id, decided_by, reason? |
| hub.approval.changes_requested | approval_id, ticket_id, decided_by, feedback, revision_count |
| hub.approval.expired | approval_id, ticket_id |
| hub.connector.registered | connector_id, version |
| hub.connector.health_changed | connector_id, from, to |
| hub.workflow.started / completed | run_id, workflow_id, trigger_event_id? |
| hub.workflow.failed | run_id, workflow_id, step_id, error |
| hub.limit.warning | limit_id, resource, reason(usage\|reset_soon), used_pct, reset_at? |
| hub.limit.exhausted | limit_id, resource, reset_at? |
| hub.limit.unlocked | limit_id, resource |
| hub.schedule.fired | schedule_id, action_kind, result_ref |
| hub.report.daily | report_date, metrics |
| hub.dlq.dead_lettered | event_id, event_type, subscriber, error |
| tamkoa.story.created / updated | story_id, title_th, summary_th, final_score (0–100), alert_level(urgent\|important\|none), sources[], rights{media_reuse} |
| tamkoa.alert.raised | story_id, level, title_th |
| tamkoa.health.warning | source_id, reason |
| tamkoa.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |
| tumkao.draft.ready_for_approval | ticket_id, task_id, draft_id, version, content, content_sha256 |
| tumkao.draft.compliance_failed | ticket_id, task_id, draft_id, findings[] |
| tumkao.publication.published | ticket_id, draft_id, version, publication_id, platform, url |
| tumkao.publication.failed | ticket_id, draft_id, retriable, error_code, message |
| tumkao.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |

**Reserved (Phase 2+, status `reserved`):**
- tamkoa: item.ingested, opportunity.detected, opportunity.deadline_soon, trend.spike
- tumkao: brief.created, publication.scheduled, metrics.updated, sponsor.lead_created

**Deleted forever:** `tumkao.draft.requested`, `tumkao.approval.requested`, `tumkao.content.published`, `tamkoa.alert.urgent`, `tamkoa.alert.important` (replaced by `alert.raised{level}`).

### D6.4 Transport (PostgresOutboxBus)
- **Publish:** `bus.publish(session, envelope)` inserts into `outbox` within the caller's transaction. It never commits by itself.
- **Fan-out:** for each `fanned_out=false` row, insert an `event_deliveries` row per matching subscriber, then set `fanned_out=true`.
- **Dispatch:**
  1. `SELECT … FROM event_deliveries WHERE state='pending' AND next_attempt_at<=now ORDER BY event_id LIMIT 50 FOR UPDATE SKIP LOCKED`.
  2. For each row, open a transaction, run the handler, and set `state='done'` in the **same** transaction. DB-side effects are therefore exactly-once. External side effects (Discord) are at-least-once, deduped by storing `discord_message_id` keyed by event_id.
- **Retry:** on failure, `attempts += 1` and `next_attempt_at = now + 5 s × 2^attempts`. After 5 attempts the delivery is `dead`, and the bus emits `hub.dlq.dead_lettered`. A handler of `hub.dlq.*` MUST NOT trigger another DLQ event.
- **Ordering:** best effort by event_id. Handlers MUST be idempotent and MUST re-check current state before acting.
- **Port:** `EventBus` protocol = `publish`, `run_fanout_once`, `run_dispatch_once`, `requeue_dead(event_id, subscriber)`. A future `RedisStreamsBus` implements the same protocol.

### D6.5 Phase 1 subscribers
| Subscriber | Consumes | Action |
|---|---|---|
| `lifecycle` | tumkao.*, tamkoa.command.*, hub.limit.unlocked | task completion, artifact creation, T05/T12/T13, auto-resume |
| `workflow_engine` | `*` | trigger matching + event_waiters |
| `discord_notifier` | see D9.4 | post/edit Discord messages |
| `connector_forwarder` | events in an enabled http connector's `consumes` | HTTP POST (no-op in Phase 1, since stubs are inprocess) |

## D7. REST API (`/v1`, JSON, Bearer or bot headers)

| Method & path | Role | Input | Output |
|---|---|---|---|
| GET /healthz · /readyz | public | — | 200 / 503 (DB + migrations at head) |
| GET /v1/me | any | — | user + role |
| POST /v1/projects | owner | key, name, description? | 201 Project |
| GET /v1/projects · /{key} | viewer+ | — | list / detail + counts by state |
| POST /v1/tickets | approver+ | project_key, title, type, priority, approval_required, publish_target?, description?, due_at?, tags?, dependencies?, tasks?[{title, executor, input}] | 201 Ticket |
| GET /v1/tickets | viewer+ | ?project&state&priority&cursor&limit≤100 | page |
| GET /v1/tickets/{id\|code} | viewer+ | — | ticket + tasks + artifacts + approvals + audit |
| POST /v1/tickets/{id}/actions/{start\|cancel\|resume\|retry\|reopen} | approver+ | reason? | 200 Ticket \| 409 |
| POST /v1/tickets/{id}/tasks | approver+ | title, executor, input? | 201 Task |
| POST /v1/tasks/{id}/actions/{done\|fail} | approver+ | note? / reason | 200 Task |
| POST /v1/tickets/{id}/artifacts | approver+ | kind, content | 201 Artifact (hash computed server-side) |
| GET /v1/approvals?state=pending | viewer+ | — | list |
| POST /v1/approvals/{id}/decision | approver+ | action, expected_sha256, reason?, feedback? | 200 Approval \| 403 \| 409 |
| POST /v1/commands | per intent | text \| {name, args} | 202 {command_id, state, result?} |
| POST /v1/commands/{id}/confirm | creator | — | 200 |
| GET/POST/PATCH /v1/limits · POST /v1/limits/{id}/usage | viewer+/owner | — / limit fields / amount, source | Limit |
| GET/POST/DELETE /v1/schedules | viewer+/owner | name, kind, cron_expr\|run_at, action | Schedule |
| GET /v1/workflows · POST /v1/workflows/reload · POST /v1/workflows/{id}/run | viewer+/owner/owner | — / — / payload | defs / reload report / run |
| GET /v1/reports/daily?date= · POST /v1/reports/daily/run | viewer+/owner | date | snapshot |
| GET /v1/connectors · POST /v1/connectors/register | viewer+/owner | manifest | Connector \| 422 MANIFEST_INVALID |
| POST /v1/webhooks/{connector_id} | HMAC | envelope | 202 \| 200 duplicate \| 401/403/413/422 |
| GET /v1/events?type&state · POST /v1/events/{event_id}/requeue | viewer+/owner | — | page / 200 |
| POST /v1/users/role · POST /v1/users/{id}/token | owner | discord_id, role / — | User / token (once) |
| POST /v1/dev/emit · POST /v1/dev/stub/tumkao/mutate-draft | owner, dev only | envelope / draft_id, patch | 202 |

- **Idempotency:** every POST that creates something or changes state MUST accept an `Idempotency-Key` header.
  - Same `(actor, key)` with the same request hash → return the stored response.
  - Same key with a different hash → 422 `IDEMPOTENCY_KEY_REUSED`.
  - The bot always sends `Idempotency-Key = interaction.id`.

## D8. Connectors & Webhooks

### D8.1 Ports (`app/connectors/base.py`)
```python
class ConnectorAdapter(Protocol):
    id: str
    manifest: ConnectorManifest
    async def send_command(self, cmd: ConnectorCommand) -> CommandAck: ...   # accepted|rejected(+reason)
    async def health(self) -> HealthStatus: ...

class PublisherAdapter(Protocol):
    platform: str
    def validate(self, content: dict) -> list[ValidationIssue]: ...
    async def publish(self, content: dict, proof: ApprovalProof) -> PublishResult: ...
```
`ConnectorCommand = {command_id, name, args, ticket_id?, task_id?, correlation_id, idempotency_key}`.

### D8.2 Manifest (`connectors/<id>/manifest.json`, validated by `hermes_common.manifest`)
```json
{
  "manifest_version": 1, "id": "tumkao", "name": "Tumkao Content Studio", "version": "0.1.0",
  "kind": ["worker", "publisher"], "transport": "inprocess", "base_url": null,
  "commands": [
    {"name": "draft.create", "args_schema": {"type": "object", "required": ["brief"]}},
    {"name": "draft.revise", "args_schema": {"type": "object", "required": ["draft_id", "feedback"]}},
    {"name": "publication.create", "args_schema": {"type": "object", "required": ["draft_id", "proof"]}}
  ],
  "emits": ["tumkao.draft.ready_for_approval", "tumkao.draft.compliance_failed",
            "tumkao.publication.published", "tumkao.publication.failed",
            "tumkao.command.completed", "tumkao.command.failed"],
  "consumes": [],
  "webhook": {"secret_env": "CONNECTOR_SECRET_TUMKAO"},
  "health": {"interval_s": 60},
  "rate_limits": {"commands_per_min": 30}
}
```
- **Rejection (422) if:** schema invalid; `id` ≠ folder name; any `emits`/`consumes` type not in the catalog (active or reserved); an emitted type's namespace ≠ the connector id (except `mock_publisher`, which emits nothing); `transport=http` without `base_url`.
- **Loading:** all manifests in `connectors/*/manifest.json` are loaded on API startup (upsert). Changes emit `hub.connector.registered`.
- **Shipped manifests:** `tamkoa` (commands: `research.run`; emits `tamkoa.story.created|updated`, `tamkoa.alert.raised`, `tamkoa.health.warning`, `tamkoa.command.*`), `tumkao` (above), `mock_publisher` (kind `publisher`, no commands).

### D8.3 Webhook intake
- **Headers:** `X-Hermes-Timestamp` (unix seconds) and `X-Hermes-Signature: sha256=<hex(HMAC_SHA256(secret, f"{ts}.{raw_body}"))>`.
- **Checks, in order:**
  1. Connector exists and is enabled (404/403).
  2. Body ≤ 256 KB (413).
  3. `|now − ts| ≤ 300 s` (401 `STALE_TIMESTAMP`).
  4. Constant-time signature compare (401 `BAD_SIGNATURE`).
  5. Envelope valid (422).
  6. `type ∈ manifest.emits` and `source == connector id` (403 `NOT_ALLOWED_EVENT`).
  7. Insert into outbox with `origin=external`. If `event_id` already exists → 200 `{"status":"duplicate"}`.
- **Output:** 202 `{"status":"accepted","event_id":…}`.

### D8.4 Stubs (Phase 1, `app/connectors/stubs/`)
- **TumkaoStub:**
  - `draft.create` → after `MOCK_WORKER_DELAY_S`, creates a `stub_tumkao_drafts` v1 with deterministic Thai mock content `{caption, hashtags[], attribution{source_url}, compliance{status:"pass",risk_level:"low"}}`, then emits `tumkao.draft.ready_for_approval`.
  - `draft.revise` → v+1, with feedback echoed into the caption.
  - `publication.create` → loads the **current** draft, calls `MockPublisher.publish(content, proof)` (which calls `verify_approval_proof`), then emits `published` or `failed`.
  - `STUB_PUBLISH_FAIL_MODE=none|retriable_once|permanent` exists for tests.
- **TamkoaStub:**
  - `research.run` → emits `tamkoa.command.completed{result:{summary_th}}`. Lifecycle stores it as a `note` artifact.
  - `/dev emit-story score:<0-100> title:<…> level:<…>` emits `tamkoa.story.created`, and then, if `level == urgent`, `tamkoa.alert.raised` (in this order, same correlation_id).
- **MockPublisher:** records calls in memory and in `stub_tumkao_publications`, and returns `url = "https://mock.local/p/{pub_id}"`.

## D9. Discord Bot

### D9.1 Setup
- discord.py 2.x, with commands synced per guild (`DISCORD_GUILD_ID`).
- Every interaction is deferred within 3 s. Errors are ephemeral.
- All user-facing strings live in `app/notifier/templates_th.py` (Thai).

### D9.2 Slash commands
| Command | Role |
|---|---|
| `/help` | anyone |
| `/status` | viewer+ — counts by state, pending approvals, limits summary, worker heartbeat |
| `/project create key name [description]` · `/project list` · `/project show key` | owner · viewer+ · viewer+ |
| `/ticket create project title type priority approval [publish_target] [description]` | approver+ |
| `/ticket list [project] [state]` · `/ticket show code` | viewer+ |
| `/ticket start\|cancel\|resume\|retry\|reopen code [reason]` | approver+ |
| `/task add ticket title executor` · `/task list ticket` · `/task done id [note]` · `/task fail id reason` | approver+ / viewer+ |
| `/artifact add ticket text` (stored as a `draft`, content `{caption:text}`) | approver+ |
| `/approval list` | viewer+ |
| `/limit list` · `/limit set resource max [reset_at] [period]` · `/limit use resource amount` | viewer+ · owner · owner |
| `/schedule add name (cron\|at) action...` · `/schedule list` · `/schedule remove id` | owner · viewer+ · owner |
| `/workflow list` · `/workflow reload` · `/workflow run id [payload_json]` | viewer+ · owner · owner |
| `/report today` (preview, not stored) · `/report run date` | viewer+ · owner |
| `/role set user role` · `/token create` | owner |
| `/dev emit-story` · `/dev mutate-draft` | owner, dev only |

### D9.3 Free text (`#hermes-command` only; D12 policy)
- Read intents run when confidence ≥ 0.85.
- Create intents show a **confirm card** with buttons `nl:{command_id}:{ok|no}:{tag}`, valid for 10 minutes.
- Confidence 0.60–0.85 → "หมายถึง … ใช่ไหม?" with a confirm button.
- Confidence < 0.60 → a clarifying question plus `/help`.
- Forbidden intents → "คำสั่งนี้ต้องใช้ปุ่มหรือ slash command: `/ticket cancel …`".

### D9.4 Notifications (worker → Discord REST; honour 429 `retry_after`)
| Event | Channel | Content (Thai) |
|---|---|---|
| hub.approval.requested | #hermes-approvals | Card: `ขออนุมัติ: {code} {title}` · โปรเจกต์ · ลำดับความสำคัญ · ความเสี่ยง · แหล่งที่มา · หมดอายุ `<t:unix:R>` · hash 12 ตัว · preview (≤ 1000 chars) · buttons ✅ อนุมัติ / ✏️ ขอแก้ / ❌ ปฏิเสธ |
| hub.approval.* decided/expired | #hermes-approvals | edit the original card, disable buttons |
| ticket → blocked / failed | #hermes-alerts | reason + suggested command |
| ticket → done | #hermes-command | short confirmation (+ URL if published) |
| hub.limit.warning / exhausted / unlocked | #hermes-alerts | resource, %, countdown |
| hub.workflow.failed, hub.dlq.dead_lettered, hub.connector.health_changed(down), worker loop crash | #hermes-alerts | error summary + `/v1/events/{id}/requeue` hint |
| tamkoa.alert.raised(urgent) | #hermes-alerts | 🚨 title + story id |
| hub.report.daily | #hermes-reports | the report embed |

## D10. Workflow Engine & Schedules

### D10.1 YAML schema (`workflows/*.yaml`)
```yaml
workflow_id: news-to-content          # ^[a-z0-9-]+$
version: 1                            # int; bump on change
enabled: true
trigger:
  events: [tamkoa.story.created, tamkoa.story.updated]
  condition: {">=": [{"var": "event.payload.final_score"}, 80]}   # JSONLogic subset
  once_per: "{{ event.subject.id }}"  # optional → workflow_runs.subject_key
steps:
  - id: ticket
    type: create_ticket
    with:
      project_key: TMK
      title: "คอนเทนต์จากข่าว: {{ event.payload.title_th }}"
      type: content
      priority: "{{ 'P1' if event.payload.alert_level == 'urgent' else 'P2' }}"
      approval_required: true
      publish_target: tumkao
      subject_ref: {kind: story, id: "{{ event.subject.id }}"}
  - id: draft
    type: create_task
    with:
      ticket_id: "{{ steps.ticket.output.ticket_id }}"
      title: "ร่างโพสต์"
      executor: "connector:tumkao:draft.create"
      input: {brief: {story_id: "{{ event.subject.id }}", summary_th: "{{ event.payload.summary_th }}"}}
on_failure: notify_and_fail   # notify_and_fail | ignore
 |
| limit_list | `^(limits?\|โควต้า)## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
```
- Type regex: `^[a-z]+\.[a-z_]+\.[a-z_]+## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
.
- `source` MUST equal the namespace prefix, except connector-sourced stubs, which use their namespace (`tamkoa`, `tumkao`).

### D6.2 Registry
- `shared/events/catalog.yaml` lists `type, version, producer, status(active|reserved), payload_model`.
- Each payload is a Pydantic model in `hermes_common.events.payloads`. `make schemas` exports JSON Schemas to `shared/events/<type>.v<n>.json` and `shared/schemas/`. CI fails if the exported files are stale.
- `EventBus.publish()` MUST raise `UnregisteredEventType` for types not `active`, and MUST validate the payload.

### D6.3 Active events (Phase 1)
| Type | Payload (required fields) |
|---|---|
| hub.project.created | project_id, key, name |
| hub.ticket.created | ticket_id, display_code, project_id, type, priority, approval_required, requested_by |
| hub.ticket.state_changed | ticket_id, display_code, from, to, reason?, blocked_reason? |
| hub.ticket.updated | ticket_id, changed_fields[] |
| hub.task.created | task_id, ticket_id, seq, executor |
| hub.task.state_changed | task_id, ticket_id, from, to, error? |
| hub.artifact.created | artifact_id, ticket_id, kind, version, content_sha256 |
| hub.approval.requested | approval_id, ticket_id, artifact_id, content_sha256, expires_at, priority |
| hub.approval.granted | approval_id, ticket_id, decided_by, proof |
| hub.approval.rejected | approval_id, ticket_id, decided_by, reason? |
| hub.approval.changes_requested | approval_id, ticket_id, decided_by, feedback, revision_count |
| hub.approval.expired | approval_id, ticket_id |
| hub.connector.registered | connector_id, version |
| hub.connector.health_changed | connector_id, from, to |
| hub.workflow.started / completed | run_id, workflow_id, trigger_event_id? |
| hub.workflow.failed | run_id, workflow_id, step_id, error |
| hub.limit.warning | limit_id, resource, reason(usage\|reset_soon), used_pct, reset_at? |
| hub.limit.exhausted | limit_id, resource, reset_at? |
| hub.limit.unlocked | limit_id, resource |
| hub.schedule.fired | schedule_id, action_kind, result_ref |
| hub.report.daily | report_date, metrics |
| hub.dlq.dead_lettered | event_id, event_type, subscriber, error |
| tamkoa.story.created / updated | story_id, title_th, summary_th, final_score (0–100), alert_level(urgent\|important\|none), sources[], rights{media_reuse} |
| tamkoa.alert.raised | story_id, level, title_th |
| tamkoa.health.warning | source_id, reason |
| tamkoa.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |
| tumkao.draft.ready_for_approval | ticket_id, task_id, draft_id, version, content, content_sha256 |
| tumkao.draft.compliance_failed | ticket_id, task_id, draft_id, findings[] |
| tumkao.publication.published | ticket_id, draft_id, version, publication_id, platform, url |
| tumkao.publication.failed | ticket_id, draft_id, retriable, error_code, message |
| tumkao.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |

**Reserved (Phase 2+, status `reserved`):**
- tamkoa: item.ingested, opportunity.detected, opportunity.deadline_soon, trend.spike
- tumkao: brief.created, publication.scheduled, metrics.updated, sponsor.lead_created

**Deleted forever:** `tumkao.draft.requested`, `tumkao.approval.requested`, `tumkao.content.published`, `tamkoa.alert.urgent`, `tamkoa.alert.important` (replaced by `alert.raised{level}`).

### D6.4 Transport (PostgresOutboxBus)
- **Publish:** `bus.publish(session, envelope)` inserts into `outbox` within the caller's transaction. It never commits by itself.
- **Fan-out:** for each `fanned_out=false` row, insert an `event_deliveries` row per matching subscriber, then set `fanned_out=true`.
- **Dispatch:**
  1. `SELECT … FROM event_deliveries WHERE state='pending' AND next_attempt_at<=now ORDER BY event_id LIMIT 50 FOR UPDATE SKIP LOCKED`.
  2. For each row, open a transaction, run the handler, and set `state='done'` in the **same** transaction. DB-side effects are therefore exactly-once. External side effects (Discord) are at-least-once, deduped by storing `discord_message_id` keyed by event_id.
- **Retry:** on failure, `attempts += 1` and `next_attempt_at = now + 5 s × 2^attempts`. After 5 attempts the delivery is `dead`, and the bus emits `hub.dlq.dead_lettered`. A handler of `hub.dlq.*` MUST NOT trigger another DLQ event.
- **Ordering:** best effort by event_id. Handlers MUST be idempotent and MUST re-check current state before acting.
- **Port:** `EventBus` protocol = `publish`, `run_fanout_once`, `run_dispatch_once`, `requeue_dead(event_id, subscriber)`. A future `RedisStreamsBus` implements the same protocol.

### D6.5 Phase 1 subscribers
| Subscriber | Consumes | Action |
|---|---|---|
| `lifecycle` | tumkao.*, tamkoa.command.*, hub.limit.unlocked | task completion, artifact creation, T05/T12/T13, auto-resume |
| `workflow_engine` | `*` | trigger matching + event_waiters |
| `discord_notifier` | see D9.4 | post/edit Discord messages |
| `connector_forwarder` | events in an enabled http connector's `consumes` | HTTP POST (no-op in Phase 1, since stubs are inprocess) |

## D7. REST API (`/v1`, JSON, Bearer or bot headers)

| Method & path | Role | Input | Output |
|---|---|---|---|
| GET /healthz · /readyz | public | — | 200 / 503 (DB + migrations at head) |
| GET /v1/me | any | — | user + role |
| POST /v1/projects | owner | key, name, description? | 201 Project |
| GET /v1/projects · /{key} | viewer+ | — | list / detail + counts by state |
| POST /v1/tickets | approver+ | project_key, title, type, priority, approval_required, publish_target?, description?, due_at?, tags?, dependencies?, tasks?[{title, executor, input}] | 201 Ticket |
| GET /v1/tickets | viewer+ | ?project&state&priority&cursor&limit≤100 | page |
| GET /v1/tickets/{id\|code} | viewer+ | — | ticket + tasks + artifacts + approvals + audit |
| POST /v1/tickets/{id}/actions/{start\|cancel\|resume\|retry\|reopen} | approver+ | reason? | 200 Ticket \| 409 |
| POST /v1/tickets/{id}/tasks | approver+ | title, executor, input? | 201 Task |
| POST /v1/tasks/{id}/actions/{done\|fail} | approver+ | note? / reason | 200 Task |
| POST /v1/tickets/{id}/artifacts | approver+ | kind, content | 201 Artifact (hash computed server-side) |
| GET /v1/approvals?state=pending | viewer+ | — | list |
| POST /v1/approvals/{id}/decision | approver+ | action, expected_sha256, reason?, feedback? | 200 Approval \| 403 \| 409 |
| POST /v1/commands | per intent | text \| {name, args} | 202 {command_id, state, result?} |
| POST /v1/commands/{id}/confirm | creator | — | 200 |
| GET/POST/PATCH /v1/limits · POST /v1/limits/{id}/usage | viewer+/owner | — / limit fields / amount, source | Limit |
| GET/POST/DELETE /v1/schedules | viewer+/owner | name, kind, cron_expr\|run_at, action | Schedule |
| GET /v1/workflows · POST /v1/workflows/reload · POST /v1/workflows/{id}/run | viewer+/owner/owner | — / — / payload | defs / reload report / run |
| GET /v1/reports/daily?date= · POST /v1/reports/daily/run | viewer+/owner | date | snapshot |
| GET /v1/connectors · POST /v1/connectors/register | viewer+/owner | manifest | Connector \| 422 MANIFEST_INVALID |
| POST /v1/webhooks/{connector_id} | HMAC | envelope | 202 \| 200 duplicate \| 401/403/413/422 |
| GET /v1/events?type&state · POST /v1/events/{event_id}/requeue | viewer+/owner | — | page / 200 |
| POST /v1/users/role · POST /v1/users/{id}/token | owner | discord_id, role / — | User / token (once) |
| POST /v1/dev/emit · POST /v1/dev/stub/tumkao/mutate-draft | owner, dev only | envelope / draft_id, patch | 202 |

- **Idempotency:** every POST that creates something or changes state MUST accept an `Idempotency-Key` header.
  - Same `(actor, key)` with the same request hash → return the stored response.
  - Same key with a different hash → 422 `IDEMPOTENCY_KEY_REUSED`.
  - The bot always sends `Idempotency-Key = interaction.id`.

## D8. Connectors & Webhooks

### D8.1 Ports (`app/connectors/base.py`)
```python
class ConnectorAdapter(Protocol):
    id: str
    manifest: ConnectorManifest
    async def send_command(self, cmd: ConnectorCommand) -> CommandAck: ...   # accepted|rejected(+reason)
    async def health(self) -> HealthStatus: ...

class PublisherAdapter(Protocol):
    platform: str
    def validate(self, content: dict) -> list[ValidationIssue]: ...
    async def publish(self, content: dict, proof: ApprovalProof) -> PublishResult: ...
```
`ConnectorCommand = {command_id, name, args, ticket_id?, task_id?, correlation_id, idempotency_key}`.

### D8.2 Manifest (`connectors/<id>/manifest.json`, validated by `hermes_common.manifest`)
```json
{
  "manifest_version": 1, "id": "tumkao", "name": "Tumkao Content Studio", "version": "0.1.0",
  "kind": ["worker", "publisher"], "transport": "inprocess", "base_url": null,
  "commands": [
    {"name": "draft.create", "args_schema": {"type": "object", "required": ["brief"]}},
    {"name": "draft.revise", "args_schema": {"type": "object", "required": ["draft_id", "feedback"]}},
    {"name": "publication.create", "args_schema": {"type": "object", "required": ["draft_id", "proof"]}}
  ],
  "emits": ["tumkao.draft.ready_for_approval", "tumkao.draft.compliance_failed",
            "tumkao.publication.published", "tumkao.publication.failed",
            "tumkao.command.completed", "tumkao.command.failed"],
  "consumes": [],
  "webhook": {"secret_env": "CONNECTOR_SECRET_TUMKAO"},
  "health": {"interval_s": 60},
  "rate_limits": {"commands_per_min": 30}
}
```
- **Rejection (422) if:** schema invalid; `id` ≠ folder name; any `emits`/`consumes` type not in the catalog (active or reserved); an emitted type's namespace ≠ the connector id (except `mock_publisher`, which emits nothing); `transport=http` without `base_url`.
- **Loading:** all manifests in `connectors/*/manifest.json` are loaded on API startup (upsert). Changes emit `hub.connector.registered`.
- **Shipped manifests:** `tamkoa` (commands: `research.run`; emits `tamkoa.story.created|updated`, `tamkoa.alert.raised`, `tamkoa.health.warning`, `tamkoa.command.*`), `tumkao` (above), `mock_publisher` (kind `publisher`, no commands).

### D8.3 Webhook intake
- **Headers:** `X-Hermes-Timestamp` (unix seconds) and `X-Hermes-Signature: sha256=<hex(HMAC_SHA256(secret, f"{ts}.{raw_body}"))>`.
- **Checks, in order:**
  1. Connector exists and is enabled (404/403).
  2. Body ≤ 256 KB (413).
  3. `|now − ts| ≤ 300 s` (401 `STALE_TIMESTAMP`).
  4. Constant-time signature compare (401 `BAD_SIGNATURE`).
  5. Envelope valid (422).
  6. `type ∈ manifest.emits` and `source == connector id` (403 `NOT_ALLOWED_EVENT`).
  7. Insert into outbox with `origin=external`. If `event_id` already exists → 200 `{"status":"duplicate"}`.
- **Output:** 202 `{"status":"accepted","event_id":…}`.

### D8.4 Stubs (Phase 1, `app/connectors/stubs/`)
- **TumkaoStub:**
  - `draft.create` → after `MOCK_WORKER_DELAY_S`, creates a `stub_tumkao_drafts` v1 with deterministic Thai mock content `{caption, hashtags[], attribution{source_url}, compliance{status:"pass",risk_level:"low"}}`, then emits `tumkao.draft.ready_for_approval`.
  - `draft.revise` → v+1, with feedback echoed into the caption.
  - `publication.create` → loads the **current** draft, calls `MockPublisher.publish(content, proof)` (which calls `verify_approval_proof`), then emits `published` or `failed`.
  - `STUB_PUBLISH_FAIL_MODE=none|retriable_once|permanent` exists for tests.
- **TamkoaStub:**
  - `research.run` → emits `tamkoa.command.completed{result:{summary_th}}`. Lifecycle stores it as a `note` artifact.
  - `/dev emit-story score:<0-100> title:<…> level:<…>` emits `tamkoa.story.created`, and then, if `level == urgent`, `tamkoa.alert.raised` (in this order, same correlation_id).
- **MockPublisher:** records calls in memory and in `stub_tumkao_publications`, and returns `url = "https://mock.local/p/{pub_id}"`.

## D9. Discord Bot

### D9.1 Setup
- discord.py 2.x, with commands synced per guild (`DISCORD_GUILD_ID`).
- Every interaction is deferred within 3 s. Errors are ephemeral.
- All user-facing strings live in `app/notifier/templates_th.py` (Thai).

### D9.2 Slash commands
| Command | Role |
|---|---|
| `/help` | anyone |
| `/status` | viewer+ — counts by state, pending approvals, limits summary, worker heartbeat |
| `/project create key name [description]` · `/project list` · `/project show key` | owner · viewer+ · viewer+ |
| `/ticket create project title type priority approval [publish_target] [description]` | approver+ |
| `/ticket list [project] [state]` · `/ticket show code` | viewer+ |
| `/ticket start\|cancel\|resume\|retry\|reopen code [reason]` | approver+ |
| `/task add ticket title executor` · `/task list ticket` · `/task done id [note]` · `/task fail id reason` | approver+ / viewer+ |
| `/artifact add ticket text` (stored as a `draft`, content `{caption:text}`) | approver+ |
| `/approval list` | viewer+ |
| `/limit list` · `/limit set resource max [reset_at] [period]` · `/limit use resource amount` | viewer+ · owner · owner |
| `/schedule add name (cron\|at) action...` · `/schedule list` · `/schedule remove id` | owner · viewer+ · owner |
| `/workflow list` · `/workflow reload` · `/workflow run id [payload_json]` | viewer+ · owner · owner |
| `/report today` (preview, not stored) · `/report run date` | viewer+ · owner |
| `/role set user role` · `/token create` | owner |
| `/dev emit-story` · `/dev mutate-draft` | owner, dev only |

### D9.3 Free text (`#hermes-command` only; D12 policy)
- Read intents run when confidence ≥ 0.85.
- Create intents show a **confirm card** with buttons `nl:{command_id}:{ok|no}:{tag}`, valid for 10 minutes.
- Confidence 0.60–0.85 → "หมายถึง … ใช่ไหม?" with a confirm button.
- Confidence < 0.60 → a clarifying question plus `/help`.
- Forbidden intents → "คำสั่งนี้ต้องใช้ปุ่มหรือ slash command: `/ticket cancel …`".

### D9.4 Notifications (worker → Discord REST; honour 429 `retry_after`)
| Event | Channel | Content (Thai) |
|---|---|---|
| hub.approval.requested | #hermes-approvals | Card: `ขออนุมัติ: {code} {title}` · โปรเจกต์ · ลำดับความสำคัญ · ความเสี่ยง · แหล่งที่มา · หมดอายุ `<t:unix:R>` · hash 12 ตัว · preview (≤ 1000 chars) · buttons ✅ อนุมัติ / ✏️ ขอแก้ / ❌ ปฏิเสธ |
| hub.approval.* decided/expired | #hermes-approvals | edit the original card, disable buttons |
| ticket → blocked / failed | #hermes-alerts | reason + suggested command |
| ticket → done | #hermes-command | short confirmation (+ URL if published) |
| hub.limit.warning / exhausted / unlocked | #hermes-alerts | resource, %, countdown |
| hub.workflow.failed, hub.dlq.dead_lettered, hub.connector.health_changed(down), worker loop crash | #hermes-alerts | error summary + `/v1/events/{id}/requeue` hint |
| tamkoa.alert.raised(urgent) | #hermes-alerts | 🚨 title + story id |
| hub.report.daily | #hermes-reports | the report embed |

## D10. Workflow Engine & Schedules

### D10.1 YAML schema (`workflows/*.yaml`)
```yaml
workflow_id: news-to-content          # ^[a-z0-9-]+$
version: 1                            # int; bump on change
enabled: true
trigger:
  events: [tamkoa.story.created, tamkoa.story.updated]
  condition: {">=": [{"var": "event.payload.final_score"}, 80]}   # JSONLogic subset
  once_per: "{{ event.subject.id }}"  # optional → workflow_runs.subject_key
steps:
  - id: ticket
    type: create_ticket
    with:
      project_key: TMK
      title: "คอนเทนต์จากข่าว: {{ event.payload.title_th }}"
      type: content
      priority: "{{ 'P1' if event.payload.alert_level == 'urgent' else 'P2' }}"
      approval_required: true
      publish_target: tumkao
      subject_ref: {kind: story, id: "{{ event.subject.id }}"}
  - id: draft
    type: create_task
    with:
      ticket_id: "{{ steps.ticket.output.ticket_id }}"
      title: "ร่างโพสต์"
      executor: "connector:tumkao:draft.create"
      input: {brief: {story_id: "{{ event.subject.id }}", summary_th: "{{ event.payload.summary_th }}"}}
on_failure: notify_and_fail   # notify_and_fail | ignore
 |
| report_today | `^(report\|รายงาน)(วันนี้\| today)?## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
```
- Type regex: `^[a-z]+\.[a-z_]+\.[a-z_]+## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

````markdown
# HERMES MASTER SPEC

> **Status:** LOCKED for Phase 1 · **Spec version:** 1.0.0
> **Systems:** Hermes Command Hub (`services/hub`) · Tamkoa — news intelligence (`services/tamkoa`) · Tumkao — content studio (`services/tumkao`)
> **Audience:** Human owner (Thai sections) + Codex CLI (English sections)

## 0. How to read this document

| Part | Content | Language | Normative? |
|---|---|---|---|
| A | Original vision & original spec (as submitted for review) | TH/EN | No — historical context |
| B | Critical Review Report (round 1) + resolution status | EN | No — rationale |
| C | Decision Log (grilling rounds 1–2) | TH | Yes — explains *why* |
| D | **Phase 1 Verified Spec** (sections named after handoff files) | EN | **YES — Codex implements this** |
| E | Phase 2+ Forward Spec (Tamkoa, Tumkao, Model Routing) | EN | Yes, but NOT for Phase 1 |
| F | Remaining open questions (non-blocking) | TH | No |

**Precedence when anything conflicts:** Part D > Part E > Part C > Part B > Part A.
**Keywords:** MUST / MUST NOT / SHOULD / MAY follow RFC 2119.

---

# PART A — ORIGINAL VISION & ORIGINAL SPEC (historical)

## A.1 วิสัยทัศน์ (จากเอกสาร "Multi Agents ภาพรวม")
- **Hermes = Mothership** ศูนย์บัญชาการกลาง ประสานงาน Project Management, Tamkoa และ Tumkao โดยใช้ Discord เป็นช่องทางหลักในการสั่งงานและรับรายงาน
- **Adaptive Workflow Automation:** เพิ่ม/ลด workflow แบบ modular และใช้ knowledge base ร่วมกัน
- **Project Manager Agent:** แยกดูแลรายโปรเจกต์
  - จัดการ Ticket & Tasks
  - Limit Management: ติดตาม quota ของโมเดล (Codex, Qwen, Claude ฯลฯ) พร้อมนับถอยหลังถึงเวลารีเซ็ต
  - Async Processing: รับคำสั่งล่วงหน้าไปทำตอนผู้ใช้ไม่อยู่
  - Daily Sync: รายงานตอนเที่ยงคืนแบบเทียบกับเมื่อวาน (delta)
- **Model Agnostic:** สลับโมเดลผ่าน "Pipe/Node" ได้โดยไม่กระทบระบบหลัก
- **การสื่อสาร:** ใช้ Discord เป็น dashboard และอ่านรายงานเป็นเสียงสไตล์ Jarvis (TTS) ในอนาคต
- **Co-op:** ข้อมูลข่าวที่ได้มาใหม่ไหลต่อไปยังระบบทำคอนเทนต์ได้ทันที

## A.2 Tamkoa — ตามข่าว (จากเอกสาร "ตามข่าว + ทำข่าว")
- **แหล่งข้อมูล:** Weibo, Rednote, IG, Facebook, X, Google และเว็บทั่วไป
- **ความสามารถ:**
  - สรุปข่าวรายวันตามหัวข้อ เช่น ข่าวเทรนด์ หรือข่าวศิลปิน (เช่น Cheng Yi)
  - วิเคราะห์เทรนด์ด้วย AI
  - หมวดหมู่ที่ผู้ใช้กำหนดเอง และกำหนดความลึกของข้อมูลได้
- **แจ้งเตือนเรียลไทม์:** โอกาสที่มีเวลาจำกัด เช่น AI tool แจกเครดิตฟรี หรือศิลปินปล่อยผลงานใหม่
- **ขอบเขต:** General Trending ครอบคลุมไทย จีน ญี่ปุ่น และข่าวโลก
- **ต้นทุน:** เน้นโมเดลฟรี เช่น Gemini และ agent framework ฟรี

## A.3 Tumkao — ทำคอนเทนต์ / เพจ "ซือหย่วน" (จากเอกสาร "ซือหย่วน dev ai influencer page")

| ทีม | หน้าที่ |
|---|---|
| Creative | วาง roadmap คอนเทนต์, หาข่าวและเทรนด์, จัดลำดับหัวข้อ, ทำแผนงานส่งต่อทีมอื่น |
| Design | ออกแบบ mascot และ visual asset ตามโจทย์ของ Creative |
| SEO/Marketing & Analytics | วิเคราะห์ business model, SEO รายแพลตฟอร์ม, ผลงานและรายได้ |
| BD/AE | สร้าง personal branding (KOL/ROC), หาสปอนเซอร์, ตอบ DM เบื้องต้น, ประสานงานระหว่าง AI กับคน |
| Content Writing | เขียนสคริปต์และโพสต์ |
| Production | ตัดต่อ, ใส่ซับ, เสียงหลายภาษา, mascot animation และเสียงโคลน โดยไม่ต้องถ่ายทำเอง |
| PM/Secretary | รวมงานที่รออนุมัติไว้ที่เดียว, ตั้งเวลาโพสต์ (prime time), ติดตามผล, ดู ticket แบบเรียลไทม์ |

**Media pipeline:** ดาวน์โหลดคลิป/ภาพจากต้นทาง → ตัดต่อ → แปล → ฝังซับ → โพสต์อัตโนมัติ → วัด engagement และรายได้รายวัน

## A.4 Original spec digest (Qwen spec, submitted for review)
- **Hierarchy:** Workspace > Project > Ticket > Task (Step, Agent Run, Artifact).
- **Ticket fields:** ticket_id, project_id, title, type, status, priority, owner_agent, requested_by, approval_required, due_at, tags, dependencies, artifacts, created_at, updated_at.
- **Story (Tamkoa):** story_id, topic_id, title_th, summary_th, category, score, urgency, sources, raw_item_ids, media, rights, suggested_angles, created_at.
- **Item (Tamkoa):** item_id, source_id, platform, external_id, author, tier, text, media, url, posted_at, collected_at.
- **Limit:** limit_id, resource, type, quota_max, quota_used, reset_at, warn_thresholds, status, action_on_unlock.
- **Ticket states (original):** draft → open → triaged → in_progress → blocked → review → awaiting_approval → approved/rejected → done/cancelled/archived.
- **Publication states (original):** draft → compliance_passed → awaiting_approval → approved → scheduled → publishing → published/failed/archived.
- **Events (original):**
  - hub.ticket.created/updated, hub.task.assigned, hub.workflow.started/completed/failed, hub.approval.requested/granted/rejected, hub.limit.warning/exhausted/unlocked, hub.report.daily, hub.connector.registered
  - tamkoa.item.new/enriched, tamkoa.story.created/updated, tamkoa.alert.urgent/important, tamkoa.opportunity.detected/deadline_soon, tamkoa.trend.spike, tamkoa.health.warning
  - tumkao.brief.created, tumkao.draft.created/revised, tumkao.approval.requested, tumkao.media.job_started/completed, tumkao.publication.scheduled/published/failed, tumkao.metrics.updated, tumkao.sponsor.lead_created/outreach_ready
- **Endpoints (original):**
  - Hub: /v1/commands, /v1/tickets, /v1/tickets/{id}/assign|approve|reject, /v1/workflows/run, /v1/limits, /v1/schedules, /v1/reports/daily, /v1/connectors/register, /v1/webhooks/{connector_id}
  - Tamkoa: /v1/topics, /v1/sources, /v1/ingest, /v1/items, /v1/stories, /v1/alerts, /v1/opportunities, /v1/brief/daily
  - Tumkao: /v1/intake, /v1/briefs, /v1/drafts, /v1/media/jobs, /v1/publications, /v1/analytics/daily, /v1/sponsor-leads
- **Model routing (original):** Coding = Codex → Claude/Gemini; Thai writing = Claude → Gemini/Qwen/Typhoon; summarize = Gemini Flash-Lite → OpenRouter; embeddings = bge-m3 local → Gemini.
- **Scoring (original):** `final = 0.30·authority + 0.25·velocity + 0.20·keyword + 0.15·urgency + 0.10·feedback`.
- **Roadmap (original):** P0 infra · P1 Hub core · P2 Tamkoa ingestion · P3 Tumkao drafts · P4 E2E integration · P5 Media/Analytics/Finance/BD.
- **Original sequence diagram (21 steps):**
  1. Weibo → Collector
  2. normalize/dedupe
  3. → Enricher
  4. translate/classify/score
  5. Enricher → Collector "build story"
  6. alert.urgent
  7. story.created
  8. Hub creates ticket
  9. Hub emits tumkao.draft.requested
  10. Creative Planner brief
  11. Writer draft
  12. SEO
  13. Compliance
  14. tumkao.approval.requested
  15. Discord card
  16. User approves
  17. hub.approval.granted
  18. publish/schedule
  19. platform returns ID
  20. tumkao.content.published
  21. midnight summary

---

# PART B — CRITICAL REVIEW REPORT (round 1) — resolution status

| ID | Red flag (short) | Resolution | Where |
|---|---|---|---|
| RF-01 | Event name mismatch (`content.published` vs `publication.published`) | Single catalog + emit-time registry check | D6 |
| RF-02 | Hub emits under tumkao namespace (`tumkao.draft.requested`) | Command (`draft.create`), not event | D6, D8 |
| RF-03 | Dual approval ownership | Hub only; `tumkao.approval.requested` deleted | D5 |
| RF-04 | Story-building loop Enricher→Collector | StoryBuilder stage | E1 |
| RF-05 | Alert emitted before story | story.created first; same correlation_id; once_per | D10, E1 |
| RF-06 | Naming chaos | Glossary | D1 |
| RF-07 | No failed state | `failed` state | D4 |
| RF-08 | approved→done skips publishing | `publishing` mandatory | D4 |
| RF-09 | Unbounded revision loop | max 3 revisions | D4 |
| RF-10 | Approval never expires | TTL per priority | D5 |
| RF-11 | Zombie tickets / undefined review | cancel from any non-terminal; `review` removed | D4 |
| RF-12 | Approval not bound to content | `content_sha256` + signed proof + verifier | D5 |
| RF-13 | Weak dedupe | 2-level dedupe | E1 |
| RF-14 | Undefined scoring | 0–100 components + null rule | E1 |
| RF-15 | No event envelope | Envelope + idempotent delivery | D6 |
| RF-16 | Copyright flags not propagated | `rights` field + deterministic gate | E1, E2 |
| RF-17 | Redis Pub/Sub loses events | Postgres outbox now; `EventBus` port for Redis Streams later | D6 |
| RF-18 | Vague retry/timeout | Failure matrix with numbers | D15 |
| RF-19 | Missed midnight report | Snapshots + idempotent report_date + catch-up | D13 |
| RF-20 | Destructive actions via free text | Buttons/slash only | D9, D12 |
| RF-21 | Unauthenticated ingest | HMAC + 300 s skew | D8 |
| RF-22 | Codex as runtime brain; two workflow engines; two PMs | Deterministic Python orchestrator; Hub YAML engine only; Secretary merged into Hub | D2 |

---

# PART C — DECISION LOG (บันทึกการตัดสินใจ)

| ID | การตัดสินใจ | เหตุผล |
|---|---|---|
| D-001 | ส่งมอบเป็น 2 ไฟล์ คือ `HERMES_MASTER_SPEC.md` + `CODEX_PLAYBOOK.md` โดยหัวข้อใน Part D ตั้งชื่อตามไฟล์ใน handoff | ผู้ใช้เลือก Q1-A |
| D-002 | `tamkoa` = ตามข่าว (news intelligence), `tumkao` = ทำคอนเทนต์ (content studio) และ "ซือหย่วน" เป็นแค่ persona ใน Tumkao | เอกสารภาพรวมใช้สองชื่อสลับกัน จึงยึดตาม handoff |
| D-003 | Phase 1 ทำครบทั้ง 11 โมดูล และแบ่งเป็น milestone M0–M9 | ผู้ใช้เลือก Q2 |
| D-004 | ลำดับชั้นคือ Project → Ticket → Task และทุกระดับสร้างผ่าน Discord ได้ | ผู้ใช้เลือก Q3 |
| D-005 | ตัด state `draft`, `triaged`, `review` ออกจาก ticket โดย `triage` กลายเป็นแค่ field `assignee` และ `review` รวมเข้ากับ `awaiting_approval` | ลดความกำกวม (RF-11) |
| D-006 | Ticket ที่ไม่ต้องขออนุมัติไปจาก `in_progress` ถึง `done` ได้เลย ส่วน ticket ที่ผ่านการอนุมัติแล้วต้องผ่าน `publishing` เสมอ (ถ้าไม่มีอะไรต้อง publish ให้ใช้ executor `noop`) | ทำตามกฎข้อบังคับใน handoff โดยไม่ต้องมีเส้นทางพิเศษ |
| D-007 | Approval เกิดจาก ticket lifecycle เท่านั้น เมื่อทุก task สำเร็จแล้วและ `approval_required=true` จึงไม่มี workflow step ชื่อ `human_approval` | ป้องกันการมี approval สองทาง (RF-03) |
| D-008 | ใช้ Postgres 16 ทุกที่ผ่าน Docker ส่วน SQLite ใช้เฉพาะ unit test ที่ไม่แตะ queue | ผู้ใช้เลือก Q5-A |
| D-009 | Outbox บน Postgres ใช้ `FOR UPDATE SKIP LOCKED` อยู่หลัง interface `EventBus` เพื่อให้เปลี่ยนเป็น `RedisStreamsBus` ได้ภายหลัง | Q6-A + handoff |
| D-010 | Worker เป็น**อีกโปรเซส (container `worker`) แต่ใช้ image เดียวกับ API** แทนการรันใน process เดียวกัน | API ที่ reload หรือ crash ต้องไม่ทำให้ queue หยุด เนื้อหาตรงตาม Q6 (มี background worker) |
| D-011 | MockPublisher ตรวจ hash จริง และ `verify_approval_proof()` อยู่ใน `shared/py/hermes_common` | ผู้ใช้เลือก Q4-A |
| D-012 | Approval proof ลงลายเซ็นด้วย **Ed25519** โดย Hub ถือ private key และ publisher ถือ public key | publisher ที่ถูกเจาะยังปลอมใบอนุมัติไม่ได้ |
| D-013 | มี 3 role คือ owner / approver / viewer พร้อม four-eyes: approver อนุมัติ ticket ที่ตัวเองสร้างไม่ได้ (owner ได้รับยกเว้น) และ approver อนุมัติงาน P1 ได้ | ผู้ใช้ตอบ Q9 และ R3 |
| D-014 | Actor ที่เป็นระบบ (workflow, connector, AI) **อนุมัติอะไรไม่ได้เลย** | Separation of duties |
| D-015 | Phase 1 มี **Tumkao/Tamkoa stub** ทำงานใน process เดียวกับ Hub โดยปล่อย event `tumkao.*`/`tamkoa.*` จริงตาม catalog และ Tumkao stub เรียก MockPublisher | Phase 3 แค่เปลี่ยน adapter จาก `inprocess` เป็น `http` |
| D-016 | Discord bot เป็น**ตัวกลางบาง ๆ** ที่เรียก Hub REST API ทุกครั้ง โดยไม่แตะฐานข้อมูลตรง | บังคับให้ API เป็นผู้ตัดสินสิทธิ์ที่เดียว |
| D-017 | ข้อความแจ้งเตือนใน Discord ส่งโดย worker ผ่าน Discord REST ส่วนการกดปุ่ม bot เป็นคนรับ | worker ไม่ต้องเชื่อมต่อ gateway |
| D-018 | ข้อความอิสระใช้ได้แค่ใน `#hermes-command` สำหรับคำสั่งอ่านข้อมูล (รันทันทีถ้า ≥0.85) และคำสั่งสร้าง (ต้องกดยืนยัน) ส่วนคำสั่ง approve/reject/cancel/publish/retry/resume/role **ห้ามสั่งผ่านข้อความอิสระ** | ผู้ใช้ตอบ R1 |
| D-019 | Intent parser ใช้ Gemini Flash เมื่อ `USE_LLM_INTENT_PARSER=true` และถ้าตั้งเป็น false (รวมถึงตอนรัน pytest) จะใช้ regex | ผู้ใช้ตอบ Q11 |
| D-020 | Worker ทุกตัวใน Phase 1 เป็น mock และไม่เรียก LLM | ผู้ใช้ตอบ Q11 |
| D-021 | Phase 2 ใช้นโยบาย Free-First + Tiered Quality Fallback โดย Claude เป็น Tier 2 และต้องเช็ก `monthly_budget_remaining > 0` ก่อนเรียกทุกครั้ง | ผู้ใช้ตอบ Q11 |
| D-022 | ใช้ Codex CLI กับ GitHub repo ใหม่ และมี `AGENTS.md` + `docs/TASKS.md` + `docs/PROGRESS.md` + `docs/DECISIONS.md` | ผู้ใช้ตอบ Q12 |
| D-023 | **ให้ Codex ทำต่อเนื่องทั้ง milestone** โดย 1 task = 1 commit และ 1 milestone = 1 PR ถ้า `make verify` ล้มเหลว 2 ครั้งติดต้องหยุด | ผู้ใช้เลือก R2-B ซึ่งแทนกติกา "1 task = 1 PR" เดิม |
| D-024 | สเปกและ prompt เป็นภาษาอังกฤษ ส่วน decision log ข้อความใน Discord และรายงานเป็นภาษาไทย | ผู้ใช้ตอบ Q13 |
| D-025 | ทำ dev บน Windows ผ่าน WSL2 (Ubuntu 24.04) + Docker Desktop และเก็บ repo ไว้ใน `~/` ของ WSL | ผู้ใช้ตอบ R5 |
| D-026 | ใช้ Docker Compose + `.env` + Makefile ชุดเดียวกันทั้งเครื่อง dev และ VPS (Ubuntu) | ผู้ใช้ตอบ Q7 |
| D-027 | รองรับทั้ง ARM64 (Oracle) และ x86_64 (Hostinger) โดยค่าเริ่มต้นให้ build บน VPS เอง (native) และมี `make release` ใช้ buildx สร้าง multi-arch ส่งขึ้น GHCR เป็นทางเลือก | ผู้ใช้ตอบ R6 |
| D-028 | มี compose profile `tunnel` (cloudflared) และ `public` (Caddy) ให้เลือกเปิดใช้อย่างใดอย่างหนึ่ง | ผู้ใช้ตอบ R6 |
| D-029 | Visualizer ค่าเริ่มต้นเปิดได้แค่ `127.0.0.1` ถ้าเปิดให้เข้าจากภายนอกได้แต่ `VISUALIZER_AUTH=none` ระบบต้อง**ไม่ยอมเริ่มทำงาน** | ผู้ใช้ตอบ Q10 + กันพลาด |
| D-030 | ธีม Matrix สีเขียวกีวี Cheng Yi + cyber blue มีฝนตัวอักษรทั้งที่ header และพื้นหลังแบบจาง ๆ มีปุ่มปิด และเคารพการตั้งค่า reduced-motion | ผู้ใช้ตอบ R7 |
| D-031 | Phase 1 ยังไม่ต้องมีโดเมน เพราะ Discord ใช้การเชื่อมต่อขาออก ถ้าต้องทดสอบ webhook ใช้ quick tunnel (`trycloudflare`) ได้ | ผู้ใช้ตอบ R4 |
| D-032 | ใช้ห้อง Discord 4 ห้อง: command / approvals / alerts / reports | ผู้ใช้ตอบ R8 |
| D-033 | Runtime state อยู่ใน Postgres เท่านั้น ห้ามเขียนลง spec ส่วน `docs/PROGRESS.md` ใช้แค่บันทึกความคืบหน้าของการ*พัฒนา* | RF-22 |
| D-034 | n8n เป็นได้แค่ connector ในอนาคต ห้ามเป็น workflow engine | RF-22 |
| D-035 | โค้ด Hub ทั้งหมดอยู่ใต้ `services/hub/app/` (`api/`, `models/` และอื่น ๆ เป็น subpackage) แทนการวางเป็นพี่น้องกันตามที่ handoff เขียนไว้ | ให้ import root มีที่เดียวคือ `app` และกัน path ชนกัน |
| D-036 | Python package ร่วมอยู่ที่ `shared/py/hermes_common` ส่วน JSON Schema ที่ export ออกมาอยู่ที่ `shared/schemas` และ `shared/events` | ผู้ใช้ระบุ path เอง |
| D-037 | ใช้ ULID มี prefix เป็น ID หลัก ส่วนรหัสที่คนอ่านคือ `{PROJECT_KEY}-{0001}` | กันการชนกันของลำดับเลขเมื่อมีงานพร้อมกัน |
| D-038 | Task เพิ่ม state `cancelled` (นอกเหนือจาก 4 state ที่ตกลงกัน) | จำเป็นเมื่อ ticket ถูกยกเลิก |

---

# PART D — PHASE 1 VERIFIED SPEC (normative)

## D1. MASTER_SPEC — Scope & Glossary

### D1.1 Phase 1 goal
A runnable Hermes Hub that manages Projects/Tickets/Tasks, enforces a hash-bound approval flow, dispatches events reliably via outbox, runs YAML workflows and schedules, tracks model limits, talks to the owner via Discord (slash + buttons + guarded free text), posts a Thai midnight report, and shows everything on a read-only Matrix-themed Visualizer. External systems are **stubs** that speak the real contracts.

### D1.2 In scope (11 modules)
1. Projects/Tickets/Tasks + state machines
2. Approvals bound to `content_sha256` with signed proof
3. Outbox + EventBus + dispatcher worker
4. Connector registry + manifest validation + in-process stubs (Tamkoa, Tumkao, MockPublisher)
5. Signed webhook intake
6. Audit log
7. Discord bot (slash, buttons, modals, notifications)
8. Daily report (template-rendered Thai, no LLM)
9. Workflow engine (YAML + JSONLogic) + schedules
10. Limits/quota tracking
11. Intent parser (Gemini Flash or regex fallback)

Plus: Visualizer MVP, Docker/Makefile/deploy scripts, CI.

### D1.3 Out of scope (Phase 1)
Real scraping/enrichment/clustering, real LLM content generation, real social publishing, media processing, analytics, sponsor CRM, TTS, voice cloning, Redis.

### D1.4 Glossary
| Term | Definition |
|---|---|
| Project | Container of tickets. Has unique `key` (`^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

), e.g. `SYW`, `TMK`, `HUB`. |
| Ticket | Unit of work that runs through the ticket state machine (D4.1). |
| Task | Sequential sub-step of a ticket, executed by an *executor* (D4.2). |
| Artifact | Versioned output attached to a ticket (draft, note, report). Approvals bind to one artifact version. |
| Executor | Who runs a task: `manual`, `mock:<name>`, `connector:<connector_id>:<command>`. |
| Command | An instruction to one receiver; may be rejected; idempotent by key. |
| Event | An immutable past-tense fact; any number of subscribers. |
| Actor | `user:<usr_id>`, `system:<component>`, `workflow:<workflow_id>`, `connector:<id>`. |
| Proof | Ed25519-signed `ApprovalProof` (D5.3). |

### D1.5 Conventions
- **IDs:** ULID with prefix — `usr_ prj_ tck_ tsk_ art_ apr_ evt_ cmd_ run_ sch_ lim_ drf_ pub_`. Display code `"{project.key}-{seq:04d}"`, with seq per project allocated under row lock.
- **Time:** store UTC (`timestamptz`). Display and schedule in `Asia/Bangkok`. All code reads time via an injectable `Clock` (`hermes_common.time.Clock`). Tests use `FrozenClock`.
- **JSON columns:** `JSON().with_variant(JSONB, "postgresql")`.
- **Errors (API):** `{"error":{"code":"UPPER_SNAKE","message":"...","details":{}}}`.
- **Logging:** JSON lines (structlog) with `correlation_id`, `actor`, `event_id` where available. Secrets MUST NOT be logged.
- **Stack:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, psycopg 3, pytest, ruff, mypy (strict on `hermes_common` + `app/services`), uv, discord.py 2.x, httpx, Jinja2, croniter, cryptography, structlog, python-ulid.

## D2. Architecture & Runtime Topology

### D2.1 Control hierarchy
| Layer | Role | Implementation | Owns state |
|---|---|---|---|
| L0 Gateway | Discord / REST / webhook → validated Command or Event | FastAPI routers, discord.py bot (thin client) | No |
| L1 Hub Orchestrator | Ticket lifecycle, approvals, workflows, schedules, limits, reports | Deterministic Python domain services + worker loops | **Yes** |
| L2 Domain systems | Tamkoa/Tumkao internal pipelines | Phase 1: in-process stubs | Own data |
| L3 Workers | Single-purpose executors | Phase 1: mock workers | No |

LLMs MAY only be used for intent parsing (Phase 1). Orchestration decisions MUST be deterministic code.

### D2.2 Containers (one image `hermes-hub`, different commands)
| Service | Command | Notes |
|---|---|---|
| `db` | postgres:16-alpine | volume `pgdata`, healthcheck `pg_isready` |
| `migrate` | `alembic upgrade head` | one-shot; `api`/`worker`/`bot` depend on it completing |
| `api` | `uvicorn app.main:app --host 0.0.0.0 --port 8000` | serves REST + Visualizer; published on `${BIND_HOST}:${HUB_PORT}` |
| `worker` | `python -m app.workers.main` | outbox dispatcher, task runner, scheduler, expiry, limits, health loops |
| `bot` | `python -m app.discord.main` | Discord gateway; calls `api` over the internal network |
| `cloudflared` | profile `tunnel` | needs `CLOUDFLARE_TUNNEL_TOKEN` |
| `caddy` | profile `public` | needs `CADDY_DOMAIN`, ports 80/443 |
| `db-test` | profile `test` | tmpfs, `127.0.0.1:55432` |

### D2.3 Worker loops (all in `worker`, each a separate asyncio task with its own DB sessions)
| Loop | Interval | Responsibility |
|---|---|---|
| outbox_fanout | 500 ms | create `event_deliveries` rows for new outbox events |
| outbox_dispatch | 500 ms | claim due deliveries (batch 50, `SKIP LOCKED`), run subscriber |
| task_runner | 1 s | start next pending task per ticket; run mock executors; send connector commands |
| scheduler | 15 s | fire due `schedules` |
| expiry | 60 s | expire approvals, time out event waiters |
| limits | 60 s | resets, reset-soon warnings, unlock + resume |
| connector_health | 60 s | health checks, emit health_changed |
| archiver | daily 03:00 Bangkok | archive closed tickets older than 30 days |

Each loop MUST catch and log its own exceptions and continue. A loop crashing 5 times in 5 minutes MUST notify `#hermes-alerts` and then keep retrying with 60 s backoff.

## D3. Data Model (Hub DB, Alembic-managed)

| Table | Columns (type · constraint) |
|---|---|
| `users` | id pk · discord_id text unique null · display_name · role enum(owner,approver,viewer) · api_token_hash text null · is_active bool · created_at |
| `projects` | id pk · key text unique `^[A-Z]{2,6}## รอบคำถามจบแล้ว ตัดสินใจครบทุกข้อ และนี่คือไฟล์ที่ 1 จาก 2

ก่อนเขียน ผมอ่านเอกสารต้นฉบับทั้ง 5 ไฟล์อีกรอบ เจอจุดที่ต้องตัดสินใจเองนอกเหนือจากคำตอบของคุณ ทุกข้อมีบันทึกพร้อมเหตุผลใน Part C (Decision log) ข้อที่ควรรู้ก่อนคือ:

- **ชื่อ Tamkoa กับ Tumkao สลับกัน:** เอกสาร "Multi Agents ภาพรวม" ใช้สองชื่อนี้กลับด้านกับสเปกหลัก ผมยึดตาม handoff คือ `tamkoa` = ตามข่าว และ `tumkao` = ทำคอนเทนต์ (D-002)
- **R2-B ทำให้กติกา "1 task = 1 PR" เปลี่ยน:** กลายเป็น 1 task = 1 commit และ 1 milestone = 1 PR (D-023)
- **ใน Phase 1 จะมีตัวจำลอง Tumkao (stub) ทำงานในโปรเซสเดียวกับ Hub:** ตัวนี้ปล่อย event `tumkao.*` จริงและเรียก MockPublisher ที่ตรวจ hash จริง ดังนั้นตอนสร้าง Tumkao ตัวจริงใน Phase 3 แค่สลับ adapter ไม่ต้องแก้ Hub (D-015)
- **Approval proof ใช้ลายเซ็น Ed25519 ไม่ใช้ HMAC:** ระบบที่ทำหน้าที่ publish มีแค่ public key จึงปลอมใบอนุมัติไม่ได้ แม้ระบบนั้นจะถูกเจาะ (D-012)
- **ตอนเปิดดู Visualizer จากภายนอก:** ถ้าเปิดผ่าน Tunnel หรือ Caddy แต่ไม่ได้ตั้ง token ระบบจะ**ไม่ยอมเริ่มทำงาน** ข้อนี้กันพลาดเปิดข้อมูลทั้งหมดสู่สาธารณะ (D-029)
- **ไม่มีโดเมนก็ไม่เป็นไรใน Phase 1:** Discord bot เชื่อมต่อแบบขาออก จึงไม่ต้องเปิดรับการเชื่อมต่อจากภายนอก (D-031)

**วิธีบันทึกไฟล์:** คัดลอกทุกอย่างในกล่องด้านล่างไปบันทึกเป็น `docs/HERMES_MASTER_SPEC.md`

 · name (1–100) · description · owner_user_id fk · status enum(active,archived) · ticket_seq int default 0 · created_at · updated_at |
| `tickets` | id pk · project_id fk · display_code unique · title (1–200) · description text · type enum(research,content,dev,ops,approval,other) · state enum(D4.1) · blocked_reason enum(quota,service,timeout,compliance,task_failed,missing_artifact,dependency,manual) null · blocked_ref text null · priority enum(P1,P2,P3,P4) · requested_by text · assignee text null · approval_required bool · publish_target text default 'noop' · due_at null · tags json · dependencies json (ticket ids) · revision_count int default 0 · subject_ref json null · correlation_id · row_version int (optimistic lock) · created_at · updated_at · closed_at null |
| `tasks` | id pk · ticket_id fk · seq int · title · executor text · state enum(pending,running,succeeded,failed,cancelled) · input json · output json · attempts int · max_attempts int default 3 · next_attempt_at null · command_id null · error text null · started_at · finished_at · created_at · unique(ticket_id, seq) |
| `artifacts` | id pk · ticket_id fk · task_id null · kind enum(draft,note,report,file_ref) · version int · content json · content_sha256 char(64) · external_ref json null · created_by · created_at · unique(ticket_id, kind, version) |
| `approvals` | id pk · ticket_id fk · artifact_id fk · content_sha256 · state enum(pending,granted,rejected,changes_requested,expired,superseded) · requested_at · expires_at · decided_by null · decided_at null · reason text null · nonce text · proof json null · discord_message_id null |
| `audit_log` | id bigserial · at · actor · action · entity_kind · entity_id · from_state null · to_state null · reason null · data json · correlation_id |
| `commands` | id pk · source enum(discord,api,nl,workflow,schedule) · actor · name · args json · state enum(accepted,running,succeeded,failed,rejected) · result json · error · created_at · finished_at |
| `idempotency_keys` | (actor, key) pk · request_hash · response_status · response_body json · created_at (TTL 24 h, purged by archiver) |
| `outbox` | id bigserial · event_id unique · type · source · envelope json · origin enum(internal,external) · fanned_out bool · created_at |
| `event_deliveries` | (event_id, subscriber) pk · state enum(pending,done,dead) · attempts · next_attempt_at · last_error · updated_at |
| `connectors` | id text pk · manifest json · version · enabled bool · health enum(unknown,ok,degraded,down) · consecutive_failures int · last_seen_at · registered_at |
| `workflow_defs` | (id, version) pk · source_yaml · checksum · enabled · loaded_at |
| `workflow_runs` | id pk · workflow_id · workflow_version · trigger_event_id · subject_key null · state enum(running,waiting,succeeded,failed,cancelled) · context json · current_step · error · started_at · finished_at · **unique(workflow_id, subject_key) where subject_key is not null** |
| `workflow_step_runs` | (run_id, step_id) pk · state · attempts · output json · error · started_at · finished_at |
| `event_waiters` | id pk · run_id · step_id · event_type · match json · expires_at · state enum(waiting,fulfilled,timed_out) |
| `schedules` | id pk · name · kind enum(cron,once) · cron_expr null · run_at null · timezone default 'Asia/Bangkok' · action json · enabled · next_run_at · last_run_at · created_by · is_system bool |
| `limits` | id pk · resource unique · kind enum(quota,window,deadline) · unit enum(requests,tokens,messages,usd,percent) · quota_max numeric null · quota_used numeric · reset_at null · reset_period text (ISO-8601 duration) null · warn_usage_pct json default [0.7,0.9,1.0] · warn_before_reset json default ["P1D","PT1H"] · warned json · state enum(ok,warning,exhausted) · action_on_unlock enum(resume_blocked,notify) · updated_at |
| `limit_usage` | id bigserial · limit_id · amount · source · at |
| `executor_limits` | executor_pattern text · limit_id — loaded from `config/limits.seed.yaml` |
| `daily_snapshots` | report_date date pk · window_start · window_end · metrics json · rendered_text · discord_message_id null · created_at |
| `intent_logs` | id · actor · raw_text · parser enum(llm,regex) · intent · confidence · entities json · latency_ms · at (retention 30 days) |
| `stub_tumkao_drafts` | id (`drf_`) pk · ticket_id · task_id · version · content json · content_sha256 · updated_at |
| `stub_tumkao_publications` | id (`pub_`) pk · draft_id · draft_version · state · url · error_code · created_at |

**Optimistic locking:** every ticket update does `UPDATE … WHERE id=:id AND row_version=:v`. 0 rows → retry the domain operation once, then `409 CONCURRENT_MODIFICATION`.

## D4. STATE_MACHINE

### D4.1 Ticket
States: `open, in_progress, blocked, awaiting_approval, approved, publishing, done, rejected, expired, failed, cancelled, archived`.

| # | From | To | Trigger | Guard | Side effects |
|---|---|---|---|---|---|
| T01 | — | open | create | project active | audit, `hub.ticket.created` |
| T02 | open | in_progress | task_runner starts first task OR `/ticket start` | all `dependencies` are `done` | — |
| T03 | in_progress | blocked | quota / service / timeout / compliance / task_failed / missing_artifact / manual | reason required | notify #alerts |
| T04 | blocked | in_progress | `hub.limit.unlocked` matching `blocked_ref` (auto) OR `/ticket resume` | reason cleared; failed task reset to pending, attempts=0 | — |
| T05 | in_progress | awaiting_approval | all tasks succeeded | `approval_required` AND a `draft` artifact exists | create Approval, `hub.approval.requested` |
| T05b | in_progress | blocked(missing_artifact) | all tasks succeeded | `approval_required` AND no draft artifact | — |
| T06 | in_progress | done | all tasks succeeded | NOT `approval_required` | closed_at |
| T07 | awaiting_approval | approved | approval granted | D5 rules | proof stored |
| T08 | awaiting_approval | in_progress | changes requested | `revision_count < 3` | revision_count++; enqueue revision task |
| T09 | awaiting_approval | rejected | rejected, OR changes requested when `revision_count == 3` | — | closed_at |
| T10 | awaiting_approval | expired | `now > approval.expires_at` | — | `hub.approval.expired` |
| T11 | approved | publishing | automatic (task_runner) | proof valid | send publish command to `publish_target` |
| T12 | publishing | done | `tumkao.publication.published` OR noop | correlates to ticket | closed_at |
| T13 | publishing | failed | `tumkao.publication.failed` (non-retriable or retries exhausted) OR proof rejected | — | notify #alerts |
| T14 | failed | publishing | `/ticket retry` | existing proof still valid (`valid_until` not passed, hash unchanged) | else 409 `REAPPROVAL_REQUIRED` |
| T15 | failed, expired | in_progress | `/ticket reopen` | `revision_count < 3` | revision_count++; old approval → superseded |
| T16 | open, in_progress, blocked, awaiting_approval, approved, failed, expired | cancelled | `/ticket cancel` | reason required | tasks → cancelled; pending approval → superseded |
| T17 | done, rejected, cancelled, expired, failed | archived | archiver | `closed_at` or `updated_at` older than 30 days | — |

- `publishing → cancelled` is **forbidden** (409 `IN_FLIGHT`).
- Any transition not listed → 409 `INVALID_TRANSITION`.
- Every transition writes `audit_log` and emits `hub.ticket.state_changed` in the **same transaction**.
- Implement as a declarative table in `app/services/state_machine.py`. Tests MUST generate the full 12×12 matrix.

### D4.2 Task
`pending → running → succeeded | failed`; `failed → pending` (auto retry while `attempts < max_attempts`, backoff `10 s × attempts`); `pending | running → cancelled` (ticket cancelled).
- Tasks run **sequentially by `seq`**, with at most one `running` task per ticket.
- **`manual`:** waits for `/task done <id> [note]` or `/task fail <id> <reason>`.
- **`mock:<name>`:** sleeps `MOCK_WORKER_DELAY_S`, then writes a deterministic artifact. `mock:write` → `draft`; others → `note`.
- **`connector:<cid>:<cmd>`:** sends a Command. The task completes on an event carrying `task_id` (`*.command.completed|failed`, or a domain event such as `tumkao.draft.ready_for_approval`). The timeout is `TASK_CONNECTOR_TIMEOUT` (default PT30M), then `failed(timeout)`.
- **Before a task starts:** every limit bound to its executor via `executor_limits` is checked. If any is `exhausted` → ticket `blocked(quota, blocked_ref=limit_id)` and the task stays `pending`.
- **Final failure** (attempts exhausted) → ticket `blocked(task_failed)`.
- **Revision task (T08):** clone of the last task, with `input.feedback`, `input.revision=n`, and `input.previous_artifact_id`.

### D4.3 Approval
`pending → granted | rejected | changes_requested | expired | superseded`. Terminal once decided. At most **one** `pending` approval per ticket (partial unique index).

### D4.4 Workflow run
`running ⇄ waiting → succeeded | failed | cancelled`. A step failure applies `on_failure` (D10).

## D5. APPROVAL_MODEL & RBAC

### D5.1 RBAC
| Capability | owner | approver | viewer | system actors |
|---|---|---|---|---|
| Read anything (API, Discord read commands, Visualizer if authorized) | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ❌ | ❌ | ❌ |
| Create/edit ticket, task, artifact | ✅ | ✅ | ❌ | ✅ (workflows) |
| Approve / Reject / Request changes | ✅ | ✅ (four-eyes) | ❌ | ❌ **never** |
| Cancel / Retry / Resume / Reopen / Start | ✅ | ✅ | ❌ | ❌ |
| Connectors, limits, schedules, workflows reload, roles, tokens | ✅ | ❌ | ❌ | ❌ |
| `/dev *` commands | ✅ when `DEV_COMMANDS_ENABLED=true` and `HUB_ENV != prod` | ❌ | ❌ | ❌ |

- **Four-eyes:** an approver MUST NOT decide an approval whose `ticket.requested_by == "user:<self>"` → 403 `FOUR_EYES`. Owners are exempt.
- **Unknown Discord user:** only `/help`; everything else gets an ephemeral "ไม่มีสิทธิ์" reply.
- **Bootstrap:** on API startup, upsert every id in `OWNER_DISCORD_IDS` as `owner`. The last active owner cannot be demoted (409 `LAST_OWNER`).

### D5.2 Authentication
| Caller | Mechanism |
|---|---|
| Human REST client | `Authorization: Bearer <token>`. The token is created by `/token create` (owner, shown once, ephemeral) or `make token`. Only the SHA-256 is stored. |
| Discord bot | `X-Hermes-Bot-Token: ${BOT_SERVICE_TOKEN}` + `X-Actor-Discord-Id: <id>`. The API resolves the user by discord_id. |
| Connector webhook | HMAC (D8.3) |
| Visualizer | `VISUALIZER_AUTH=none\|token` (D14) |

### D5.3 Approval lifecycle (Input → Process → Output)
**Request**
- **Input:** T05 fires.
- **Process:**
  1. Load the latest `draft` artifact.
  2. Create an Approval with `content_sha256 = artifact.content_sha256`, `expires_at = now + TTL(priority)`, and a 32-byte random `nonce`.
  3. Emit `hub.approval.requested`.
- **Output:** the notifier posts a card in `#hermes-approvals` and stores `discord_message_id`.

**TTL:** P1 `PT6H`, P2 `PT24H`, P3/P4 `PT72H` (env-overridable).

**Decide**
- **Input:** a button interaction, or `POST /v1/approvals/{id}/decision {action: grant|reject|request_changes, reason?, feedback?, expected_sha256}`.
- **Process (one DB transaction):**
  1. Approval is `pending`, else 409 `ALREADY_DECIDED`.
  2. `now <= expires_at`, else 409 `EXPIRED`.
  3. RBAC + four-eyes check.
  4. `expected_sha256 == approval.content_sha256 == latest draft artifact hash`, else 409 `STALE_CONTENT`. The bot passes the hash embedded in the card.
  5. Apply T07, T08 or T09.
  6. On grant, build and sign the proof.
- **Output:** `hub.approval.granted|rejected|changes_requested`. The card is edited to show the result and the buttons are disabled.

**ApprovalProof** (in `hermes_common.approval_proof`):
```json
{
  "approval_id": "apr_…", "ticket_id": "tck_…", "artifact_id": "art_…",
  "external_ref": {"connector": "tumkao", "draft_id": "drf_…", "version": 2},
  "content_sha256": "64 hex", "decided_by": "user:usr_…",
  "decided_at": "RFC3339", "valid_until": "RFC3339",
  "key_id": "k1", "signature": "base64url(Ed25519)"
}
```
- `valid_until = decided_at + PUBLISH_WINDOW` (P1 `PT6H`, others `PT24H`).
- Signature input = `canonical_json(proof without "signature")`.
- `canonical_json(x)` = recursively NFC-normalize every string, then `json.dumps(sort_keys=True, separators=(",",":"), ensure_ascii=False).encode("utf-8")`.
- `content_sha256 = sha256(canonical_json(content)).hexdigest()`.

**`verify_approval_proof(proof, current_content, public_keys: dict[str, bytes], now) -> None`**
Raises `ApprovalProofError(code)`. Checks run in this order:
1. `UNKNOWN_KEY`
2. `BAD_SIGNATURE`
3. `EXPIRED` (`now > valid_until`)
4. `HASH_MISMATCH` (`sha256(canonical_json(current_content)) != proof.content_sha256`)

**Publisher invariant:** every PublisherAdapter MUST call `verify_approval_proof` immediately before the external publish call. On error it MUST NOT publish, and MUST emit `*.publication.failed{retriable:false, error_code:<code>}`.

**Keys:** `make keys` generates an Ed25519 keypair into `./secrets/approval_ed25519{,.pub}` (gitignored). The env carries `APPROVAL_KEY_ID`, `APPROVAL_PRIVATE_KEY_PATH` and `APPROVAL_PUBLIC_KEYS` (`kid:path,…`) for rotation.

### D5.4 Discord button integrity
- `custom_id = "apr:{approval_id}:{a|c|r}:{tag}"`, where `tag = base64url(HMAC_SHA256(DISCORD_BUTTON_SECRET, approval_id + action + nonce))[:16]` (≤ 100 chars).
- Invalid tag → ephemeral error + audit `button_tamper`.
- `c` (request changes) opens a modal with a required feedback field (≤ 1000 chars). `r` (reject) opens a modal with an optional reason.

## D6. EVENT_CATALOG

### D6.1 Envelope (`hermes_common.envelope.EventEnvelope`)
```json
{
  "event_id": "evt_ULID", "type": "ns.entity.verb_past", "schema_version": 1,
  "source": "hub|tamkoa|tumkao|<connector_id>", "occurred_at": "RFC3339 UTC",
  "correlation_id": "string", "causation_id": "evt_…|null",
  "subject": {"kind": "ticket|story|approval|…", "id": "…"},
  "actor": "user:…|system:…|workflow:…|connector:…",
  "payload": {}
}
.
- `source` MUST equal the namespace prefix, except connector-sourced stubs, which use their namespace (`tamkoa`, `tumkao`).

### D6.2 Registry
- `shared/events/catalog.yaml` lists `type, version, producer, status(active|reserved), payload_model`.
- Each payload is a Pydantic model in `hermes_common.events.payloads`. `make schemas` exports JSON Schemas to `shared/events/<type>.v<n>.json` and `shared/schemas/`. CI fails if the exported files are stale.
- `EventBus.publish()` MUST raise `UnregisteredEventType` for types not `active`, and MUST validate the payload.

### D6.3 Active events (Phase 1)
| Type | Payload (required fields) |
|---|---|
| hub.project.created | project_id, key, name |
| hub.ticket.created | ticket_id, display_code, project_id, type, priority, approval_required, requested_by |
| hub.ticket.state_changed | ticket_id, display_code, from, to, reason?, blocked_reason? |
| hub.ticket.updated | ticket_id, changed_fields[] |
| hub.task.created | task_id, ticket_id, seq, executor |
| hub.task.state_changed | task_id, ticket_id, from, to, error? |
| hub.artifact.created | artifact_id, ticket_id, kind, version, content_sha256 |
| hub.approval.requested | approval_id, ticket_id, artifact_id, content_sha256, expires_at, priority |
| hub.approval.granted | approval_id, ticket_id, decided_by, proof |
| hub.approval.rejected | approval_id, ticket_id, decided_by, reason? |
| hub.approval.changes_requested | approval_id, ticket_id, decided_by, feedback, revision_count |
| hub.approval.expired | approval_id, ticket_id |
| hub.connector.registered | connector_id, version |
| hub.connector.health_changed | connector_id, from, to |
| hub.workflow.started / completed | run_id, workflow_id, trigger_event_id? |
| hub.workflow.failed | run_id, workflow_id, step_id, error |
| hub.limit.warning | limit_id, resource, reason(usage\|reset_soon), used_pct, reset_at? |
| hub.limit.exhausted | limit_id, resource, reset_at? |
| hub.limit.unlocked | limit_id, resource |
| hub.schedule.fired | schedule_id, action_kind, result_ref |
| hub.report.daily | report_date, metrics |
| hub.dlq.dead_lettered | event_id, event_type, subscriber, error |
| tamkoa.story.created / updated | story_id, title_th, summary_th, final_score (0–100), alert_level(urgent\|important\|none), sources[], rights{media_reuse} |
| tamkoa.alert.raised | story_id, level, title_th |
| tamkoa.health.warning | source_id, reason |
| tamkoa.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |
| tumkao.draft.ready_for_approval | ticket_id, task_id, draft_id, version, content, content_sha256 |
| tumkao.draft.compliance_failed | ticket_id, task_id, draft_id, findings[] |
| tumkao.publication.published | ticket_id, draft_id, version, publication_id, platform, url |
| tumkao.publication.failed | ticket_id, draft_id, retriable, error_code, message |
| tumkao.command.completed / failed | command_id, task_id?, ticket_id?, result? / error_code, message |

**Reserved (Phase 2+, status `reserved`):**
- tamkoa: item.ingested, opportunity.detected, opportunity.deadline_soon, trend.spike
- tumkao: brief.created, publication.scheduled, metrics.updated, sponsor.lead_created

**Deleted forever:** `tumkao.draft.requested`, `tumkao.approval.requested`, `tumkao.content.published`, `tamkoa.alert.urgent`, `tamkoa.alert.important` (replaced by `alert.raised{level}`).

### D6.4 Transport (PostgresOutboxBus)
- **Publish:** `bus.publish(session, envelope)` inserts into `outbox` within the caller's transaction. It never commits by itself.
- **Fan-out:** for each `fanned_out=false` row, insert an `event_deliveries` row per matching subscriber, then set `fanned_out=true`.
- **Dispatch:**
  1. `SELECT … FROM event_deliveries WHERE state='pending' AND next_attempt_at<=now ORDER BY event_id LIMIT 50 FOR UPDATE SKIP LOCKED`.
  2. For each row, open a transaction, run the handler, and set `state='done'` in the **same** transaction. DB-side effects are therefore exactly-once. External side effects (Discord) are at-least-once, deduped by storing `discord_message_id` keyed by event_id.
- **Retry:** on failure, `attempts += 1` and `next_attempt_at = now + 5 s × 2^attempts`. After 5 attempts the delivery is `dead`, and the bus emits `hub.dlq.dead_lettered`. A handler of `hub.dlq.*` MUST NOT trigger another DLQ event.
- **Ordering:** best effort by event_id. Handlers MUST be idempotent and MUST re-check current state before acting.
- **Port:** `EventBus` protocol = `publish`, `run_fanout_once`, `run_dispatch_once`, `requeue_dead(event_id, subscriber)`. A future `RedisStreamsBus` implements the same protocol.

### D6.5 Phase 1 subscribers
| Subscriber | Consumes | Action |
|---|---|---|
| `lifecycle` | tumkao.*, tamkoa.command.*, hub.limit.unlocked | task completion, artifact creation, T05/T12/T13, auto-resume |
| `workflow_engine` | `*` | trigger matching + event_waiters |
| `discord_notifier` | see D9.4 | post/edit Discord messages |
| `connector_forwarder` | events in an enabled http connector's `consumes` | HTTP POST (no-op in Phase 1, since stubs are inprocess) |

## D7. REST API (`/v1`, JSON, Bearer or bot headers)

| Method & path | Role | Input | Output |
|---|---|---|---|
| GET /healthz · /readyz | public | — | 200 / 503 (DB + migrations at head) |
| GET /v1/me | any | — | user + role |
| POST /v1/projects | owner | key, name, description? | 201 Project |
| GET /v1/projects · /{key} | viewer+ | — | list / detail + counts by state |
| POST /v1/tickets | approver+ | project_key, title, type, priority, approval_required, publish_target?, description?, due_at?, tags?, dependencies?, tasks?[{title, executor, input}] | 201 Ticket |
| GET /v1/tickets | viewer+ | ?project&state&priority&cursor&limit≤100 | page |
| GET /v1/tickets/{id\|code} | viewer+ | — | ticket + tasks + artifacts + approvals + audit |
| POST /v1/tickets/{id}/actions/{start\|cancel\|resume\|retry\|reopen} | approver+ | reason? | 200 Ticket \| 409 |
| POST /v1/tickets/{id}/tasks | approver+ | title, executor, input? | 201 Task |
| POST /v1/tasks/{id}/actions/{done\|fail} | approver+ | note? / reason | 200 Task |
| POST /v1/tickets/{id}/artifacts | approver+ | kind, content | 201 Artifact (hash computed server-side) |
| GET /v1/approvals?state=pending | viewer+ | — | list |
| POST /v1/approvals/{id}/decision | approver+ | action, expected_sha256, reason?, feedback? | 200 Approval \| 403 \| 409 |
| POST /v1/commands | per intent | text \| {name, args} | 202 {command_id, state, result?} |
| POST /v1/commands/{id}/confirm | creator | — | 200 |
| GET/POST/PATCH /v1/limits · POST /v1/limits/{id}/usage | viewer+/owner | — / limit fields / amount, source | Limit |
| GET/POST/DELETE /v1/schedules | viewer+/owner | name, kind, cron_expr\|run_at, action | Schedule |
| GET /v1/workflows · POST /v1/workflows/reload · POST /v1/workflows/{id}/run | viewer+/owner/owner | — / — / payload | defs / reload report / run |
| GET /v1/reports/daily?date= · POST /v1/reports/daily/run | viewer+/owner | date | snapshot |
| GET /v1/connectors · POST /v1/connectors/register | viewer+/owner | manifest | Connector \| 422 MANIFEST_INVALID |
| POST /v1/webhooks/{connector_id} | HMAC | envelope | 202 \| 200 duplicate \| 401/403/413/422 |
| GET /v1/events?type&state · POST /v1/events/{event_id}/requeue | viewer+/owner | — | page / 200 |
| POST /v1/users/role · POST /v1/users/{id}/token | owner | discord_id, role / — | User / token (once) |
| POST /v1/dev/emit · POST /v1/dev/stub/tumkao/mutate-draft | owner, dev only | envelope / draft_id, patch | 202 |

- **Idempotency:** every POST that creates something or changes state MUST accept an `Idempotency-Key` header.
  - Same `(actor, key)` with the same request hash → return the stored response.
  - Same key with a different hash → 422 `IDEMPOTENCY_KEY_REUSED`.
  - The bot always sends `Idempotency-Key = interaction.id`.

## D8. Connectors & Webhooks

### D8.1 Ports (`app/connectors/base.py`)
```python
class ConnectorAdapter(Protocol):
    id: str
    manifest: ConnectorManifest
    async def send_command(self, cmd: ConnectorCommand) -> CommandAck: ...   # accepted|rejected(+reason)
    async def health(self) -> HealthStatus: ...

class PublisherAdapter(Protocol):
    platform: str
    def validate(self, content: dict) -> list[ValidationIssue]: ...
    async def publish(self, content: dict, proof: ApprovalProof) -> PublishResult: ...
```
`ConnectorCommand = {command_id, name, args, ticket_id?, task_id?, correlation_id, idempotency_key}`.

### D8.2 Manifest (`connectors/<id>/manifest.json`, validated by `hermes_common.manifest`)
```json
{
  "manifest_version": 1, "id": "tumkao", "name": "Tumkao Content Studio", "version": "0.1.0",
  "kind": ["worker", "publisher"], "transport": "inprocess", "base_url": null,
  "commands": [
    {"name": "draft.create", "args_schema": {"type": "object", "required": ["brief"]}},
    {"name": "draft.revise", "args_schema": {"type": "object", "required": ["draft_id", "feedback"]}},
    {"name": "publication.create", "args_schema": {"type": "object", "required": ["draft_id", "proof"]}}
  ],
  "emits": ["tumkao.draft.ready_for_approval", "tumkao.draft.compliance_failed",
            "tumkao.publication.published", "tumkao.publication.failed",
            "tumkao.command.completed", "tumkao.command.failed"],
  "consumes": [],
  "webhook": {"secret_env": "CONNECTOR_SECRET_TUMKAO"},
  "health": {"interval_s": 60},
  "rate_limits": {"commands_per_min": 30}
}
```
- **Rejection (422) if:** schema invalid; `id` ≠ folder name; any `emits`/`consumes` type not in the catalog (active or reserved); an emitted type's namespace ≠ the connector id (except `mock_publisher`, which emits nothing); `transport=http` without `base_url`.
- **Loading:** all manifests in `connectors/*/manifest.json` are loaded on API startup (upsert). Changes emit `hub.connector.registered`.
- **Shipped manifests:** `tamkoa` (commands: `research.run`; emits `tamkoa.story.created|updated`, `tamkoa.alert.raised`, `tamkoa.health.warning`, `tamkoa.command.*`), `tumkao` (above), `mock_publisher` (kind `publisher`, no commands).

### D8.3 Webhook intake
- **Headers:** `X-Hermes-Timestamp` (unix seconds) and `X-Hermes-Signature: sha256=<hex(HMAC_SHA256(secret, f"{ts}.{raw_body}"))>`.
- **Checks, in order:**
  1. Connector exists and is enabled (404/403).
  2. Body ≤ 256 KB (413).
  3. `|now − ts| ≤ 300 s` (401 `STALE_TIMESTAMP`).
  4. Constant-time signature compare (401 `BAD_SIGNATURE`).
  5. Envelope valid (422).
  6. `type ∈ manifest.emits` and `source == connector id` (403 `NOT_ALLOWED_EVENT`).
  7. Insert into outbox with `origin=external`. If `event_id` already exists → 200 `{"status":"duplicate"}`.
- **Output:** 202 `{"status":"accepted","event_id":…}`.

### D8.4 Stubs (Phase 1, `app/connectors/stubs/`)
- **TumkaoStub:**
  - `draft.create` → after `MOCK_WORKER_DELAY_S`, creates a `stub_tumkao_drafts` v1 with deterministic Thai mock content `{caption, hashtags[], attribution{source_url}, compliance{status:"pass",risk_level:"low"}}`, then emits `tumkao.draft.ready_for_approval`.
  - `draft.revise` → v+1, with feedback echoed into the caption.
  - `publication.create` → loads the **current** draft, calls `MockPublisher.publish(content, proof)` (which calls `verify_approval_proof`), then emits `published` or `failed`.
  - `STUB_PUBLISH_FAIL_MODE=none|retriable_once|permanent` exists for tests.
- **TamkoaStub:**
  - `research.run` → emits `tamkoa.command.completed{result:{summary_th}}`. Lifecycle stores it as a `note` artifact.
  - `/dev emit-story score:<0-100> title:<…> level:<…>` emits `tamkoa.story.created`, and then, if `level == urgent`, `tamkoa.alert.raised` (in this order, same correlation_id).
- **MockPublisher:** records calls in memory and in `stub_tumkao_publications`, and returns `url = "https://mock.local/p/{pub_id}"`.

## D9. Discord Bot

### D9.1 Setup
- discord.py 2.x, with commands synced per guild (`DISCORD_GUILD_ID`).
- Every interaction is deferred within 3 s. Errors are ephemeral.
- All user-facing strings live in `app/notifier/templates_th.py` (Thai).

### D9.2 Slash commands
| Command | Role |
|---|---|
| `/help` | anyone |
| `/status` | viewer+ — counts by state, pending approvals, limits summary, worker heartbeat |
| `/project create key name [description]` · `/project list` · `/project show key` | owner · viewer+ · viewer+ |
| `/ticket create project title type priority approval [publish_target] [description]` | approver+ |
| `/ticket list [project] [state]` · `/ticket show code` | viewer+ |
| `/ticket start\|cancel\|resume\|retry\|reopen code [reason]` | approver+ |
| `/task add ticket title executor` · `/task list ticket` · `/task done id [note]` · `/task fail id reason` | approver+ / viewer+ |
| `/artifact add ticket text` (stored as a `draft`, content `{caption:text}`) | approver+ |
| `/approval list` | viewer+ |
| `/limit list` · `/limit set resource max [reset_at] [period]` · `/limit use resource amount` | viewer+ · owner · owner |
| `/schedule add name (cron\|at) action...` · `/schedule list` · `/schedule remove id` | owner · viewer+ · owner |
| `/workflow list` · `/workflow reload` · `/workflow run id [payload_json]` | viewer+ · owner · owner |
| `/report today` (preview, not stored) · `/report run date` | viewer+ · owner |
| `/role set user role` · `/token create` | owner |
| `/dev emit-story` · `/dev mutate-draft` | owner, dev only |

### D9.3 Free text (`#hermes-command` only; D12 policy)
- Read intents run when confidence ≥ 0.85.
- Create intents show a **confirm card** with buttons `nl:{command_id}:{ok|no}:{tag}`, valid for 10 minutes.
- Confidence 0.60–0.85 → "หมายถึง … ใช่ไหม?" with a confirm button.
- Confidence < 0.60 → a clarifying question plus `/help`.
- Forbidden intents → "คำสั่งนี้ต้องใช้ปุ่มหรือ slash command: `/ticket cancel …`".

### D9.4 Notifications (worker → Discord REST; honour 429 `retry_after`)
| Event | Channel | Content (Thai) |
|---|---|---|
| hub.approval.requested | #hermes-approvals | Card: `ขออนุมัติ: {code} {title}` · โปรเจกต์ · ลำดับความสำคัญ · ความเสี่ยง · แหล่งที่มา · หมดอายุ `<t:unix:R>` · hash 12 ตัว · preview (≤ 1000 chars) · buttons ✅ อนุมัติ / ✏️ ขอแก้ / ❌ ปฏิเสธ |
| hub.approval.* decided/expired | #hermes-approvals | edit the original card, disable buttons |
| ticket → blocked / failed | #hermes-alerts | reason + suggested command |
| ticket → done | #hermes-command | short confirmation (+ URL if published) |
| hub.limit.warning / exhausted / unlocked | #hermes-alerts | resource, %, countdown |
| hub.workflow.failed, hub.dlq.dead_lettered, hub.connector.health_changed(down), worker loop crash | #hermes-alerts | error summary + `/v1/events/{id}/requeue` hint |
| tamkoa.alert.raised(urgent) | #hermes-alerts | 🚨 title + story id |
| hub.report.daily | #hermes-reports | the report embed |

## D10. Workflow Engine & Schedules

### D10.1 YAML schema (`workflows/*.yaml`)
```yaml
workflow_id: news-to-content          # ^[a-z0-9-]+$
version: 1                            # int; bump on change
enabled: true
trigger:
  events: [tamkoa.story.created, tamkoa.story.updated]
  condition: {">=": [{"var": "event.payload.final_score"}, 80]}   # JSONLogic subset
  once_per: "{{ event.subject.id }}"  # optional → workflow_runs.subject_key
steps:
  - id: ticket
    type: create_ticket
    with:
      project_key: TMK
      title: "คอนเทนต์จากข่าว: {{ event.payload.title_th }}"
      type: content
      priority: "{{ 'P1' if event.payload.alert_level == 'urgent' else 'P2' }}"
      approval_required: true
      publish_target: tumkao
      subject_ref: {kind: story, id: "{{ event.subject.id }}"}
  - id: draft
    type: create_task
    with:
      ticket_id: "{{ steps.ticket.output.ticket_id }}"
      title: "ร่างโพสต์"
      executor: "connector:tumkao:draft.create"
      input: {brief: {story_id: "{{ event.subject.id }}", summary_th: "{{ event.payload.summary_th }}"}}
on_failure: notify_and_fail   # notify_and_fail | ignore
 |
| forbidden detector | `(อนุมัติ\|approve\|reject\|ปฏิเสธ\|ยกเลิก\|cancel\|retry\|resume\|publish\|โพสต์เลย)` → intent = matching forbidden intent |

- **Policy** (`app/intents/policy.py`): forbidden → refuse with slash hint; read + ≥ 0.85 → execute; create → confirm card; 0.60–0.85 → confirm; < 0.60 → clarify.
- Every parse is written to `intent_logs`.

## D13. Daily Report

- **Input:** system schedule at 00:00 Asia/Bangkok on day D, or `/report run date`.
- **Process:**
  1. `report_date = D−1`; window = [D−1 00:00, D 00:00) Bangkok, converted to UTC.
  2. If a snapshot exists with `discord_message_id` set → no-op (idempotent).
  3. Compute metrics with SQL.
  4. `delta` = metrics − previous `daily_snapshots` (null if none).
  5. Render Thai text from a Jinja2 template — **no LLM**.
  6. Upsert the snapshot, emit `hub.report.daily`, and the notifier posts and stores `discord_message_id`.
- **Metrics:** tickets created/closed by state; done per project; approvals requested/granted/rejected/expired and median decision time; publications ok/failed; blocked tickets with reasons; limits (pct, state, reset countdown); DLQ count; workflow runs ok/failed; top 5 oldest open tickets.
- **Catch-up:** on worker startup, for each missing report_date in the last 7 days create the snapshot. **Only the most recent one is posted to Discord**; older ones are stored silently.
- **Output:** a Discord embed in #hermes-reports + `daily_snapshots` row + event.

## D14. VISUALIZER_MVP

### D14.1 Constraints
- Read-only (GET only), server-rendered Jinja2 + HTMX.
- Tailwind Play CDN, Chart.js, Mermaid.js, HTMX and JetBrains Mono via CDN, pinned versions. **No Node build.**
- Served by `api` under `/viz`. `/` redirects to `/viz`.
- **Auth:** with `VISUALIZER_AUTH=token`, `?token=<VISUALIZER_TOKEN>` sets an HttpOnly, SameSite=Strict cookie for 7 days. A missing or invalid token gets a 401 page.
- **Startup guard:** if `BIND_HOST != 127.0.0.1`, or profile `tunnel`/`public` is active (`PUBLIC_EXPOSURE=true`), and `VISUALIZER_AUTH=none` → the API MUST refuse to start with a clear error.

### D14.2 Pages
| Route | Content | Refresh |
|---|---|---|
| /viz | KPI tiles (open, in_progress, awaiting_approval, blocked, failed, done today); doughnut of tickets by state; 24 h events-per-hour line; pending approvals; last 20 audit entries; limit gauges; worker heartbeat | partials every 10 s |
| /viz/projects · /viz/projects/{key} | project cards; read-only kanban by state | 10 s |
| /viz/tickets/{code} | header; Mermaid `stateDiagram-v2` of D4.1 with the current state highlighted; task timeline; artifact versions with hash (first 12 chars); approval history; audit trail | 10 s |
| /viz/events | outbox table (filter type/state/origin); DLQ tab | 10 s |
| /viz/workflows | definitions; runs with per-step status | 10 s |
| /viz/connectors | manifest viewer + health | 30 s |
| /viz/limits | bars + live countdown (client-side JS) | 30 s |
| /viz/reports | snapshot list + rendered text | manual |
| /viz/system | static Mermaid architecture + the Phase 1 sequence | — |

- JSON for charts comes from `/viz/api/*`.
- HTMX polling MUST pause when `document.visibilityState === "hidden"`.

### D14.3 Theme ("Matrix × Cheng Yi Kiwi")
| Token | Value | Use |
|---|---|---|
| --bg | #05080A | page |
| --panel | #0B1418 | cards (1px border --kiwi at 40% alpha, subtle outer glow) |
| --kiwi | #6A8D52 | primary, borders, headings |
| --kiwi-light | #9CBA70 | body text |
| --accent | #B5D25D | highlights, glow, done/approved |
| --cyber-blue | #00B3FF | info, in_progress, publishing (pulse) |
| --cyan | #3DF5FF | awaiting_approval |
| --warn | #F5C542 | blocked |
| --danger | #FF4D6D | failed, rejected |
| --muted | #5C6370 | cancelled, expired, archived |

- **Font:** JetBrains Mono for everything.
- **Scanline overlay:** `repeating-linear-gradient` at 3% opacity, `pointer-events:none`.
- **Matrix rain (`static/js/rain.js`):**
  - Two canvases: (1) a header strip 120 px high at opacity 0.9; (2) a fixed full-viewport background at opacity 0.07, z-index −1.
  - Glyphs: katakana + `0-9` + `ซือหย่วน`. Head glyph colour `--accent`, trail `--kiwi`.
  - Capped at 24 fps and DPR-aware. Paused when the tab is hidden.
  - Toggle in the header cycles `both → header → off`, persisted in `localStorage["hermes.rain"]`.
  - `prefers-reduced-motion: reduce` forces `off`.
- **Contrast:** body text MUST be ≥ 4.5:1 against its background.

## D15. FAILURE_MATRIX

| # | Failure | Detection | Automatic action | Ticket effect | Notify |
|---|---|---|---|---|---|
| F01 | Subscriber handler exception | dispatcher | retry 5× (5 s·2ⁿ) → dead | — | #alerts on dead |
| F02 | Unregistered/invalid event at publish | EventBus | raise; caller transaction rolls back | — | log error |
| F03 | Webhook bad signature / stale / oversize | intake | 401/413; audit | — | after 10 failures in 10 min |
| F04 | Connector command rejected | adapter ack | task failed (no retry) | blocked(task_failed) | #alerts |
| F05 | Connector command timeout | task_runner | task failed(timeout), retry per D4.2 | blocked(timeout) after attempts exhausted | #alerts |
| F06 | Mock/connector task error | task_runner | retry 3× (10 s·n) | blocked(task_failed) | #alerts |
| F07 | Limit exhausted before task | task_runner | task stays pending | blocked(quota, ref) | #alerts |
| F08 | Approval TTL passed | expiry loop | approval expired | expired | card edited |
| F09 | Proof invalid at publish (hash/sig/expired) | publisher | refuse; `publication.failed{retriable:false}` | failed | #alerts |
| F10 | Publish retriable error | stub/publisher | retry 3× at 1/5/15 min | stays publishing | — |
| F11 | Publish permanent error / retries exhausted | event | — | failed | #alerts |
| F12 | Workflow step error | engine | retry 3× (5/20/60 s) → on_failure | per step | #alerts |
| F13 | Workflow YAML invalid | loader | skip file | — | #alerts |
| F14 | Discord API 429/5xx | notifier | honour retry_after; delivery retry (F01) | — | — |
| F15 | Discord bot disconnected | discord.py | auto-reconnect; container restart policy | — | heartbeat stale > 5 min → #alerts via worker |
| F16 | Gemini error/timeout/invalid JSON | intent parser | fall back to regex | — | log |
| F17 | DB unavailable | readyz / loops | loops back off (1→30 s) | — | Docker healthcheck restart |
| F18 | Optimistic lock conflict | domain | retry once → 409 | — | — |
| F19 | Worker loop crash ×5 in 5 min | supervisor | 60 s backoff, keep retrying | — | #alerts |
| F20 | Missed daily report | startup catch-up | backfill ≤ 7 days, post latest | — | — |
| F21 | Connector health fails 3 consecutive times | health loop | health=down | new tasks for it → blocked(service) | #alerts |
| F22 | Visualizer exposed without auth | startup guard | refuse to start | — | stderr |

## D16. Configuration & Deployment

### D16.1 `.env.example` (every key MUST appear, with comments)
```
HUB_ENV=dev                      # dev|test|prod
DISPLAY_TZ=Asia/Bangkok
POSTGRES_USER=hermes
POSTGRES_PASSWORD=change-me
POSTGRES_DB=hermes
DATABASE_URL=postgresql+psycopg://hermes:change-me@db:5432/hermes
BIND_HOST=127.0.0.1
HUB_PORT=8000
HUB_INTERNAL_URL=http://api:8000
PUBLIC_EXPOSURE=false
DISCORD_BOT_TOKEN=
DISCORD_APPLICATION_ID=
DISCORD_GUILD_ID=
DISCORD_CHANNEL_COMMAND_ID=
DISCORD_CHANNEL_APPROVALS_ID=
DISCORD_CHANNEL_ALERTS_ID=
DISCORD_CHANNEL_REPORTS_ID=
OWNER_DISCORD_IDS=
BOT_SERVICE_TOKEN=
DISCORD_BUTTON_SECRET=
APPROVAL_KEY_ID=k1
APPROVAL_PRIVATE_KEY_PATH=/app/secrets/approval_ed25519
APPROVAL_PUBLIC_KEYS=k1:/app/secrets/approval_ed25519.pub
APPROVAL_TTL_P1=PT6H
APPROVAL_TTL_P2=PT24H
APPROVAL_TTL_P3=PT72H
APPROVAL_TTL_P4=PT72H
PUBLISH_WINDOW_P1=PT6H
PUBLISH_WINDOW_DEFAULT=PT24H
USE_LLM_INTENT_PARSER=false
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash    # verify current name in Google AI Studio
VISUALIZER_AUTH=none             # none|token
VISUALIZER_TOKEN=
CONNECTOR_SECRET_TAMKOA=
CONNECTOR_SECRET_TUMKAO=
STUB_CONNECTORS_ENABLED=true
STUB_PUBLISH_FAIL_MODE=none
DEV_COMMANDS_ENABLED=true
MOCK_WORKER_DELAY_S=2
TASK_CONNECTOR_TIMEOUT=PT30M
OUTBOX_POLL_MS=500
OUTBOX_BATCH=50
LOG_LEVEL=INFO
LOG_FORMAT=json
CLOUDFLARE_TUNNEL_TOKEN=
CADDY_DOMAIN=
CADDY_EMAIL=
IMAGE_REPO=ghcr.io/<github-user>/hermes-hub
IMAGE_TAG=latest
DEPLOY_MODE=build                # build|pull
BACKUP_DIR=./backups
BACKUP_KEEP=7
```
- **Settings validation (pydantic-settings) fails fast if:**
  - `HUB_ENV=prod` with `DEV_COMMANDS_ENABLED=true` (force false + warning), or `POSTGRES_PASSWORD=change-me`
  - a missing Discord ID when the bot starts
  - a missing key file
  - the D14.1 guard is violated

### D16.2 Makefile targets (bash; MUST work in WSL2 Ubuntu and Ubuntu VPS)
| Target | Behaviour |
|---|---|
| `setup` | run `scripts/wsl-check.sh` (warn if repo is under `/mnt/c`); copy `.env.example`→`.env` if missing; `make keys`; generate random secrets for empty `BOT_SERVICE_TOKEN`, `DISCORD_BUTTON_SECRET`, `CONNECTOR_SECRET_*`; `uv sync` |
| `keys` | Ed25519 keypair into `secrets/` (skip if exists) |
| `up` / `down` / `restart` / `logs [s=]` / `ps` | compose wrappers (`down` never removes volumes) |
| `migrate` · `revision m="…"` | Alembic |
| `seed` | demo projects HUB/TMK/SYW, ~15 tickets covering every state, limits seed |
| `fmt` · `lint` · `typecheck` | ruff format, ruff check, mypy |
| `test-unit` | SQLite, no Docker |
| `test-int` · `test-e2e` | start `db-test` profile, run against Postgres |
| `test` | unit + int + e2e |
| `schemas` · `schemas-check` | export JSON Schemas; fail if git diff |
| `verify` | `lint typecheck schemas-check test` — **the gate** |
| `demo` | emit a story (score 85) and print the ticket code |
| `token USER=<discord_id>` | create an API token |
| `backup` · `restore f=` | pg_dump gzip with rotation `BACKUP_KEEP`; restore with confirmation prompt |
| `deploy` | `scripts/deploy.sh` |
| `rollback` | redeploy the previous `deploy-*` git tag |
| `release` | buildx `linux/amd64,linux/arm64` → push `${IMAGE_REPO}:${IMAGE_TAG}` |
| `bootstrap-vps` | `scripts/bootstrap-vps.sh` (run once on the server with sudo) |
| `tunnel-up` · `public-up` | `docker compose --profile tunnel\|public up -d` (sets `PUBLIC_EXPOSURE=true`) |

### D16.3 Scripts
**`deploy.sh`** (`set -euo pipefail`):
1. Refuse if the working tree is dirty.
2. `git tag deploy-$(date +%Y%m%d-%H%M)`, then `git pull --ff-only`.
3. Detect architecture with `uname -m` (`x86_64→linux/amd64`, `aarch64|arm64→linux/arm64`, otherwise exit).
4. If `DEPLOY_MODE=build` → `docker compose build`; otherwise `docker compose pull`.
5. `docker compose run --rm migrate`, then `docker compose up -d`.
6. Poll `/readyz` for 60 s. On failure, print the last 100 log lines and exit 1.

**`bootstrap-vps.sh`** (Ubuntu 22.04/24.04):
1. apt update; install git, make, curl, ufw, fail2ban.
2. Docker Engine via the official repo or `get.docker.com`; add the user to the `docker` group.
3. Timezone `Asia/Bangkok`.
4. Add a 2 GB swap if RAM < 2 GB.
5. ufw allow 22; allow 80/443 only with `--public`.
6. Print a reminder: on Oracle Cloud, also open the ports in the VCN Security List and in iptables (`netfilter-persistent`).
7. Install the daily `make backup` cron at 04:00.

**Migrations rule:** expand/contract only (additive per release), so that `rollback` is safe.

### D16.4 Dockerfile
- Multi-stage `python:3.12-slim` with uv, `uv sync --frozen --no-dev`.
- Non-root `hermes` user, `HEALTHCHECK` on `/healthz` (for `api`).
- Works for both amd64 and arm64 (no arch-specific wheels without fallback).

### D16.5 CI (`.github/workflows/ci.yml`)
- On PR and push: ubuntu-latest, Postgres 16 service, `uv sync`, `make verify` (with `DATABASE_URL_TEST` pointing at the service).
- Gitleaks scan.
- `docker build` smoke test.

## D17. FOLDER_STRUCTURE
```text
hermes/
├── AGENTS.md
├── README.md
├── Makefile
├── Dockerfile
├── docker-compose.yml
├── docker-compose.override.yml        # dev: --reload, source mounts
├── .env.example
├── .gitignore                         # .env, secrets/, backups/, .venv
├── pyproject.toml                     # uv workspace root
├── uv.lock
├── .github/workflows/ci.yml
├── infra/
│   ├── caddy/Caddyfile
│   └── cloudflared/README.md
├── scripts/
│   ├── wsl-check.sh  bootstrap-vps.sh  deploy.sh  rollback.sh
│   ├── backup.sh  restore.sh  gen_keys.py  export_schemas.py
│   └── codex-loop.sh
├── shared/
│   ├── schemas/                       # exported JSON Schemas (entities, commands, manifest)
│   ├── events/catalog.yaml + *.v1.json
│   └── py/hermes_common/
│       ├── pyproject.toml
│       ├── src/hermes_common/
│       │   ├── ids.py  time.py  canonical.py  envelope.py
│       │   ├── approval_proof.py  hmac_sig.py  manifest.py
│       │   └── events/{catalog.py,payloads.py}
│       └── tests/
├── services/
│   ├── hub/
│   │   ├── pyproject.toml  alembic.ini
│   │   ├── migrations/
│   │   ├── app/
│   │   │   ├── main.py  settings.py  db.py  logging.py  deps.py
│   │   │   ├── api/            # routers per resource
│   │   │   ├── models/         # SQLAlchemy
│   │   │   ├── schemas/        # Pydantic API I/O
│   │   │   ├── services/       # domain: state_machine, tickets, tasks, artifacts, approvals, rbac, audit, limits, reports, commands, seed
│   │   │   ├── events/         # bus.py (port), outbox_bus.py, dispatcher.py, subscribers.py
│   │   │   ├── workflows/      # loader, jsonlogic, templating, engine, steps
│   │   │   ├── connectors/     # base.py, registry.py, http_adapter.py, mock_publisher.py, stubs/{tamkoa_stub,tumkao_stub}.py
│   │   │   ├── intents/        # base, regex_parser, gemini_parser, policy
│   │   │   ├── notifier/       # base, discord_rest, fake, templates_th
│   │   │   ├── discord/        # main.py, api_client.py, views.py, cogs/
│   │   │   ├── workers/        # main.py + one module per loop
│   │   │   ├── visualizer/     # routes.py, queries.py
│   │   │   ├── templates/      # base.html, pages/, partials/
│   │   │   └── static/         # css/theme.css, js/rain.js, js/charts.js
│   │   └── tests/{unit,integration,e2e,fixtures}/
│   ├── tamkoa/README.md                # Phase 2
│   └── tumkao/README.md                # Phase 3
├── connectors/{tamkoa,tumkao,mock_publisher}/manifest.json
├── workflows/{news-to-content,urgent-alert,daily-research}.yaml
├── config/limits.seed.yaml
└── docs/
    ├── HERMES_MASTER_SPEC.md  CODEX_PLAYBOOK.md
    ├── TASKS.md  PROGRESS.md  DECISIONS.md
    └── RUNBOOK.md
```

## D18. TEST_PLAN

### D18.1 Layers
- **Unit** (SQLite or pure; `pytest -m unit`): no network, no Docker. Gemini mocked with `respx`.
- **Integration** (`-m integration`, Postgres `db-test`): outbox concurrency, SKIP LOCKED, migrations up/down, idempotency.
- **E2E** (`-m e2e`, Postgres + stubs + `FakeNotifier` + API client simulating Discord interactions + `FrozenClock`).
- **Coverage gates:** `hermes_common` ≥ 95%, `app/services` + `app/events` + `app/workflows` ≥ 85%, overall ≥ 75%.

### D18.2 Mandatory unit suites
| Suite | Cases |
|---|---|
| state_machine | full 12×12 matrix (allowed vs 409); guards (deps, revision_count, publish in-flight cancel) |
| canonical/hash | key order independence; Thai NFC vs NFD → same hash; unicode not escaped |
| approval_proof | valid; each field tampered → BAD_SIGNATURE; content changed → HASH_MISMATCH; expired; unknown kid |
| rbac | full matrix of D5.1; four-eyes; owner exemption; last-owner demotion |
| webhook hmac | ok; bad sig; skew 301 s; future skew; oversize; disallowed type; duplicate |
| jsonlogic | each operator; unknown op error; missing var |
| templating | StrictUndefined; sandbox blocks `__class__`/`__globals__` |
| regex parser | ≥ 30 Thai/English cases incl. forbidden detection |
| intent policy | thresholds 0.59 / 0.6 / 0.85 / forbidden |
| limits | thresholds fire once; exhaust; reset rollover multiple periods; reset_soon |
| schedules | cron next run in Bangkok; catch-up runs once |
| report | golden-file Thai rendering; delta null on first day |
| manifest | valid; unknown event; namespace mismatch; id ≠ folder |

### D18.3 E2E acceptance scenarios (all MUST pass in CI)
| ID | Scenario | Expected |
|---|---|---|
| E1 | `/dev emit-story score=85 level=urgent` | exactly 1 ticket (P1, TMK), 1 task, draft v1, approval pending, card captured by FakeNotifier, alert captured, story event before alert |
| E2 | same story emitted twice + `story.updated` | still 1 ticket, 1 workflow run |
| E3 | approver (not creator) clicks Approve | approved → publishing → done; MockPublisher received hash == approval hash |
| E4 | approve, then `/dev mutate-draft`, then publish | failed with `HASH_MISMATCH`; `/ticket retry` → still failed; `/ticket reopen` → new draft version → new approval |
| E5 | request changes ×3, then a 4th decision request_changes | rejected; revision_count = 3 |
| E6 | advance clock past TTL | expired; card edited; reopen → in_progress |
| E7 | approver approves own ticket / owner approves own / viewer approves | 403 FOUR_EYES / 200 / 403 |
| E8 | webhook duplicate event_id / bad sig / skew 301 s | 1 processed / 401 / 401 |
| E9 | subscriber raises once / raises always | processed exactly once / dead after 5 + DLQ alert |
| E10 | two dispatchers concurrently on 500 events | each delivery done exactly once |
| E11 | `gemini_api` exhausted; task bound to it | ticket blocked(quota); advance past reset → unlocked → in_progress → completes |
| E12 | daily report job run twice for same date; startup with 2 missing days | 1 snapshot + 1 post; backfill 2, post 1 |
| E13 | free text "อนุมัติ TMK-0001" / "สร้างตั๋ว TMK ทดสอบ" | refused with slash hint / confirm card → ticket only after confirm |
| E14 | `/ticket cancel` during publishing | 409 IN_FLIGHT |
| E15 | register manifest emitting `foo.bar.baz` | 422 MANIFEST_INVALID |
| E16 | `STUB_PUBLISH_FAIL_MODE=retriable_once` | one retry, then done |
| E17 | start api with PUBLIC_EXPOSURE=true and VISUALIZER_AUTH=none | process exits non-zero |

## D19. DEFINITION_OF_DONE

**Per task:**
- [ ] Code + tests for the task's acceptance criteria
- [ ] `make verify` green
- [ ] No TODO/FIXME without a `docs/TASKS.md` follow-up
- [ ] New env vars added to `.env.example`
- [ ] New events added to the catalog + `make schemas`
- [ ] `docs/PROGRESS.md` entry appended
- [ ] Task checkbox ticked
- [ ] One commit: `feat(M#/T#.#): <summary>`

**Per milestone:**
- [ ] All tasks ticked
- [ ] Milestone demo command in TASKS.md runs successfully
- [ ] PR opened with summary + test evidence
- [ ] Owner reviewed and merged

**Phase 1:**
- [ ] E1–E17 green in CI
- [ ] `make setup && make up && make seed && make demo` works on a fresh WSL2 clone
- [ ] `make bootstrap-vps && make deploy` works on a fresh Ubuntu 24.04 VPS (amd64 or arm64)
- [ ] Discord: every D9.2 command works in the real guild
- [ ] Approval card round-trip works in real Discord
- [ ] The midnight report posts in real Discord
- [ ] Visualizer pages render; rain toggle works; reduced-motion respected
- [ ] RUNBOOK.md covers start/stop, backup/restore, key rotation, requeue DLQ, deploy/rollback

## D20. CHECKLIST (pre-flight, owner)
- [ ] WSL2 Ubuntu 24.04 + Docker Desktop WSL integration enabled
- [ ] Repo cloned under `~/` (not `/mnt/c`)
- [ ] GitHub repo created (private) and Codex CLI logged in
- [ ] Discord application + bot: token, application ID, guild ID; bot invited with scopes `bot` + `applications.commands` and permissions Send Messages, Embed Links, Read Message History, Use Application Commands
- [ ] 4 channels created and IDs copied (Developer Mode on)
- [ ] Your Discord user ID added to `OWNER_DISCORD_IDS`
- [ ] Gemini API key (only needed when `USE_LLM_INTENT_PARSER=true`)
- [ ] Later: domain on Cloudflare (for a named tunnel or Caddy)

---

# PART E — PHASE 2+ FORWARD SPEC (do NOT implement in Phase 1)

## E1. Tamkoa (Phase 2)
- **Pipeline:** `SourceAdapter.poll → Collector (normalize) → Enricher (translate/classify) → StoryBuilder (cluster/score/rights) → events`. Each stage is a queue job; the outbox is shared via `hermes_common`.
- **Source order:** official API → RSS/WebSub → phone notification (MacroDroid/Termux via signed webhook, `provisional=true`) → HTML scrape (only if `source.scrape_allowed`).
- **Item schema:** item_id, source_id, platform, external_id?, url?, author{handle, tier: official\|media\|analyst\|fan\|unknown}, text_original, lang, text_th, summary_th, media[], published_at, ingested_at, rights{flags[], media_reuse: allowed\|summary_only\|forbidden}, provisional, dedupe_key, story_id.
- **Dedupe:**
  - Item key: `sha256(platform:external_id)`, or `sha256(platform:author:normalize(text)[:280]:floor(published_at,10min))`, where normalize = NFKC + lowercase + strip URLs, emoji and whitespace.
  - A provisional item is merged when the poller finds the same post.
  - Story clustering: bge-m3 cosine ≥ 0.85 AND |Δt| ≤ 48 h AND ≥ 1 shared watchlist entity.
- **Rights:** 禁转 → forbidden; 禁二改/禁商用 → summary_only. A story takes the most restrictive value among its items.
- **Scoring (0–100 each):**
  - authority 0.30 (official 100/media 80/analyst 60/fan 40/unknown 20)
  - velocity 0.25 (`min(100, 100·eng_per_hour/p95_baseline)`, null if fewer than 2 observations)
  - keyword 0.20 (tier-1 100/tier-2 60/topic 30/none 0)
  - urgency 0.15 (event < 24 h 100, deadline < 72 h 90, else 30)
  - feedback 0.10 (`100·(approved+1)/(approved+rejected+2)`)
  - Null components are dropped and the remaining weights renormalized.
  - Recompute on new item + hourly for 24 h; emit `story.updated` when the score changes by ≥ 5.
- **Urgent alert if any of:**
  - an official account posts a release/live
  - a free offer expires in < 72 h
  - an earthquake of M ≥ 5.0 in the configured region
  - a tier-1 entity is in breaking news
  - velocity ≥ 3× the 7-day baseline
  - Otherwise, watchlist matches are `important`.
- **Health:** 3 consecutive failures or an auth error (e.g. Weibo cookie expired) → `tamkoa.health.warning` → Hub ops ticket.

## E2. Tumkao (Phase 3)
- **Internal pipeline:** Brief (Creative) → Writer (one variant per platform, persona `config/personas/siyuan.yaml`) → SEO (hashtags/title/slot) → Compliance (deterministic first, then LLM). Every LLM output is Pydantic-validated; re-prompt on invalid output, max 2 times.
- **Deterministic compliance:**
  - forbidden → no media
  - summary_only → no verbatim quote > 100 chars and no media
  - source URL credited
  - platform validators (IG ≤ 2200 chars, ≤ 30 hashtags)
  - fail → auto-revise ×2 → `draft.compliance_failed`
- **Draft:** draft_id, ticket_id, story_id, version, persona, variants[{platform, caption, hashtags, title, media_refs, scheduled_at}], attribution, compliance{status, risk_level, findings}, content_sha256.
- **Publishing:**
  - MVP target is a Facebook Page via `PublisherAdapter`; IG/TikTok/YouTube/Threads later (check app review requirements first).
  - Prime time: top 3 slots by 28-day median engagement; defaults from `config/prime_time.yaml` when there are fewer than 20 posts.
- **Team → agent mapping:**
  - Creative = Planner
  - Writing = Writer
  - SEO/Analytics = SEO + Analytics job
  - Design / Production = Media Studio (Phase 5)
  - BD/AE = Sponsor lead pipeline (Phase 5)
  - PM/Secretary = **removed**; the Hub owns it
- **Phase 3 switch:** connector `tumkao` changes `transport` from `inprocess` to `http`; the stub is deleted; Hub code is unchanged.

## E3. Model Routing (Phase 2+)
- **Policy:** Free-First + Tiered Quality Fallback, implemented with LiteLLM behind a `ModelAdapter` port.
- **Tier 1 (default/free):** Gemini Flash/Flash-Lite, Typhoon, Qwen — triage, summaries, first drafts.
- **Tier 2 (Claude Sonnet/Opus):** only for high-craft Thai copy, P1 work, or the final Thai polish before approval. Requires `monthly_budget_remaining > 0`, checked before every call.
- **Embeddings:** bge-m3 local (dim 1024), then Gemini embedding as fallback.
- **Cache:** `sha256(model + prompt_version + input)`.
- **Quota:** every call updates `limits`.
- **Codex** = build-time tool only, never runtime.

## E4. Roadmap
| Phase | Deliverable |
|---|---|
| 1 | This spec (Hub + Visualizer + stubs) |
| 2 | Tamkoa real ingestion (Weibo first), StoryBuilder, scoring, alerts; Model Router; Redis Streams optional |
| 3 | Tumkao real pipeline + Facebook publisher; stub removed |
| 4 | Cross-system E2E on real services; prime-time scheduling |
| 5 | Media Studio (yt-dlp, ffmpeg, whisper, OCR, TTS), analytics & revenue, BD/AE sponsor pipeline, Jarvis-style TTS reports, voice cloning, mascot |

---

# PART F — คำถามที่ยังเปิดอยู่ (ไม่ขวาง Phase 1)
1. งบรายเดือนของ Claude Tier 2 (`monthly_budget`) กี่บาทหรือดอลลาร์?
2. หลังจาก Facebook Page จะ publish แพลตฟอร์มไหนก่อน: IG, TikTok หรือ YouTube?
3. Watchlist Tier 1/2 มีใครบ้าง (นอกจาก Cheng Yi) และภูมิภาคไหนบ้างที่ต้องแจ้งเตือนแผ่นดินไหว?
4. จะเข้าถึง Weibo ด้วยวิธีไหน: cookie, API ของบุคคลที่สาม หรือจับ notification จากมือถือ?
5. จะซื้อโดเมนตอนไหน (ต้องใช้ทำ named tunnel และ webhook ถาวร)?
6. จะเก็บ backup นอกเครื่องไว้ที่ไหน: Cloudflare R2, Backblaze B2 หรือ Google Drive?
