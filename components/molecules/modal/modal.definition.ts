import { Button } from "@/components/ui/button";
import { ReactNode, useActionState } from "react";

export interface ModalProps {
  title: ReactNode;
  description: ReactNode;
  additionalContent?: ReactNode;
  action: ReturnType<typeof useActionState<unknown, FormData>>;
  triggerComponent: ReactNode;
  actionButtonText?: ReactNode;
  actionButtonProps?: React.ComponentProps<typeof Button>;
}
