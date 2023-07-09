import { DbClassModelAdapter } from '.'

export const mockDbClassAdapter = () => {
  class DbClassAdapterMocked extends DbClassModelAdapter {}

  return new DbClassAdapterMocked()
}
