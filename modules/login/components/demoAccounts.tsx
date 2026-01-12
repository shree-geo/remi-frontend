import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoAccounts } from "../constants/credentials";

interface DemoAccountsProps {
  onSelect: (email: string, password: string) => void;
}

export default function DemoAccounts({ onSelect }: DemoAccountsProps) {
  return (
    <Card className="bg-accent/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Demo Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {demoAccounts.map((account) => (
            <button
              key={account.email}
              onClick={() => onSelect(account.email, account.password)}
              className="w-full rounded-lg border bg-card p-2 text-left text-xs transition-colors hover:bg-muted"
            >
              <div className="font-medium">{account.role}</div>
              <div className="text-muted-foreground">{account.email}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
