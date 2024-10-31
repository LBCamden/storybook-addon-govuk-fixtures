import { camelCase } from "lodash-es";

export function getExampleExportName(exampleName: string) {
  return '_' + camelCase(exampleName)
}

export function pascalCase(str: string) {
  str = camelCase(str)
  return str[0].toUpperCase() + str.slice(1)
}