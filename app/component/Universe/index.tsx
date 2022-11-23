import React from "react";
import * as THREE from "three";
import debounce from "lodash/debounce";
import gsap from "gsap";
// import OrbitControl from "three-orbit-controls";

const Cube = ({ color }) => (
  <div
    style={{
      height: "30px",
      width: "30px",
      backgroundColor: color,
    }}
  />
);

enum CAM_MOVING_DIRECTION {
  IN,
  OUT,
}

export const CAMERA_POSITION_Y = {
  START: 9,
  ZOOM_IN: -1,
  ZOOM_OUT: 120,
};

const colorOption = [
  0x000000, 0x111111, 0x333333, 0x555555, 0x666666, 0xdddddd,
];

const colorOption2 = [0x446666, 0x88dddd, 0x446666, 0x88dddd, 0x88ffff];

const longArrowVector = new THREE.Vector3(-1, 0, -1);
const shortArrowVector = new THREE.Vector3(1, 0, -1);
const arrowOrigin = new THREE.Vector3(0, -3, 0);

let i = 0;
const getColor = (colorOption) => {
  i = (i + 1) % colorOption.length;
  return new THREE.Color(colorOption[i]);
};

const getVectors = (num: number) => {
  const vectors = [];
  for (i = 0; i < num; i++) {
    vectors.push(
      new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize()
    );
  }
  return vectors;
};

const getLightVectors = (num: number) => {
  const vectors = [];
  for (i = 0; i < num; i++) {
    vectors.push(
      new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2,
        Math.random() * 2 - 1
      ).normalize()
    );
  }
  return vectors;
};

const wrapperStyle: React.CSSProperties = {
  flex: 1,
  // padding: "3px",
  display: "flex",
  flexDirection: "column",
};
const innerStyle: React.CSSProperties = {
  flex: 1,
  overflow: "hidden",
};

let finished = false;
let stopRotate = false;

let longArrowGrowSpeed = 0.0015;
let longArrowLength = 0.1;
const LONG_ARROW_MAX_LENGTH = 60;

let shortArrowGrowSpeed = 0.001;
let shortArrowLength = 0.1;
const SHORT_ARROW_MAX_LENGTH = 20;

class Universe extends React.Component<{}, { show: boolean }> {
  private content;
  private scene;
  private camera;
  private renderer;
  private control;

  private longArrow;
  private shortArrow;
  private sphere;

  private camMovingDirection: CAM_MOVING_DIRECTION = CAM_MOVING_DIRECTION.IN;

  private origin = new THREE.Vector3(0, 0, 0);

