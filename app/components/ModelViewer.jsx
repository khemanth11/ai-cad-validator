'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useState } from 'react';

// A mechanical bracket-like CAD part (made from basic shapes)
function CADModel({ showIssues }) {
    return (
        <group>
            {/* Main body - base plate */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3, 0.3, 2]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Left wall */}
            <mesh position={[-1.2, 0.8, 0]}>
                <boxGeometry args={[0.3, 1.3, 1.8]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Right wall */}
            <mesh position={[1.2, 0.8, 0]}>
                <boxGeometry args={[0.3, 1.3, 1.8]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Top connector beam */}
            <mesh position={[0, 1.45, 0]}>
                <boxGeometry args={[2.7, 0.25, 0.8]} />
                <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Bolt hole 1 */}
            <mesh position={[-0.8, -0.15, 0.6]}>
                <cylinderGeometry args={[0.12, 0.12, 0.35, 16]} />
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Bolt hole 2 */}
            <mesh position={[0.8, -0.15, 0.6]}>
                <cylinderGeometry args={[0.12, 0.12, 0.35, 16]} />
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Bolt hole 3 */}
            <mesh position={[-0.8, -0.15, -0.6]}>
                <cylinderGeometry args={[0.12, 0.12, 0.35, 16]} />
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Bolt hole 4 */}
            <mesh position={[0.8, -0.15, -0.6]}>
                <cylinderGeometry args={[0.12, 0.12, 0.35, 16]} />
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Issue highlight zones (shown when validation runs) */}
            {showIssues && (
                <>
                    {/* Red zone - clearance issue between walls */}
                    <mesh position={[0, 0.8, 0.9]}>
                        <boxGeometry args={[2.7, 1.3, 0.05]} />
                        <meshStandardMaterial color="#ef4444" transparent opacity={0.4} />
                    </mesh>

                    {/* Yellow zone - naming issue indicator */}
                    <mesh position={[0, 1.8, 0]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
                    </mesh>
                </>
            )}
        </group>
    );
}

export default function ModelViewer() {
    const [showIssues, setShowIssues] = useState(false);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Controls overlay */}
            <div style={{
                position: 'absolute', top: '16px', left: '16px', zIndex: 10,
                display: 'flex', gap: '8px'
            }}>
                <button
                    className={`btn ${showIssues ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setShowIssues(!showIssues)}
                    style={{ fontSize: '12px', padding: '8px 14px' }}
                >
                    {showIssues ? '🔴 Hide Issues' : '🔍 Show Issues'}
                </button>
            </div>

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [4, 3, 4], fov: 45 }}
                style={{ background: '#0a0e17' }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-5, 3, -5]} intensity={0.3} />

                <CADModel showIssues={showIssues} />

                <ContactShadows
                    position={[0, -0.15, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2}
                />

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                />

                <Environment preset="city" />
            </Canvas>

            {/* Legend */}
            {showIssues && (
                <div style={{
                    position: 'absolute', bottom: '16px', left: '16px', zIndex: 10,
                    display: 'flex', gap: '16px', background: 'rgba(0,0,0,0.7)',
                    padding: '10px 16px', borderRadius: '8px', fontSize: '12px'
                }}>
                    <span>🔴 Clearance Issue</span>
                    <span>🟡 Naming Violation</span>
                    <span>🟢 Constraint OK</span>
                </div>
            )}
        </div>
    );
}