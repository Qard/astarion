import { equal, deepEqual, ok, throws } from 'node:assert'
import test from 'node:test'
import {
  ElfReader,
  ElfWriter,
  ElfClass,
  ElfData,
  ElfVersion,
  ElfOsAbi,
  ElfType,
  ElfMachine,
  ProgramHeaderType,
  ProgramHeaderFlags,
  SectionHeaderType,
  SectionHeaderFlags,
  type Elf
} from './index.js'

function createTestElf32(): Elf {
  return {
    header: {
      ident: {
        mag0: 0x7f,
        mag1: 0x45,
        mag2: 0x4c,
        mag3: 0x46,
        class: ElfClass.ELFCLASS32,
        data: ElfData.ELFDATA2LSB,
        version: ElfVersion.EV_CURRENT,
        osabi: ElfOsAbi.ELFOSABI_LINUX,
        abiversion: 0,
        pad: new Uint8Array(7)
      },
      type: ElfType.ET_EXEC,
      machine: ElfMachine.EM_386,
      version: 1,
      entry: 0x8048000n,
      phoff: 52n,
      shoff: 1024n,
      flags: 0,
      ehsize: 52,
      phentsize: 32,
      phnum: 2,
      shentsize: 40,
      shnum: 4,
      shstrndx: 3
    },
    programHeaders: [
      {
        type: ProgramHeaderType.PT_LOAD,
        offset: 0n,
        vaddr: 0x8048000n,
        paddr: 0x8048000n,
        filesz: 512n,
        memsz: 512n,
        flags: ProgramHeaderFlags.PF_R | ProgramHeaderFlags.PF_X,
        align: 0x1000n
      },
      {
        type: ProgramHeaderType.PT_LOAD,
        offset: 512n,
        vaddr: 0x8049000n,
        paddr: 0x8049000n,
        filesz: 256n,
        memsz: 256n,
        flags: ProgramHeaderFlags.PF_R | ProgramHeaderFlags.PF_W,
        align: 0x1000n
      }
    ],
    sectionHeaders: [
      {
        name: 0,
        type: SectionHeaderType.SHT_NULL,
        flags: 0n,
        addr: 0n,
        offset: 0n,
        size: 0n,
        link: 0,
        info: 0,
        addralign: 0n,
        entsize: 0n
      },
      {
        name: 1,
        type: SectionHeaderType.SHT_PROGBITS,
        flags: BigInt(SectionHeaderFlags.SHF_ALLOC | SectionHeaderFlags.SHF_EXECINSTR),
        addr: 0x8048000n,
        offset: 1184n,
        size: 512n,
        link: 0,
        info: 0,
        addralign: 16n,
        entsize: 0n
      },
      {
        name: 7,
        type: SectionHeaderType.SHT_PROGBITS,
        flags: BigInt(SectionHeaderFlags.SHF_ALLOC | SectionHeaderFlags.SHF_WRITE),
        addr: 0x8049000n,
        offset: 1696n,
        size: 256n,
        link: 0,
        info: 0,
        addralign: 4n,
        entsize: 0n
      },
      {
        name: 13,
        type: SectionHeaderType.SHT_STRTAB,
        flags: 0n,
        addr: 0n,
        offset: 1952n,
        size: 20n,
        link: 0,
        info: 0,
        addralign: 1n,
        entsize: 0n
      }
    ],
    sectionData: new Map([
      [1, new Uint8Array(512).fill(0x90)],
      [2, new Uint8Array(256).fill(0)],
      [3, new Uint8Array([0, 46, 116, 101, 120, 116, 0, 46, 100, 97, 116, 97, 0, 46, 115, 104, 115, 116, 114, 0])]
    ])
  }
}

