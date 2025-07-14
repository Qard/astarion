export const ElfClass = {
  ELFCLASSNONE: 0,
  ELFCLASS32: 1,
  ELFCLASS64: 2
} as const

export type ElfClass = typeof ElfClass[keyof typeof ElfClass]

export const ElfData = {
  ELFDATANONE: 0,
  ELFDATA2LSB: 1,
  ELFDATA2MSB: 2
} as const

export type ElfData = typeof ElfData[keyof typeof ElfData]

export const ElfVersion = {
  EV_NONE: 0,
  EV_CURRENT: 1
} as const

export type ElfVersion = typeof ElfVersion[keyof typeof ElfVersion]

export const ElfOsAbi = {
  ELFOSABI_NONE: 0,
  ELFOSABI_HPUX: 1,
  ELFOSABI_NETBSD: 2,
  ELFOSABI_LINUX: 3,
  ELFOSABI_SOLARIS: 6,
  ELFOSABI_AIX: 7,
  ELFOSABI_IRIX: 8,
  ELFOSABI_FREEBSD: 9,
  ELFOSABI_TRU64: 10,
  ELFOSABI_MODESTO: 11,
  ELFOSABI_OPENBSD: 12,
  ELFOSABI_ARM: 97,
  ELFOSABI_STANDALONE: 255
} as const

export type ElfOsAbi = typeof ElfOsAbi[keyof typeof ElfOsAbi]

export const ElfType = {
  ET_NONE: 0,
  ET_REL: 1,
  ET_EXEC: 2,
  ET_DYN: 3,
  ET_CORE: 4,
  ET_LOOS: 0xfe00,
  ET_HIOS: 0xfeff,
  ET_LOPROC: 0xff00,
  ET_HIPROC: 0xffff
} as const

export type ElfType = typeof ElfType[keyof typeof ElfType]

export const ElfMachine = {
  EM_NONE: 0,
  EM_M32: 1,
  EM_SPARC: 2,
  EM_386: 3,
  EM_68K: 4,
  EM_88K: 5,
  EM_860: 7,
  EM_MIPS: 8,
  EM_S370: 9,
  EM_MIPS_RS3_LE: 10,
  EM_PARISC: 15,
  EM_VPP500: 17,
  EM_SPARC32PLUS: 18,
  EM_960: 19,
  EM_PPC: 20,
  EM_PPC64: 21,
  EM_S390: 22,
  EM_V800: 36,
  EM_FR20: 37,
  EM_RH32: 38,
  EM_RCE: 39,
  EM_ARM: 40,
  EM_ALPHA: 41,
  EM_SH: 42,
  EM_SPARCV9: 43,
  EM_TRICORE: 44,
  EM_ARC: 45,
  EM_H8_300: 46,
  EM_H8_300H: 47,
  EM_H8S: 48,
  EM_H8_500: 49,
  EM_IA_64: 50,
  EM_MIPS_X: 51,
  EM_COLDFIRE: 52,
  EM_68HC12: 53,
  EM_MMA: 54,
  EM_PCP: 55,
  EM_NCPU: 56,
  EM_NDR1: 57,
  EM_STARCORE: 58,
  EM_ME16: 59,
  EM_ST100: 60,
  EM_TINYJ: 61,
  EM_X86_64: 62,
  EM_PDSP: 63,
  EM_FX66: 66,
  EM_ST9PLUS: 67,
  EM_ST7: 68,
  EM_68HC16: 69,
  EM_68HC11: 70,
  EM_68HC08: 71,
  EM_68HC05: 72,
  EM_SVX: 73,
  EM_ST19: 74,
  EM_VAX: 75,
  EM_CRIS: 76,
  EM_JAVELIN: 77,
  EM_FIREPATH: 78,
  EM_ZSP: 79,
  EM_MMIX: 80,
  EM_HUANY: 81,
  EM_PRISM: 82,
  EM_AVR: 83,
  EM_FR30: 84,
  EM_D10V: 85,
  EM_D30V: 86,
  EM_V850: 87,
  EM_M32R: 88,
  EM_MN10300: 89,
  EM_MN10200: 90,
  EM_PJ: 91,
  EM_OPENRISC: 92,
  EM_ARC_A5: 93,
  EM_XTENSA: 94,
  EM_AARCH64: 183,
  EM_TILEPRO: 188,
  EM_MICROBLAZE: 189,
  EM_TILEGX: 191
} as const

