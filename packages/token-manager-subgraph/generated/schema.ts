// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class TokenManager extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TokenManager entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenManager entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenManager", id.toString(), this);
  }

  static load(id: string): TokenManager | null {
    return store.get("TokenManager", id) as TokenManager | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get orgAddress(): Bytes {
    let value = this.get("orgAddress");
    return value.toBytes();
  }

  set orgAddress(value: Bytes) {
    this.set("orgAddress", Value.fromBytes(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }
}

export class MiniMeToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save MiniMeToken entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save MiniMeToken entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("MiniMeToken", id.toString(), this);
  }

  static load(id: string): MiniMeToken | null {
    return store.get("MiniMeToken", id) as MiniMeToken | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get transferable(): boolean {
    let value = this.get("transferable");
    return value.toBoolean();
  }

  set transferable(value: boolean) {
    this.set("transferable", Value.fromBoolean(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get orgAddress(): Bytes {
    let value = this.get("orgAddress");
    return value.toBytes();
  }

  set orgAddress(value: Bytes) {
    this.set("orgAddress", Value.fromBytes(value));
  }

  get appAddress(): Bytes {
    let value = this.get("appAddress");
    return value.toBytes();
  }

  set appAddress(value: Bytes) {
    this.set("appAddress", Value.fromBytes(value));
  }

  get tokenManager(): string {
    let value = this.get("tokenManager");
    return value.toString();
  }

  set tokenManager(value: string) {
    this.set("tokenManager", Value.fromString(value));
  }

  get holders(): Array<string> {
    let value = this.get("holders");
    return value.toStringArray();
  }

  set holders(value: Array<string>) {
    this.set("holders", Value.fromStringArray(value));
  }
}

export class TokenHolder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TokenHolder entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenHolder entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenHolder", id.toString(), this);
  }

  static load(id: string): TokenHolder | null {
    return store.get("TokenHolder", id) as TokenHolder | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get tokenAddress(): Bytes {
    let value = this.get("tokenAddress");
    return value.toBytes();
  }

  set tokenAddress(value: Bytes) {
    this.set("tokenAddress", Value.fromBytes(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }
}
