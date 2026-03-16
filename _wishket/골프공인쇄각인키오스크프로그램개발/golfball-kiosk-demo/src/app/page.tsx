"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DeviceType = "printer" | "payment" | "cutter" | "screen";
type DeviceState = "online" | "busy" | "offline";
type JobStatus = "queued" | "processing" | "done" | "failed";

type Device = {
  type: DeviceType;
  label: string;
  state: DeviceState;
  lastSeen: string;
};

type Order = {
  id: string;
  text: string;
  template: string;
  logoId?: string;
  characterId?: string;
  quantity: number;
  amount: number;
  createdAt: string;
};

type Payment = {
  id: string;
  orderId: string;
  amount: number;
  result: "approved" | "failed";
  approvalCode: string;
  createdAt: string;
};

type Job = {
  id: string;
  orderId: string;
  type: "print" | "engrave" | "cut";
  status: JobStatus;
  retryCount: number;
  errorMessage?: string;
  updatedAt: string;
};

type DeviceLog = {
  id: string;
  device: DeviceType;
  direction: "request" | "response";
  payload: string;
  result: "ok" | "error";
  createdAt: string;
};

type PrintRequest = {
  text: string;
  template: string;
  logoId?: string;
  characterId?: string;
  requestedAt: string;
};

const LS_KEY = "golfball-kiosk-demo-v1";
const GUIDE_SEEN_KEY = "golfball-kiosk-demo-guide-seen";
const UNIT_PRICE = 12000;
const TEMPLATES = ["시그니처 텍스트", "로고 + 텍스트", "캐릭터 + 텍스트"] as const;
const LOGO_OPTIONS = [
  { id: "wing", label: "Wing 로고" },
  { id: "crest", label: "Crest 로고" },
] as const;
const CHARACTER_OPTIONS = [
  { id: "smile", label: "Smile 캐릭터" },
  { id: "bear", label: "Bear 캐릭터" },
] as const;

interface DeviceAdapter {
  checkConnection(): Promise<boolean>;
  execute(command: string): Promise<{ ok: boolean; message: string }>;
  getStatus(): Promise<DeviceState>;
}

class MockAdapter implements DeviceAdapter {
  private readonly stable: DeviceState;

  constructor(stable: DeviceState = "online") {
    this.stable = stable;
  }

  async checkConnection(): Promise<boolean> {
    return this.stable !== "offline";
  }

  async execute(command: string): Promise<{ ok: boolean; message: string }> {
    const fail = Math.random() < 0.12;
    if (fail) {
      return { ok: false, message: `${command} 실행 실패` };
    }
    return { ok: true, message: `${command} 실행 성공` };
  }

  async getStatus(): Promise<DeviceState> {
    return this.stable;
  }
}

const adapters: Record<DeviceType, DeviceAdapter> = {
  printer: new MockAdapter("online"),
  payment: new MockAdapter("online"),
  cutter: new MockAdapter("online"),
  screen: new MockAdapter("online"),
};

