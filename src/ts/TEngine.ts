import THREE from "three";

export class TEngine {
  private target:HTMLElement
  constructor(target:HTMLElement){
    this.target = target
    console.log('TEngine 实例');
  }
}