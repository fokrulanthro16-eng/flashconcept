# 🤝 Contributing to FlashConcept

Thank you for your interest in contributing to **FlashConcept (v3.0 - Kinetic Knowledge Engine)**! We welcome contributions from developers, designers, educators, and researchers of all skill levels.

---

## 📜 Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Please be respectful, constructive, and open to feedback in all interactions within this project.

---

## 🛠️ How to Contribute

### 1. Reporting Bugs
- Check existing GitHub Issues to see if the bug has already been reported.
- If not, open a new issue with a descriptive title, steps to reproduce, expected behavior, screenshots, and your environment details (browser version, OS).

### 2. Suggesting Enhancements & New Concepts
- Open a feature request issue describing the proposed mental model, kinetic vector animation, or UI improvement.
- Include rough sketches or analogies where applicable.

### 3. Submitting Pull Requests (PRs)

1. **Fork the repository** to your own GitHub account.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/flashconcept.git
   cd flashconcept
   ```
3. **Create a feature branch** following our branch conventions:
   ```bash
   git checkout -b feat/quantum-annealing-model
   ```
4. **Make your changes** and test locally:
   ```bash
   npm install
   npm run dev
   ```
5. **Ensure code quality:**
   - Write clean, type-safe TypeScript code without `any` overrides where possible.
   - Maintain 60 FPS performance on animations and 3D interactions.
   - Adhere to the High-Contrast Editorial Bento aesthetic.
6. **Commit your changes** with descriptive commit messages:
   ```bash
   git commit -m "feat(illustrations): add kinetic vector model for Quantum Annealing"
   ```
7. **Push to your branch:**
   ```bash
   git push origin feat/quantum-annealing-model
   ```
8. **Open a Pull Request** against the `main` branch with a thorough summary of changes.

---

## 🌿 Git Branch Conventions

- `feat/<feature-name>`: New features or concept cards
- `fix/<bug-name>`: Bug fixes and styling corrections
- `perf/<optimization>`: Performance and latency improvements
- `docs/<doc-update>`: Documentation updates and tutorials
- `refactor/<cleanup>`: Code restructuring without changing external behavior

---

## 🎨 Design & Code Standards

- **Typography:** `Plus Jakarta Sans` for interface copy, `Playfair Display` for editorial accents, monospace for numbers and latency telemetry.
- **Color Palette:** Deep Forest (`#12231B`), Soft Sage (`#E6EAE1`), Mint (`#F4F7F2`), Electric Lemon (`#E6F77B`), High-Contrast Dark Slate (`#111827`).
- **Zero Layout Collisions:** All card faces, popovers, and interactive toolbars must maintain clean padding and docking.

---

Thank you for helping us accelerate human learning velocity! ⚡
