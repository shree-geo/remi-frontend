import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "../field";

const meta: Meta = {
  title: "UI/Field",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <FieldSet>
      <Field>
        <FieldLabel>Field Label</FieldLabel>
        <FieldContent>
          <input
            className="border rounded px-3 py-2"
            placeholder="Enter value"
          />
          <FieldDescription>Field description goes here</FieldDescription>
        </FieldContent>
      </Field>
    </FieldSet>
  ),
};
export const WithError: Story = {
  render: () => (
    <FieldSet>
      <Field>
        <FieldLabel>Email</FieldLabel>

        <FieldContent>
          <input
            className="border rounded px-3 py-2"
            placeholder="you@example.com"
          />
        </FieldContent>

        <FieldError>Invalid email address</FieldError>
      </Field>
    </FieldSet>
  ),
};
