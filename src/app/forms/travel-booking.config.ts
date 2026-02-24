import type { EvaluationContext, FormConfig } from '@ng-forge/dynamic-forms';

export const travelBookingConfig = {
  fields: [
    {
      key: 'destination',
      type: 'input',
      label: 'Destination',
      value: '',
      required: true,
    },
    {
      key: 'departureDate',
      type: 'datepicker',
      label: 'Departure Date',
      required: true,
    },
    {
      key: 'returnDate',
      type: 'datepicker',
      label: 'Return Date',
      required: true,
      minDate: null,
      logic: [
        {
          type: 'derivation',
          targetProperty: 'minDate',
          functionName: 'deriveMinReturnDate',
          dependsOn: ['departureDate'],
        },
      ],
    },
    {
      key: 'tripDuration',
      type: 'input',
      label: 'Trip Duration (days)',
      disabled: true,
      logic: [
        {
          type: 'derivation',
          functionName: 'calculateTripDuration',
          dependsOn: ['departureDate', 'returnDate'],
        },
      ],
    },
    {
      key: 'travelers',
      type: 'select',
      label: 'Number of Travelers',
      value: 1,
      options: [
        { label: '1 Traveler', value: 1 },
        { label: '2 Travelers', value: 2 },
        { label: '3 Travelers', value: 3 },
        { label: '4 Travelers', value: 4 },
      ],
    },
    {
      key: 'pricePerPerson',
      type: 'input',
      label: 'Price per Person',
      value: 500,
      props: { type: 'number' },
    },
    {
      key: 'totalPrice',
      type: 'input',
      label: 'Total Price',
      disabled: true,
      derivation: 'formValue.travelers * formValue.pricePerPerson',
    },
  ],
  defaultValidationMessages: {
    required: 'This field is required',
  },
  customFnConfig: {
    derivations: {
      calculateTripDuration: (ctx: EvaluationContext) => {
        const departureDate = ctx.formValue['departureDate'] as string;
        const returnDate = ctx.formValue['returnDate'] as string;
        if (!departureDate || !returnDate) return '';
        const diffMs =
          new Date(returnDate).getTime() -
          new Date(departureDate).getTime();
        const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
        return days > 0 ? days : '';
      },
    },
    propertyDerivations: {
      deriveMinReturnDate: (ctx: EvaluationContext) => {
        const departure = ctx.formValue['departureDate'] as string;
        if (!departure) return null;
        const minReturn = new Date(departure);
        minReturn.setDate(minReturn.getDate() + 1);
        return minReturn;
      },
    },
  },
} as const satisfies FormConfig;
