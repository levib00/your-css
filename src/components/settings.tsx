import { styles as masterStyles } from "../objects/styles"
import { assembleCssForExport } from "../scripts/import-export-css"

function Settings() {

  return (
    <>
      <button>import</button>
      <button onClick={() => assembleCssForExport(masterStyles, null)}>export</button>
    </>
  )
}

export default Settings