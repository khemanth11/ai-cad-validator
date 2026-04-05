'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { STLLoader } from 'three-stdlib';

// A mechanical bracket-like CAD part (made from basic shapes)
function CADModel({ showIssues, fileUrl }) {
    const [uploadedGeometry, setUploadedGeometry] = useState(null);

    // This safely loads the STL only when a fileUrl is provided
    useEffect(() => {
        if (!fileUrl) {
            setUploadedGeometry(null);
            return;
        }

        const loader = new STLLoader();
        loader.load(fileUrl, (geometry) => {
            // CRITICAL FIX: Internet STLs are often way off-center. This moves it to the middle!
            geometry.center();

            // Recompute normals for smooth shading
            geometry.computeVertexNormals();

            setUploadedGeometry(geometry);
        }, undefined, (err) => console.error("Error loading STL:", err));
    }, [fileUrl]);

    // IF A REAL FILE WAS UPLOADED: Show the uploaded 3D mesh
    if (uploadedGeometry) {
        return (
            <mesh geometry={uploadedGeometry} scale={1}>
                {/* A cool metallic blue material for uploaded CAD parts */}
                <meshStandardMaterial color="#4f8bff" metalness={0.6} roughness={0.4} />
            </mesh>
        );
    }

    // OTHERWISE: Show our default fake demo bracket
    return (
        <group position={[-25, -15, -10]}>
            {/* Base plate */}
            <mesh position={[25, 5, 10]} castShadow receiveShadow>
                <boxGeometry args={[50, 10, 20]} />
                <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Left Wall */}
            <mesh position={[5, 20, 10]} castShadow receiveShadow>
                <boxGeometry args={[10, 20, 20]} />
                <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Right Wall */}
            <mesh position={[45, 20, 10]} castShadow receiveShadow>
                <boxGeometry args={[10, 20, 20]} />
                <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Top Connector */}
            <mesh position={[25, 30, 10]} castShadow receiveShadow>
                <boxGeometry args={[50, 10, 10]} />
                <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* ERROR HIGHLIGHTS (Only appear if showIssues is TRUE) */}
            {showIssues && (
                <>
                    {/* Clearance Clash (Red box) */}
                    <mesh position={[25, 25, 10]}>
                        <boxGeometry args={[30, 12, 12]} />
                        <meshBasicMaterial color="#ef4444" opacity={0.6} transparent depthWrite={false} />
                    </mesh>

                    {/* Constraint Issue Marker (Yellow glowing sphere) */}
                    <mesh position={[45, 35, 10]}>
                        <sphereGeometry args={[4, 16, 16]} />
                        <meshBasicMaterial color="#f59e0b" opacity={0.8} transparent />
                    </mesh>

                    {/* Naming Issue Marker */}
                    <mesh position={[5, 35, 10]}>
                        <sphereGeometry args={[4, 16, 16]} />
                        <meshBasicMaterial color="#f59e0b" opacity={0.8} transparent />
                    </mesh>
                </>
            )}
        </group>
    );
}

export default function ModelViewer({ fileUrl }) {
    const [showIssues, setShowIssues] = useState(false);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#0f172a' }}>
            {/* 3D Canvas Context */}
            <Canvas shadows camera={{ position: [0, 50, 100], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
                <Environment preset="city" />

                {/* Passing BOTH showIssues and fileUrl down to the CADModel */}
                <CADModel showIssues={showIssues} fileUrl={fileUrl} />

                <ContactShadows position={[0, -20, 0]} opacity={0.4} scale={100} blur={2} />
                <OrbitControls makeDefault />
            </Canvas>

            {/* Toggle errors button */}
            <button
                className="btn btn-outline"
                onClick={() => setShowIssues(!showIssues)}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 10,
                }}
            >
                {showIssues ? 'Hide Issues' : 'Show Issues'}
            </button>
        </div>
    );
}
