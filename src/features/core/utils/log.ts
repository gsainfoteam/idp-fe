import * as amplitude from '@amplitude/analytics-browser';
import {
  type NavigateOptions,
  type ValidateLinkOptions,
} from '@tanstack/react-router';
import type { HttpMethod } from 'openapi-typescript-helpers';

import { type Theme } from '../context/theme-context';

import { type router } from '@/router';

export type ClickEventMap = {
  // Auth
  auth_login_email_button: Record<string, never>;
  auth_login_passkey_button: Record<string, never>;
  auth_register_button: Record<string, never>;
  auth_logout_button: Record<string, never>;

  // Register
  register_email_check: Record<string, never>;
  register_email_overlay_accept: Record<string, never>;
  register_email_overlay_cancel: Record<string, never>;
  register_code_resend: Record<string, never>;
  register_info_verify: Record<string, never>;

  // Passkey
  passkey_register_button: Record<string, never>;
  passkey_delete_button: { passkeyId: string };

  // Client
  client_create_button: Record<string, never>;
  client_edit_button: { clientId: string };
  client_delete_button: { clientId: string };
  client_picture_delete: { clientId: string };
  client_secret_rotate_button: { clientId: string };
  client_member_add_button: { clientId: string };
  client_member_remove_button: { clientId: string; userId: string };

  // OAuth
  oauth_authorize_allow: { clientId: string };
  oauth_authorize_deny: { clientId: string };

  // Common
  back_button: Record<string, never>;
  link: { href: string };
  theme_toggle: { to: Theme };
  student_id_verification_dialog_confirm: { studentId: string };
  student_id_verification_dialog_cancel: Record<string, never>;

  // Home
  home_profile_edit_button: Record<string, never>;
  home_profile_save_button: Record<string, never>;
  home_profile_picture_upload: Record<string, never>;
  home_profile_picture_delete: Record<string, never>;
  home_profile_password_change_button: Record<string, never>;
  home_profile_student_id_verify_button: Record<string, never>;
  home_profile_link: Record<string, never>;
  home_passkeys_link: Record<string, never>;
  home_clients_link: Record<string, never>;
  home_withdraw_link: Record<string, never>;
};

export type SubmitEventMap = {
  auth_login: { method: 'email' | 'passkey' };
  auth_register_email: Record<string, never>;
  auth_register_code: Record<string, never>;
  auth_register_info: Record<string, never>;
  profile_edit: Record<string, never>;
  profile_password_change: Record<string, never>;
  student_id_verify: Record<string, never>;
  client_create: Record<string, never>;
  client_edit: { clientId: string };
};

export type ModalEventMap = {
  email_verification_overlay: {
    open: Record<string, never>;
    close: { result: 'accept' | 'cancel' };
  };
  student_id_dialog: {
    open: Record<string, never>;
    close: { result: 'confirm' | 'cancel' };
  };
  delete_confirmation: {
    open: { resource: string };
    close: { resource: string; result: 'confirm' | 'cancel' };
  };
  client_picture_delete_dialog: {
    open: Record<string, never>;
    close: { result: 'confirm' | 'cancel' };
  };
  profile_edit_modal: {
    open: Record<string, never>;
    close: Record<string, never>;
  };
  passkey_edit_modal: {
    open: Record<string, never>;
    close: { result: 'confirm' | 'cancel' };
  };
  register_undo_warning_dialog: {
    open: Record<string, never>;
    close: { result: 'confirm' | 'cancel' };
  };
};

export type ErrorEventMap = {
  api: { endpoint: string; status: number; method: HttpMethod };
  runtime: {
    message: string;
    context?: string | null | undefined;
    stack?: string;
  };
};

export class Log {
  private static currentPath = '';

  private static track(event: string, payload: Record<string, unknown>) {
    if (import.meta.env.DEV) {
      console.info(`[amplitude] ${event}`, payload);
    } else {
      amplitude.track(event, payload);
    }
  }

  static setCurrentPath = (path: string) => {
    Log.currentPath = path;
  };

  static setUserId = (userId: string) => {
    amplitude.setUserId(userId);
    // Log.track('set_user_id', { userId });
  };

  static clearUserId = () => {
    amplitude.reset();
    // Log.track('clear_user_id', { userId: null });
  };

  static setUserProperties = (
    properties: Record<string, string | number | boolean | string[] | number[]>,
  ) => {
    const identify = new amplitude.Identify();
    Object.entries(properties).forEach(([key, value]) => {
      identify.set(key, value);
    });

    amplitude.identify(identify);
    // Log.track('set_user_properties', { properties });
  };

  /**
   * 클릭 이벤트 로깅
   * @example Log.click('auth_login_email_button')
   * @example Log.click('client_delete_button', { clientId: 'abc123' })
   */
  static click = <T extends keyof ClickEventMap>(
    event: T,
    properties: ClickEventMap[T] = {} as ClickEventMap[T],
  ) => {
    Log.track(`click_${event}`, {
      ...properties,
      from: Log.currentPath,
    });
  };

  /**
   * 폼 제출 이벤트 로깅 (실제 값은 로깅하지 않음)
   * @example Log.submit('auth_register_email')
   * @example Log.submit('auth_login', { method: 'email' })
   */
  static submit = <T extends keyof SubmitEventMap>(
    event: T,
    properties: SubmitEventMap[T] = {} as SubmitEventMap[T],
  ) => {
    Log.track(`submit_${event}`, {
      ...properties,
      from: Log.currentPath,
    });
  };

  /**
   * 모달 이벤트 로깅
   * @example Log.modal('email_verification_overlay_open')
   * @example Log.modal('email_verification_overlay_close', { result: 'accept' })
   */
  static modal = <T extends keyof ModalEventMap, TSub extends 'open' | 'close'>(
    event: `${T}_${TSub}`,
    properties: ModalEventMap[T][TSub],
  ) => {
    Log.track(`modal_${event}`, {
      ...properties,
      from: Log.currentPath,
    });
  };

  /**
   * 에러 이벤트 로깅
   * @example Log.error('api', { endpoint: '/api/user', status: 500 })
   */
  static error = <T extends keyof ErrorEventMap>(
    type: T,
    properties: ErrorEventMap[T],
  ) => {
    // Log.track(`error_${type}`, { ...properties, from: Log.currentPath });
    if (import.meta.env.DEV)
      console.error(`[sentry] error_${type}`, properties);
    // TODO: sentry 연동 in https://github.com/gsainfoteam/account-fe/issues/235
  };

  /**
   * 퍼널 단계 이동 로깅
   * @example Log.funnel('register', 'email')
   * @example Log.funnel('register', 'info', { type: 'student' })
   */
  static funnel = (
    funnelId: string,
    step: string,
    properties: Record<string, unknown> = {},
  ) => {
    Log.track(`funnel_${funnelId}_${step}`, {
      ...properties,
      from: Log.currentPath,
    });
  };

  /**
   * 페이지 뷰 로깅
   * @example Log.pageview('/auth/login')
   * @example Log.pageview('/clients/123', { clientId: '123' })
   */
  static pageview = <TPath extends ValidateLinkOptions<typeof router>['to']>(
    path: TPath,
    properties: NavigateOptions<
      typeof router,
      TPath
    >['search'] = {} as NavigateOptions<typeof router, TPath>['search'],
  ) => {
    Log.track(`pageview_${path}`, {
      ...(properties || {}),
      from: Log.currentPath,
    });
  };
}
