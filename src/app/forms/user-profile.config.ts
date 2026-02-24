import type { EvaluationContext, FormConfig } from '@ng-forge/dynamic-forms';

const permissionsMap: Record<string, string> = {
  viewer: 'read',
  editor: 'read, write',
  admin: 'read, write, delete, manage',
};

export const userProfileConfig = {
  fields: [
    {
      key: 'firstName',
      type: 'input',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      key: 'lastName',
      type: 'input',
      label: 'Last Name',
      value: '',
      required: true,
    },
    {
      key: 'fullName',
      type: 'input',
      label: 'Full Name',
      value: '',
      logic: [
        {
          type: 'derivation',
          expression: '(formValue.firstName + " " + formValue.lastName).trim()',
          stopOnUserOverride: true,
          reEngageOnDependencyChange: true,
        },
      ],
    },
    {
      key: 'email',
      type: 'input',
      label: 'Email',
      value: '',
      required: true,
    },
    {
      key: 'displayName',
      type: 'input',
      label: 'Display Name',
      value: '',
      logic: [
        {
          type: 'derivation',
          functionName: 'deriveDisplayName',
          dependsOn: ['email'],
          trigger: 'debounced',
          debounceMs: 500,
          stopOnUserOverride: true,
          reEngageOnDependencyChange: true,
        },
      ],
    },
    {
      key: 'role',
      type: 'select',
      label: 'Role',
      value: 'viewer',
      options: [
        { label: 'Viewer', value: 'viewer' },
        { label: 'Editor', value: 'editor' },
        { label: 'Admin', value: 'admin' },
      ],
    },
    {
      key: 'permissions',
      type: 'input',
      label: 'Permissions',
      disabled: true,
      logic: [
        {
          type: 'derivation',
          functionName: 'resolvePermissions',
          dependsOn: ['role'],
        },
        {
          type: 'derivation',
          targetProperty: 'label',
          expression: '"Permissions (" + formValue.role + ")"',
        },
      ],
    },
  ],
  defaultValidationMessages: {
    required: 'This field is required',
  },
  customFnConfig: {
    derivations: {
      deriveDisplayName: (ctx: EvaluationContext) => {
        const email = ctx.formValue['email'] as string;
        return email ? email.split('@')[0] : '';
      },
      resolvePermissions: (ctx: EvaluationContext) => {
        const role = ctx.formValue['role'] as string;
        return permissionsMap[role] ?? 'none';
      },
    },
  },
} as const satisfies FormConfig;
