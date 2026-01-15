"use client";

import { PropsWithChildren, useActionState } from "react";
import createExampleAction from "../actions/createExampleAction";

export default function ExampleFormWrapper({ children }: PropsWithChildren) {
  const [state, action] = useActionState(createExampleAction, {
    fruit: "",
  });
  console.log("ExampleFormWrapper state:", state);
  return <form action={action}>{children}</form>;
}
