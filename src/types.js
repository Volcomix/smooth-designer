//@flow
export type Block = {
  +id: string,
  +name: string,
  +x: number,
  +y: number,
  +width: number,
  +height: number,
}

export type Link = {
  +id: string,
  +fromId: string,
  +toId: string,
}
