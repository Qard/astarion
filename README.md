# Astarion - ELF Format Reader and Writer

A full-featured TypeScript library for reading and writing ELF (Executable and Linkable Format) files. This library provides comprehensive support for both 32-bit and 64-bit ELF files with proper handling of endianness, section headers, program headers, and section data.

## Features

- ✅ **Unified Interface**: Single API for both 32-bit and 64-bit ELF files
- ✅ **Multi-architecture Support**: ARM64, PowerPC, x86-64, x86, and more
- ✅ **Endianness Support**: Both little-endian and big-endian files
- ✅ **Complete ELF Support**: Headers, program headers, section headers, and data
- ✅ **String Table Parsing**: Section name resolution
- ✅ **TypeScript Type Safety**: Comprehensive type definitions with bigint support
- ✅ **Perfect Fidelity**: Byte-for-byte identical read/write operations
- ✅ **Robust Error Handling**: Proper validation and bounds checking
- ✅ **Comprehensive Testing**: Real-world ELF files from multiple architectures
- ✅ **Memory Efficient**: Uses bigint for all numeric fields to support both architectures

## Installation

```bash
npm install astarion
```

## Usage

### Reading an ELF file

```typescript
import { ElfReader } from 'astarion';
import { readFileSync } from 'fs';

// Read an ELF file from disk
const buffer = readFileSync('path/to/executable').buffer;
const reader = new ElfReader(buffer);
const elf = reader.read();

// Check ELF class
if (elf.header.ident.class === ElfClass.ELFCLASS32) {
  console.log('32-bit ELF file');
} else if (elf.header.ident.class === ElfClass.ELFCLASS64) {
  console.log('64-bit ELF file');
}

// Access header information
console.log('Entry point:', elf.header.entry);
console.log('Machine type:', elf.header.machine);
console.log('Number of program headers:', elf.header.phnum);
console.log('Number of section headers:', elf.header.shnum);

// Access section names
for (let i = 0; i < elf.sectionHeaders.length; i++) {
  const sectionName = reader.getSectionName(elf, i);
  console.log(`Section ${i}: ${sectionName}`);
}
```

### Writing an ELF file

```typescript
import { ElfWriter, ElfClass, ElfData, ElfVersion, ElfOsAbi, ElfType, ElfMachine } from 'astarion';

// Create a simple ELF structure
const elf = {
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
    shoff: 1024n,
    flags: 0,
    ehsize: 64,
    phentsize: 56,
    phnum: 1,
    shentsize: 64,
    shnum: 2,
    shstrndx: 1
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
      type: SectionHeaderType.SHT_STRTAB,
      flags: 0n,
      addr: 0n,
      offset: 1024n,
      size: 10n,
      link: 0,
      info: 0,
      addralign: 1n,
      entsize: 0n
    }
  ],
  sectionData: new Map([
    [1, new Uint8Array([0, 46, 115, 104, 115, 116, 114, 0, 0, 0])] // ".shstr\0"
  ])
};

const writer = new ElfWriter();
const buffer = writer.write(elf);

// Write to file
import { writeFileSync } from 'fs';
writeFileSync('output.elf', Buffer.from(buffer));
```


## API Reference

### Classes

#### `ElfReader`

Reads ELF files from ArrayBuffer.

**Constructor:**
- `new ElfReader(buffer: ArrayBuffer)`

**Methods:**
- `read(): Elf` - Parses the ELF file and returns an Elf object
- `getSectionName(elf: Elf, sectionIndex: number): string` - Gets the name of a section by index

#### `ElfWriter`

Writes ELF objects to ArrayBuffer.

**Constructor:**
- `new ElfWriter()`

**Methods:**
- `write(elf: Elf): ArrayBuffer` - Serializes an Elf object to ArrayBuffer

### Types

#### `Elf`

Unified ELF file structure that supports both 32-bit and 64-bit files:
- `header: ElfHeader`
- `programHeaders: ProgramHeader[]`
- `sectionHeaders: SectionHeader[]`
- `sectionData: Map<number, Uint8Array>`

The ELF class (32-bit or 64-bit) is determined by the `header.ident.class` field. All numeric fields use `bigint` to support both architectures seamlessly.

#### `ElfHeader`

