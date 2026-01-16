import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Footer from "./footer";

const meta: Meta<typeof Footer> = {
  title: "Layouts/Footer",
  component: Footer,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
