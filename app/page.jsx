'use client';

import Sidebar from './components/Sidebar';
import { MdCheckCircle, MdError, MdWarning, MdSpeed, MdTrendingUp, MdAccessTime } from 'react-icons/md';
import Link from 'next/link';


const recentValidations = [
  { name: 'PRT-BRKT-001', status: 'passed', issues: 0, date: '2 hours ago' },
  { name: 'ASM-GEAR-012', status: 'failed', issues: 3, date: '5 hours ago' },
  { name: 'PRT-SHFT-007', status: 'warning', issues: 1, date: '1 day ago' },
  { name: 'ASM-HOUS-003', status: 'passed', issues: 0, date: '2 days ago' },
  { name: 'PRT-FLNG-019', status: 'failed', issues: 5, date: '3 days ago' },
];

export default function Dashboard() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">AI-Driven Design Intelligence Overview</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Total Validations</span>
              <MdCheckCircle style={{ color: 'var(--accent-blue)', fontSize: '24px' }} />
            </div>
            <p style={{ fontSize: '32px', fontWeight: '700' }}>24</p>
            <span style={{ color: 'var(--accent-green)', fontSize: '12px' }}>↑ 12% this week</span>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Issues Found</span>
              <MdError style={{ color: 'var(--accent-red)', fontSize: '24px' }} />
            </div>
            <p style={{ fontSize: '32px', fontWeight: '700' }}>7</p>
            <span style={{ color: 'var(--accent-red)', fontSize: '12px' }}>↓ 3% this week</span>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Pass Rate</span>
              <MdTrendingUp style={{ color: 'var(--accent-green)', fontSize: '24px' }} />
            </div>
            <p style={{ fontSize: '32px', fontWeight: '700' }}>91%</p>
            <span style={{ color: 'var(--accent-green)', fontSize: '12px' }}>↑ 5% improvement</span>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Avg. Check Time</span>
              <MdSpeed style={{ color: 'var(--accent-cyan)', fontSize: '24px' }} />
            </div>
            <p style={{ fontSize: '32px', fontWeight: '700' }}>1.2s</p>
            <span style={{ color: 'var(--accent-cyan)', fontSize: '12px' }}>AI-powered speed</span>
          </div>
        </div>

        {/* Bottom Section: Recent + Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>

          {/* Recent Validations */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>Recent Validations</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '500' }}>COMPONENT</th>
                  <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '500' }}>STATUS</th>
                  <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '500' }}>ISSUES</th>
                  <th style={{ textAlign: 'right', padding: '10px 0', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '500' }}>TIME</th>
                </tr>
              </thead>
              <tbody>
                {recentValidations.map((item) => (
                  <tr key={item.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 0', fontWeight: '500' }}>{item.name}</td>
                    <td style={{ padding: '12px 0' }}>
                      <span className={`badge badge-${item.status === 'passed' ? 'success' : item.status === 'failed' ? 'error' : 'warning'}`}>
                        {item.status === 'passed' ? '✓ Passed' : item.status === 'failed' ? '✕ Failed' : '⚠ Warning'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 0', color: 'var(--text-secondary)' }}>{item.issues}</td>
                    <td style={{ padding: '12px 0', textAlign: 'right', color: 'var(--text-muted)', fontSize: '13px' }}>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/validate" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                🚀 New Validation
              </Link>
              <Link href="/report" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                📄 View Last Report
              </Link>
              <Link href="/viewer" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                🔍 View 3D Model
              </Link>
            </div>

            {/* AI Status */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', animation: 'pulse 2s infinite' }}></div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent-green)' }}>AI Engine Active</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Groq LLM connected • Ready for analysis</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
