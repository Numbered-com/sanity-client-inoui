import type {ContentSourceMap, ContentSourceMapDocuments, SanityDocument} from '../types'
import {Path} from './studioPath'

export type {
  Any,
  ContentSourceMap,
  ContentSourceMapDocument,
  ContentSourceMapDocumentBase,
  ContentSourceMapDocuments,
  ContentSourceMapDocumentValueSource,
  ContentSourceMapLiteralSource,
  ContentSourceMapMapping,
  ContentSourceMapMappings,
  ContentSourceMapPaths,
  ContentSourceMapRemoteDocument,
  ContentSourceMapSource,
  ContentSourceMapUnknownSource,
  ContentSourceMapValueMapping,
  SanityDocument,
} from '../types'
export type {IndexTuple, KeyedSegment, Path, PathSegment} from './studioPath'

/**
 * @alpha
 * @deprecated use `ContentSourceMapParsedPath[number]` instead
 */
export type ContentSourceMapParsedPathSegment = ContentSourceMapParsedPath[number]

/** @alpha */
export type ContentSourceMapParsedPathKeyedSegment = {_key: string; _index: number}

/** @alpha */
export type ContentSourceMapParsedPath = (
  | string
  | number
  | ContentSourceMapParsedPathKeyedSegment
)[]

/** @alpha */
export type StudioBaseUrl = `/${string}` | `${string}.sanity.studio` | `https://${string}` | string

/** @alpha */
export type StudioBaseRoute = {baseUrl: StudioBaseUrl; workspace?: string; tool?: string}

/** @alpha */
export type StudioUrl = StudioBaseUrl | StudioBaseRoute

/** @alpha */
export type ResolveStudioUrl = (sourceDocument: ContentSourceMapDocuments[number]) => StudioUrl

/**
 * Path syntax as used by the `sanity` package, you can give it a string:
 * `products[0].images[_key=="abc123"].asset._ref`
 * or an array:
 * `['products', 0, 'images', {_key: 'abc123'}, 'asset', '_ref']`
 * @alpha
 */
export type StudioPathLike = Path | string

/** @alpha */
export type EditIntentUrl = `/intent/edit/id=${string};type=${string};path=${string}`

/** @internal */
export interface CreateEditUrlOptions {
  baseUrl: string
  projectId: string
  dataset: string
  workspace?: string
  tool?: string
  id: string
  type: string
  path: ContentSourceMapParsedPath
}

/** @alpha */
export interface ResolveEditInfoOptions
  extends Pick<CreateEditUrlOptions, 'projectId' | 'dataset'> {
  studioUrl: StudioUrl | ResolveStudioUrl
  resultSourceMap: ContentSourceMap
  resultPath: ContentSourceMapParsedPath
}

/** @alpha */
export interface ResolveEditUrlOptions extends Omit<ResolveEditInfoOptions, 'resultPath'> {
  resultPath: StudioPathLike
}

/**
 * @alpha
 */
export type ApplySourceDocumentsUpdateFunction = <T = unknown>(
  changedValue: T,
  context: {
    cachedDocument: SanityDocument
    previousValue: T
    sourceDocument: ContentSourceMapDocuments[number]
    sourcePath: ContentSourceMapParsedPath
  },
) => T

/**
 * @internal
 */
export type WalkMapFn = (value: unknown, path: ContentSourceMapParsedPath) => unknown
