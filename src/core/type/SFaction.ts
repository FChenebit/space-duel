export const SFactionTypeEnum = {
  PLAYER: 'PLAYER',
  ENEMY: 'ENEMY'
} as const;
export type SFactionType = (typeof SFactionTypeEnum)[keyof typeof SFactionTypeEnum];
