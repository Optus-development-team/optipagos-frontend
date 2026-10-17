import { animate } from "animejs";
import * as THREE from "three";
import type { PhoneCue, PitchVideos } from "@/content/pitch/types";

/**
 * Los teléfonos 3D del pitch: un iPhone y un Android hechos con geometría (sin modelos que
 * descargar), con sombreado de caricatura y contorno de tinta para que combinen con los
 * garabatos. En sus pantallas corren los videos de la demo mientras se sigue hablando.
 *
 * Las posiciones se dan en píxeles del lienzo de 1920 × 1080: 100 px = 1 unidad.
 */
const W = 19.2;
const H = 10.8;
const FOV = 30;
const DISTANCE = H / 2 / Math.tan(((FOV / 2) * Math.PI) / 180);

const INK = 0x00416a;
const INK_DARK = 0x01243b;

interface Pose {
  /** Centro, en píxeles del lienzo. */
  x: number;
  y: number;
  /** Alto del teléfono en píxeles. */
  h: number;
  ry: number;
  rz: number;
}

type PhoneName = "iphone" | "android";

/** Dónde se para cada teléfono según la escena y la pose de la diapositiva. */
const POSES: Record<PhoneCue["scene"], Record<PhoneCue["pose"], Partial<Record<PhoneName, Pose>>>> = {
  registro: {
    hero: { iphone: { x: 1470, y: 560, h: 880, ry: -0.24, rz: 0.035 } },
    side: { iphone: { x: 1590, y: 590, h: 700, ry: -0.2, rz: 0.03 } },
  },
  envio: {
    hero: {
      iphone: { x: 1265, y: 575, h: 770, ry: 0.2, rz: -0.04 },
      android: { x: 1625, y: 590, h: 770, ry: -0.22, rz: 0.045 },
    },
    side: {
      iphone: { x: 1400, y: 600, h: 640, ry: 0.16, rz: -0.035 },
      android: { x: 1715, y: 612, h: 640, ry: -0.18, rz: 0.04 },
    },
  },
};

/** Fuera de cuadro, por abajo. */
const offstage = (pose: Pose | undefined, phone: PhoneName): Pose => ({
  ...(pose ?? { x: phone === "iphone" ? 1400 : 1700, y: 0, h: 800, ry: 0, rz: 0 }),
  y: 1700,
  rz: phone === "iphone" ? -0.4 : 0.4,
});

interface Phone {
  group: THREE.Group;
  screen: THREE.MeshBasicMaterial;
  pose: Pose;
  /** Alto del modelo en unidades, para escalarlo al alto pedido. */
  height: number;
  phase: number;
}

export class PhoneStage {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(FOV, W / H, 0.1, 100);
  private readonly phones: Record<PhoneName, Phone>;
  private readonly videos: Record<"registro" | "envio" | "android", HTMLVideoElement>;
  private readonly textures: Record<"registro" | "envio" | "android", THREE.VideoTexture>;
  private cue: PhoneCue | undefined;
  private frame = 0;
  private sync = 0;
  private readonly started = performance.now();

