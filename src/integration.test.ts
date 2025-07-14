import { equal, ok } from 'node:assert'
import test from 'node:test'
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { execSync } from 'node:child_process'
import {
  ElfReader,
  ElfWriter,
  ElfClass,
  ElfData,
  ElfMachine,
  type Elf
} from './index.js'

// Setup fixtures from GitHub repository
// __dirname in dist/ points to dist/, so we go up one level to project root
const fixturesPath = resolve(__dirname, '../fixtures')
const repoUrl = 'https://github.com/JonathanSalwan/binary-samples.git'

// Only clone if fixtures directory doesn't exist
if (!existsSync(fixturesPath)) {
  console.log('Cloning fixtures from GitHub repository...')
  execSync(`git clone --depth 1 ${repoUrl} ${fixturesPath}`, { stdio: 'inherit' })
  
  // Clean up the git repository files
  rmSync(resolve(fixturesPath, '.git'), { recursive: true, force: true })
} else {
  console.log('Using existing fixtures directory')
}



interface TestFile {
  name: string
  path: string
  expectedClass: ElfClass
  expectedData: ElfData
  expectedMachine: ElfMachine
}

const testFiles: TestFile[] = [
  {
    name: 'ARM64 Linux bash',
    path: resolve(fixturesPath, 'elf-Linux-ARM64-bash'),
    expectedClass: ElfClass.ELFCLASS64,
    expectedData: ElfData.ELFDATA2LSB,
    expectedMachine: ElfMachine.EM_AARCH64
  },
  {
    name: 'PowerPC Linux bash',
    path: resolve(fixturesPath, 'elf-Linux-PowerPC-bash'),
    expectedClass: ElfClass.ELFCLASS32,
    expectedData: ElfData.ELFDATA2MSB,
    expectedMachine: ElfMachine.EM_PPC
  },
  {
    name: 'x86-64 Linux bash',
    path: resolve(fixturesPath, 'elf-Linux-x64-bash'),
    expectedClass: ElfClass.ELFCLASS64,
    expectedData: ElfData.ELFDATA2LSB,
    expectedMachine: ElfMachine.EM_X86_64
  },
  {
    name: 'x86 Linux bash',
    path: resolve(fixturesPath, 'elf-Linux-x86-bash'),
    expectedClass: ElfClass.ELFCLASS32,
    expectedData: ElfData.ELFDATA2LSB,
    expectedMachine: ElfMachine.EM_386
  }
]

function compareBuffers(buf1: ArrayBuffer, buf2: ArrayBuffer): boolean {
  if (buf1.byteLength !== buf2.byteLength) {
    return false
  }

  const view1 = new Uint8Array(buf1)
  const view2 = new Uint8Array(buf2)

  for (let i = 0; i < view1.length; i++) {
    if (view1[i] !== view2[i]) {
      return false
    }
  }

  return true
}

function findFirstDifference(buf1: ArrayBuffer, buf2: ArrayBuffer): number {
  const view1 = new Uint8Array(buf1)
  const view2 = new Uint8Array(buf2)
  const minLen = Math.min(view1.length, view2.length)

  for (let i = 0; i < minLen; i++) {
    if (view1[i] !== view2[i]) {
      return i
    }
  }

  return minLen
}

