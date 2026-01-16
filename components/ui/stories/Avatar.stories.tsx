import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  argTypes: {
    className: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
  args: {
    size: "default",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};
export const FallbackOnly: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};
export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/101" />
      <AvatarFallback>ON</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
};
export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
  ),
};
export const Large: Story = {
  args: {
    size: "lg",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  ),
};
