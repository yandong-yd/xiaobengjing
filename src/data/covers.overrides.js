import { localCoverPath } from './coverRegistry.js'

/** 人工精选封面（最高优先级，写入 map 时保留） */
export const projectCoverOverrides = {
  1: localCoverPath('food-3'),
  2: localCoverPath('food-0'),
  3: localCoverPath('drink-3'),
  4: localCoverPath('tech-0'),
  5: localCoverPath('fun-2'),
  6: localCoverPath('service-2'),
  7: localCoverPath('food-1'),
  8: localCoverPath('fun-0'),
  21: localCoverPath('craft-1'),
  39: localCoverPath('tech-1'),
}

export const caseCoverOverrides = {
  1: localCoverPath('food-3'),
  2: localCoverPath('food-0'),
  3: localCoverPath('drink-3'),
  4: localCoverPath('service-0'),
  5: localCoverPath('food-1'),
  6: localCoverPath('tech-0'),
  7: localCoverPath('food-0'),
  8: localCoverPath('food-2'),
  10: localCoverPath('drink-1'),
  11: localCoverPath('flower-0'),
  12: localCoverPath('pet-0'),
  13: localCoverPath('craft-0'),
  14: localCoverPath('tech-1'),
  19: localCoverPath('food-2'),
  21: localCoverPath('craft-1'),
  22: localCoverPath('food-1'),
  24: localCoverPath('craft-2'),
  25: localCoverPath('tech-2'),
  32: localCoverPath('flower-1'),
  36: localCoverPath('drink-2'),
  39: localCoverPath('flower-0'),
  44: localCoverPath('fun-0'),
  63: localCoverPath('food-0'),
  64: localCoverPath('food-2'),
  65: localCoverPath('market-1'),
  66: localCoverPath('food-3'),
}
