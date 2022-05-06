import THREE, { WebGLRenderer } from "three";

export class TEngine {
  private target:HTMLElement
  private renderer: WebGLRenderer
  constructor(target:HTMLElement){
    this.target = target

    this.renderer = new WebGLRenderer()
    this.renderer.setSize(target.offsetWidth,target.offsetHeight,true)

    this.target.appendChild(this.renderer.domElement)

    console.log('TEngine 实例',this.target);
  }
}