import { useEffect, useState } from 'react'
import batCharging from '../../../assets/battery/battery-charging.svg'
import batteryImage from '../../../assets/battery/battery.svg'
import styles from './index.module.scss'

export const Battery = () => {
  const [battery, setBattery] = useState({
    charging: false,
    level: 1,
  })

  const getBatteryGradientBackgroundStyle = (batteryLevel: number) => {
    const gradient = `linear-gradient(0deg, ${
      batteryLevel > 0.2 ? 'lawngreen' : 'red'
    } 0%, ${batteryLevel > 0.2 ? 'lawngreen' : 'red'} ${
      batteryLevel * 100
    }%, rgba(0,0,0,0) ${batteryLevel * 100}%, rgba(0,0,0,0) 100%)`

    return gradient
  }

  useEffect(() => {
    const batteryEvents = [
      'levelchange',
      'chargingchange',
      // "chargingtimechange",
      // "dischargingtimechange",
    ]

    const getBattery = async () => {
      try {
        // navigator.getBattery() доступен только в Chrome поэтому в TS он не включен в стандарт.
        // https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/236
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const bat = await navigator.getBattery()
        batteryEvents.forEach(e => bat.addEventListener(e, setBattery))

        setBattery(bat)
      } catch (err) {
        console.warn(
          "Your browser didn't support 'navigator.getBattery' feature.",
        )
      }
    }

    getBattery().catch(console.error)

    return () => {
      // navigator.getBattery() доступен только в Chrome поэтому в TS он не включен в стандарт.
      // https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/236
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigator.getBattery().then(battery => {
        batteryEvents.forEach(e => battery.removeEventListener(e, setBattery))
      })
    }
  }, [battery])

  return (
    <div className={styles.battery}>
      <img
        className={styles.batteryImage}
        src={battery.charging ? batCharging : batteryImage}
      />
      <div
        className={styles.batteryFill}
        style={{
          background: getBatteryGradientBackgroundStyle(battery.level),
        }}
      />
    </div>
  )
}
