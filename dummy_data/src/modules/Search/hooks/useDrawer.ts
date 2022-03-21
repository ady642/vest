import { ref } from 'vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'

const useDrawer = () => {
  const showDocDrawer = ref(false)
  const documentSelected = ref(new Document())

  const handleDocumentClicked = (document: Document) => {
    documentSelected.value = document
    showDocDrawer.value = true
  }

  return {
    showDocDrawer,
    documentSelected,
    handleDocumentClicked
  }
}

export default useDrawer
