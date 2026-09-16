import styles from "./login.module.css"
import bgc1 from "@/assets/login/bg-login-component-1.png"
import bgc2 from "@/assets/login/bg-login-component-2.png"
import bgc3 from "@/assets/login/bg-login-component-3.png"
import bgc4 from "@/assets/login/bg-login-component-4.png"
import bgc5 from "@/assets/login/bg-login-component-5.png"

import { useTranslation } from 'react-i18next'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Form, Checkbox, Button } from '@douyinfe/semi-ui'
import { IconUser, IconLock, IconAlertCircle } from '@douyinfe/semi-icons'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

const X_MAX = 40
const Y_MAX = 20

function env(x: number) {
  return Math.sin(Math.PI * x / X_MAX)
}

function waveY(
  x: number,
  t: number,
  amp: number,
  k: number,
  omega: number,
  phase: number = 0,
  extra: (x: number) => number = () => 0,
) {
  return (x / X_MAX) * Y_MAX + extra(x) + amp * Math.sin(k * x - omega * t + phase) * env(x)
}

function generateCloseCurve(
  ctx: CanvasRenderingContext2D,
  fn: (x: number) => number,
  containerSize: [width: number, height: number],
  xRange: [min: number, max: number],
  yRange: [min: number, max: number],
  scale: [x: number, y: number],
  fillColor: string = "#FFFFFF",
  step: number = 0.05,
): void {
  if (step <= 0) return
  const xScale = scale[0]
  const yScale = scale[1]
  const xOffset = xRange[0]
  const yOffset = yRange[0]
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(0, 0)
  for (let x = xRange[0] + step; x <= xRange[1]; x += step) {
    const y = fn(x)
    const realX = (x - xOffset) * xScale
    const realY = (y - yOffset) * yScale
    ctx.lineTo(realX, realY)
  }
  ctx.lineTo(containerSize[0], 0) // Connect path to the right and bottom point
  ctx.closePath()
  ctx.fillStyle = fillColor
  ctx.fill()
  ctx.restore()
}

function RouteComponent() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const [formApi, _formState, _formValues] = Form.useForm()
  const bgWaveCanvasRef = useRef<HTMLCanvasElement>(null)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const submitLogin = () => {
    const values = formApi.getValues()
    if (values.username === 'admin' && values.password === '123456') {
      setErrorMessage(null)
      navigate({ to: '/' })
    } else {
      setErrorMessage('Invalid username or password')
    }
  }

  useEffect(() => {
    const canvas = bgWaveCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    canvas.width = Math.floor(canvas.clientWidth)
    canvas.height = Math.floor(canvas.clientHeight)

    let raf = 0
    const t0 = performance.now()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const drawBgWave = (now: number) => {
      const t = reduceMotion ? 0 : (now - t0) / 1000

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dpr, 0, 0, -dpr, 0, canvas.height)

      // Draw wave curve 2: \frac{x}{2}+\sin\left(x\right)
      generateCloseCurve(
        ctx,
        (x) => waveY(x, t, 0.9, 0.5, 1.2, 0.6, (x) => (x * (30 - x) / 200) * (1 + 0.4 * Math.cos(x / 4))),
        [canvas.width, canvas.height * .8],
        [0, 40],
        [0, 20],
        [canvas.width / 40, canvas.height / 20],
        "#CFDEF3",
        0.05
      )
      // Draw wave curve 1: \frac{x}{2}+\sin\left(\frac{x}{2}\right)
      generateCloseCurve(
        ctx,
        (x) => waveY(x, t, 1.2, 0.5, 0.8),
        [canvas.width, canvas.height],
        [0, 40],
        [0, 20],
        [canvas.width / 40, canvas.height / 20],
        "#DCE8F6",
        0.05
      )

      if (!reduceMotion) raf = requestAnimationFrame(drawBgWave)
    }

    raf = requestAnimationFrame(drawBgWave)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-bl from-[#F1F6FF] to-[#DFEBF7]">
      {/* Context here */}
      <div className="w-full md:w-[50%] h-full flex justify-center md:justify-start 2xl:justify-end items-center md:mx-[100px] 2xl:mx-0 relative z-50">
        <section
          className="w-[580px] h-auto flex flex-col"
          aria-label="Login form"
          aria-describedby='for show title and slogan and login form'
        >
          <header className="mb-9">
            <h1 className="h0">
              {t('page.login.welcome')}
            </h1>
            <div
              className="w-[240px] h-[10px] mb-2 bg-gradient-to-r from-[#DED6EE] via-[#C8C7EA] to-[#BECBEC]"
            />
            <p className="h4">
              {t('page.login.slogan')}
            </p>
          </header>
          <Form labelPosition="top" form={formApi}>
            <Form.Input
              field="username"
              label={t('page.login.form.username')}
              prefix={<IconUser />}
              placeholder={t('page.login.form.username')}
              size="large"
              className="!h-[60px]"
            />
            <Form.Input
              field="password"
              label={t('page.login.form.password')}
              mode="password"
              prefix={<IconLock />}
              placeholder={t('page.login.form.password')}
              size="large"
              className="!h-[60px]"
            />
            {errorMessage && (
              <div className="flex items-center gap-2 text-red-500">
                <IconAlertCircle />{errorMessage}
              </div>
            )}
            <div className="mb-6 flex items-center justify-between">
              <Checkbox>{t('page.login.form.remember')}</Checkbox>
              <a className="text-[#1F232999]" href="/forgot-password">{t('page.login.form.forgot')}</a>
            </div>  

            <Button theme="solid" type="primary" htmlType="button" className="!h-[60px]" block onClick={submitLogin}>
              {t('page.login.form.login')}
            </Button>
          </Form>
        </section>
      </div>
      {/* Background content here */}
      <div className="w-[75%] h-[75%] absolute bottom-0 right-0">
        <canvas ref={bgWaveCanvasRef} className="w-full h-full"></canvas>
        <div
          className="hidden md:block w-2/3 h-2/3 absolute bottom-0 right-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-full h-full bottom-[1.25%] left-0 absolute overflow-hidden" aria-label="bgc5-box">
            <img src={bgc5} alt="" decoding="async" className="max-w-none w-[250%] aspect-[689/362] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="w-3/4 h-3/4 bottom-[2.5%] left-[12.5%] absolute overflow-hidden" aria-label="bgc4-box">
            <img src={bgc4} alt="" decoding="async" className="max-w-none w-[200%] aspect-[689/362] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className={`w-3/4 h-3/4 bottom-0 left-0 absolute overflow-hidden ${styles['login-bob-slow']}`} aria-label="bgc3-box">
            <img src={bgc3} alt="" decoding="async" className="max-w-none w-[200%] aspect-[689/362] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className={`w-1/2 h-1/2 bottom-0 left-0 absolute overflow-hidden ${styles['login-bob-mid']}`} aria-label="bgc2-box">
            <img src={bgc2} alt="" decoding="async" className="max-w-none w-[200%] aspect-[689/362] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className={`w-1/4 aspect-square bottom-[5%] left-[45%] absolute overflow-hidden ${styles['login-bob-fast']}`} aria-label="bgc1-box">
            <img src={bgc1} alt="" decoding="async" className="max-w-none w-[600%] aspect-[689/362] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </main>
  )
}
