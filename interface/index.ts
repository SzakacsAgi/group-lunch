export interface RestaurantData {
  title: string
  description: string
  url: string
}

export enum SupportedModalButtonTypes {
  CREATE_RESTAURANT = 'createRestaurant',
  DELETE_RESTAURANT = 'deleteRestaurant',
  EDIT_RESTAURANT = 'editRestaurant',
}
