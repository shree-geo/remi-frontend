import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
import Text from "../text";
import Title from "../title";
import STranslation from "../translations/STranslation";
interface StatsCardProps {
  title: ComponentProps<typeof STranslation>;

  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: StatsCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-gradient-to-br from-primary/5 via-transparent to-primary/10" />

      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <STranslation slot={Text} {...title} />
          <Title size="h3">{value}</Title>
          {description && (
            <Text size="small" className="">
              {description}
            </Text>
          )}

          {trend && (
            <div
              className={cn(
                "mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
              )}
            >
              {trend.isPositive ? "▲" : "▼"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};
