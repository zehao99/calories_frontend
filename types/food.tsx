export type Nutrition = {
  amount: number
  unit_name: string
  metric_name: string
}


export type Food = {
  fdc_id: string
  name: string
  category: string
  brand: string
  gtin_upc: string,
  nutrition: Array<Nutrition>

}
export type FoodDetail = {
  fdc_id: string
  name: string
  category: string
  brand: string
  gtin_upc: string,
  ingredients: string,
  serving_size: number,
  serving_size_unit: string,
  serving_description: string,
  nutrition: Array<Nutrition>
}
export type SearchResponse = Array<Food>
export type DetailResponse = FoodDetail
