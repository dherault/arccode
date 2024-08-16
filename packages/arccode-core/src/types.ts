export type Character = {
  name: string
  level: number
  levelUpsKeywords: KeywordRegistry
  keywords: KeywordRegistry
  viewedKeywords: KeywordRegistry
  processedKeywords: KeywordRegistry
  unlockedItems: Record<string, number>
  avatarItemId: string
  mainHandItemId: string
  offHandItemId: string
  helmItemId: string
  armorItemId: string
  glovesItemId: string
  bootsItemId: string
  amuletItemId: string
  ringItemId: string
  spell1ItemId: string
  spell2ItemId: string
  spell3ItemId: string
  spell4ItemId: string
}

export type KeywordRegistry = Record<string, Record<string, number>>

export type Keyword = {
  language: string
  name: string
  count: number
  level: number
  thresholdMin: number
  thresholdMax: number
}