  constructor(
    canvas: HTMLCanvasElement,
    private readonly clips: PitchVideos,
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
    this.renderer.setSize(1920, 1080, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.camera.position.set(0, 0, DISTANCE);

    this.scene.add(new THREE.HemisphereLight(0xfffbee, 0x9bbbd2, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(-4, 6, 10);
    this.scene.add(sun);

    this.videos = {
      registro: makeVideo(clips.registro.src),
      envio: makeVideo(clips.envio.src),
      android: makeVideo(clips.envio.android),
    };
    this.textures = {
      registro: videoTexture(this.videos.registro),
      envio: videoTexture(this.videos.envio),
      android: videoTexture(this.videos.android),
    };

    this.phones = {
      iphone: buildPhone({
        screenAspect: 540 / 1170,
        screenHeight: 1.9,
        bezel: 0.045,
        radius: 0.17,
        screenRadius: 0.13,
        depth: 0.11,
        color: 0xf2c96b,
        punchHole: false,
      }),
      android: buildPhone({
        screenAspect: 540 / 1208,
        screenHeight: 1.9,
        bezel: 0.04,
        radius: 0.11,
        screenRadius: 0.08,
        depth: 0.1,
        color: 0x3f7aa3,
        punchHole: true,
      }),
    };
    this.phones.android.phase = 1.7;
    for (const name of ["iphone", "android"] as const) {
      const phone = this.phones[name];
      phone.pose = offstage(undefined, name);
      this.scene.add(phone.group);
    }
    this.frame = requestAnimationFrame(this.tick);
  }

  setPixelRatio(ratio: number) {
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(1920, 1080, false);
  }

  /**
   * Cambia la escena. En vivo los teléfonos entran y salen animados y el video sigue
   * corriendo mientras la escena no cambie; con `still` se colocan en su sitio y muestran
   * el cuadro `cue.poster` (para el PDF).
   */
  async setCue(cue: PhoneCue | undefined, still = false): Promise<void> {
    const previous = this.cue;
    this.cue = cue;
    const target = (name: PhoneName) => (cue ? POSES[cue.scene][cue.pose][name] : undefined);
    const names = ["iphone", "android"] as const;

    if (still) {
      for (const name of names) this.phones[name].pose = { ...(target(name) ?? offstage(undefined, name)) };
      this.assignScreens(cue);
      this.pauseAll();
      if (cue) await this.showPoster(cue);
      this.render();
      return;
    }

    // Misma escena: el video sigue y los teléfonos solo se acomodan.
    if (previous?.scene === cue?.scene) {
      for (const name of names) {
        const pose = target(name);
        if (pose) animate(this.phones[name].pose, { ...pose, duration: 900, ease: "inOut(2)" });
      }
      return;
    }

    // Escena nueva: salen los que estaban, cambia la pantalla y entran.
    this.pauseAll();
    if (previous) {
      await Promise.all(
        names.map((name) =>
          animate(this.phones[name].pose, { ...offstage(this.phones[name].pose, name), duration: 450, ease: "in(2)" }),
        ),
      );
    }
    if (!cue || this.cue !== cue) return;
    this.assignScreens(cue);
    for (const name of names) {
      const pose = target(name);
      if (!pose) continue;
      Object.assign(this.phones[name].pose, offstage(pose, name));
      animate(this.phones[name].pose, { ...pose, duration: 950, ease: "outBack(1.2)" });
    }
    this.play(cue.scene);
  }

  dispose() {
    cancelAnimationFrame(this.frame);
    window.clearInterval(this.sync);
    this.pauseAll();
    for (const video of Object.values(this.videos)) {
      video.removeAttribute("src");
      video.load();
    }
    for (const texture of Object.values(this.textures)) texture.dispose();
    this.renderer.dispose();
  }

  private assignScreens(cue: PhoneCue | undefined) {
    this.phones.iphone.screen.map = cue?.scene === "envio" ? this.textures.envio : this.textures.registro;
    this.phones.android.screen.map = this.textures.android;
    this.phones.iphone.screen.needsUpdate = true;
    this.phones.android.screen.needsUpdate = true;
  }

  private play(scene: PhoneCue["scene"]) {
    window.clearInterval(this.sync);
    if (scene === "registro") {
      const { start, end, rate } = this.clips.registro;
      playClip(this.videos.registro, start, end, rate);
      return;
    }
    const { start, end, rate, androidOffset } = this.clips.envio;
    const lead = this.videos.envio;
    const follower = this.videos.android;
    playClip(lead, start, end, rate);
    playClip(follower, start + androidOffset, end + androidOffset, rate);
    // Los dos teléfonos muestran el mismo instante: el que recibe sigue al que envía.
    this.sync = window.setInterval(() => {
      const target = lead.currentTime + androidOffset;
      if (Math.abs(follower.currentTime - target) > 0.3) follower.currentTime = target;
      if (lead.paused && !follower.paused) follower.pause();
    }, 500);
  }

  private async showPoster(cue: PhoneCue) {
    const seeks =
      cue.scene === "registro"
        ? [seek(this.videos.registro, cue.poster)]
        : [seek(this.videos.envio, cue.poster), seek(this.videos.android, cue.poster + this.clips.envio.androidOffset)];
    await Promise.all(seeks);
    for (const texture of Object.values(this.textures)) texture.needsUpdate = true;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  private pauseAll() {
    window.clearInterval(this.sync);
    for (const video of Object.values(this.videos)) video.pause();
  }

  private tick = () => {
    this.render();
    this.frame = requestAnimationFrame(this.tick);
  };

  private render() {
    const time = (performance.now() - this.started) / 1000;
    for (const phone of Object.values(this.phones)) {
      const { x, y, h, ry, rz } = phone.pose;
      const visible = y < 1600;
      phone.group.visible = visible;
      if (!visible) continue;
      // Flotan un poco, como si respiraran.
      const bob = Math.sin(time * 1.1 + phone.phase) * 0.06;
      phone.group.position.set(x / 100 - W / 2, H / 2 - y / 100 + bob, 0);
      phone.group.rotation.set(Math.sin(time * 0.7 + phone.phase) * 0.03, ry + Math.sin(time * 0.5 + phone.phase) * 0.04, rz);
      phone.group.scale.setScalar(h / 100 / phone.height);
    }
    this.renderer.render(this.scene, this.camera);
  }
}

interface PhoneSpec {
  screenAspect: number;
  screenHeight: number;
  bezel: number;
  radius: number;
  screenRadius: number;
  depth: number;
  color: number;
  punchHole: boolean;
}

function buildPhone(spec: PhoneSpec): Phone {
  const sh = spec.screenHeight;
  const sw = sh * spec.screenAspect;
  const bw = sw + spec.bezel * 2 + 0.05;
  const bh = sh + spec.bezel * 2 + 0.05;
  const group = new THREE.Group();

  const toon = new THREE.MeshToonMaterial({ color: spec.color, gradientMap: toonRamp() });
  const body = new THREE.Mesh(roundedSlab(bw, bh, spec.depth, spec.radius), toon);
  group.add(body);

  // Contorno de tinta: la misma forma, un poco más grande, vista por dentro.
  const outline = new THREE.Mesh(
    roundedSlab(bw + 0.07, bh + 0.07, spec.depth + 0.06, spec.radius + 0.035),
    new THREE.MeshBasicMaterial({ color: INK_DARK, side: THREE.BackSide }),
  );
  group.add(outline);

  const front = spec.depth / 2 + 0.031;
  const glass = new THREE.Mesh(
    roundedPlane(sw + spec.bezel * 2, sh + spec.bezel * 2, spec.screenRadius + spec.bezel),
    new THREE.MeshBasicMaterial({ color: 0x0b0f14 }),
  );
  glass.position.z = front;
  group.add(glass);

  const screen = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const display = new THREE.Mesh(roundedPlane(sw, sh, spec.screenRadius), screen);
  display.position.z = front + 0.002;
  group.add(display);

  if (spec.punchHole) {
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.03, 24), new THREE.MeshBasicMaterial({ color: 0x05070a }));
    hole.position.set(0, sh / 2 - 0.045, front + 0.004);
    group.add(hole);
  }

  // Botones laterales, también con su contorno.
  const button = (x: number, y: number, h: number) => {
    const geo = new THREE.BoxGeometry(0.035, h, spec.depth * 0.5);
    const mesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: INK, gradientMap: toonRamp() }));
    mesh.position.set(x, y, 0);
    group.add(mesh);
  };
  button(bw / 2 + 0.03, sh * 0.18, 0.28);
  button(-bw / 2 - 0.03, sh * 0.25, 0.18);
  button(-bw / 2 - 0.03, sh * 0.08, 0.18);

  return {
    group,
    screen,
    pose: { x: 0, y: 1700, h: 800, ry: 0, rz: 0 },
    height: bh,
    phase: 0,
  };
}

