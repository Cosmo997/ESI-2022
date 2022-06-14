import { VariableValueDto } from "../api/src/generated-sources/openapi";
import { titleCaseWord } from "./extension";

export function mapToDtoVariables(variables: Map<string, any>): {
  [key: string]: VariableValueDto;
} {
  let processVariables: { [key: string]: VariableValueDto } = {};
  for (let [key, value] of variables) {
    console.log("\n" + key + "  " + value);
    processVariables[key] = {
      value: value,
      type: titleCaseWord(typeof value),
    };
  }
  return processVariables;
}
