# pcbcraft (Vibeclones mirror)

Hosted browser (WebAssembly) builds of [pcbcraft](https://github.com/tangency-labs/pcbcraft), an open-source electronics (PCB) design editor, by [Tangency Labs](https://github.com/tangency-labs). The code is theirs; this repo only builds and hosts it.

- Latest: `/pcbcraft/latest/`
- A specific version: `/pcbcraft/v<version>/`
- Version list: `/pcbcraft/versions.json`

Upstream has no releases yet, so each snapshot is named after the date and short hash of the upstream `main` commit it was built from, for example `/pcbcraft/v2026.10.12-ab12cd3/`. These are not official releases. A scheduled workflow builds new ones.

Upstream is licensed GPL-3.0. Every version folder includes the license and a `SOURCE.txt` naming the exact upstream commit it was built from; the source is at https://github.com/tangency-labs/pcbcraft.
