export type SessionState = {
  id: string;
  answers: Record<string, number>;
  startedAt: string;
  updatedAt: string;
  completed: boolean;
};

const SESSION_KEY = "psych-assessment-session-v1";
const ACCESS_LOG_KEY = "psych-assessment-access-logs-v1";

export type AccessLog = {
  id: string;
  path: string;
  eventType: "visit" | "submit" | "report" | "reset";
  createdAt: string;
  sessionId: string;
  completed: boolean;
};

function now() {
  return new Date().toISOString();
}

export function createInitialSession(): SessionState {
  const timestamp = Date.now().toString();
  return {
    id: `session-${timestamp}`,
    answers: {},
    startedAt: now(),
    updatedAt: now(),
    completed: false,
  };
}

export function getSession(): SessionState {
  if (typeof window === "undefined") return createInitialSession();

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return createInitialSession();

  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    return createInitialSession();
  }
}

export function saveSession(session: SessionState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function upsertAnswer(questionId: string, value: number) {
  const current = getSession();
  const next: SessionState = {
    ...current,
    answers: {
      ...current.answers,
      [questionId]: value,
    },
    updatedAt: now(),
  };
  saveSession(next);
  return next;
}

export function markCompleted() {
  const current = getSession();
  const next: SessionState = {
    ...current,
    completed: true,
    updatedAt: now(),
  };
  saveSession(next);
  return next;
}

export function resetSession() {
  const next = createInitialSession();
  saveSession(next);
  return next;
}

export function appendLog(path: string, eventType: AccessLog["eventType"], session: SessionState) {
  if (typeof window === "undefined") return;

  const raw = window.localStorage.getItem(ACCESS_LOG_KEY);
  const logs = raw ? ((JSON.parse(raw) as AccessLog[]) ?? []) : [];

  const nextLog: AccessLog = {
    id: `log-${Date.now()}`,
    path,
    eventType,
    createdAt: now(),
    sessionId: session.id,
    completed: session.completed,
  };

  window.localStorage.setItem(ACCESS_LOG_KEY, JSON.stringify([nextLog, ...logs]));
}

export function getLogs() {
  if (typeof window === "undefined") return [] as AccessLog[];
  const raw = window.localStorage.getItem(ACCESS_LOG_KEY);
  if (!raw) return [] as AccessLog[];

  try {
    return JSON.parse(raw) as AccessLog[];
  } catch {
    return [] as AccessLog[];
  }
}
