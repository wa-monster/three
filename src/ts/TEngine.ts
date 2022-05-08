import THREE, { WebGLRenderer ,Scene, PerspectiveCamera, Mesh, BoxBufferGeometry, MeshStandardMaterial, Vector3, AmbientLight, AxesHelper, GridHelper} from "three";

export class TEngine {
  private dom:HTMLElement
  private renderer: WebGLRenderer

  private scene: Scene

  private camera: PerspectiveCamera

  constructor(dom:HTMLElement){
    this.dom = dom
    //场景
    this.scene = new Scene() 
    //相机
    this.camera = new PerspectiveCamera(45,this.dom.offsetWidth/this.dom.offsetHeight,1,1000) 
    // 相机位置
    this.camera.position.set(20,20,20)
    // 相机看向原点
    this.camera.lookAt(new Vector3(0,0,0))
    // 相机看的方向的视角
    this.camera.up = new Vector3(0,1,0)
    //创建方块
    const box:Mesh = new Mesh(
      new BoxBufferGeometry(10,10,10),
      new MeshStandardMaterial({
        color:'rgb(255,0,0)'
      })
    )
    
    const ambientLight:AmbientLight = new AmbientLight('rhb(255,255,255)',1)
    const axesHelper: AxesHelper = new AxesHelper(500)
    const gridHelper: GridHelper = new GridHelper(500,10,'rgb(200,200,200','rgb(100,100,100)')
    //把方块添加到场景
    this.scene.add(box) 
    //添加环境光
    this.scene.add(ambientLight) 
    // 添加坐标轴
    this.scene.add(axesHelper) 
    // 添加网格
    this.scene.add(gridHelper)  

    this.renderer = new WebGLRenderer()
    this.renderer.setSize(this.dom.offsetWidth,this.dom.offsetHeight,true)
    this.dom.appendChild(this.renderer.domElement)
    this.renderer.setClearColor('rgb(255,255,255)')
    this.renderer.clearColor()
    // this.renderer.render(this.scene,this.camera) //渲染
    const animate = ()=>{
      box.position.x += -0.01
      box.rotation.y += 0.01
      this.camera.position.x -= 0.01
      this.renderer.render(this.scene,this.camera)
      requestAnimationFrame(animate)
    }
    animate()

  }

}