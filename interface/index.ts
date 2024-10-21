import { ComponentType, SVGProps } from 'react'
import { VoteEntity } from '../gql/graphql'

export interface RestaurantData {
  name: string
  description: string
  url: string
  address: string
  distance: string
  category: string
  price: '$' | '$$' | '$$$' | '$$$$'
  image: FileList
}

export enum SupportedModalButtonTypes {
  CREATE_RESTAURANT = 'createRestaurant',
  DELETE_RESTAURANT = 'deleteRestaurant',
  EDIT_RESTAURANT = 'editRestaurant',
}

export enum RestaurantCardData {
  NAME = 'name',
  DESCRIPTION = 'description',
  URL = 'url',
  VOTES = 'votes',
  CAN_VOTE = 'can vote',
}

export type IconComponentType = ComponentType<SVGProps<SVGSVGElement>> & {
  className?: string
}

export interface VotesData {
  votes: {
    data: VoteEntity[]
  }
}

export type RestaurantDataResponse<T, K extends keyof never> = {
  [key in K]: {
    data: T[]
    meta: {
      pagination: {
        pageCount: number
      }
    }
  }
}