for (const testFile of testFiles) {
  test(`Read and analyze ${testFile.name}`, () => {
    if (!existsSync(testFile.path)) {
      throw new Error(`Test file not found: ${testFile.path}`)
    }

    const buffer = readFileSync(testFile.path).buffer
    const reader = new ElfReader(buffer)
    const elf = reader.read()

    // Basic header validation
    equal(elf.header.ident.mag0, 0x7f, 'Magic number byte 0')
    equal(elf.header.ident.mag1, 0x45, 'Magic number byte 1')
    equal(elf.header.ident.mag2, 0x4c, 'Magic number byte 2')
    equal(elf.header.ident.mag3, 0x46, 'Magic number byte 3')
    equal(elf.header.ident.class, testFile.expectedClass, 'ELF class')
    equal(elf.header.ident.data, testFile.expectedData, 'Data encoding')
    equal(elf.header.machine, testFile.expectedMachine, 'Machine type')

    // Test ELF class validation
    if (testFile.expectedClass === ElfClass.ELFCLASS32) {
      ok(elf.header.ident.class === ElfClass.ELFCLASS32, 'Should be identified as 32-bit ELF')
    } else {
      ok(elf.header.ident.class === ElfClass.ELFCLASS64, 'Should be identified as 64-bit ELF')
    }

    // Basic structure validation
    ok(elf.programHeaders.length > 0, 'Should have program headers')
    ok(elf.sectionHeaders.length > 0, 'Should have section headers')
    ok(elf.header.phnum === elf.programHeaders.length, 'Program header count should match')
    ok(elf.header.shnum === elf.sectionHeaders.length, 'Section header count should match')

    // Test section name resolution
    for (let i = 0; i < elf.sectionHeaders.length; i++) {
      const sectionName = reader.getSectionName(elf, i)
      ok(typeof sectionName === 'string', `Section ${i} name should be a string`)
    }

    console.log(`${testFile.name}: ${elf.header.phnum} program headers, ${elf.header.shnum} section headers`)
  })

  test(`Read/write equivalency for ${testFile.name}`, () => {
    if (!existsSync(testFile.path)) {
      throw new Error(`Test file not found: ${testFile.path}`)
    }

    const originalBuffer = readFileSync(testFile.path).buffer
    const reader = new ElfReader(originalBuffer)
    const elf = reader.read()

    const writer = new ElfWriter()
    const rewrittenBuffer = writer.write(elf)

    // The rewritten buffer should be valid ELF
    const rewrittenReader = new ElfReader(rewrittenBuffer)
    const rewrittenElf = rewrittenReader.read()

    // Basic header equivalency
    equal(rewrittenElf.header.ident.class, elf.header.ident.class, 'ELF class preserved')
    equal(rewrittenElf.header.ident.data, elf.header.ident.data, 'Data encoding preserved')
    equal(rewrittenElf.header.machine, elf.header.machine, 'Machine type preserved')
    equal(rewrittenElf.header.type, elf.header.type, 'File type preserved')

    // Structure equivalency
    equal(rewrittenElf.programHeaders.length, elf.programHeaders.length, 'Program header count preserved')
    equal(rewrittenElf.sectionHeaders.length, elf.sectionHeaders.length, 'Section header count preserved')

    // Section data equivalency
    equal(rewrittenElf.sectionData.size, elf.sectionData.size, 'Section data count preserved')

    for (const [index, originalData] of elf.sectionData) {
      const rewrittenData = rewrittenElf.sectionData.get(index)
      ok(rewrittenData, `Section ${index} data should exist in rewritten ELF`)
      equal(rewrittenData!.length, originalData.length, `Section ${index} data length should match`)

      // Compare byte by byte
      for (let i = 0; i < originalData.length; i++) {
        equal(rewrittenData![i], originalData[i], `Section ${index} byte ${i} should match`)
      }
    }

    // Test that section names are preserved
    for (let i = 0; i < elf.sectionHeaders.length; i++) {
      const originalName = reader.getSectionName(elf, i)
      const rewrittenName = rewrittenReader.getSectionName(rewrittenElf, i)
      equal(rewrittenName, originalName, `Section ${i} name should be preserved`)
    }

    console.log(`${testFile.name}: Read/write equivalency test passed`)
  })

  test(`Binary equivalency for ${testFile.name}`, () => {
    if (!existsSync(testFile.path)) {
      throw new Error(`Test file not found: ${testFile.path}`)
    }

    const originalBuffer = readFileSync(testFile.path).buffer
    const reader = new ElfReader(originalBuffer)
    const elf = reader.read()

    const writer = new ElfWriter()
    const rewrittenBuffer = writer.write(elf)

    // Write the rewritten buffer to a file for comparison
    const outputPath = testFile.path + '.rewritten'
    writeFileSync(outputPath, Buffer.from(rewrittenBuffer))

    // Compare buffer contents byte-by-byte
    const buffersMatch = compareBuffers(originalBuffer, rewrittenBuffer)

    if (!buffersMatch) {
      const firstDiff = findFirstDifference(originalBuffer, rewrittenBuffer)
      const originalSize = originalBuffer.byteLength
      const rewrittenSize = rewrittenBuffer.byteLength

      console.log(`${testFile.name}: Buffers differ at byte ${firstDiff}`)
      console.log(`Original size: ${originalSize}, Rewritten size: ${rewrittenSize}`)

      // Show context around the first difference
      const view1 = new Uint8Array(originalBuffer)
      const view2 = new Uint8Array(rewrittenBuffer)
      const start = Math.max(0, firstDiff - 5)
      const end = Math.min(Math.min(view1.length, view2.length), firstDiff + 5)

      console.log('Original bytes:', Array.from(view1.slice(start, end)).map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' '))
      console.log('Rewritten bytes:', Array.from(view2.slice(start, end)).map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' '))
    }

    ok(buffersMatch, `${testFile.name}: Rewritten buffer should be byte-for-byte identical to original`)

    const originalSize = originalBuffer.byteLength
    const rewrittenSize = rewrittenBuffer.byteLength

    console.log(`${testFile.name}: Original size: ${originalSize}, Rewritten size: ${rewrittenSize}`)

    // Test that both are valid ELF files
    const originalReader = new ElfReader(originalBuffer)
    const rewrittenReader = new ElfReader(rewrittenBuffer)

    const originalElf = originalReader.read()
    const rewrittenElf = rewrittenReader.read()

    // They should have the same essential structure
    equal(originalElf.header.ident.class, rewrittenElf.header.ident.class, 'ELF class should match')
    equal(originalElf.header.ident.data, rewrittenElf.header.ident.data, 'Data encoding should match')
    equal(originalElf.header.machine, rewrittenElf.header.machine, 'Machine type should match')
    equal(originalElf.header.type, rewrittenElf.header.type, 'File type should match')

    // Both should be readable by our parser
    ok(originalElf.programHeaders.length > 0, 'Original should have program headers')
    ok(rewrittenElf.programHeaders.length > 0, 'Rewritten should have program headers')
    ok(originalElf.sectionHeaders.length > 0, 'Original should have section headers')
    ok(rewrittenElf.sectionHeaders.length > 0, 'Rewritten should have section headers')

    console.log(`${testFile.name}: Binary equivalency test passed (structural)`)
  })
}