export type ElfMachine = typeof ElfMachine[keyof typeof ElfMachine]

export const ProgramHeaderType = {
  PT_NULL: 0,
  PT_LOAD: 1,
  PT_DYNAMIC: 2,
  PT_INTERP: 3,
  PT_NOTE: 4,
  PT_SHLIB: 5,
  PT_PHDR: 6,
  PT_TLS: 7,
  PT_LOOS: 0x60000000,
  PT_HIOS: 0x6fffffff,
  PT_LOPROC: 0x70000000,
  PT_HIPROC: 0x7fffffff
} as const

export type ProgramHeaderType = typeof ProgramHeaderType[keyof typeof ProgramHeaderType]

export const ProgramHeaderFlags = {
  PF_X: 0x1,
  PF_W: 0x2,
  PF_R: 0x4,
  PF_MASKOS: 0x0ff00000,
  PF_MASKPROC: 0xf0000000
} as const

export type ProgramHeaderFlags = number

export const SectionHeaderType = {
  SHT_NULL: 0,
  SHT_PROGBITS: 1,
  SHT_SYMTAB: 2,
  SHT_STRTAB: 3,
  SHT_RELA: 4,
  SHT_HASH: 5,
  SHT_DYNAMIC: 6,
  SHT_NOTE: 7,
  SHT_NOBITS: 8,
  SHT_REL: 9,
  SHT_SHLIB: 10,
  SHT_DYNSYM: 11,
  SHT_INIT_ARRAY: 14,
  SHT_FINI_ARRAY: 15,
  SHT_PREINIT_ARRAY: 16,
  SHT_GROUP: 17,
  SHT_SYMTAB_SHNDX: 18,
  SHT_LOOS: 0x60000000,
  SHT_HIOS: 0x6fffffff,
  SHT_LOPROC: 0x70000000,
  SHT_HIPROC: 0x7fffffff,
  SHT_LOUSER: 0x80000000,
  SHT_HIUSER: 0xffffffff
} as const

export type SectionHeaderType = typeof SectionHeaderType[keyof typeof SectionHeaderType]

export const SectionHeaderFlags = {
  SHF_WRITE: 0x1,
  SHF_ALLOC: 0x2,
  SHF_EXECINSTR: 0x4,
  SHF_MERGE: 0x10,
  SHF_STRINGS: 0x20,
  SHF_INFO_LINK: 0x40,
  SHF_LINK_ORDER: 0x80,
  SHF_OS_NONCONFORMING: 0x100,
  SHF_GROUP: 0x200,
  SHF_TLS: 0x400,
  SHF_MASKOS: 0x0ff00000,
  SHF_MASKPROC: 0xf0000000
} as const

export type SectionHeaderFlags = number

export interface ElfIdent {
  mag0: number;
  mag1: number;
  mag2: number;
  mag3: number;
  class: ElfClass;
  data: ElfData;
  version: ElfVersion;
  osabi: ElfOsAbi;
  abiversion: number;
  pad: Uint8Array;
}

export interface ElfHeader {
  ident: ElfIdent;
  type: ElfType;
  machine: ElfMachine;
  version: number;
  entry: bigint;
  phoff: bigint;
  shoff: bigint;
  flags: number;
  ehsize: number;
  phentsize: number;
  phnum: number;
  shentsize: number;
  shnum: number;
  shstrndx: number;
}

export interface ProgramHeader {
  type: ProgramHeaderType;
  flags: ProgramHeaderFlags;
  offset: bigint;
  vaddr: bigint;
  paddr: bigint;
  filesz: bigint;
  memsz: bigint;
  align: bigint;
}

export interface SectionHeader {
  name: number;
  type: SectionHeaderType;
  flags: bigint;
  addr: bigint;
  offset: bigint;
  size: bigint;
  link: number;
  info: number;
  addralign: bigint;
  entsize: bigint;
}

