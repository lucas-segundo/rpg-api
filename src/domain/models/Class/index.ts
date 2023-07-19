import { Skill } from '../Skill'

export interface Class {
  id: number
  title: string
  skills: Skill[] | []
  deletedAt: Date | null
}
