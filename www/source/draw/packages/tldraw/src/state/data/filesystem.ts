import type { TDDocument, TDFile } from '~types'
import { fileSave, fileOpen, FileSystemHandle } from './browser-fs-access'
import { get as getFromIdb, set as setToIdb } from 'idb-keyval'

const options = { mode: 'readwrite' as const }

const checkPermissions = async (handle: FileSystemHandle) => {
  return (
    (await handle.queryPermission(options)) === 'granted' ||
    (await handle.requestPermission(options)) === 'granted'
  )
}

export async function loadFileHandle() {
  const fileHandle = await getFromIdb(`Tldraw_file_handle_${window.location.origin}`)
  if (!fileHandle) return null
  return fileHandle
}

export async function saveFileHandle(fileHandle: FileSystemHandle | null) {
  return setToIdb(`Tldraw_file_handle_${window.location.origin}`, fileHandle)
}

export async function saveToFileSystem(document: TDDocument, fileHandle: FileSystemHandle | null) {
  // Create the saved file data
  const file: TDFile = {
    name: document.name || 'New Document',
    fileHandle: fileHandle ?? null,
    document,
    assets: {},
  }

  // Serialize to JSON
  const json = JSON.stringify(file, null, 2)
  console.log(json)
  return;
  // Create blob
  const blob = new Blob([json], {
    type: 'application/vnd.Tldraw+json',
  })

  if (fileHandle) {
    const hasPermissions = await checkPermissions(fileHandle)
    if (!hasPermissions) return null
  }

  // Save to file system
  const newFileHandle = await fileSave(
    blob,
    {
      fileName: `${file.name}.tldr`,
      description: 'Tldraw File',
      extensions: [`.tldr`],
    },
    fileHandle
  )

  await saveFileHandle(newFileHandle)

  // Return true
  return newFileHandle
}

export async function openFromFileSystem(): Promise<null | {
  fileHandle: FileSystemHandle | null
  document: TDDocument
}> {
  // Get the blob
  const blob = await fileOpen({
    description: 'Tldraw File',
    extensions: [`.tldr`],
    multiple: false,
  })

  if (!blob) return null

  // Get JSON from blob
  const json: string = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        resolve(reader.result as string)
      }
    }
    reader.readAsText(blob, 'utf8')
  })

  // Parse
  const file: TDFile = JSON.parse(json)

  const fileHandle = blob.handle ?? null

  await saveFileHandle(fileHandle)

  return {
    fileHandle,
    document: file.document,
  }
}
