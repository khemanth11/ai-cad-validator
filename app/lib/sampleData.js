// ===== SAMPLE CAD DATA =====
// Simulates designs exported from CAD tools

// ----- SAMPLE 1: Design with issues (for demo) -----
export const sampleWithIssues = [
    {
        name: 'PRT-BRKT-001',
        type: 'part',
        description: 'Base Bracket',
        sketches: [
            { name: 'Sketch1', dof: 0 },
            { name: 'Sketch2', dof: 0 },
        ],
        boundingBox: {
            min: { x: 0, y: 0, z: 0 },
            max: { x: 50, y: 30, z: 20 },
        },
    },
    {
        name: 'bracket_final2',
        type: 'part',
        description: 'Side Bracket (wrong name)',
        sketches: [
            { name: 'Sketch1', dof: 0 },
            { name: 'Sketch3', dof: 3 },
        ],
        boundingBox: {
            min: { x: 49.9, y: 0, z: 0 },
            max: { x: 100, y: 30, z: 20 },
        },
    },
    {
        name: 'gear_v3_FINAL',
        type: 'part',
        description: 'Drive Gear (wrong name)',
        sketches: [
            { name: 'Sketch1', dof: 2 },
        ],
        boundingBox: {
            min: { x: 60, y: 0, z: 0 },
            max: { x: 90, y: 25, z: 15 },
        },
    },
    {
        name: 'ASM-HOUS-003',
        type: 'assembly',
        description: 'Motor Housing',
        sketches: [
            { name: 'Sketch1', dof: 0 },
        ],
        boundingBox: {
            min: { x: 200, y: 0, z: 0 },
            max: { x: 300, y: 50, z: 40 },
        },
    },
    {
        name: 'PRT-SHFT-007',
        type: 'part',
        description: 'Drive Shaft',
        sketches: [
            { name: 'Sketch1', dof: 0 },
            { name: 'Sketch2', dof: 1 },
        ],
        boundingBox: {
            min: { x: 150, y: 0, z: 0 },
            max: { x: 180, y: 10, z: 10 },
        },
    },
];

// ----- SAMPLE 2: Clean design (all checks pass) -----
export const sampleClean = [
    {
        name: 'PRT-BRKT-001',
        type: 'part',
        description: 'Base Bracket',
        sketches: [{ name: 'Sketch1', dof: 0 }],
        boundingBox: {
            min: { x: 0, y: 0, z: 0 },
            max: { x: 50, y: 30, z: 20 },
        },
    },
    {
        name: 'PRT-GEAR-002',
        type: 'part',
        description: 'Drive Gear',
        sketches: [{ name: 'Sketch1', dof: 0 }],
        boundingBox: {
            min: { x: 55, y: 0, z: 0 },
            max: { x: 100, y: 25, z: 15 },
        },
    },
    {
        name: 'ASM-HOUS-001',
        type: 'assembly',
        description: 'Motor Housing',
        sketches: [{ name: 'Sketch1', dof: 0 }],
        boundingBox: {
            min: { x: 110, y: 0, z: 0 },
            max: { x: 200, y: 50, z: 40 },
        },
    },
];