function createTestElf64(): Elf {
  return {
    header: {
      ident: {
        mag0: 0x7f,
        mag1: 0x45,
        mag2: 0x4c,
        mag3: 0x46,
        class: ElfClass.ELFCLASS64,
        data: ElfData.ELFDATA2LSB,
        version: ElfVersion.EV_CURRENT,
        osabi: ElfOsAbi.ELFOSABI_LINUX,
        abiversion: 0,
        pad: new Uint8Array(7)
      },
      type: ElfType.ET_EXEC,
      machine: ElfMachine.EM_X86_64,
      version: 1,
      entry: 0x400000n,
      phoff: 64n,
      shoff: 2048n,
      flags: 0,
      ehsize: 64,
      phentsize: 56,
      phnum: 2,
      shentsize: 64,
      shnum: 4,
      shstrndx: 3
    },
    programHeaders: [
      {
        type: ProgramHeaderType.PT_LOAD,
        flags: ProgramHeaderFlags.PF_R | ProgramHeaderFlags.PF_X,
        offset: 0n,
        vaddr: 0x400000n,
        paddr: 0x400000n,
        filesz: 1024n,
        memsz: 1024n,
        align: 0x200000n
      },
      {
        type: ProgramHeaderType.PT_LOAD,
        flags: ProgramHeaderFlags.PF_R | ProgramHeaderFlags.PF_W,
        offset: 1024n,
        vaddr: 0x600000n,
        paddr: 0x600000n,
        filesz: 512n,
        memsz: 512n,
        align: 0x200000n
      }
    ],
    sectionHeaders: [
      {
        name: 0,
        type: SectionHeaderType.SHT_NULL,
        flags: 0n,
        addr: 0n,
        offset: 0n,
        size: 0n,
        link: 0,
        info: 0,
        addralign: 0n,
        entsize: 0n
      },
      {
        name: 1,
        type: SectionHeaderType.SHT_PROGBITS,
        flags: BigInt(SectionHeaderFlags.SHF_ALLOC | SectionHeaderFlags.SHF_EXECINSTR),
        addr: 0x400000n,
        offset: 2304n,
        size: 1024n,
        link: 0,
        info: 0,
        addralign: 16n,
        entsize: 0n
      },
      {
        name: 7,
        type: SectionHeaderType.SHT_PROGBITS,
        flags: BigInt(SectionHeaderFlags.SHF_ALLOC | SectionHeaderFlags.SHF_WRITE),
        addr: 0x600000n,
        offset: 3328n,
        size: 512n,
        link: 0,
        info: 0,
        addralign: 8n,
        entsize: 0n
      },
      {
        name: 13,
        type: SectionHeaderType.SHT_STRTAB,
        flags: 0n,
        addr: 0n,
        offset: 3840n,
        size: 20n,
        link: 0,
        info: 0,
        addralign: 1n,
        entsize: 0n
      }
    ],
    sectionData: new Map([
      [1, new Uint8Array(1024).fill(0x90)],
      [2, new Uint8Array(512).fill(0)],
      [3, new Uint8Array([0, 46, 116, 101, 120, 116, 0, 46, 100, 97, 116, 97, 0, 46, 115, 104, 115, 116, 114, 0])]
    ])
  }
}

test('ElfWriter and ElfReader for 32-bit ELF', () => {
  const originalElf = createTestElf32()
  const writer = new ElfWriter()
  const buffer = writer.write(originalElf)
  
  const reader = new ElfReader(buffer)
  const parsedElf = reader.read()
  
  ok(parsedElf.header.ident.class === ElfClass.ELFCLASS32, 'Should be identified as 32-bit ELF')
  equal(parsedElf.header.ident.class, ElfClass.ELFCLASS32)
  equal(parsedElf.header.type, originalElf.header.type)
  equal(parsedElf.header.machine, originalElf.header.machine)
  equal(parsedElf.header.entry, originalElf.header.entry)
  equal(parsedElf.programHeaders.length, originalElf.programHeaders.length)
  equal(parsedElf.sectionHeaders.length, originalElf.sectionHeaders.length)
})

test('ElfWriter and ElfReader for 64-bit ELF', () => {
  const originalElf = createTestElf64()
  const writer = new ElfWriter()
  const buffer = writer.write(originalElf)
  
  const reader = new ElfReader(buffer)
  const parsedElf = reader.read()
  
  ok(parsedElf.header.ident.class === ElfClass.ELFCLASS64, 'Should be identified as 64-bit ELF')
  equal(parsedElf.header.ident.class, ElfClass.ELFCLASS64)
  equal(parsedElf.header.type, originalElf.header.type)
  equal(parsedElf.header.machine, originalElf.header.machine)
  equal(parsedElf.header.entry, originalElf.header.entry)
  equal(parsedElf.programHeaders.length, originalElf.programHeaders.length)
  equal(parsedElf.sectionHeaders.length, originalElf.sectionHeaders.length)
})

test('ElfReader throws on invalid magic number', () => {
  const buffer = new ArrayBuffer(64)
  const view = new DataView(buffer)
  view.setUint8(0, 0x00)
  view.setUint8(1, 0x00)
  view.setUint8(2, 0x00)
  view.setUint8(3, 0x00)
  
  const reader = new ElfReader(buffer)
  throws(() => reader.read(), /Invalid ELF magic number/)
})

test('ElfReader throws on invalid ELF class', () => {
  const buffer = new ArrayBuffer(64)
  const view = new DataView(buffer)
  view.setUint8(0, 0x7f)
  view.setUint8(1, 0x45)
  view.setUint8(2, 0x4c)
  view.setUint8(3, 0x46)
  view.setUint8(4, 99)
  
  const reader = new ElfReader(buffer)
  throws(() => reader.read(), /Invalid ELF class/)
})

