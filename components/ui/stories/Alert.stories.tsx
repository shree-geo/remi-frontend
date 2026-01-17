// Alert.stories.tsx
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: "default",
    children: (
      <>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </>
    ),
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <AlertTitle>Warning!</AlertTitle>
        <AlertDescription>
          This is a destructive alert message. Proceed with caution.
        </AlertDescription>
        <AlertAction>
          <Button size="sm" variant="destructive">
            Undo
          </Button>
        </AlertAction>
      </>
    ),
  },
};
export const WithAction: Story = {
  args: {
    variant: "default",
    children: (
      <>
        <AlertTitle>Action Required</AlertTitle>
        <AlertDescription> This alert requires your action.</AlertDescription>
        <AlertAction>
          <Button size="sm">Take Action</Button>
        </AlertAction>
      </>
    ),
  },
};
