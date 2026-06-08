import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { KeyRound, ShieldCheck, Loader as Loader2, LogOut, Save, Lock } from 'lucide-react';
import { usePageTitle } from '../lib/usePageTitle';

type Status = 'loading' | 'claim' | 'login' | 'owner' | 'denied';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const TOKEN_KEY = 'shadow_admin_token';

async function adminRequest<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/api/admin${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `API error: ${res.status}`);
  }
  return data as T;
}

export default function AdminPage() {
  usePageTitle('Administration');

  const [status, setStatus] = useState<Status>('loading');
  const [token, setToken] = useState<string | null>(() => {
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [initialKey, setInitialKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function resolveStatus(currentToken: string | null) {
    try {
      const { hasOwner } = await adminRequest<{ hasOwner: boolean }>('/status');
      if (!hasOwner) {
        setStatus('claim');
        return;
      }

      if (!currentToken) {
        setStatus('login');
        return;
      }

      const settings = await adminRequest<{ tip4serv_api_key: string }>(
        '/settings',
        {},
        currentToken,
      );
      const val = settings.tip4serv_api_key || '';
      setApiKey(val);
      setInitialKey(val);
      setStatus('owner');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus(currentToken ? 'denied' : 'login');
    }
  }

  useEffect(() => {
    resolveStatus(token);
  }, [token]);

  function saveToken(nextToken: string | null) {
    setToken(nextToken);
    try {
      if (nextToken) {
        window.localStorage.setItem(TOKEN_KEY, nextToken);
      } else {
        window.localStorage.removeItem(TOKEN_KEY);
      }
    } catch {
      // ignore storage failures
    }
  }

  async function handleClaim(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      const data = await adminRequest<{ token: string }>('/claim', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      saveToken(data.token);
      setPassword('');
      setInfo('Ownership claimed. You can now configure the Tip4Serv key.');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      const data = await adminRequest<{ token: string }>('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      saveToken(data.token);
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      await adminRequest(
        '/settings',
        {
          method: 'PUT',
          body: JSON.stringify({ tip4serv_api_key: apiKey.trim() }),
        },
        token,
      );
      setInitialKey(apiKey.trim());
      setInfo('Tip4Serv API key saved. It takes effect immediately.');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  function handleSignOut() {
    saveToken(null);
  }

  return (
    <div className="min-h-[70vh] flex items-start justify-center px-4 py-16 bg-[var(--color-bg)]">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">
              Administration
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Configure your Tip4Serv API key.
            </p>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
          {status === 'loading' && (
            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </div>
          )}

          {status === 'denied' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--color-text)]">Access denied</p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Your admin session is invalid or expired.
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--color-border)] rounded-lg text-sm font-medium hover:bg-[var(--color-bg)] transition"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}

          {status === 'claim' && (
            <form onSubmit={handleClaim} className="space-y-4">
              <div>
                <h2 className="font-medium text-[var(--color-text)]">
                  Claim this site
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  No owner yet. Create the owner account now.
                </p>
              </div>
              <Field label="Email" type="email" value={email} onChange={setEmail} required />
              <Field
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                required
                minLength={6}
              />
              <SubmitButton busy={busy} icon={<ShieldCheck className="w-4 h-4" />}>
                Claim ownership
              </SubmitButton>
            </form>
          )}

          {status === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <h2 className="font-medium text-[var(--color-text)]">Sign in</h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Owner access is required to manage settings.
                </p>
              </div>
              <Field label="Email" type="email" value={email} onChange={setEmail} required />
              <Field label="Password" type="password" value={password} onChange={setPassword} required />
              <SubmitButton busy={busy} icon={<KeyRound className="w-4 h-4" />}>
                Sign in
              </SubmitButton>
            </form>
          )}

          {status === 'owner' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium text-[var(--color-text)]">
                    Tip4Serv API key
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Stored server-side. Never exposed to visitors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] inline-flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              </div>
              <Field
                label="API key"
                type="password"
                value={apiKey}
                onChange={setApiKey}
                placeholder="Paste your Tip4Serv key"
              />
              <SubmitButton
                busy={busy}
                disabled={apiKey.trim() === initialKey.trim()}
                icon={<Save className="w-4 h-4" />}
              >
                Save key
              </SubmitButton>
            </form>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {info && (
            <p className="mt-4 text-sm text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
              {info}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  required,
  minLength,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        autoComplete="off"
        className="mt-1.5 w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
      />
    </label>
  );
}

function SubmitButton({
  busy,
  disabled,
  icon,
  children,
}: {
  busy: boolean;
  disabled?: boolean;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={busy || disabled}
      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}