export interface Elf {
  header: ElfHeader;
  programHeaders: ProgramHeader[];
  sectionHeaders: SectionHeader[];
  sectionData: Map<number, Uint8Array>;
}

export class ElfReader {
  private buffer: DataView;
  private littleEndian: boolean;
  private elfClass: ElfClass;

  constructor(buffer: ArrayBuffer) {
    this.buffer = new DataView(buffer);
    this.littleEndian = true;
    this.elfClass = ElfClass.ELFCLASSNONE;
  }

  read(): Elf {
    const ident = this.readIdent();
    this.littleEndian = ident.data === ElfData.ELFDATA2LSB;
    this.elfClass = ident.class;

    if (this.elfClass !== ElfClass.ELFCLASS32 && this.elfClass !== ElfClass.ELFCLASS64) {
      throw new Error('Invalid ELF class');
    }

    const header = this.readHeader(ident);
    const programHeaders = this.readProgramHeaders(header);
    const sectionHeaders = this.readSectionHeaders(header);
    const sectionData = this.readSectionData(sectionHeaders);

    return {
      header,
      programHeaders,
      sectionHeaders,
      sectionData
    };
  }

  private readIdent(): ElfIdent {
    const mag0 = this.buffer.getUint8(0);
    const mag1 = this.buffer.getUint8(1);
    const mag2 = this.buffer.getUint8(2);
    const mag3 = this.buffer.getUint8(3);

    if (mag0 !== 0x7f || mag1 !== 0x45 || mag2 !== 0x4c || mag3 !== 0x46) {
      throw new Error('Invalid ELF magic number');
    }

    const pad = new Uint8Array(7);
    for (let i = 0; i < 7; i++) {
      pad[i] = this.buffer.getUint8(9 + i);
    }

    return {
      mag0,
      mag1,
      mag2,
      mag3,
      class: this.buffer.getUint8(4) as ElfClass,
      data: this.buffer.getUint8(5) as ElfData,
      version: this.buffer.getUint8(6) as ElfVersion,
      osabi: this.buffer.getUint8(7) as ElfOsAbi,
      abiversion: this.buffer.getUint8(8),
      pad
    };
  }

  private readHeader(ident: ElfIdent): ElfHeader {
    const is32Bit = this.elfClass === ElfClass.ELFCLASS32;

    return {
      ident,
      type: this.buffer.getUint16(16, this.littleEndian) as ElfType,
      machine: this.buffer.getUint16(18, this.littleEndian) as ElfMachine,
      version: this.buffer.getUint32(20, this.littleEndian),
      entry: is32Bit ? BigInt(this.buffer.getUint32(24, this.littleEndian)) : this.buffer.getBigUint64(24, this.littleEndian),
      phoff: is32Bit ? BigInt(this.buffer.getUint32(28, this.littleEndian)) : this.buffer.getBigUint64(32, this.littleEndian),
      shoff: is32Bit ? BigInt(this.buffer.getUint32(32, this.littleEndian)) : this.buffer.getBigUint64(40, this.littleEndian),
      flags: this.buffer.getUint32(is32Bit ? 36 : 48, this.littleEndian),
      ehsize: this.buffer.getUint16(is32Bit ? 40 : 52, this.littleEndian),
      phentsize: this.buffer.getUint16(is32Bit ? 42 : 54, this.littleEndian),
      phnum: this.buffer.getUint16(is32Bit ? 44 : 56, this.littleEndian),
      shentsize: this.buffer.getUint16(is32Bit ? 46 : 58, this.littleEndian),
      shnum: this.buffer.getUint16(is32Bit ? 48 : 60, this.littleEndian),
      shstrndx: this.buffer.getUint16(is32Bit ? 50 : 62, this.littleEndian)
    };
  }

