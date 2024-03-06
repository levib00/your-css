import { styles as masterStyles } from "../objects/styles"
import { assembleCssForExport, handleDownloadClick } from "../scripts/import-export-css"

function Settings() {

  return (
    <>
      <button onClick={() => handleDownloadClick(null, null, masterStyles)}>import</button>
      <button onClick={() => assembleCssForExport(masterStyles, null)}>export</button>
    </>
  )
}

export default Settings