import type { Meta, StoryObj } from '@storybook/react';
import { ZodError } from 'zod';

import { ErrorFallbackFrame } from '@/features/core';

const meta = {
  component: ErrorFallbackFrame,
} satisfies Meta<typeof ErrorFallbackFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
  args: {
    status: 404,
    message: 'Not Found',
  },
};

export const ServerError: Story = {
  args: {
    status: 500,
    message: '서버 내부 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
  },
};

export const Unknown: Story = {
  args: {
    message: '알 수 없는 오류가 발생했습니다.',
  },
};

const zodError = new ZodError([
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'undefined',
    path: ['email'],
    message: 'Required',
  },
  {
    code: 'too_small',
    minimum: 8,
    type: 'string',
    inclusive: true,
    exact: false,
    path: ['password'],
    message: '8자 이상이어야 합니다.',
  },
]);

export const ZodValidationError: Story = {
  args: {
    error: zodError,
  },
};
