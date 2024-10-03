import { ComponentType, SVGProps } from 'react'
import { VoteEntity } from '../gql/graphql'

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

export enum RestaurantCardData {
  TITLE = 'title',
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
