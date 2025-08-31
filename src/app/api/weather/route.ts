import { NextResponse } from 'next/server'

// Mock weather data for Amatlán
const mockWeatherData = {
  location: 'Amatlán de Quetzalcóatl, Morelos',
  current: {
    temperature: 24,
    condition: 'Soleado',
    humidity: 65,
    windSpeed: 8,
    description: 'Perfecto para actividades al aire libre'
  },
  forecast: [
    {
      day: 'Hoy',
      high: 28,
      low: 18,
      condition: 'Soleado',
      icon: '☀️'
    },
    {
      day: 'Mañana',
      high: 26,
      low: 19,
      condition: 'Parcialmente nublado',
      icon: '⛅'
    },
    {
      day: 'Pasado mañana',
      high: 25,
      low: 17,
      condition: 'Lluvia ligera',
      icon: '🌧️'
    }
  ],
  recommendations: [
    'Excelente día para temazcal al aire libre',
    'Perfecto para senderismo en las montañas',
    'Condiciones ideales para ceremonias al amanecer'
  ]
}

export async function GET() {
  try {
    // In a real application, you would fetch from a weather API like OpenWeatherMap
    // const weatherApiKey = process.env.WEATHER_API_KEY
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Amatlan,MX&appid=${weatherApiKey}&units=metric&lang=es`)
    
    return NextResponse.json({
      success: true,
      data: mockWeatherData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}