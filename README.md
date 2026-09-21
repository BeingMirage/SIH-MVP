# System Status & Architecture
TerraSafe Hackathon Feature Matrix

## MVP Component Status Matrix

| Feature Name | Production Tech Stack | MVP Status | Technical Implementation Notes |
| :--- | :--- | :--- | :--- |
| **Web-GIS Interactive Map** | React Leaflet, CARTO Basemaps | 🟢 Working | Fully functional client-side mapping with GeoJSON layers and marker clustering. |
| **Risk Grid Heatmap** | XGBoost, PostGIS | 🟡 Simulated | Grid generation and coloring simulated via frontend logic. Production uses PostGIS ST_MakeGrid and Python backend. |
| **SHAP Feature Importance** | Python, SHAP, FastAPI | 🟡 Simulated | Static mock SHAP values provided. Backend requires model inference endpoint to compute dynamic SHAP values per grid cell. |
| **InSAR Deformation Pipeline** | Sentinel-1, MintPy | 🔵 Architecture Ready | Mock data plotted on map. Real pipeline requires downloading Copernicus GRD/SLC scenes and processing via ISCE2/MintPy. |
| **Live IoT Telemetry** | TimescaleDB, MQTT | 🟡 Simulated | Simulated ticker UI. Requires setting up Mosquitto broker and IoT hardware for live ingestion. |
| **Citizen Offline Reporting** | PWA Service Workers | 🟢 Working | MVP implements basic state queueing to demonstrate offline sync UX. Full implementation requires IndexedDB and Service Workers. |
