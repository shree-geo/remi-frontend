import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Select>;
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="mt-2">
          <SelectLabel>Options</SelectLabel>
          <SelectItem value="apple">option 1</SelectItem>
          <SelectItem value="apple">option 2</SelectItem>
          <SelectItem value="apple">option 3</SelectItem>
          <SelectItem value="apple">option 4</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
