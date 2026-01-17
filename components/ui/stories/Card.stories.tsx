import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  argTypes: {
    children: { control: "text" },
    className: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "default", ""],
    },
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    size: "default",
    children: (
      <>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>This is a description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content of the card.</p>
        </CardContent>
        <CardFooter>
          <Button size="xs">Action</Button>
        </CardFooter>
      </>
    ),
  },
};
export const Small: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>This is a description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content of the card.</p>
        </CardContent>
        <CardFooter>
          <Button size="xs">Action</Button>
        </CardFooter>
      </>
    ),
  },
};
export const Large: Story = {
  args: {
    size: "default",
    children: (
      <>
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
          <CardDescription>This is a description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content of the card.</p>
        </CardContent>
        <CardFooter>
          <Button size="xs">Action</Button>
        </CardFooter>
      </>
    ),
  },
};
export const WithoutFooter: Story = {
  args: {
    size: "default",
    children: (
      <>
        <CardHeader>
          <CardTitle>No Footer Card</CardTitle>
          <CardDescription>Card without a footer section</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Sometimes cards don’t need a footer. Just content and header are
            enough.
          </p>
        </CardContent>
      </>
    ),
  },
};
export const ContentOnly: Story = {
  args: {
    size: "default",
    children: (
      <CardContent>
        <p>
          Sometimes cards don’t need a footer. Just content and header are
          enough.
        </p>
      </CardContent>
    ),
  },
};
