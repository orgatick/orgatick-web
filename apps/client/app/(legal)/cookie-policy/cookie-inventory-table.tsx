import { COOKIE_INVENTORY } from "./cookie-policy-data";

export function CookieInventoryTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/70 my-2">
      <table className="w-full text-xs text-left">
        <thead className="bg-muted/40 font-mono text-muted-foreground uppercase border-b border-border/70">
          <tr>
            <th className="p-3">Cookie Name</th>
            <th className="p-3">Type</th>
            <th className="p-3">Purpose</th>
            <th className="p-3">Lifespan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {COOKIE_INVENTORY.map((c) => (
            <tr key={c.name} className="hover:bg-muted/20">
              <td className="p-3 font-mono font-semibold text-foreground">{c.name}</td>
              <td className="p-3 text-primary font-medium">{c.type}</td>
              <td className="p-3 text-muted-foreground">{c.purpose}</td>
              <td className="p-3 font-mono text-muted-foreground">{c.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
