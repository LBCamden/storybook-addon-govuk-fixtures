import { camelCase } from "lodash-es";
import {stat} from 'fs/promises'

/** 
 * The name of the export from CSR files for a story. These need to be valid js identifiers, so we convert the story name to camelCase. We underscore-prefix it to avoid export names clashing with js keywords (eg: `default`).
 */
export function getExampleExportName(exampleName: string) {
  return '_' + camelCase(exampleName)
}

/** Convert an identifier into PascalCase */
export function pascalCase(str: string) {
  str = camelCase(str)
  return str[0].toUpperCase() + str.slice(1)
}

/** Return true if the file at `path` exists */
export async function fileExists(path: string) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}