  private readProgramHeaders(header: ElfHeader): ProgramHeader[] {
    const headers: ProgramHeader[] = [];
    const offset = Number(header.phoff);
    const is32Bit = this.elfClass === ElfClass.ELFCLASS32;

    for (let i = 0; i < header.phnum; i++) {
      const base = offset + i * header.phentsize;

      if (is32Bit) {
        headers.push({
          type: this.buffer.getUint32(base, this.littleEndian) as ProgramHeaderType,
          flags: this.buffer.getUint32(base + 24, this.littleEndian) as ProgramHeaderFlags,
          offset: BigInt(this.buffer.getUint32(base + 4, this.littleEndian)),
          vaddr: BigInt(this.buffer.getUint32(base + 8, this.littleEndian)),
          paddr: BigInt(this.buffer.getUint32(base + 12, this.littleEndian)),
          filesz: BigInt(this.buffer.getUint32(base + 16, this.littleEndian)),
          memsz: BigInt(this.buffer.getUint32(base + 20, this.littleEndian)),
          align: BigInt(this.buffer.getUint32(base + 28, this.littleEndian))
        });
      } else {
        headers.push({
          type: this.buffer.getUint32(base, this.littleEndian) as ProgramHeaderType,
          flags: this.buffer.getUint32(base + 4, this.littleEndian) as ProgramHeaderFlags,
          offset: this.buffer.getBigUint64(base + 8, this.littleEndian),
          vaddr: this.buffer.getBigUint64(base + 16, this.littleEndian),
          paddr: this.buffer.getBigUint64(base + 24, this.littleEndian),
          filesz: this.buffer.getBigUint64(base + 32, this.littleEndian),
          memsz: this.buffer.getBigUint64(base + 40, this.littleEndian),
          align: this.buffer.getBigUint64(base + 48, this.littleEndian)
        });
      }
    }

    return headers;
  }

  private readSectionHeaders(header: ElfHeader): SectionHeader[] {
    const headers: SectionHeader[] = [];
    const offset = Number(header.shoff);
    const is32Bit = this.elfClass === ElfClass.ELFCLASS32;

    for (let i = 0; i < header.shnum; i++) {
      const base = offset + i * header.shentsize;

      if (is32Bit) {
        headers.push({
          name: this.buffer.getUint32(base, this.littleEndian),
          type: this.buffer.getUint32(base + 4, this.littleEndian) as SectionHeaderType,
          flags: BigInt(this.buffer.getUint32(base + 8, this.littleEndian)),
          addr: BigInt(this.buffer.getUint32(base + 12, this.littleEndian)),
          offset: BigInt(this.buffer.getUint32(base + 16, this.littleEndian)),
          size: BigInt(this.buffer.getUint32(base + 20, this.littleEndian)),
          link: this.buffer.getUint32(base + 24, this.littleEndian),
          info: this.buffer.getUint32(base + 28, this.littleEndian),
          addralign: BigInt(this.buffer.getUint32(base + 32, this.littleEndian)),
          entsize: BigInt(this.buffer.getUint32(base + 36, this.littleEndian))
        });
      } else {
        headers.push({
          name: this.buffer.getUint32(base, this.littleEndian),
          type: this.buffer.getUint32(base + 4, this.littleEndian) as SectionHeaderType,
          flags: this.buffer.getBigUint64(base + 8, this.littleEndian),
          addr: this.buffer.getBigUint64(base + 16, this.littleEndian),
          offset: this.buffer.getBigUint64(base + 24, this.littleEndian),
          size: this.buffer.getBigUint64(base + 32, this.littleEndian),
          link: this.buffer.getUint32(base + 40, this.littleEndian),
          info: this.buffer.getUint32(base + 44, this.littleEndian),
          addralign: this.buffer.getBigUint64(base + 48, this.littleEndian),
          entsize: this.buffer.getBigUint64(base + 56, this.littleEndian)
        });
      }
    }

    return headers;
  }

  private readSectionData(headers: SectionHeader[]): Map<number, Uint8Array> {
    const data = new Map<number, Uint8Array>();

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      if (header.type !== SectionHeaderType.SHT_NOBITS && header.size > 0n) {
        const offset = Number(header.offset);
        const size = Number(header.size);
        if (offset + size <= this.buffer.byteLength) {
          const sectionData = new Uint8Array(size);
          for (let j = 0; j < size; j++) {
            sectionData[j] = this.buffer.getUint8(offset + j);
          }
          data.set(i, sectionData);
        }
      }
    }

