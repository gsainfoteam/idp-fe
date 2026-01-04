import { type TFunction } from 'i18next';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type Client } from '../hooks/use-client';
import { useClientMemberForm } from '../hooks/use-client-member-form';
import { type Role, ROLE_NUMBER, ROLE_VALUES } from '../utils/role';

import PlusIcon from '@/assets/icons/line/add.svg?react';
import { useAuth } from '@/features/auth';
import {
  Avatar,
  Button,
  cn,
  IconButton,
  Input,
  uniqueKey,
} from '@/features/core';

const getRoleTranslation = (t: TFunction): Record<Role, string> => ({
  OWNER: t('services.detail.members.roles.owner'),
  ADMIN: t('services.detail.members.roles.admin'),
  MEMBER: t('services.detail.members.roles.member'),
});

function RoleSelect({
  role,
  setRole,
  disabled,
}: {
  role: Role;
  setRole: (role: Role) => void;
  disabled?: boolean;
}) {
  const { t } = useTranslation();
  const roleTranslations = getRoleTranslation(t);

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value as Role)}
      disabled={disabled}
      className={cn(
        'text-body-1 rounded-lg px-3 py-1.5',
        'bg-button-default-default-background',
        'text-button-default-default-label',
        'border-button-default-default-border border',
        'ring-button-default-focus-border focus:ring-2 focus:outline-none',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      {ROLE_VALUES.map((roleValue) => (
        <option key={roleValue} value={roleValue}>
          {roleTranslations[roleValue]}
        </option>
      ))}
    </select>
  );
}

export function ClientMemberForm({ client }: { client: Client }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    form,
    members,
    addMember,
    removeMember,
    updateMemberRole,
    currentUserRoleNumber,
  } = useClientMemberForm(client.clientId);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3 text-basics-primary-label">
        {t('services.detail.members.title')}
      </div>
      <div className="flex flex-col gap-5">
        {members && members.length > 0 && (
          <div className="border-basics-tertiary-label overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-basics-tertiary-label border-b">
                  <th className="px-4 py-3 text-left">
                    <div className="text-body-1 text-basics-secondary-label">
                      {t('services.detail.members.columns.member')}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="text-body-1 text-basics-secondary-label">
                      {t('services.detail.members.columns.role')}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="text-body-1 text-basics-secondary-label">
                      {t('services.detail.members.columns.kick_out')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => {
                  const memberRole: Role =
                    member.memberships?.[0]?.role ?? 'MEMBER';
                  const canUpdateRole =
                    currentUserRoleNumber >= ROLE_NUMBER.OWNER;
                  const canRemove = currentUserRoleNumber >= ROLE_NUMBER.ADMIN;

                  return (
                    <tr
                      key={member.uuid}
                      className="border-basics-tertiary-label border-b last:border-b-0"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar
                            size={6}
                            img={member.picture ?? undefined}
                            seed={uniqueKey(member.uuid)}
                          >
                            {member.name.charAt(0)}
                          </Avatar>
                          <div
                            className={cn(
                              'text-body-1',
                              client.deleteRequestedAt != null
                                ? 'text-basics-secondary-label'
                                : 'text-basics-primary-label',
                            )}
                          >
                            {member.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <RoleSelect
                          role={memberRole}
                          setRole={(newRole) =>
                            updateMemberRole(member.uuid, newRole)
                          }
                          disabled={
                            user?.uuid === member.uuid ||
                            !canUpdateRole ||
                            client.deleteRequestedAt != null ||
                            currentUserRoleNumber < ROLE_NUMBER.OWNER
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="link"
                          size="none"
                          disabled={
                            user?.uuid === member.uuid ||
                            !canRemove ||
                            client.deleteRequestedAt != null ||
                            currentUserRoleNumber < ROLE_NUMBER.ADMIN
                          }
                          onClick={() => removeMember(member.uuid)}
                        >
                          {t('services.detail.members.kick_out')}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex items-start gap-2">
          <Input
            className="flex-1"
            type="email"
            placeholder={t('services.detail.members.placeholder')}
            error={form.formState.errors.email?.message}
            disabled={
              client.deleteRequestedAt != null ||
              currentUserRoleNumber < ROLE_NUMBER.ADMIN
            }
            {...form.register('email')}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ fieldState }) => (
              <IconButton
                variant="primary"
                className="h-fit"
                disabled={
                  fieldState.invalid ||
                  !fieldState.isDirty ||
                  client.deleteRequestedAt != null ||
                  currentUserRoleNumber < ROLE_NUMBER.ADMIN
                }
                onClick={addMember}
                icon={<PlusIcon />}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
