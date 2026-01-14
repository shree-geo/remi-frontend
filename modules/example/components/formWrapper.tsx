"use client";

import { PropsWithChildren, useActionState } from "react";
import createUserAction from "../actions/createUserAction";

export default function UserFormWrapper({ children }: PropsWithChildren) {
  const [, action] = useActionState(createUserAction, undefined);
  return <form action={action}>{children}</form>;
}
