import THREE, { WebGLRenderer ,Scene, PerspectiveCamera, Mesh, BoxBufferGeometry, MeshStandardMaterial, Vector3, AmbientLight, AxesHelper, GridHelper, MOUSE} from "three";
import States from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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

    this.renderer = new WebGLRenderer({
      antialias:true
    })
    this.renderer.setSize(this.dom.offsetWidth,this.dom.offsetHeight,true)
    this.renderer.setClearColor('rgb(255,255,255)')
    this.renderer.clearColor()
    this.dom.appendChild(this.renderer.domElement)

    // 初始化性能监视器
    const states = States()
    const statesDom = states.domElement
    statesDom.style.position="fixed"
    statesDom.style.top = '0'
    statesDom.style.right = '5px'
    statesDom.style.left = 'unset'
    this.dom.appendChild(statesDom)
    //初始化轨道监视器 
    const orbitControls:OrbitControls = new OrbitControls(this.camera,this.renderer.domElement)
    // orbitControls.autoRotate = true
    orbitControls.enableDamping = true
    orbitControls.mouseButtons={
      LEFT: null as unknown as MOUSE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE,

    }
    // this.renderer.render(this.scene,this.camera) //渲染
    const animate = ()=>{
      // box.position.x += -0.01
      box.rotation.y += 0.001
      // this.camera.position.x -= 0.01
      orbitControls.update()
      states.update()
      this.renderer.render(this.scene,this.camera)
      requestAnimationFrame(animate)
    }
    animate()



  }
}