test('Section data handling', () => {
  const elf = createTestElf32()
  const writer = new ElfWriter()
  const buffer = writer.write(elf)
  
  const reader = new ElfReader(buffer)
  const parsedElf = reader.read()
  
  equal(parsedElf.sectionData.size, 3, 'Should have correct number of section data')
  
  const textData = parsedElf.sectionData.get(1)
  ok(textData, 'Should have text section data')
  equal(textData!.length, 512, 'Text section should have correct size')
  equal(textData![0], 0x90, 'Text section should have correct content')
  
  const dataData = parsedElf.sectionData.get(2)
  ok(dataData, 'Should have data section data')
  equal(dataData!.length, 256, 'Data section should have correct size')
  
  const strTabData = parsedElf.sectionData.get(3)
  ok(strTabData, 'Should have string table data')
  equal(strTabData!.length, 20, 'String table should have correct size')
})

test('getSectionName', () => {
  const elf = createTestElf32()
  const writer = new ElfWriter()
  const buffer = writer.write(elf)
  
  const reader = new ElfReader(buffer)
  const parsedElf = reader.read()
  
  equal(reader.getSectionName(parsedElf, 0), '', 'NULL section should have empty name')
  equal(reader.getSectionName(parsedElf, 1), '.text', 'Text section should have correct name')
  equal(reader.getSectionName(parsedElf, 2), '.data', 'Data section should have correct name')
  equal(reader.getSectionName(parsedElf, 3), '.shstr', 'String table section should have correct name')
})

test('Big-endian support', () => {
  const elf = createTestElf32()
  elf.header.ident.data = ElfData.ELFDATA2MSB
  
  const writer = new ElfWriter()
  const buffer = writer.write(elf)
  
  const reader = new ElfReader(buffer)
  const parsedElf = reader.read()
  
  equal(parsedElf.header.ident.data, ElfData.ELFDATA2MSB, 'Should preserve endianness')
  equal(parsedElf.header.type, elf.header.type, 'Should correctly parse big-endian values')
})

test('Program header layout', () => {
  const elf = createTestElf32()
  const writer = new ElfWriter()
  const buffer = writer.write(elf)
  
  const reader = new ElfReader(buffer)
  const parsedElf = reader.read()
  
  if (parsedElf.header.ident.class === ElfClass.ELFCLASS32) {
    const ph1 = parsedElf.programHeaders[0]
    equal(ph1.type, ProgramHeaderType.PT_LOAD)
    equal(ph1.vaddr, 0x8048000n)
    equal(ph1.filesz, 512n)
    equal(ph1.flags, ProgramHeaderFlags.PF_R | ProgramHeaderFlags.PF_X)
    
    const ph2 = parsedElf.programHeaders[1]
    equal(ph2.type, ProgramHeaderType.PT_LOAD)
    equal(ph2.vaddr, 0x8049000n)
    equal(ph2.filesz, 256n)
    equal(ph2.flags, ProgramHeaderFlags.PF_R | ProgramHeaderFlags.PF_W)
  }
})

test('Section header layout', () => {
  const elf = createTestElf64()
  const writer = new ElfWriter()
  const buffer = writer.write(elf)
  
  const reader = new ElfReader(buffer)
  const parsedElf = reader.read()
  
  if (parsedElf.header.ident.class === ElfClass.ELFCLASS64) {
    const sh1 = parsedElf.sectionHeaders[1]
    equal(sh1.type, SectionHeaderType.SHT_PROGBITS)
    equal(sh1.addr, 0x400000n)
    equal(sh1.size, 1024n)
    equal(sh1.flags, BigInt(SectionHeaderFlags.SHF_ALLOC | SectionHeaderFlags.SHF_EXECINSTR))
    
    const sh2 = parsedElf.sectionHeaders[2]
    equal(sh2.type, SectionHeaderType.SHT_PROGBITS)
    equal(sh2.addr, 0x600000n)
    equal(sh2.size, 512n)
    equal(sh2.flags, BigInt(SectionHeaderFlags.SHF_ALLOC | SectionHeaderFlags.SHF_WRITE))
  }
})

test('Empty section handling', () => {
  const elf = createTestElf32()
  elf.sectionHeaders.push({
    name: 20,
    type: SectionHeaderType.SHT_NOBITS,
    flags: BigInt(SectionHeaderFlags.SHF_ALLOC | SectionHeaderFlags.SHF_WRITE),
    addr: 0x804a000n,
    offset: 2000n,
    size: 1024n,
    link: 0,
    info: 0,
    addralign: 4n,
    entsize: 0n
  })
  elf.header.shnum = 5
  elf.header.shoff = 1200n
  
  const writer = new ElfWriter()
  const buffer = writer.write(elf)
  
  const reader = new ElfReader(buffer)
  const parsedElf = reader.read()
  
  equal(parsedElf.sectionHeaders.length, 5)
  ok(!parsedElf.sectionData.has(4), 'NOBITS section should not have data')
})

test('ELF class detection', () => {
  const elf32 = createTestElf32()
  const elf64 = createTestElf64()
  
  equal(elf32.header.ident.class, ElfClass.ELFCLASS32, 'ELF32 should have correct class')
  equal(elf64.header.ident.class, ElfClass.ELFCLASS64, 'ELF64 should have correct class')
})