Unified ELF header structure for both 32-bit and 64-bit files:
- `ident: ElfIdent`
- `type: ElfType`
- `machine: ElfMachine`
- `version: number`
- `entry: bigint`
- `phoff: bigint`
- `shoff: bigint`
- `flags: number`
- `ehsize: number`
- `phentsize: number`
- `phnum: number`
- `shentsize: number`
- `shnum: number`
- `shstrndx: number`

All address and offset fields use `bigint` to support both 32-bit and 64-bit architectures. The actual size used when reading/writing depends on the ELF class.

#### `ElfIdent`

ELF identification structure:
- `mag0: number` - Magic number byte 0 (0x7f)
- `mag1: number` - Magic number byte 1 (0x45 - 'E')
- `mag2: number` - Magic number byte 2 (0x4c - 'L')
- `mag3: number` - Magic number byte 3 (0x46 - 'F')
- `class: ElfClass` - File class (32-bit or 64-bit)
- `data: ElfData` - Data encoding (little-endian or big-endian)
- `version: ElfVersion` - File version
- `osabi: ElfOsAbi` - Operating system/ABI identification
- `abiversion: number` - ABI version
- `pad: Uint8Array` - Padding bytes

#### `ProgramHeader`

Unified program header structure for both 32-bit and 64-bit files:
- `type: ProgramHeaderType`
- `flags: ProgramHeaderFlags`
- `offset: bigint`
- `vaddr: bigint`
- `paddr: bigint`
- `filesz: bigint`
- `memsz: bigint`
- `align: bigint`

All address and size fields use `bigint` to support both architectures. The actual size used when reading/writing depends on the ELF class.

#### `SectionHeader`

Unified section header structure for both 32-bit and 64-bit files:
- `name: number`
- `type: SectionHeaderType`
- `flags: bigint`
- `addr: bigint`
- `offset: bigint`
- `size: bigint`
- `link: number`
- `info: number`
- `addralign: bigint`
- `entsize: bigint`

All address and size fields use `bigint` to support both architectures. The actual size used when reading/writing depends on the ELF class.

### Enums

#### `ElfClass`

File class identification:
- `ELFCLASSNONE = 0` - Invalid class
- `ELFCLASS32 = 1` - 32-bit objects
- `ELFCLASS64 = 2` - 64-bit objects

#### `ElfData`

Data encoding:
- `ELFDATANONE = 0` - Invalid data encoding
- `ELFDATA2LSB = 1` - Little-endian
- `ELFDATA2MSB = 2` - Big-endian

#### `ElfVersion`

File version:
- `EV_NONE = 0` - Invalid version
- `EV_CURRENT = 1` - Current version

#### `ElfOsAbi`

Operating system/ABI identification:
- `ELFOSABI_NONE = 0` - No extensions or unspecified
- `ELFOSABI_LINUX = 3` - Linux
- `ELFOSABI_FREEBSD = 9` - FreeBSD
- And many more...

#### `ElfType`

Object file type:
- `ET_NONE = 0` - No file type
- `ET_REL = 1` - Relocatable file
- `ET_EXEC = 2` - Executable file
- `ET_DYN = 3` - Shared object file
- `ET_CORE = 4` - Core file

#### `ElfMachine`

Machine architecture:
- `EM_386 = 3` - Intel 80386
- `EM_X86_64 = 62` - AMD x86-64
- `EM_ARM = 40` - ARM
- `EM_AARCH64 = 183` - ARM 64-bit
- And many more...

#### `ProgramHeaderType`

Program header type:
- `PT_NULL = 0` - Unused entry
- `PT_LOAD = 1` - Loadable segment
- `PT_DYNAMIC = 2` - Dynamic linking information
- `PT_INTERP = 3` - Program interpreter
- And more...

#### `ProgramHeaderFlags`

Program header flags:
- `PF_X = 0x1` - Execute permission
- `PF_W = 0x2` - Write permission
- `PF_R = 0x4` - Read permission

#### `SectionHeaderType`

Section header type:
- `SHT_NULL = 0` - Inactive section
- `SHT_PROGBITS = 1` - Program data
- `SHT_SYMTAB = 2` - Symbol table
- `SHT_STRTAB = 3` - String table
- And many more...

#### `SectionHeaderFlags`

Section header flags:
- `SHF_WRITE = 0x1` - Writable
- `SHF_ALLOC = 0x2` - Occupies memory during execution
- `SHF_EXECINSTR = 0x4` - Executable
- And more...

## License

MIT
