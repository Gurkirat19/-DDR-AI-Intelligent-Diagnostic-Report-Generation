type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
};

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="glass section space-y-2">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
      {helper && <p className="text-xs text-slate-400">{helper}</p>}
    </div>
  );
}
