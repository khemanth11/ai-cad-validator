'use client';

import Sidebar from '../components/Sidebar';
import ModelViewer from '../components/ModelViewer';

export default function ViewerPage() {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">3D Model Viewer</h1>
                    <p className="page-subtitle">Inspect and validate CAD models in real-time</p>
                </div>

                {/* 3D Viewer Container */}
                <div className="glass-card" style={{ height: '500px', padding: '0', overflow: 'hidden' }}>
                    <ModelViewer />
                </div>

                {/* Model Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
                    <div className="glass-card">
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>MODEL NAME</span>
                        <p style={{ fontWeight: '600', marginTop: '4px' }}>PRT-BRKT-001</p>
                    </div>
                    <div className="glass-card">
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>COMPONENTS</span>
                        <p style={{ fontWeight: '600', marginTop: '4px' }}>5 Parts</p>
                    </div>
                    <div className="glass-card">
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>FILE FORMAT</span>
                        <p style={{ fontWeight: '600', marginTop: '4px' }}>STEP / GLTF</p>
                    </div>
                </div>
            </main>
        </div>
    );
}