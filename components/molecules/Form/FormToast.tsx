"use client";

import { IResponseError } from "@/definitions/api.definition";
import { useEffect } from "react";
import { toast } from "sonner";

export default function FormToast({
  error,
  message,
}: {
  error?: IResponseError | null;
  message?: string;
}) {
  useEffect(() => {
    if (error && error?.non_field_errors) {
      error.non_field_errors.forEach((message) => {
        toast.error(message);
      });
    } else if (error?.detail) {
      toast.error(error.detail);
    } else if (error?.message) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  });
  return null;
}
