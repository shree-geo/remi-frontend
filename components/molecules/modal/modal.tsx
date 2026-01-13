"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalProps } from "./modal.definition";

export default function Modal({
  title,
  description,
  additionalContent,
  action,
  triggerComponent,
  actionButtonText,
  actionButtonProps,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form action={action[1]}>
          <DialogHeader className="mb-4">
            <DialogTitle asChild>{title}</DialogTitle>
            <DialogDescription asChild>{description}</DialogDescription>
          </DialogHeader>
          {additionalContent ? (
            <div className="my-4">{additionalContent}</div>
          ) : null}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button {...actionButtonProps} type="submit" disabled={action[2]}>
                {actionButtonText}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