    return data;
  }

  getSectionName(elf: Elf, sectionIndex: number): string {
    const shstrndx = elf.header.shstrndx;
    const stringTableData = elf.sectionData.get(shstrndx);
    if (!stringTableData) {
      return '';
    }

    const nameOffset = elf.sectionHeaders[sectionIndex].name;
    let end = nameOffset;
    while (end < stringTableData.length && stringTableData[end] !== 0) {
      end++;
    }

    return new TextDecoder().decode(stringTableData.slice(nameOffset, end));
  }
}

export class ElfWriter {
  write(elf: Elf): ArrayBuffer {
    const is32Bit = elf.header.ident.class === ElfClass.ELFCLASS32;
    const littleEndian = elf.header.ident.data === ElfData.ELFDATA2LSB;
    const totalSize = this.calculateSize(elf);
    const buffer = new ArrayBuffer(totalSize);
    const view = new DataView(buffer);

    this.writeIdent(view, elf.header.ident);
    this.writeHeader(view, elf.header, is32Bit, littleEndian);
    this.writeProgramHeaders(view, elf.header, elf.programHeaders, is32Bit, littleEndian);
    this.writeSectionHeaders(view, elf.header, elf.sectionHeaders, is32Bit, littleEndian);
    this.writeSectionData(view, elf.sectionHeaders, elf.sectionData);

    return buffer;
  }

  private writeIdent(view: DataView, ident: ElfIdent): void {
    view.setUint8(0, ident.mag0);
    view.setUint8(1, ident.mag1);
    view.setUint8(2, ident.mag2);
    view.setUint8(3, ident.mag3);
    view.setUint8(4, ident.class);
    view.setUint8(5, ident.data);
    view.setUint8(6, ident.version);
    view.setUint8(7, ident.osabi);
    view.setUint8(8, ident.abiversion);

    for (let i = 0; i < 7; i++) {
      view.setUint8(9 + i, ident.pad[i]);
    }
  }

  private writeHeader(view: DataView, header: ElfHeader, is32Bit: boolean, littleEndian: boolean): void {
    view.setUint16(16, header.type, littleEndian);
    view.setUint16(18, header.machine, littleEndian);
    view.setUint32(20, header.version, littleEndian);

    if (is32Bit) {
      view.setUint32(24, Number(header.entry), littleEndian);
      view.setUint32(28, Number(header.phoff), littleEndian);
      view.setUint32(32, Number(header.shoff), littleEndian);
      view.setUint32(36, header.flags, littleEndian);
      view.setUint16(40, header.ehsize, littleEndian);
      view.setUint16(42, header.phentsize, littleEndian);
      view.setUint16(44, header.phnum, littleEndian);
      view.setUint16(46, header.shentsize, littleEndian);
      view.setUint16(48, header.shnum, littleEndian);
      view.setUint16(50, header.shstrndx, littleEndian);
    } else {
      view.setBigUint64(24, header.entry, littleEndian);
      view.setBigUint64(32, header.phoff, littleEndian);
      view.setBigUint64(40, header.shoff, littleEndian);
      view.setUint32(48, header.flags, littleEndian);
      view.setUint16(52, header.ehsize, littleEndian);
      view.setUint16(54, header.phentsize, littleEndian);
      view.setUint16(56, header.phnum, littleEndian);
      view.setUint16(58, header.shentsize, littleEndian);
      view.setUint16(60, header.shnum, littleEndian);
      view.setUint16(62, header.shstrndx, littleEndian);
    }
  }

