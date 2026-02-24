import type { EvaluationContext, FormConfig } from '@ng-forge/dynamic-forms';

export const invoiceConfig = {
  fields: [
    {
      key: 'items',
      type: 'array',
      template: [
        {
          key: 'description',
          type: 'input',
          label: 'Description',
          value: '',
          required: true,
        },
        {
          key: 'quantity',
          type: 'input',
          label: 'Quantity',
          value: 1,
          required: true,
          props: { type: 'number' },
        },
        {
          key: 'unitPrice',
          type: 'input',
          label: 'Unit Price',
          value: 0,
          required: true,
          props: { type: 'number' },
        },
        {
          key: 'lineTotal',
          type: 'input',
          label: 'Line Total',
          disabled: true,
          derivation: 'formValue.quantity * formValue.unitPrice',
        },
      ],
      value: [{ description: '', quantity: 1, unitPrice: 0 }],
    },
    {
      key: 'subtotal',
      type: 'input',
      label: 'Subtotal',
      disabled: true,
      logic: [
        {
          type: 'derivation',
          functionName: 'calculateSubtotal',
          dependsOn: ['items'],
        },
      ],
    },
    {
      key: 'taxRate',
      type: 'slider',
      label: 'Tax Rate (%)',
      value: 19,
      minValue: 0,
      maxValue: 30,
      step: 1,
    },
    {
      key: 'taxAmount',
      type: 'input',
      label: 'Tax Amount',
      disabled: true,
      derivation: 'formValue.subtotal * formValue.taxRate / 100',
    },
    {
      key: 'grandTotal',
      type: 'input',
      label: 'Grand Total',
      disabled: true,
      derivation: 'formValue.subtotal + formValue.taxAmount',
    },
  ],
  defaultValidationMessages: {
    required: 'This field is required',
  },
  customFnConfig: {
    derivations: {
      calculateSubtotal: (ctx: EvaluationContext) => {
        const items = ctx.formValue['items'] as
          | { quantity: number; unitPrice: number }[]
          | undefined;
        if (!items) return 0;
        return items.reduce(
          (sum, item) => sum + (item.quantity ?? 0) * (item.unitPrice ?? 0),
          0,
        );
      },
    },
  },
} as const satisfies FormConfig;
