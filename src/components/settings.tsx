import { styles as masterStyles } from '../objects/styles';
import { assembleCssForExport, handleDownloadClick } from '../scripts/import-export-css';
// TODO: fix handleDownloadClick
function Settings() {
  return (
    <>
      <button onClick={() => handleDownloadClick(null, null, masterStyles)}>import</button>
      <button onClick={() => assembleCssForExport(masterStyles, null)}>export</button>
    </>
  );
}

export default Settings;
