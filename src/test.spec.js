import { describe, it, expect } from 'vitest';

import { wordify } from "./index.js";

describe('wordify - PT', () => {
  it('should convert units correctly', () => {
    expect(wordify(0)).toBe('Zero');
    expect(wordify(1)).toBe('Um');
    expect(wordify(9)).toBe('Nove');
  })

  it('should convert tens correctly', () => {
    expect(wordify(10)).toBe('Dez');
    expect(wordify(11)).toBe('Onze');
    expect(wordify(15)).toBe('Quinze');
    expect(wordify(20)).toBe('Vinte');
    expect(wordify(21)).toBe('Vinte e Um');
    expect(wordify(99)).toBe('Noventa e Nove');
  })

  it('should convert hundreds correctly', () => {
    expect(wordify(100)).toBe('Cem');
    expect(wordify(101)).toBe('Cento e Um');
    expect(wordify(200)).toBe('Duzentos');
    expect(wordify(345)).toBe('Trezentos e Quarenta e Cinco');
    expect(wordify(999)).toBe('Novecentos e Noventa e Nove');
  })

  it('should convert thousands correctly', () => {
    expect(wordify(1000)).toBe('Um Mil');
    expect(wordify(1001)).toBe('Um Mil e Um');
    expect(wordify(2000)).toBe('Dois Mil');
    expect(wordify(2345)).toBe('Dois Mil Trezentos e Quarenta e Cinco');
    expect(wordify(9999)).toBe('Nove Mil Novecentos e Noventa e Nove');
  })

  it('should convert tens of thousands correctly', () => {
    expect(wordify(10000)).toBe('Dez Mil');
    expect(wordify(10001)).toBe('Dez Mil e Um');
    expect(wordify(12345)).toBe('Doze Mil Trezentos e Quarenta e Cinco');
    expect(wordify(99999)).toBe('Noventa e Nove Mil Novecentos e Noventa e Nove');
  })

  it('should convert hundreds of thousands correctly', () => {
    expect(wordify(100000)).toBe('Cem Mil');
    expect(wordify(100001)).toBe('Cem Mil e Um');
    expect(wordify(123456)).toBe('Cento e Vinte e Três Mil Quatrocentos e Cinquenta e Seis');
    expect(wordify(999999)).toBe('Novecentos e Noventa e Nove Mil Novecentos e Noventa e Nove');
  })

  it('should convert millions correctly', () => {
    expect(wordify(1000000)).toBe('Número é muito grande! Tente novamente.');
  })

  it('should handle invalid inputs correctly', () => {
    expect(wordify('abc')).toBe('O valor não é um número! Verifique os valores e tente novamente.');
    expect(wordify(NaN)).toBe('O valor não é um número! Verifique os valores e tente novamente.');
  })

  it('should handle negative numbers correctly', () => {
    expect(wordify(-1)).toBe('Um');
    expect(wordify(-100)).toBe('Cem');
    expect(wordify(-12345)).toBe('Doze Mil Trezentos e Quarenta e Cinco');
  })

  it('should handle edge cases correctly', () => {
    expect(wordify(0)).toBe('Zero');
    expect(wordify(1)).toBe('Um');
    expect(wordify(10)).toBe('Dez');
    expect(wordify(11)).toBe('Onze');
    expect(wordify(19)).toBe('Dezenove');
    expect(wordify(20)).toBe('Vinte');
    expect(wordify(21)).toBe('Vinte e Um');
    expect(wordify(99)).toBe('Noventa e Nove');
    expect(wordify(100)).toBe('Cem');
    expect(wordify(101)).toBe('Cento e Um');
    expect(wordify(999)).toBe('Novecentos e Noventa e Nove');
    expect(wordify(1000)).toBe('Um Mil');
    expect(wordify(1001)).toBe('Um Mil e Um');
    expect(wordify(1999)).toBe('Um Mil Novecentos e Noventa e Nove');
    expect(wordify(2000)).toBe('Dois Mil');
    expect(wordify(2001)).toBe('Dois Mil e Um');
    expect(wordify(999999)).toBe('Novecentos e Noventa e Nove Mil Novecentos e Noventa e Nove');
  })
})
