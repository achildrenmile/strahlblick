# Strahlblick

[![Featured on oeradio.at](https://img.shields.io/badge/Featured_on-oeradio.at-2563eb?style=flat-square)](https://oeradio.at/werkzeuge/) [![Live Demo](https://img.shields.io/badge/Live_Demo-strahlblick.oeradio.at-16a34a?style=flat-square)](https://strahlblick.oeradio.at) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> 🎙️ **Part of the [oeradio.at](https://oeradio.at/werkzeuge/) open source ham radio tool collection.**
> Browse all tools → [**oeradio.at/werkzeuge**](https://oeradio.at/werkzeuge/)

Antenna radiation pattern visualizer for amateur radio.

## Features

- 2D and 3D antenna pattern visualization
- Common amateur radio antennas (dipole, yagi, vertical, loop)
- Gain, front-to-back ratio, beamwidth
- Interactive elevation and azimuth plots
- Mobile responsive

## Development

```bash
npm install
npm run dev
```

## Docker

```bash
docker build -t strahlblick .
docker run -p 8080:80 strahlblick
```

## License

MIT
