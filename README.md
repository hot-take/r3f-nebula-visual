# R3F Nebula Visualizer

A stunning, premium 3D portal experience built with **React Three Fiber**, **Three.js**, and **Vite**. Navigate through floating portal cards embedded in a cosmic, dense nebula cloud.

---

## Features

### 🌌 Interactive 3D Scenes
- **Three Portal Cards**: Interactive cards that tilt smoothly in response to pointer movement. Hovering over a card activates a portal view displaying distortion animations on internal mesh textures.
- **Starfield & Nebula Clouds**: A dense cosmic backdrop composed of realistic, animated stars and layers of custom-textured nebula clouds.
- **Glassmorphic Crystal Frames**: Highly refractive borders on each frame using Three's glass refraction shaders.

### 🎮 Viewport Controls
- **Lock/Unlock Viewport**: Toggle camera Orbit/Pan/Zoom controls on/off directly from a floating panel. Locked by default on startup.
- **Reset Viewport**: Smoothly transition the camera position and focus back to the default coordinates with high-performance GSAP easing.

### ⚡ Performance & Rendering Optimizations
- **Resource Caching**: Textures and HDR assets are cached and preloaded through React `Suspense` and Drei hooks (`useTexture`/`useLoader`), ensuring zero redundant GPU uploads and fluid rendering.
- **Zero-Render Pointer Tracking**: Replaced global mouse event listeners and React state loops with R3F's native render-loop pointer coordinate tracking, eliminating tens of thousands of render cycles during pointer movements.
- **Shader Stability**: Optimized glass material indices of refraction and tone-mapping parameters to prevent WebGL float overflows and post-processing Bloom artifacts.

---

## Tech Stack
- **Core**: React 18, React Three Fiber (R3F), Three.js
- **Assets & Helpers**: `@react-three/drei`, `@react-three/postprocessing`
- **Animations**: GSAP (GreenSock Animation Platform)
- **Bundler**: Vite

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hot-take/r3f-nebula-visual.git
   cd r3f-nebula-visual
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the local development server:
   ```bash
   npm run dev
   ```
4. Build the application for production:
   ```bash
   npm run build
   ```
