import { useEffect, useState } from 'react'
import styles from './index.module.scss'

interface TWeatherParams {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
}

export const Weather = () => {
  const baseApiURL = 'https://api.weatherapi.com/v1/current.json?'
  const apiKey = '5fdb18f0441248dcbd2175103230906'

  const [weatherParams, setWeatherParams] = useState<TWeatherParams>()
  // const [error, setError] = useState('')

  const errorHandler = (err: string) => {
    // setError(err)
    console.warn(err)
  }

  useEffect(() => {
    const getWeather = async () => {
      const queryParams = {
        key: apiKey,
        q: '',
        aqi: 'no',
        lang: 'ru',
      }

      navigator.geolocation.getCurrentPosition(
        async position => {
          queryParams.q = `${position.coords.latitude},${position.coords.longitude}`
          const response = await fetch(
            baseApiURL + new URLSearchParams(queryParams),
          )

          if (response.ok) {
            const json: { current: TWeatherParams } = await response.json()
            setWeatherParams(json.current)
          } else {
            errorHandler('Ошибка HTTP: ' + response.status)
          }
        },
        () => {
          errorHandler('Ошибка при получении геолокации')
        },
      )
    }

    getWeather()
  }, [])

  return weatherParams ? (
    <div className={styles.weather}>
      <img
        className={styles.weatherImage}
        src={
          `https:${weatherParams.condition.icon}` ||
          `http:${weatherParams.condition.icon}`
        }
      />
      <p className={styles.temperature}>
        {Math.round(weatherParams.temp_c)} °C
      </p>
    </div>
  ) : null
}
