
interface IBase {
  clean?(): void;

  [p: string]: any;
}

export class Base implements IBase {
  [p: string]: any;

  public clean?(): void {
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
  }

}
