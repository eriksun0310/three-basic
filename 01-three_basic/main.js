import * as THREE from "three";
// 導入軌道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//導入動畫庫
import gsap from "gsap";

//08目標: 根據window尺寸變化自適應畫面

// 1. 創建場景
const scene = new THREE.Scene();

//2. 創建相機
const camera = new THREE.PerspectiveCamera(
  75, //角度
  window.innerWidth / window.innerHeight, //寬高比
  0.1, //近端
  1000 //遠端
);

//3. 設置相機位置
camera.position.set(0, 0, 10);
scene.add(camera);

//4. 添加物體
//創建幾何體
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//材質
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff00 });

// Mesh網格: 根據幾何體和材質創建物體
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);



//5.將幾何體添加到場景當中
scene.add(cube);

// 6. 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 設置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);


//7.將webgl 渲染的canvas內容添加到body
document.body.appendChild(renderer.domElement);

//8.使用渲染器, 通過相機將場景渲染進來
renderer.render(scene, camera);

// 02. 創建 軌道控制器
const controls = new OrbitControls(camera, renderer.domElement);
//設置控制器的阻尼, 讓控制器更有真實感, 必須在動畫循環調用.update()
controls.enableDamping = true;

// 添加坐標軸輔助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


//07. 設置動畫
const animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: "power1.out",
  onComplete: () => {
    console.log("動畫完成");
  },
  onStart: () => {
    console.log("動畫開始");
  },
  //設置重複(次數), 無限次循環-1
  repeat: -1,
  //往返運動
  yoyo: true,

  //delay,延遲兩秒運動
  delay: 0.5,
});
gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  ease: "power1.out",
});

//畫面雙擊
window.addEventListener("dblclick", () => {
  // 動畫在執行的時候
  if (animate1.isActive()) {
    //暫停
    animate1.pause();
  } else {
    //恢復
    animate1.resume();
  }
});

function render() {
  controls.update();
  renderer.render(scene, camera);
  //渲染下一幀的時候會調用render 函數
  requestAnimationFrame(render);
}

render();

//08. 監聽畫面的變化, 更新渲染畫面
window.addEventListener("resize", () => {
  //   console.log("畫面變化了");
  //更新攝像頭
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新攝影機的投影矩陣
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerHeight, window.innerHeight);

  //設置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
