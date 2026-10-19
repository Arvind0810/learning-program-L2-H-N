export const PASS_PERCENT = 70;
export const WEEKS_PER_MONTH = 4;
export const RANDOM_TEST_SIZES = [10, 20, 30] as const;
export const DEFAULT_RANDOM_TEST_SIZE = 20;

export function weeksInMonth(month: number): number[] {
  const first = (month - 1) * WEEKS_PER_MONTH + 1;
  return Array.from({ length: WEEKS_PER_MONTH }, (_, i) => first + i);
}

export function monthOfWeek(week: number): number {
  return Math.ceil(week / WEEKS_PER_MONTH);
}
