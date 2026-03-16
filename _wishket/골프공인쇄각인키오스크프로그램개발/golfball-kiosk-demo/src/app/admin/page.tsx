"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const DEMO_ADMIN_PASSWORD = "1234";

type AdminTab = "templates" | "queue" | "devices";

type TemplateItem = {
  id: string;
  name: string;
  type: "text" | "logo" | "character";
  updatedAt: string;
};

type QueueItem = {
  id: string;
  name: string;
  output: string;
  status: "queued" | "processing" | "done" | "failed";
  createdAt: string;
};

type DeviceItem = {
  id: string;
  label: string;
  status: "online" | "busy" | "offline";
  lastSeen: string;
};

function getTemplateTypeLabel(type: TemplateItem["type"]) {
  if (type === "text") {
    return "텍스트";
  }
  if (type === "logo") {
    return "로고";
  }
  return "캐릭터";
}

function getQueueStatusLabel(status: QueueItem["status"]) {
  if (status === "queued") {
    return "대기";
  }
  if (status === "processing") {
    return "진행중";
  }
  if (status === "done") {
    return "완료";
  }
  return "실패";
}

function getDeviceStatusLabel(status: DeviceItem["status"]) {
  if (status === "online") {
    return "정상";
  }
  if (status === "busy") {
    return "사용중";
  }
  return "오프라인";
}

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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [tab, setTab] = useState<AdminTab>("templates");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateType, setNewTemplateType] = useState<TemplateItem["type"]>("text");

  const [templates, setTemplates] = useState<TemplateItem[]>([
    { id: makeId("tpl"), name: "기본 텍스트 템플릿", type: "text", updatedAt: nowLabel() },
    { id: makeId("tpl"), name: "윙 로고 템플릿", type: "logo", updatedAt: nowLabel() },
  ]);

  const [queue] = useState<QueueItem[]>([
    {
      id: makeId("q"),
      name: "ORDER-1021",
      output: "윙 로고 + GOOD SHOT",
      status: "queued",
      createdAt: nowLabel(),
    },
    {
      id: makeId("q"),
      name: "ORDER-1020",
      output: "곰 캐릭터 + NICE PUTT",
      status: "processing",
      createdAt: nowLabel(),
    },
    {
      id: makeId("q"),
      name: "ORDER-1019",
      output: "크레스트 로고 + EAGLE",
      status: "failed",
      createdAt: nowLabel(),
    },
  ]);

  const [devices, setDevices] = useState<DeviceItem[]>([
    { id: "printer", label: "프린터", status: "online", lastSeen: nowLabel() },
    { id: "payment", label: "결제기", status: "online", lastSeen: nowLabel() },
    { id: "cutter", label: "커팅기", status: "online", lastSeen: nowLabel() },
    { id: "screen", label: "스크린", status: "online", lastSeen: nowLabel() },
  ]);

  const tabTitle = useMemo(() => {
    if (tab === "templates") {
      return "디자인 템플릿 등록";
    }
    if (tab === "queue") {
      return "작업 큐 관리";
    }
    return "장비 상태 관리";
  }, [tab]);

  function addTemplate() {
    if (!newTemplateName.trim()) {
      return;
    }
    const item: TemplateItem = {
      id: makeId("tpl"),
      name: newTemplateName.trim(),
      type: newTemplateType,
      updatedAt: nowLabel(),
    };
    setTemplates((prev) => [item, ...prev]);
    setNewTemplateName("");
  }

  function updateDeviceStatus(id: string, status: DeviceItem["status"]) {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status, lastSeen: nowLabel() } : d)),
    );
  }

  function loginAdmin() {
    if (passwordInput === DEMO_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(null);
      return;
    }
    setAuthError("비밀번호가 일치하지 않습니다.");
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-web-shell">
        <header className="admin-web-header">
          <div className="admin-web-header-left">
            <h1>관리자 웹 로그인</h1>
          </div>
          <div className="admin-web-header-right">
            <Link className="btn secondary" href="/">
              사용자 화면
            </Link>
          </div>
        </header>

        <section className="admin-login-wrap">
          <article className="panel admin-login-card">
            <h2>관리자 접근 인증</h2>
            <p className="muted">시연용 로그인입니다. 아래 예시 비밀번호로 접속해 주세요.</p>
            <p className="admin-example-pass">
              예시 비밀번호: <strong>{DEMO_ADMIN_PASSWORD}</strong>
            </p>
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loginAdmin();
                }
              }}
            />
            {authError ? <p className="admin-auth-error">{authError}</p> : null}
            <button className="btn primary full" onClick={loginAdmin}>
              로그인
            </button>
          </article>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-web-shell">
      <header className="admin-web-header">
        <div className="admin-web-header-left">
          <button
            className="btn secondary admin-menu-btn"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            메뉴
          </button>
          <h1>관리자 웹</h1>
        </div>
        <div className="admin-web-header-right">
          <p>{tabTitle}</p>
          <Link className="btn secondary" href="/">
            사용자 화면
          </Link>
        </div>
      </header>

      <div className="admin-web-body">
        <aside className={`admin-web-sidebar ${mobileMenuOpen ? "open" : ""}`}>
          <button
            className={`admin-nav-btn ${tab === "templates" ? "active" : ""}`}
            onClick={() => {
              setTab("templates");
              setMobileMenuOpen(false);
            }}
          >
            디자인 템플릿 등록
          </button>
          <button
            className={`admin-nav-btn ${tab === "queue" ? "active" : ""}`}
            onClick={() => {
              setTab("queue");
              setMobileMenuOpen(false);
            }}
          >
            작업 큐 관리
          </button>
          <button
            className={`admin-nav-btn ${tab === "devices" ? "active" : ""}`}
            onClick={() => {
              setTab("devices");
              setMobileMenuOpen(false);
            }}
          >
            장비 상태 관리
          </button>
        </aside>

        <section className="admin-web-content">
          {tab === "templates" ? (
            <article className="panel">
              <h2>디자인 템플릿 등록</h2>
              <div className="admin-form-row">
                <input
                  placeholder="템플릿 이름"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                />
                <select
                  value={newTemplateType}
                  onChange={(e) => setNewTemplateType(e.target.value as TemplateItem["type"])}
                >
                  <option value="text">텍스트</option>
                  <option value="logo">로고</option>
                  <option value="character">캐릭터</option>
                </select>
                <button className="btn primary" onClick={addTemplate}>
                  등록
                </button>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>유형</th>
                    <th>수정 시간</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((tpl) => (
                    <tr key={tpl.id}>
                      <td>{tpl.name}</td>
                      <td>{getTemplateTypeLabel(tpl.type)}</td>
                      <td>{tpl.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ) : null}

          {tab === "queue" ? (
            <article className="panel">
              <h2>작업 큐 관리</h2>
              <table>
                <thead>
                  <tr>
                    <th>작업명</th>
                    <th>결과물</th>
                    <th>상태</th>
                    <th>생성 시간</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.output}</td>
                      <td>
                        <span className={`badge ${item.status}`}>
                          {getQueueStatusLabel(item.status)}
                        </span>
                      </td>
                      <td>{item.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ) : null}

          {tab === "devices" ? (
            <article className="panel">
              <h2>장비 상태 관리</h2>
              <div className="admin-device-grid">
                {devices.map((device) => (
                  <div key={device.id} className="admin-device-card">
                    <strong>{device.label}</strong>
                    <span className={`badge ${device.status}`}>
                      {getDeviceStatusLabel(device.status)}
                    </span>
                    <p className="muted">최근 확인: {device.lastSeen}</p>
                    <div className="admin-action-row">
                      <button
                        className="btn small"
                        onClick={() => updateDeviceStatus(device.id, "online")}
                      >
                        정상
                      </button>
                      <button
                        className="btn small"
                        onClick={() => updateDeviceStatus(device.id, "busy")}
                      >
                        사용중
                      </button>
                      <button
                        className="btn small"
                        onClick={() => updateDeviceStatus(device.id, "offline")}
                      >
                        오프라인
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ) : null}
        </section>
      </div>
    </main>
  );
}
