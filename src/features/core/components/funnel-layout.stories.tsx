import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';
import { FunnelLayout } from './funnel-layout';

const meta = {
  component: FunnelLayout,
} satisfies Meta<typeof FunnelLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '회원가입',
    stepTitle: '회원가입',
    description: '회원가입 설명',
    button: (
      <Button variant="primary" className="w-full">
        다음으로
      </Button>
    ),
    children: (
      <>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
        <div>Hello world!</div>
      </>
    ),
  },
};
