export type PositionOptionsWithFrequency = Omit<
  PositionOptions,
  "frequency"
> & {
  frequency?: number;
};
