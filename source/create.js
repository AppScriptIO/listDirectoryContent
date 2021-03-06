import { constants as filesystemConstants, promises as filesystem } from 'fs'
import path from 'path'

export async function recursiveCreateDirectory({ directoryPath, shouldThrow = true }) {
  await filesystem
    .mkdir(directoryPath)
    .then(() => console.log(`\tCreated directory root ${directoryPath}`))
    .catch(error => {
      if (error.code == 'ENOENT' /* doesn't exist */) {
        // means that the parent directory doesn't exist
        let parentDirectory = path.dirname(directoryPath)
        return recursiveCreateDirectory({ directoryPath: parentDirectory }) // create parent directory
          .then(() => recursiveCreateDirectory({ directoryPath: directoryPath })) // retry creation of nested directory
      } else {
        if (shouldThrow) throw error
      }
    })
}
