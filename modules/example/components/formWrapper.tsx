"use client";

import { type PropsWithChildren, useActionState } from "react";
import createExampleAction from "../actions/createExampleAction";

export default function ExampleFormWrapper({ children }: PropsWithChildren) {
  const [, action] = useActionState(createExampleAction, undefined);
  return <form action={action}>{children}</form>;
}
