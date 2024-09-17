import { PiceOptions } from '../../interface'

export default function priceLevelMapper(textLevel: PiceOptions) {
  switch (textLevel) {
    case PiceOptions.PRICE_LEVEL_UNSPECIFIED:
      return ''
    case PiceOptions.PRICE_LEVEL_FREE:
      return 'Free'
    case PiceOptions.PRICE_LEVEL_INEXPENSIVE:
      return '$'
    case PiceOptions.PRICE_LEVEL_MODERATE:
      return '$$'
    case PiceOptions.PRICE_LEVEL_EXPENSIVE:
      return '$$$'
    case PiceOptions.PRICE_LEVEL_VERY_EXPENSIVE:
      return '$$$$'
  }
}