test('Cross-architecture compatibility', () => {
  // Test that we can read files from different architectures
  const results: Array<{ name: string; elf: Elf; class: ElfClass; machine: ElfMachine; endian: ElfData }> = []

  for (const testFile of testFiles) {
    if (!existsSync(testFile.path)) {
      continue
    }

    const buffer = readFileSync(testFile.path).buffer
    const reader = new ElfReader(buffer)
    const elf = reader.read()

    results.push({
      name: testFile.name,
      elf,
      class: elf.header.ident.class,
      machine: elf.header.machine,
      endian: elf.header.ident.data
    })
  }

  // Verify we have different architectures
  const classes = new Set(results.map(r => r.class))
  const machines = new Set(results.map(r => r.machine))
  const endians = new Set(results.map(r => r.endian))

  ok(classes.size > 1, 'Should have both 32-bit and 64-bit files')
  ok(machines.size > 1, 'Should have multiple machine types')
  ok(endians.size > 1, 'Should have both little-endian and big-endian files')

  console.log('Cross-architecture compatibility test passed')
  console.log(`Classes: ${Array.from(classes).join(', ')}`)
  console.log(`Machines: ${Array.from(machines).join(', ')}`)
  console.log(`Endians: ${Array.from(endians).join(', ')}`)
})
