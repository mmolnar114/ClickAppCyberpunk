"use client"

import { useEffect, useRef, useState } from "react"
import { Activity, Cpu, LockKeyhole, Zap } from "lucide-react"

type TrailPoint = { id: number; x: number; y: number }

const achievements = [
  { title: "First Contact", description: "Connect with the core", target: 1 },
  { title: "Street Runner", description: "Reach 100 clicks", target: 100 },
  { title: "Chrome Fingers", description: "Reach 500 clicks", target: 500 },
  { title: "Legendary Merc", description: "Reach 1,000 clicks", target: 1000 },
]

export default function Home() {
  const [clicks, setClicks] = useState(0)
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const id = useRef(0)

  useEffect(() => {
    const move = (event: MouseEvent) => {
      const point = { id: id.current++, x: event.clientX, y: event.clientY }
      setTrail((current) => [...current.slice(-10), point])
      window.setTimeout(() => setTrail((current) => current.filter((item) => item.id !== point.id)), 500)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  const unlocked = achievements.filter((item) => clicks >= item.target).length

  return (
    <main className="cyber-shell">
      {trail.map((point) => <span key={point.id} className="trail" style={{ left: point.x, top: point.y }} aria-hidden="true" />)}
      <div className="app-frame">
        <header className="topbar">
          <div className="brand"><span className="brand-mark">N</span><span>NEON//CLICK</span></div>
          <div className="status"><b>●</b> SYSTEM ONLINE&nbsp;&nbsp; / &nbsp;&nbsp;SECTOR 07</div>
        </header>

        <section className="hero">
          <p className="eyebrow">// PROTOCOL: SANDEVISTAN</p>
          <h1>Jack in.<br /><span>Click out.</span></h1>
          <p className="sub">Overclock the network. Stack your credits. Chase the chrome and become the fastest merc in Night City.</p>
        </section>

        <section className="dashboard" aria-label="Clicker game dashboard">
          <section className="panel click-panel">
            <div className="label">Available eddies</div>
            <div className="score" aria-live="polite">{clicks.toLocaleString()}</div>
            <div className="per-sec">+ 1 EDDY / CLICK</div>
            <button className="click-core" onClick={() => setClicks((value) => value + 1)} aria-label="Click the cybernetic core">
              <span className="core-ring" aria-hidden="true" />
              JACK IN
            </button>
            <div className="hint">CLICK THE CORE TO MINT EDDIES</div>
          </section>

          <aside className="side">
            <section className="panel side-panel">
              <div className="panel-heading"><h2>ACHIEVEMENTS</h2><span className="count">{unlocked}/{achievements.length}</span></div>
              {achievements.map((achievement, index) => {
                const isUnlocked = clicks >= achievement.target
                return <div className={`achievement ${isUnlocked ? "unlocked" : "locked"}`} key={achievement.title}>
                  <div className="achievement-icon">{isUnlocked ? <Zap size={14} /> : <LockKeyhole size={13} />}</div>
                  <div className="achievement-info"><div className="achievement-title">{achievement.title}</div><div className="achievement-desc">{achievement.description}</div></div>
                  {isUnlocked && <span className="check">DONE</span>}
                </div>
              })}
            </section>
            <section className="panel side-panel">
              <div className="panel-heading"><h2>RUN STATS</h2><Activity size={15} color="var(--cyan)" /></div>
              <div className="stats"><div className="stat"><div className="stat-label">TOTAL CLICKS</div><div className="stat-value">{clicks.toLocaleString()}</div></div><div className="stat"><div className="stat-label">MULTIPLIER</div><div className="stat-value">x1.0</div></div></div>
            </section>
          </aside>
        </section>
        <footer className="footer"><span><Cpu size={11} />&nbsp; NEURAL LINK STABLE</span><span>BUILD 2.077 // v0 EDITION</span></footer>
      </div>
    </main>
  )
}
