import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { type Role } from '../utils/role';

import { useClientMembers } from './use-client-members';

import {
  deleteClientMember,
  patchClientMemberRole,
  postClientMember,
} from '@/data/client';

const createSchema = (t: TFunction) =>
  z.object({
    email: z.string().email(t('services.detail.members.errors.format')),
  });

export type ClientMemberFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useClientMemberForm = (clientId: string) => {
  const { t } = useTranslation();
  const { members, isLoading, refetch, currentUserRoleNumber } =
    useClientMembers(clientId);
  const form = useForm<ClientMemberFormSchema>({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const addMember = form.handleSubmit(async (formData) => {
    const res = await postClientMember({ clientId }, { email: formData.email });

    if (!res.ok) {
      if (res.status === 401) {
        toast.error(t('common.errors.unauthorized'));
      } else if (res.status === 403) {
        toast.error(t('common.errors.forbidden'));
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    reset();
    await refetch();
  });

  const removeMember = async (userId: string) => {
    const res = await deleteClientMember({ clientId, userId });

    if (!res.ok) {
      if (res.status === 401) {
        toast.error(t('common.errors.unauthorized'));
      } else if (res.status === 403) {
        toast.error(t('common.errors.forbidden'));
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    await refetch();
  };

  const updateMemberRole = async (userId: string, role: Role) => {
    const res = await patchClientMemberRole({ clientId, userId }, { role });

    if (!res.ok) {
      if (res.status === 401) {
        toast.error(t('common.errors.unauthorized'));
      } else if (res.status === 403) {
        toast.error(t('common.errors.forbidden'));
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    await refetch();
  };

  const reset = () => {
    form.reset({ email: '' });
  };

  return {
    form,
    reset,
    members,
    isLoading,
    addMember,
    removeMember,
    updateMemberRole,
    currentUserRoleNumber,
  };
};
