/* The value of the `status` filter option. */
export type StatusOptionValue = {
  /** The label (used for grouping) of the corresponding `phase` */
  phaseLabel: string;
};

/**
 * The filter options or values for the selects within the filter bar.
 *
 * @todo Remove unnecessary <unknown, false> type when TS setup is fixed
 */
export interface FilterValuesOrOptions {
  /** Filter option or value to filter projects for `type`. */
  types: any;

  /** Filter option or value to filter projects for `phase`. */
  phases: any;

  /** Filter option or value to filter projects for `status`. */
  status: any;
}
