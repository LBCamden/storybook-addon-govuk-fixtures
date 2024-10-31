import { camelCase } from "lodash-es";
import {stat} from 'fs/promises'

export function getExampleExportName(exampleName: string) {
  return '_' + camelCase(exampleName)
}

export function pascalCase(str: string) {
  str = camelCase(str)
  return str[0].toUpperCase() + str.slice(1)
}

export async function fileExists(path: string) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}