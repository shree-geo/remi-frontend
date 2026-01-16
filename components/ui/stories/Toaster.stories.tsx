import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast, Toaster } from "sonner";
import { Button } from "../button";

const meta: Meta<typeof Toaster> = {
  title: "UI/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    richColors: { control: "boolean" },
  },
  args: {
    position: "top-right",
    richColors: true,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Success: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-col gap-4 p-6 w-1/4">
        <Button onClick={() => toast.success("Login successful!")}>
          Login
        </Button>
      </div>
    </>
  ),
};

export const Info: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-col gap-4 p-6 w-1/4">
        <Button onClick={() => toast.info("Info message")}>Show Info</Button>
      </div>
    </>
  ),
};

export const Warning: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-col gap-4 p-6 w-1/4">
        <Button onClick={() => toast.warning("Warning message")}>
          Show Warning
        </Button>
      </div>
    </>
  ),
};

export const Error: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-col gap-4 p-6 w-1/4">
        <Button onClick={() => toast.error("Error message")}>Show Error</Button>
      </div>
    </>
  ),
};

export const Loading: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-col gap-4 p-6 w-1/4">
        <Button
          onClick={() => {
            const id = toast.loading("Loading...");
            setTimeout(() => {
              toast.success("Loaded successfully", { id });
            }, 2000);
          }}
        >
          Show Loading
        </Button>
      </div>
    </>
  ),
};
