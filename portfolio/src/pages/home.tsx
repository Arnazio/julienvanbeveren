import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch, useScreen } from '@julienvanbeveren/hooks'
import Project, { ProjectData } from '../components/Project'
// @ts-ignore
import GLOBE from 'vanta/dist/vanta.globe.min'
    
export default function Homepage() {

    const navigate = useNavigate()
    const { loading, error, data } = useFetch<ProjectData[]>('https://raw.githubusercontent.com/julienvanbeveren/julienvanbeveren/main/projects/projects.json')
    const { screen } = useScreen([{ name: 'mobile', maxWidth: 480 }, { name: 'desktop', minWidth: 480 }])

    useEffect(() => {
        let vantaEffect: any
        if (screen == 'desktop') {
            vantaEffect = GLOBE({
                el: '#hero',
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x1fa8ed,
                color2: 0xffffff,
                backgroundColor: 0x0f0f1c
            })
        }
        return () => vantaEffect && vantaEffect.destroy()
    }, [screen])

    return (
        <main>
            <section id="hero">
                <div className="container hero">
                    <div className="hero-wrapper">
                        <h1>Hello 👋, I am Julien<br/>I am a webdeveloper</h1>
                        <h2>Welcome to my portfolio</h2>
                        <p></p>
                        {/* <button onClick={() => navigate('/#projects')}>explore projects</button> */}
                    </div>
                </div>
            </section>
            <section id="projects">
                <div className="container">
                    <h1 className="section-title">Projects</h1>
                    <div className="dividor"></div>
                    <div className="projects-grid">
                        {data && data
                        .sort((a,b) => b.date - a.date)
                        .filter(project => project.highlight)
                        .map((project, i) => {
                            return <Project data={project} key={i} delay={i*100}/>
                        })}
                    </div>
                </div>
            </section>
            {/* <section id="about">
                <div className="container">
                    <h1 className="section-title">About me</h1>
                    <div className="dividor"></div>
                    
                </div>
            </section> */}
        </main>
  )
}
