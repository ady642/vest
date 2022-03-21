import getterHelpers, {
  gettersHelpersType
} from '@/modules/DataManipulation/Upload/store/helpers/getterHelpers.ts'
import dispatchHelpers, {
  dispatchHelpersType
} from '@/modules/DataManipulation/Upload/store/helpers/dispatchHelpers.ts'

type useUploadStoreHelpersInterface = gettersHelpersType & dispatchHelpersType

const useUploadStoreHelpers = (): useUploadStoreHelpersInterface => ({
  ...getterHelpers(),
  ...dispatchHelpers()
})

export default useUploadStoreHelpers
