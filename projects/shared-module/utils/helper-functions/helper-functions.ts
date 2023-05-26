import { call, concat, curry, map, toPairs, __ } from "ramda";
import { HttpParams } from "@angular/common/http";
import { spread } from "lodash";
import { compose } from "ramda";
import {
  JsonPatchOperations,
  JsonPatchDocument,
  JsonPatchOperation,
} from "../types/types";
import { isEqual } from "lodash-es";
import { Sort } from "@angular/material/sort";
import { SortingDirection } from "../../enum/sort-direction";
import { PaginationResponse } from "../types/types";

export const equalsWithSpread = spread(isEqual);

type fnT = (
  fn1: (op: JsonPatchOperations) => JsonPatchDocument<any>
) => JsonPatchDocument<any>;
const fn = curry(
  (
    op: JsonPatchOperations,
    fn1: (op: JsonPatchOperations) => JsonPatchDocument<any>
  ) => fn1(op)
);

export const toJsonPatchDocument_ = curry(
  (operation: JsonPatchOperations, obj: any) =>
    compose<any, Array<[any, any]>, fnT, JsonPatchDocument<any>>(
      fn(operation),
      toJsonPatchDocumentFromPairs,
      toPairs
    )(obj)
);

export const toJsonPatchDocumentFromPairs = curry(
  (pairs: Array<[any, any]>, operation: JsonPatchOperations) =>
    map(([K, V]): JsonPatchOperation => {
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      return <JsonPatchOperation>{
        op: operation,
        path: concat("/", K),
        value: V,
      };
    }, pairs)
);

export const toJsonPatchReplaceDocument = toJsonPatchDocument_("replace");
export const toJsonPatchReplaceDocumentFromPairs = toJsonPatchDocumentFromPairs(
  __,
  "replace"
);
export const mapToPairs = <K, V>(map: Map<K, V>): [K, V][] => [...map];
export const stringFormat = (str: string, ...args: string[]) => {
  return str.replace(/{(\d+)}/g, (match, index) => args[index] || "");
};

//Used to get sort expression
export const sortingDirectionHanlder = (sort: Sort): string => {
  let sortText: string;
  switch (sort.direction) {
    case SortingDirection[SortingDirection.asc]:
      sortText = "" + sort.active;
      break;
    case SortingDirection[SortingDirection.desc]:
      sortText = "-" + sort.active;
      break;
    default:
      sortText = "";
  }
  return sortText;
};

// Used to set query params for paginated endpoints
export const getPaginationHeader = (
  paginationResponse: PaginationResponse
): HttpParams => {
  let paramsObj = new HttpParams();
  paramsObj = paramsObj
    .set(
      "Page",
      paginationResponse.Page ? paginationResponse.Page.toString() : ""
    )
    .set(
      "PageSize",
      paginationResponse.PageSize ? paginationResponse.PageSize.toString() : ""
    )
    .set(
      "Sorts",
      paginationResponse.Sorts ? paginationResponse.Sorts.toString() : ""
    )
    .set(
      "Filters",
      paginationResponse.Filters ? paginationResponse.Filters.toString() : ""
    );
  return paramsObj;
};

export const customToFixedSlice = (value: number, val: number) => {
  let str = value.toString();
  if (str.indexOf(".") == -1) return value;
  str = str.slice(0, str.indexOf(".") + val + 1);
  return Number(str);
};
