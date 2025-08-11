import React, { StrictMode, useEffect, useRef } from "react"
import { createRoot } from "react-dom/client"
import { css, keyframes } from "@pandacss/react"

const bodyStyle = css({
  h: "100vh",
  w: "100%",
  display: "flex",
  flexWrap: "wrap",
  placeContent: "center",
  bgImage: "url('assets/texture.svg')",
  bgSize: "100px",
  fontFamily:
    "sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue'",
  scrollbarWidth: "thin",
  scrollbarColor: "white transparent",
  scrollBehavior: "smooth",
})

const containerLettersStyle = css({
  w: "220px",
  h: "220px",
  pos: "relative",
  bgColor: "#fff4",
  borderRadius: "50%",
  transform: "scale(0.8)",
})

const letterStyle = css({
  pos: "absolute",
  bgColor: "transparent",
  color: "lime",
  fontWeight: "bold",
  textTransform: "uppercase",
  userSelect: "none",
})

class Letter {
  constructor(container) {
    this.letter = document.createElement("div")
    this.letter.className = letterStyle
    container.appendChild(this.letter)
  }
  setContent(content) {
    this.letter.innerHTML = content
  }
  setRotate(deg) {
    this.letter.style.transform = `rotate(${deg}deg)`
  }
  setDimension(width, height) {
    this.letter.style.width = width + "px"
    this.letter.style.height = height + "px"
    this.width = width
    this.height = height
  }
  setPosition(x, y) {
    this.offsetLeft = this.width / 2
    this.offsetTop = this.height / 2
    this.x = x
    this.y = y
    this.letter.style.left = x - this.offsetLeft + "px"
    this.letter.style.top = y - this.offsetTop + "px"
  }
}

function CircleLetters() {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const message =
      "La humanidad programa su destino, una línea de código a la vez"
    const n_letters = message.length
    let angle = -Math.PI
    const increase = (Math.PI * 2) / n_letters
    const containerLetters = []

    for (let i = 0; i < n_letters; i++) {
      const letra = new Letter(container)
      letra.setDimension(150, 150)
      letra.setContent(message.charAt(i))
      containerLetters.push(letra)
    }

    const rotateLetter = () => {
      const radio = 100 * Math.sin(angle)
      for (let i = 0; i < n_letters; i++) {
        const x = radio * Math.cos(angle) + 110
        const y = radio * Math.sin(angle) + 110
        const deg = (Math.atan2(y - 110, x - 110) * 180) / Math.PI + 90
        containerLetters[i].setPosition(x, y)
        containerLetters[i].setRotate(deg)
        angle += increase
      }
      angle += 0.04
    }
    const interval = setInterval(rotateLetter, 30)
    return () => clearInterval(interval)
  }, [])

  return <main ref={containerRef} className={containerLettersStyle}></main>
}

function App() {
  return (
    <div className={bodyStyle}>
      <CircleLetters />
    </div>
  )
}

const rootDiv = document.createElement("div")
document.body.appendChild(rootDiv)

createRoot(rootDiv).render(
  <StrictMode>
    <App />
  </StrictMode>
)
