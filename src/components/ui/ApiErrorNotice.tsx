import { AlertTriangle } from 'lucide-react';

interface Props {
  title?: string;
  message: string;
}

export default function ApiErrorNotice({
  title = 'Erreur API',
  message,
}: Props) {
  return (
    <div className="my-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-left">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-red-200">{title}</h2>
          <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-volcanic-950/70 p-3 text-xs leading-relaxed text-red-100">
            {message}
          </pre>
          <p className="mt-2 text-xs text-red-200/80">
            Testez aussi /api/health et /api/admin/status pour isoler la configuration Node/MySQL.
          </p>
        </div>
      </div>
    </div>
  );
}
