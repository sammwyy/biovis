# BioVIS - 3D Biomolecule Viewer

<div align="center">
  <h3>Interactive 3D molecular structure visualization built with React and Three.js</h3>
  <p>
    <a href="https://github.com/sammwyy/biovis">GitHub</a> •
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a>
  </p>
</div>

## Overview

BioVIS is a modern, interactive 3D molecular structure viewer that allows you to visualize and explore protein structures, DNA, and other biomolecules. Built with React, Three.js, and React Three Fiber, it provides an intuitive interface for loading, viewing, and analyzing PDB (Protein Data Bank) files.

## Features

- 🧬 **3D Molecular Visualization** - Interactive 3D rendering of molecular structures
- 🌓 **Dark/Light Mode** - Toggle between dark and light themes
- 📊 **Structure Layers** - Toggle visibility of proteins, ligands, water molecules, and annotations
- 🔍 **Interactive Exploration** - Click and hover on atoms to view detailed information
- 📁 **File Upload** - Load PDB files directly from your computer
- 🗂️ **Molecule Gallery** - Browse and load pre-selected interesting structures
- 📸 **Screenshot Capture** - Export high-quality images of your visualizations
- 📝 **Annotations** - Add custom labels to specific atoms or residues
- 💾 **History** - Keep track of recently viewed molecules

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/sammwyy/biovis.git
cd biovis
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Loading Structures

**From File:**
- Click the "Open PDB" button in the top bar
- Select a `.pdb` or `.ent` file from your computer
- Or drag and drop a PDB file directly onto the viewer

**From Gallery:**
- Click the "Explore" button
- Browse the curated collection of interesting structures
- Click on any molecule to load it instantly

**From History:**
- Click the history icon in the top bar
- Select any previously viewed molecule from your history

### Interacting with Structures

- **Rotate**: Click and drag to rotate the molecule
- **Zoom**: Scroll to zoom in/out
- **Pan**: Right-click and drag (or middle mouse button)
- **Select Atom**: Click on any atom to view its details
- **Hover**: Hover over atoms to see them highlighted
- **Reset View**: Click the reset camera button to return to the default view

### Controls

**Sidebar:**
- Toggle structure layers (proteins, ligands, water, annotations)
- View molecule metadata and details
- Switch between dark and light themes

**Top Bar:**
- Reset camera view
- Capture screenshot
- Access history
- Open explore gallery
- Upload new PDB file

**Info Panel:**
- View detailed atom information
- Add custom annotations
- See coordinates, B-factor, occupancy, and more

## Project Structure

```
biovis/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── InfoPanel.tsx
│   │   │   └── ExploreModal.tsx
│   │   └── renderer/        # 3D rendering components
│   │       ├── Viewer.tsx
│   │       └── MoleculeRender.tsx
│   ├── lib/                 # Core utilities
│   │   ├── types.ts         # TypeScript type definitions
│   │   ├── constants.ts     # Color constants and utilities
│   │   ├── molecules.ts     # Molecule gallery data
│   │   └── pdbParser.ts     # PDB file parser
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Application entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Development

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Data provided by [RCSB PDB](https://www.rcsb.org/)
- Built with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- Icons by [Lucide](https://lucide.dev/)

## Author

**sammwy** - [GitHub](https://github.com/sammwyy)