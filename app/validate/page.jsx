'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ModelViewer from '../components/ModelViewer';
import { runFullValidation } from '../lib/validationEngine';
import { sampleWithIssues, sampleClean } from '../lib/sampleData';
import { MdPlayArrow, MdCheckCircle, MdError, MdWarning, MdInfo } from 'react-icons/md';

export default function ValidatePage() {
    const [results, setResults] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedSample, setSelectedSample] = useState('issues');

    // Run the validation
    const handleValidate = () => {
        setIsRunning(true);
        setResults(null);

        // Simulate AI processing delay (feels more realistic)
        setTimeout(() => {
            const data = selectedSample === 'issues' ? sampleWithIssues : sampleClean;
            const validationResults = runFullValidation(data);
            setResults(validationResults);
            setIsRunning(false);
        }, 1500);
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">Validate Design</h1>
                    <p className="page-subtitle">Run AI-powered checks on your CAD model</p>
                </div>

                {/* Top Section: Viewer + Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>

                    {/* 3D Viewer */}
                    <div className="glass-card" style={{ height: '400px', padding: '0', overflow: 'hidden' }}>
                        <ModelViewer />
                    </div>

                    {/* Controls Panel */}
                    <div className="glass-card">
                        <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>Validation Controls</h3>

                        {/* Sample Selector */}
                        <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                            SELECT SAMPLE DATA
                        </label>
                        <select
                            value={selectedSample}
                            onChange={(e) => { setSelectedSample(e.target.value); setResults(null); }}
                            style={{
                                width: '100%', padding: '10px 12px', borderRadius: '8px',
                                background: 'var(--bg-card)', color: 'var(--text-primary)',
                                border: '1px solid var(--border-color)', fontSize: '14px',
                                marginBottom: '20px', cursor: 'pointer', outline: 'none',
                            }}
                        >
                            <option value="issues">🔴 Sample Design — Has Errors</option>
                            <option value="clean">🟢 Sample Design — All Good</option>
                        </select>

                        {/* Checks Info */}
                        <div style={{ marginBottom: '20px' }}>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>CHECKS TO RUN</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                                    <span style={{ color: 'var(--accent-green)' }}>✓</span> Naming Convention
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                                    <span style={{ color: 'var(--accent-green)' }}>✓</span> Constraint Analysis
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                                    <span style={{ color: 'var(--accent-green)' }}>✓</span> Clearance Check
                                </div>
                            </div>
                        </div>

                        {/* Validate Button */}
                        <button
                            className="btn btn-primary"
                            onClick={handleValidate}
                            disabled={isRunning}
                            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
                        >
                            {isRunning ? (
                                <>⏳ Analyzing...</>
                            ) : (
                                <><MdPlayArrow style={{ fontSize: '20px' }} /> Run Validation</>
                            )}
                        </button>

                        {/* Quick Summary (after validation) */}
                        {results && (
                            <div style={{
                                marginTop: '20px', padding: '16px', borderRadius: '10px',
                                background: results.passed ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                                border: `1px solid ${results.passed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    {results.passed ? (
                                        <MdCheckCircle style={{ color: 'var(--accent-green)', fontSize: '20px' }} />
                                    ) : (
                                        <MdError style={{ color: 'var(--accent-red)', fontSize: '20px' }} />
                                    )}
                                    <span style={{ fontWeight: '600', fontSize: '14px' }}>
                                        {results.passed ? 'All Checks Passed!' : `${results.totalIssues} Issues Found`}
                                    </span>
                                </div>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                    {results.errors} errors • {results.warnings} warnings • {results.totalComponents} components
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Issues List (shown after validation) */}
                {results && results.issues.length > 0 && (
                    <div className="glass-card">
                        <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
                            Issues Detected ({results.issues.length})
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {results.issues.map((issue, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '16px', borderRadius: '10px',
                                        background: 'var(--bg-card)',
                                        border: `1px solid ${issue.severity === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {issue.severity === 'error' ? (
                                                <MdError style={{ color: 'var(--accent-red)' }} />
                                            ) : (
                                                <MdWarning style={{ color: 'var(--accent-yellow)' }} />
                                            )}
                                            <span style={{ fontWeight: '600', fontSize: '14px' }}>{issue.component}</span>
                                        </div>
                                        <span className={`badge badge-${issue.severity === 'error' ? 'error' : 'warning'}`}>
                                            {issue.type}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                        {issue.message}
                                    </p>
                                    <p style={{ fontSize: '12px', color: 'var(--accent-cyan)' }}>
                                        💡 {issue.suggestion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}