function nowLabel() {
  return new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function renderLogo(id: string) {
  if (id === "crest") {
    return (
      <svg viewBox="0 0 120 120" className="asset-svg" aria-label="crest logo">
        <defs>
          <linearGradient id="crestGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d2d4f" />
            <stop offset="100%" stopColor="#2f79b7" />
          </linearGradient>
        </defs>
        <path d="M60 12 L98 30 L90 84 L60 108 L30 84 L22 30 Z" fill="url(#crestGrad)" />
        <text x="60" y="70" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="700">
          G
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" className="asset-svg" aria-label="wing logo">
      <path d="M14 70 C30 28, 56 16, 102 24 C74 36, 56 56, 48 84 Z" fill="#154b7a" />
      <path d="M20 80 C42 54, 62 44, 94 46 C66 60, 50 78, 44 100 Z" fill="#24a4d8" />
    </svg>
  );
}

function renderCharacter(id: string) {
  if (id === "bear") {
    return (
      <svg viewBox="0 0 120 120" className="asset-svg" aria-label="bear character">
        <circle cx="60" cy="62" r="34" fill="#9d6a43" />
        <circle cx="35" cy="35" r="12" fill="#9d6a43" />
        <circle cx="85" cy="35" r="12" fill="#9d6a43" />
        <circle cx="60" cy="68" r="16" fill="#e9c3a6" />
        <circle cx="50" cy="56" r="3" fill="#222" />
        <circle cx="70" cy="56" r="3" fill="#222" />
        <circle cx="60" cy="66" r="4" fill="#222" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" className="asset-svg" aria-label="smile character">
      <circle cx="60" cy="60" r="38" fill="#ffc736" />
      <circle cx="46" cy="50" r="4" fill="#222" />
      <circle cx="74" cy="50" r="4" fill="#222" />
      <path
        d="M42 72 C52 84, 68 84, 78 72"
        stroke="#222"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function renderPrintAsset(template: string, logoId?: string, characterId?: string) {
  if (template === "로고 + 텍스트" && logoId) {
    return renderLogo(logoId);
  }
  if (template === "캐릭터 + 텍스트" && characterId) {
    return renderCharacter(characterId);
  }
  return null;
}

function openPrintDialog(request: PrintRequest) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "-9999px";
  iframe.style.bottom = "-9999px";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    document.body.removeChild(iframe);
    return;
  }

  doc.open();
  doc.write(`
    <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <title>인쇄 출력물</title>
        <style>
          @page { margin: 0; }
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #102133;
          }
          .result {
            font-size: 44px;
            font-weight: 700;
            letter-spacing: 2px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="result">${request.text}</div>
      </body>
    </html>
  `);
  doc.close();

  iframe.onload = () => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 500);
  };
}

export default function Page() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [text, setText] = useState("GOOD SHOT");
  const [template, setTemplate] = useState<(typeof TEMPLATES)[number]>(TEMPLATES[0]);
  const [selectedLogo, setSelectedLogo] = useState<(typeof LOGO_OPTIONS)[number]["id"]>("wing");
  const [selectedCharacter, setSelectedCharacter] =
    useState<(typeof CHARACTER_OPTIONS)[number]["id"]>("smile");
  const [quantity, setQuantity] = useState(1);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [lastPrintRequest, setLastPrintRequest] = useState<PrintRequest | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [devices, setDevices] = useState<Device[]>([
    { type: "printer", label: "프린터", state: "online", lastSeen: nowLabel() },
    { type: "payment", label: "결제기", state: "online", lastSeen: nowLabel() },
    { type: "cutter", label: "커팅기", state: "online", lastSeen: nowLabel() },
    { type: "screen", label: "스크린", state: "online", lastSeen: nowLabel() },
  ]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [logs, setLogs] = useState<DeviceLog[]>([]);

  const totalAmount = useMemo(() => quantity * UNIT_PRICE, [quantity]);
  const hasLogoTemplate = template === "로고 + 텍스트";
  const hasCharacterTemplate = template === "캐릭터 + 텍스트";

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) {
      return;
    }
    try {
      const parsed = JSON.parse(saved) as {
        devices: Device[];
        orders: Order[];
        payments: Payment[];
        jobs: Job[];
        logs: DeviceLog[];
      };
      setDevices(parsed.devices ?? []);
      setOrders(parsed.orders ?? []);
      setPayments(parsed.payments ?? []);
      setJobs(parsed.jobs ?? []);
      setLogs(parsed.logs ?? []);
    } catch {
      localStorage.removeItem(LS_KEY);
    }
  }, []);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem(GUIDE_SEEN_KEY);
    if (!hasSeenGuide) {
      setShowGuide(true);
      localStorage.setItem(GUIDE_SEEN_KEY, "1");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ devices, orders, payments, jobs, logs }));
  }, [devices, orders, payments, jobs, logs]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  async function requestPayment() {
    if (paymentInProgress) {
      return;
    }

    setStep(2);
    setPaymentInProgress(true);
    await sleep(900);

    const orderId = makeId("order");
    const order: Order = {
      id: orderId,
      text,
      template,
      logoId: hasLogoTemplate ? selectedLogo : undefined,
      characterId: hasCharacterTemplate ? selectedCharacter : undefined,
      quantity,
      amount: totalAmount,
      createdAt: nowLabel(),
    };

    const printRequest: PrintRequest = {
      text,
      template,
      logoId: hasLogoTemplate ? selectedLogo : undefined,
      characterId: hasCharacterTemplate ? selectedCharacter : undefined,
      requestedAt: nowLabel(),
    };

    const paymentRes = await adapters.payment.execute("결제 승인 요청");
    const payment: Payment = {
      id: makeId("pay"),
      orderId,
      amount: totalAmount,
      result: paymentRes.ok ? "approved" : "failed",
      approvalCode: paymentRes.ok ? `A${Math.floor(Math.random() * 999999)}` : "",
      createdAt: nowLabel(),
    };

    setOrders((prev) => [order, ...prev].slice(0, 20));
    setPayments((prev) => [payment, ...prev].slice(0, 20));

    if (!paymentRes.ok) {
      setStep(1);
      setPaymentInProgress(false);
      setToast("결제 승인 실패: 다시 시도해 주세요.");
      return;
    }

    setLastPrintRequest(printRequest);
    setLogs((prev) => {
      const req: DeviceLog = {
        id: makeId("log"),
        device: "printer",
        direction: "request",
        payload: `PRINT text=${printRequest.text}, template=${printRequest.template}, asset=${printRequest.logoId ?? printRequest.characterId ?? "none"}`,
        result: "ok",
        createdAt: nowLabel(),
      };
      return [req, ...prev].slice(0, 50);
    });

    const printerRes = await adapters.printer.execute("인쇄 요청 전송");
    setLogs((prev) => {
      const res: DeviceLog = {
        id: makeId("log"),
        device: "printer",
        direction: "response",
        payload: printerRes.message,
        result: printerRes.ok ? "ok" : "error",
        createdAt: nowLabel(),
      };
      return [res, ...prev].slice(0, 50);
    });

    if (printerRes.ok) {
      openPrintDialog(printRequest);
    }

    const createdJobs: Job[] = [
      {
        id: makeId("job"),
        orderId,
        type: "print",
        status: "queued",
        retryCount: 0,
        updatedAt: nowLabel(),
      },
      {
        id: makeId("job"),
        orderId,
        type: "engrave",
        status: "queued",
        retryCount: 0,
        updatedAt: nowLabel(),
      },
      {
        id: makeId("job"),
        orderId,
        type: "cut",
        status: "queued",
        retryCount: 0,
        updatedAt: nowLabel(),
      },
    ];
    setJobs((prev) => [...createdJobs, ...prev].slice(0, 40));

    setPaymentInProgress(false);
    setStep(3);
    setToast("결제가 완료되어 인쇄 요청이 전송되었습니다.");
  }

  function resetDemo() {
    localStorage.removeItem(LS_KEY);
    setOrders([]);
    setPayments([]);
    setJobs([]);
    setLogs([]);
    setStep(1);
    setQuantity(1);
    setText("GOOD SHOT");
    setTemplate(TEMPLATES[0]);
    setSelectedLogo("wing");
    setSelectedCharacter("smile");
    setPaymentInProgress(false);
    setLastPrintRequest(null);
    setToast("데모 데이터를 초기화했습니다.");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <h1>골프공 인쇄/각인 키오스크 데모</h1>
        <div className="topbar-actions">
          <Link className="btn secondary" href="/admin">
            관리자 웹
          </Link>
          <button className="btn secondary" onClick={() => setShowGuide(true)}>
            가이드
          </button>
        </div>
      </header>

      <section className="kiosk-layout">
        <div className="kiosk-frame">
          <div className="kiosk-header">사용자 주문 화면</div>
          <div className="kiosk-screen">
            <div className="stepper kiosk-stepper">
              <span className={step >= 1 ? "done" : ""}>1. 디자인/주문확인</span>
              <span className={step >= 2 ? "done" : ""}>2. 결제진행</span>
              <span className={step >= 3 ? "done" : ""}>3. 제작완료</span>
            </div>

            {step === 1 ? (
              <article className="panel stage-panel stage-page confirm-panel">
                <h2>1) 디자인/주문확인</h2>

                <label>각인 문구</label>
                <input
                  value={text}
                  maxLength={24}
                  onChange={(e) => setText(e.target.value.toUpperCase())}
                />

                <label>템플릿</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as (typeof TEMPLATES)[number])}
                >
                  {TEMPLATES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                {hasLogoTemplate ? (
                  <>
                    <label>로고 선택</label>
                    <select
                      value={selectedLogo}
                      onChange={(e) => setSelectedLogo(e.target.value as "wing" | "crest")}
                    >
                      {LOGO_OPTIONS.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </>
                ) : null}

                {hasCharacterTemplate ? (
                  <>
                    <label>캐릭터 선택</label>
                    <select
                      value={selectedCharacter}
                      onChange={(e) => setSelectedCharacter(e.target.value as "smile" | "bear")}
                    >
                      {CHARACTER_OPTIONS.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </>
                ) : null}

                <div className="preview-ball">
                  {hasLogoTemplate ? renderLogo(selectedLogo) : null}
                  {hasCharacterTemplate ? renderCharacter(selectedCharacter) : null}
                  <span>{text || "TEXT"}</span>
                </div>
                <p className="muted center">템플릿: {template}</p>
                <p className="muted center">단가: {UNIT_PRICE.toLocaleString("ko-KR")}원</p>
                <p className="price center">총 결제금액: {totalAmount.toLocaleString("ko-KR")}원</p>

                <div className="action-row center-row">
                  <div className="qty-inline">
                    <span className="qty-inline-label">수량</span>
                    <div className="qty-row qty-inline-row">
                      <button
                        className="btn secondary"
                        onClick={() => setQuantity((n) => Math.max(1, n - 1))}
                      >
                        -
                      </button>
                      <strong>{quantity}</strong>
                      <button
                        className="btn secondary"
                        onClick={() => setQuantity((n) => Math.min(20, n + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn primary"
                    onClick={requestPayment}
                    disabled={paymentInProgress}
                  >
                    결제 하기
                  </button>
                </div>
              </article>
            ) : null}

            {step === 2 ? (
              <article className="panel stage-panel status-panel stage-page">
                <h2>2) 결제/제작 진행</h2>
                <p className="muted center">
                  결제 승인 완료 후 인쇄 요청을 자동 전송하는 중입니다.
                </p>
                <div className="pulse-line" />
              </article>
            ) : null}

            {step === 3 ? (
              <article className="panel stage-panel done-panel stage-page">
                <h2>3) 제작 완료</h2>
                <p className="center">주문이 정상 접수되었고 인쇄 요청이 자동 전송되었습니다.</p>
                {lastPrintRequest ? (
                  <div className="print-request-box">
                    <p className="muted center">
                      인쇄 요청 데이터 (골프공 제외, 로고/캐릭터 + 텍스트)
                    </p>
                    <div className="print-preview">
                      {renderPrintAsset(
                        lastPrintRequest.template,
                        lastPrintRequest.logoId,
                        lastPrintRequest.characterId,
                      )}
                      <strong>{lastPrintRequest.text}</strong>
                    </div>
                  </div>
                ) : null}
                <button className="btn primary full" onClick={() => setStep(1)}>
                  새 주문 시작
                </button>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <footer className="bottom-bar">
        <p>
          주문 {orders.length}건 | 결제 {payments.length}건 | 작업 {jobs.length}건
        </p>
        <button className="btn danger" onClick={resetDemo}>
          데모 초기화
        </button>
      </footer>

      {showGuide ? (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>데모 가이드</h3>
            <p>
              <strong>사용 방법</strong>
            </p>
            <ul>
              <li>사용자 화면에서 디자인/주문확인을 완료한 뒤 결제하기를 누릅니다.</li>
              <li>결제 완료 시 인쇄 요청이 자동으로 전송됩니다.</li>
              <li>관리자 기능은 상단의 관리자 웹 버튼에서 별도 라우트로 확인합니다.</li>
            </ul>
            <button className="btn primary" onClick={() => setShowGuide(false)}>
              닫기
            </button>
          </div>
        </div>
      ) : null}

      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  );
}
