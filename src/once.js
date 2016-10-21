import fsdb from "@alizain/fsdb"
import requireDir from "./helpers/requireDir"
import { Registry } from "./registry"
import render from "./output/render"
import write from "./output/write"
import views from "./views"
import debug from "debug"
import { inspect } from "util"

const log = debug("coconut")

export async function once(config) {
  if (!config) { return }
  log("Running coconut once")
  try {

    log(`Requiring layout directory from ${config.layoutDir}`)
    await requireDir(config.layoutDir)
    log("Finished requiring layout directory")

    log(`Running fsdb on ${config.dataDir}`)
    let nodeArr = await fsdb(config.dataDir, config)
    log("Finished running fsdb")

    log(`Rendering ${nodeArr.length} nodes`)
    let files = render(nodeArr, Registry, views)
    log("Finished rendering nodes")

    log(`Writing ${files.length} files to ${config.distDir}`)
    await write(config.distDir, files)
    log("Finished writing files")

  } catch (err) {
    throw err
  }
}

export default once