  private writeProgramHeaders(view: DataView, header: ElfHeader, pHeaders: ProgramHeader[], is32Bit: boolean, littleEndian: boolean): void {
    const offset = Number(header.phoff);

    for (let i = 0; i < pHeaders.length; i++) {
      const base = offset + i * header.phentsize;
      const ph = pHeaders[i];

      if (is32Bit) {
        view.setUint32(base, ph.type, littleEndian);
        view.setUint32(base + 4, Number(ph.offset), littleEndian);
        view.setUint32(base + 8, Number(ph.vaddr), littleEndian);
        view.setUint32(base + 12, Number(ph.paddr), littleEndian);
        view.setUint32(base + 16, Number(ph.filesz), littleEndian);
        view.setUint32(base + 20, Number(ph.memsz), littleEndian);
        view.setUint32(base + 24, ph.flags, littleEndian);
        view.setUint32(base + 28, Number(ph.align), littleEndian);
      } else {
        view.setUint32(base, ph.type, littleEndian);
        view.setUint32(base + 4, ph.flags, littleEndian);
        view.setBigUint64(base + 8, ph.offset, littleEndian);
        view.setBigUint64(base + 16, ph.vaddr, littleEndian);
        view.setBigUint64(base + 24, ph.paddr, littleEndian);
        view.setBigUint64(base + 32, ph.filesz, littleEndian);
        view.setBigUint64(base + 40, ph.memsz, littleEndian);
        view.setBigUint64(base + 48, ph.align, littleEndian);
      }
    }
  }

  private writeSectionHeaders(view: DataView, header: ElfHeader, sHeaders: SectionHeader[], is32Bit: boolean, littleEndian: boolean): void {
    const offset = Number(header.shoff);

    for (let i = 0; i < sHeaders.length; i++) {
      const base = offset + i * header.shentsize;
      const sh = sHeaders[i];

      if (is32Bit) {
        view.setUint32(base, sh.name, littleEndian);
        view.setUint32(base + 4, sh.type, littleEndian);
        view.setUint32(base + 8, Number(sh.flags), littleEndian);
        view.setUint32(base + 12, Number(sh.addr), littleEndian);
        view.setUint32(base + 16, Number(sh.offset), littleEndian);
        view.setUint32(base + 20, Number(sh.size), littleEndian);
        view.setUint32(base + 24, sh.link, littleEndian);
        view.setUint32(base + 28, sh.info, littleEndian);
        view.setUint32(base + 32, Number(sh.addralign), littleEndian);
        view.setUint32(base + 36, Number(sh.entsize), littleEndian);
      } else {
        view.setUint32(base, sh.name, littleEndian);
        view.setUint32(base + 4, sh.type, littleEndian);
        view.setBigUint64(base + 8, sh.flags, littleEndian);
        view.setBigUint64(base + 16, sh.addr, littleEndian);
        view.setBigUint64(base + 24, sh.offset, littleEndian);
        view.setBigUint64(base + 32, sh.size, littleEndian);
        view.setUint32(base + 40, sh.link, littleEndian);
        view.setUint32(base + 44, sh.info, littleEndian);
        view.setBigUint64(base + 48, sh.addralign, littleEndian);
        view.setBigUint64(base + 56, sh.entsize, littleEndian);
      }
    }
  }

  private writeSectionData(view: DataView, headers: SectionHeader[], data: Map<number, Uint8Array>): void {
    for (const [index, sectionData] of data) {
      const header = headers[index];
      const offset = Number(header.offset);

      for (let i = 0; i < sectionData.length; i++) {
        view.setUint8(offset + i, sectionData[i]);
      }
    }
  }

  private calculateSize(elf: Elf): number {
    const is32Bit = elf.header.ident.class === ElfClass.ELFCLASS32;
    let maxOffset = is32Bit ? 52 : 64;

    const phEnd = Number(elf.header.phoff) + elf.header.phnum * elf.header.phentsize;
    if (phEnd > maxOffset) {
      maxOffset = phEnd;
    }

    const shEnd = Number(elf.header.shoff) + elf.header.shnum * elf.header.shentsize;
    if (shEnd > maxOffset) {
      maxOffset = shEnd;
    }

    for (let i = 0; i < elf.sectionHeaders.length; i++) {
      const header = elf.sectionHeaders[i];
      if (header.type !== SectionHeaderType.SHT_NOBITS) {
        const end = Number(header.offset + header.size);
        if (end > maxOffset) {
          maxOffset = end;
        }
      }
    }

    return maxOffset;
  }
}
