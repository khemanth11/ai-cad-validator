// ===== CAD VALIDATION ENGINE =====
// Checks designs for 3 types of issues:
// 1. Naming Convention violations
// 2. Missing Constraints
// 3. Clearance/Interference risks

// ----- RULE 1: Naming Convention -----
// Valid format: PRT-XXXX-### or ASM-XXXX-###
// PRT = Part, ASM = Assembly
// XXXX = 4 letter code (BRKT, GEAR, SHFT, etc.)
// ### = 3 digit number

const NAMING_PATTERN = /^(PRT|ASM)-[A-Z]{4}-\d{3}$/;

export function checkNamingConvention(components) {
    const issues = [];

    components.forEach((comp) => {
        if (!NAMING_PATTERN.test(comp.name)) {
            issues.push({
                type: 'naming',
                severity: 'error',
                component: comp.name,
                message: `"${comp.name}" does not follow naming standard. Expected format: PRT-XXXX-### or ASM-XXXX-###`,
                suggestion: `Rename to something like PRT-${comp.name.slice(0, 4).toUpperCase()}-001`,
            });
        }
    });

    return issues;
}

// ----- RULE 2: Constraint Check -----
// Checks if sketches are fully constrained
// DOF = Degrees of Freedom (0 = fully constrained = good)

export function checkConstraints(components) {
    const issues = [];

    components.forEach((comp) => {
        if (comp.sketches) {
            comp.sketches.forEach((sketch) => {
                if (sketch.dof > 0) {
                    issues.push({
                        type: 'constraint',
                        severity: sketch.dof > 2 ? 'error' : 'warning',
                        component: comp.name,
                        message: `${sketch.name} is under-constrained with ${sketch.dof} DOF remaining`,
                        suggestion: `Add ${sketch.dof} more constraint(s) to fully define the sketch`,
                    });
                }
            });
        }
    });

    return issues;
}

// ----- RULE 3: Clearance Check -----
// Checks minimum distance between parts
// If distance < minimumClearance, it's a violation

const MINIMUM_CLEARANCE = 0.2; // in mm

export function checkClearance(components) {
    const issues = [];

    if (components.length < 2) return issues;

    // Check each pair of components
    for (let i = 0; i < components.length; i++) {
        for (let j = i + 1; j < components.length; j++) {
            const compA = components[i];
            const compB = components[j];

            if (compA.boundingBox && compB.boundingBox) {
                const distance = calculateDistance(compA.boundingBox, compB.boundingBox);

                if (distance < MINIMUM_CLEARANCE) {
                    issues.push({
                        type: 'clearance',
                        severity: distance <= 0 ? 'error' : 'warning',
                        component: `${compA.name} ↔ ${compB.name}`,
                        message: `Clearance violation: ${distance.toFixed(3)}mm between parts (minimum: ${MINIMUM_CLEARANCE}mm)`,
                        suggestion: distance <= 0
                            ? 'Parts are intersecting! Move them apart immediately'
                            : `Increase gap by at least ${(MINIMUM_CLEARANCE - distance).toFixed(3)}mm`,
                    });
                }
            }
        }
    }

    return issues;
}

// Helper: calculate distance between two bounding boxes
function calculateDistance(boxA, boxB) {
    const dx = Math.max(0, Math.max(boxA.min.x, boxB.min.x) - Math.min(boxA.max.x, boxB.max.x));
    const dy = Math.max(0, Math.max(boxA.min.y, boxB.min.y) - Math.min(boxA.max.y, boxB.max.y));
    const dz = Math.max(0, Math.max(boxA.min.z, boxB.min.z) - Math.min(boxA.max.z, boxB.max.z));
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// ----- RUN ALL CHECKS -----
export function runFullValidation(components) {
    const namingIssues = checkNamingConvention(components);
    const constraintIssues = checkConstraints(components);
    const clearanceIssues = checkClearance(components);

    const allIssues = [...namingIssues, ...constraintIssues, ...clearanceIssues];

    return {
        totalComponents: components.length,
        totalIssues: allIssues.length,
        errors: allIssues.filter((i) => i.severity === 'error').length,
        warnings: allIssues.filter((i) => i.severity === 'warning').length,
        passed: allIssues.length === 0,
        issues: allIssues,
        timestamp: new Date().toISOString(),
    };
}