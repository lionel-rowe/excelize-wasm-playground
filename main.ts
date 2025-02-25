import { init } from 'npm:excelize-wasm'
import { fromFileUrl } from 'jsr:@std/path'
import { inspectBytes } from 'jsr:@li/custom-inspects'

const wasmUrl = new URL('excelize.wasm.gz', import.meta.resolve('npm:excelize-wasm'))
const wasmPath = fromFileUrl(wasmUrl)

const excelize = await init(wasmPath)

const f = excelize.NewFile()

const { index } = f.NewSheet('Sheet2')

f.SetCellValue('Sheet2', 'A2', 'Hello world.')
f.SetCellValue('Sheet1', 'B2', 100)
f.SetActiveSheet(index)

const { buffer } = f.WriteToBuffer()

Deno.serve(async () => new Response(inspectBytes.call(await new Blob([buffer]).bytes())))