let ramp: THREE.DataTexture | undefined;
/** Tres tonos de luz, como un dibujo coloreado. */
function toonRamp(): THREE.DataTexture {
  if (ramp) return ramp;
  ramp = new THREE.DataTexture(new Uint8Array([110, 110, 110, 255, 190, 190, 190, 255, 255, 255, 255, 255]), 3, 1);
  ramp.minFilter = THREE.NearestFilter;
  ramp.magFilter = THREE.NearestFilter;
  ramp.needsUpdate = true;
  return ramp;
}

function roundedRect(w: number, h: number, r: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

/** Cuerpo del teléfono: rectángulo redondeado con los bordes biselados. */
function roundedSlab(w: number, h: number, depth: number, r: number): THREE.BufferGeometry {
  const bevel = depth * 0.45;
  const geo = new THREE.ExtrudeGeometry(roundedRect(w - bevel * 2, h - bevel * 2, Math.max(0.01, r - bevel)), {
    depth: depth - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 10,
  });
  geo.center();
  return geo;
}

/** Plano redondeado con coordenadas de textura de 0 a 1 (para el video). */
function roundedPlane(w: number, h: number, r: number): THREE.BufferGeometry {
  const geo = new THREE.ShapeGeometry(roundedRect(w, h, r), 12);
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = pos.getX(i) / w + 0.5;
    uv[i * 2 + 1] = pos.getY(i) / h + 0.5;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return geo;
}

function makeVideo(src: string): HTMLVideoElement {
  const video = document.createElement("video");
  video.src = src;
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.crossOrigin = "anonymous";
  return video;
}

function videoTexture(video: HTMLVideoElement): THREE.VideoTexture {
  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Reproduce un tramo y se queda en su último cuadro. */
function playClip(video: HTMLVideoElement, start: number, end: number, rate: number) {
  video.currentTime = start;
  video.playbackRate = rate;
  video.ontimeupdate = () => {
    if (video.currentTime >= end) video.pause();
  };
  void video.play().catch(() => {
    // Sin permiso para reproducir (no debería pasar: el video va sin sonido).
  });
}

function seek(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve) => {
    const done = () => resolve();
    const go = () => {
      video.addEventListener("seeked", done, { once: true });
      video.currentTime = time;
    };
    if (video.readyState >= 1) go();
    else video.addEventListener("loadedmetadata", go, { once: true });
  });
}
