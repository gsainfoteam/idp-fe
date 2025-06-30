import { cn } from './cn';
import { Falsy } from './type-functions';

/**
 * Type Parameters:
 * @param TStates keys for each visual state (e.g. 'active', 'hover', 'disabled', etc.)
 * @param TParts parts of styles per state (e.g. 'background', 'border', 'text')
 * @param TArgs arguments needed (e.g. loading, checked)
 */
export function palette<
  TStates extends string,
  TParts extends string,
  TArgs extends boolean[],
>(
  mapFn: (...args: TArgs) => Record<TStates, Record<TParts, Falsy<string>>>,
  part?: TParts,
) {
  return (...args: TArgs) => {
    const stateMap = mapFn(...args);
    const stateValues = Object.values(stateMap) as Record<
      TParts,
      Falsy<string>
    >[];

    return stateValues.reduce((acc, partMap) => {
      const partValues = part
        ? [partMap[part]]
        : (Object.values(partMap) as Falsy<string>[]);
      return cn(acc, ...partValues);
    }, '');
  };
}
