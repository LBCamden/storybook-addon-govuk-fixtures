import { camelCase } from "lodash-es";

export function getExampleExportName(exampleName: string) {
  return '_' + camelCase(exampleName)
}