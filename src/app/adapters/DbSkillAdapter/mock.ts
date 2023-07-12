import { DbSkillModelAdapter } from '.'

export const mockDbSkillAdapter = () => {
  class DbSkillAdapterMocked extends DbSkillModelAdapter {}

  return new DbSkillAdapterMocked()
}
