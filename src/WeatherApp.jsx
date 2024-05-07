import { useState } from "react"

export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'dc1697016e3e21a5b28b6f22c12e9c9f'

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (event) => {
        setCiudad(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (ciudad.trim() === '') return
        fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <div className="container">
            <h1>App Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type="submit">Enviar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - 273.15)}°C</p>
                        <p>Condición meteorológica: {dataClima?.weather[0]?.description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima?.weather[0]?.icon}@2x.png`} alt="icono" />
                    </div>
                )
            }
        </div>
    )
}
