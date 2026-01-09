import Title from "@/components/molecules/title";
import STranslation from "@/components/molecules/translations/STranslation";
import { ComponentProps } from "react";
import CreateButton from "./createButton";

interface ListHeaderProps {
  title: ComponentProps<typeof STranslation>;
}

export default function ListHeader(props: ListHeaderProps) {
  return (
    <div className="flex items-center">
      <Title size="h3">
        <STranslation {...props.title} />
      </Title>
      <div className="grow"></div>
      <CreateButton />
    </div>
  );
}