  private resizeHandler = debounce(() => {
    this.camera.aspect = this.content.clientWidth / this.content.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.content.clientWidth, this.content.clientHeight);
  }, 100);

  public componentDidMount() {
    this.init();
    // this.addAxis();
    this.renderArrows();
    this.startListeningKeyboard();
    this.state = {
      show: false,
    };
  }

  private cameraMovingHandler() {
    if (finished) {
      location.reload();
      return;
    }

    if (this.camMovingDirection === CAM_MOVING_DIRECTION.IN) {
      this.zoomIn();
      this.camMovingDirection = CAM_MOVING_DIRECTION.OUT;
      return;
    }

    if (this.camMovingDirection === CAM_MOVING_DIRECTION.OUT) {
      this.zoomOut();
      finished = true;
      return;
    }
  }

  private zoomIn() {
    // this.renderLightArrows();
    gsap.to(this.camera.position, {
      y: CAMERA_POSITION_Y.ZOOM_IN,
      duration: 6,
      ease: "power4.inOut",
      onUpdate: () => {
        if (this.sphere) {
          return;
        }

        if (this.camera.position.y < 0.5) {
          this.addGlowSphere();
          this.longArrow = new THREE.ArrowHelper(
            longArrowVector,
            arrowOrigin,
            longArrowLength,
            0x44aaaa
          );
          this.shortArrow = new THREE.ArrowHelper(
            shortArrowVector,
            arrowOrigin,
            0.1,
            "red",
            0.01,
            0.01
          );
          this.scene.add(this.longArrow);
          this.scene.add(this.shortArrow);
          this.longArrowGrow();
          this.shortArrowGrow();
        }
      },
      onComplete: () => {
        this.setState({ show: true });
        this.scene.remove(this.sphere);
        this.startListeningKeyboard();
      },
    });
  }
  private zoomOut() {
    gsap.to(this.camera.position, {
      y: CAMERA_POSITION_Y.ZOOM_OUT,
      duration: 2,
      ease: "power1.inOut",
      onComplete: () => {
        longArrowGrowSpeed = 0.15;
        shortArrowGrowSpeed = 0.05;
        this.startListeningKeyboard();
      },
    });
  }

  private cameraRotation = () => {
    if (stopRotate) {
      return;
    }
    this.camera.rotation.z += Math.PI / 50000;
  };

  private longArrowGrow() {
    longArrowLength += longArrowGrowSpeed;
    this.longArrow?.setLength(longArrowLength);
    if (longArrowLength <= LONG_ARROW_MAX_LENGTH) {
      requestAnimationFrame(() => {
        this.longArrowGrow();
      });
    }
  }

  private shortArrowGrow() {
    shortArrowLength += shortArrowGrowSpeed;
    this.shortArrow?.setLength(shortArrowLength);
    if (shortArrowLength <= SHORT_ARROW_MAX_LENGTH) {
      requestAnimationFrame(() => {
        this.shortArrowGrow();
      });
    }
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  public render() {
    return (
      <div style={wrapperStyle}>
        {this.state?.show && (
          <div
            style={{
              position: "fixed",
              top: "30px",
              right: "30px",
              border: "1px solid white",
              borderRadius: "10px",
              padding: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
            }}
          >
            <div
              style={{ margin: "10px", display: "flex", alignItems: "center" }}
            >
              <Cube color="red" />
              <span style={{ marginLeft: "10px" }}>
                Aggregated Signature size
              </span>
            </div>
            <div
              style={{ margin: "10px", display: "flex", alignItems: "center" }}
            >
              <Cube color="#88ffff" />
              <span style={{ marginLeft: "10px" }}>Total Signature Size</span>
            </div>
          </div>
        )}

        <div ref={this.setContent} style={innerStyle} />
      </div>
    );
  }
  private init = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, null, 2, 1000);
    this.camera.position.set(0, CAMERA_POSITION_Y.START, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // this.control = new (OrbitControl(THREE))(
    //   this.camera,
    //   this.renderer.domElement
    // );
    // this.control.zoomSpeed = 0.2;

    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(this.content.clientWidth, this.content.clientHeight);
    this.content.appendChild(this.renderer.domElement);
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
    this.animate();
  };

  private addAxis = () => {
    const gridHelper = new THREE.GridHelper(50, 30, 0x444444, 0x333333);
    this.scene.add(gridHelper);
  };

  private animate = () => {
    // this.control.update();
    this.cameraRotation();
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
  private setContent = (ref) => (this.content = ref);

  private renderArrows = () => {
    getVectors(2000).forEach((vector) => {
      this.addArrow(
        vector,
        vector.multiplyScalar((Math.random() + 0.1) * 1.5),
        Math.random() / 4 + 4,
        getColor(colorOption)
      );
    });

    // const sum = new THREE.Vector3(1, 1.5, 1);
    // sum.normalize();
    // this.addArrow(sum, 15, new THREE.Color("cyan"), 1);
  };

  private renderLightArrows = () => {
    const vectors = getLightVectors(500);
    for (let i = 0; i < vectors.length; i++) {
      const vector = vectors[i];
      (async () => {
        await new Promise((res) => setTimeout(res, Math.random() * 5000));
        this.addArrow(
          vector,
          vector.multiplyScalar((Math.random() + 0.1) * 1.5),
          Math.random() / 8 + 4,
          getColor(colorOption2),
          0.05
        );
      })();
    }
  };

  private addArrow = (
    dir,
    start,
    length = 10,
    color = 0xffff00,
    headSize = 0.1
  ) => {
    const arrow = new THREE.ArrowHelper(dir, start, length, color, headSize);
    this.scene.add(arrow);
  };

  private addGlowSphere() {
    const geometry = new THREE.SphereGeometry(0.2, 32, 16);

    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.set(0, -2, 0);
    this.scene.add(this.sphere);
  }

  private startListeningKeyboard() {
    const keyboardListener = (event) => {
      const { code } = event;
      if (code === "Space") {
        stopRotate = true;
        this.cameraMovingHandler();
        document.removeEventListener("keydown", keyboardListener);
      }
    };

    document.addEventListener("keydown", keyboardListener, false);
  }
}

export default Universe;
