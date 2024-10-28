"use client"

import { useState, useEffect } from 'react'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList } from 'recharts'
import { AlertCircle, Bus, Leaf, Zap, Thermometer, Droplets, Wind, Bike, Car, Train, PersonStanding, Battery, TreeDeciduous, Building2, PlugZap, BatteryCharging, Plug, CheckCircle2, XCircle } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Dynamic data generation
const generateDynamicData = () => {
  return {
    co2Data: [
      { month: 'Jan', emissions: 1200 },
      { month: 'Feb', emissions: 1150 },
      { month: 'Mär', emissions: 1100 },
      { month: 'Apr', emissions: 1050 },
      { month: 'Mai', emissions: 1000 },
      { month: 'Jun', emissions: 950 },
    ],
    energyData: [
      { source: 'Solar', value: 35, color: '#FFD700' },
      { source: 'Wind', value: 25, color: '#87CEEB' },
      { source: 'Wasserkraft', value: 15, color: '#1E90FF' },
      { source: 'Biomasse', value: 10, color: '#228B22' },
      { source: 'Geothermie', value: 5, color: '#8B4513' },
      { source: 'Fossile Brennstoffe', value: 10, color: '#A9A9A9' },
    ],
    transportData: [
      { mode: 'Bus', users: 15000, icon: Bus },
      { mode: 'Straßenbahn', users: 12000, icon: Train },
      { mode: 'Fahrrad', users: 8000, icon: Bike },
      { mode: 'E-Bike', users: 3000, icon: Battery },
      { mode: 'Carsharing', users: 5000, icon: Car },
      { mode: 'Zu Fuß', users: 10000, icon: PersonStanding },
    ],
    weatherData: {
      temperature: 22,
      humidity: 60,
    },
    mobilityData: {
      activeStations: 25,
      totalStations: 30,
      smartCharging: 18,
      availableStations: 7,
      stationDetails: [
        { id: 1, name: "Hauptbahnhof", status: "Aktiv", type: "Schnellladestation", power: "150 kW" },
        { id: 2, name: "Rathaus", status: "Verfügbar", type: "Normalladestation", power: "22 kW" },
        { id: 3, name: "Stadtpark", status: "Aktiv", type: "Normalladestation", power: "11 kW" },
        { id: 4, name: "Einkaufszentrum", status: "Außer Betrieb", type: "Schnellladestation", power: "50 kW" },
        { id: 5, name: "Schwimmbad", status: "Aktiv", type: "Normalladestation", power: "22 kW" },
      ]
    },
    airQualityIndex: 65,
    airQualityData: [
      { pollutant: 'PM2.5', value: 10, limit: 25 },
      { pollutant: 'PM10', value: 20, limit: 50 },
      { pollutant: 'NO2', value: 25, limit: 40 },
      { pollutant: 'O3', value: 60, limit: 120 },
    ],
    impactData: [
      { initiative: 'LED-Straßenbeleuchtung', co2Reduction: 500, costSavings: 50000, icon: Zap },
      { initiative: 'Gebäudedämmung', co2Reduction: 800, costSavings: 75000, icon: Leaf },
      { initiative: 'Solaranlagen auf öffentlichen Gebäuden', co2Reduction: 1200, costSavings: 100000, icon: Battery },
      { initiative: 'Elektrobus-Flotte', co2Reduction: 1500, costSavings: 120000, icon: Bus },
      { initiative: 'Urbane Grünflächen', co2Reduction: 300, costSavings: 30000, icon: TreeDeciduous },
    ],
    trafficData: [
      { line: 'Bus 101', delay: 3, district: 'Mitte → Ost', time: '07:30 - 19:30', icon: Bus },
      { line: 'Tram 1', delay: 0, district: 'Ost → West', time: '06:00 - 23:00', icon: Train },
      { line: 'Bus 202', delay: 12, district: 'West → Süd', time: '08:00 - 20:00', icon: Bus },
      { line: 'Tram 2', delay: 7, district: 'Süd → Nord', time: '05:30 - 22:30', icon: Train },
      { line: 'Bus 303', delay: 1, district: 'Nord → Mitte', time: '07:00 - 19:00', icon: Bus },
    ],
  }
}

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function SustainabilityDashboardComponent() {
  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState(generateDynamicData())

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateDynamicData())
    }, 5000)  // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return 'bg-green-500'
    if (aqi <= 100) return 'bg-yellow-400'
    if (aqi <= 150) return 'bg-orange-400'
    if (aqi <= 200) return 'bg-red-500'
    return 'bg-purple-500'
  }

  const getAirQualityText = (aqi) => {
    if (aqi <= 50) return 'Sehr gut'
    if (aqi <= 100) return 'Gut'
    if (aqi <= 150) return 'Mäßig'
    if (aqi <= 200) return 'Schlecht'
    return 'Sehr schlecht'
  }

  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Building2 className="h-10 w-10 text-emerald-600 mr-2" />
          <h1 className="text-3xl font-bold text-slate-800">Smart City Dashboard</h1>
        </div>
        <span className="text-2xl font-semibold text-slate-600">Nachhaltigkeit</span>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white border border-slate-200">
          <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">Übersicht</TabsTrigger>
          <TabsTrigger value="energy" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">Energie</TabsTrigger>
          <TabsTrigger value="transport" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">Transport</TabsTrigger>
          <TabsTrigger value="environment" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">Umwelt</TabsTrigger>
          <TabsTrigger value="impact" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">Auswirkungsanalyse</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-800">Gesamte CO2-Emissionen</CardTitle>
                <AlertCircle className="h-6 w-6 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{formatNumber(data.co2Data[data.co2Data.length - 1].emissions)} t</div>
                <p className="text-xs text-slate-600">-5% gegenüber dem Vormonat</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-800">Erneuerbare Energie</CardTitle>
                <Zap className="h-6 w-6 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {Math.round((data.energyData.reduce((sum, item) => sum + (item.source !== 'Fossile Brennstoffe' ? item.value : 0), 0) / 
                    data.energyData.reduce((sum, item) => sum + item.value, 0)) * 100)}%
                </div>
                <p className="text-xs text-slate-600">+3% gegenüber dem Vormonat</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-800">ÖPNV-Nutzung</CardTitle>
                <Bus className="h-6 w-6 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{formatNumber(data.transportData.reduce((sum, item) => sum + item.users, 0))} Fahrten</div>
                <p className="text-xs text-slate-600">+8% gegenüber dem Vormonat</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-800">Grünflächen</CardTitle>
                <TreeDeciduous className="h-6 w-6 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">135 Hektar</div>
                <p className="text-xs text-slate-600">+5 Hektar gegenüber dem Vorjahr</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">CO2-Emissionstrend</CardTitle>
              <CardDescription className="text-slate-600">Monatliche CO2-Emissionen in t</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.co2Data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Monat', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'CO2-Emissionen (t)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="emissions" stroke="hsl(152, 76%, 36%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy" className="space-y-4">
          <Card className="bg-white border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Energieverbrauch nach Quelle</CardTitle>
              <CardDescription className="text-slate-600">Verteilung der Energiequellen</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={data.energyData}
                    dataKey="value"
                    nameKey="source"
                    
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {data.energyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [formatNumber(value), name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-white border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Energieverbrauch Details</CardTitle>
              <CardDescription className="text-slate-600">Detaillierte Aufschlüsselung nach Energiequelle</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Energiequelle</TableHead>
                    <TableHead>Verbrauch (MWh)</TableHead>
                    <TableHead>Anteil</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.energyData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.source}</TableCell>
                      <TableCell>{formatNumber(item.value)}</TableCell>
                      <TableCell>{((item.value / data.energyData.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white border border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-800">ÖPNV-Nutzung</CardTitle>
                <CardDescription className="text-slate-600">Anzahl der Nutzer nach Verkehrsmittel</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.transportData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" label={{ value: 'Anzahl der Nutzer', position: 'insideBottom', offset: -5 }} />
                    <YAxis dataKey="mode" type="category" label={{ value: 'Verkehrsmittel', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => formatNumber(value)} />
                    <Legend />
                    <Bar dataKey="users" fill="#3b82f6">
                      {data.transportData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#3b82f6" />
                      ))}
                      <LabelList dataKey="users" position="right" formatter={(value) => formatNumber(value)} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-800">E-Mobilität Stationen</CardTitle>
                <CardDescription className="text-slate-600">Aktive und Gesamtzahl der Stationen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-800 flex items-center">
                        <PlugZap className="mr-2 h-5 w-5 text-blue-500" />
                        Aktive Stationen
                      </span>
                      <span className="text-slate-800">{data.mobilityData.activeStations} / {data.mobilityData.totalStations}</span>
                    </div>
                    <Progress value={(data.mobilityData.activeStations / data.mobilityData.totalStations) * 100} className="bg-slate-200" indicatorClassName="bg-blue-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-800 flex items-center">
                        <BatteryCharging className="mr-2 h-5 w-5 text-green-500" />
                        Smartes Laden
                      </span>
                      <span className="text-slate-800">{data.mobilityData.smartCharging} Stationen</span>
                    </div>
                    <Progress value={(data.mobilityData.smartCharging / data.mobilityData.totalStations) * 100} className="bg-slate-200" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-800 flex items-center">
                        <Plug className="mr-2 h-5 w-5 text-purple-500" />
                        Verfügbare Stationen
                      </span>
                      <span className="text-slate-800">{data.mobilityData.availableStations}</span>
                    </div>
                    <Progress value={(data.mobilityData.availableStations / data.mobilityData.totalStations) * 100} className="bg-slate-200" indicatorClassName="bg-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-white border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">E-Ladestationen Details</CardTitle>
              <CardDescription className="text-slate-600">Aktuelle Informationen zu den E-Ladestationen</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Standort</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Leistung</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.mobilityData.stationDetails.map((station, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{station.name}</TableCell>
                      <TableCell>
                        {station.status === "Aktiv" && <CheckCircle2 className="inline-block mr-2 h-5 w-5 text-green-500" />}
                        {station.status === "Verfügbar" && <Plug className="inline-block mr-2 h-5 w-5 text-blue-500" />}
                        {station.status === "Außer Betrieb" && <XCircle className="inline-block mr-2 h-5 w-5 text-red-500" />}
                        {station.status}
                      </TableCell>
                      <TableCell>{station.type}</TableCell>
                      <TableCell>{station.power}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-800">Temperatur</CardTitle>
                <Thermometer className="h-6 w-6 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{data.weatherData.temperature}°C</div>
                <p className="text-sm text-slate-600 mt-1">Aktuelle Stadttemperatur</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-800">Luftfeuchtigkeit</CardTitle>
                <Droplets className="h-6 w-6 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{data.weatherData.humidity}%</div>
                <p className="text-sm text-slate-600 mt-1">Aktuelle Luftfeuchtigkeit</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-800">Luftqualitätsindex</CardTitle>
                <Wind className="h-6 w-6 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-slate-900">{data.airQualityIndex}</div>
                  <div className={`px-2 py-1 rounded-full text-white text-xs ${getAirQualityColor(data.airQualityIndex)}`}>
                    {getAirQualityText(data.airQualityIndex)}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getAirQualityColor(data.airQualityIndex)}`} 
                      style={{ width: `${Math.min(data.airQualityIndex / 2, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-white border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Luftqualität Details</CardTitle>
              <CardDescription className="text-slate-600">Aktuelle Schadstoffwerte und Grenzwerte</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Schadstoff</TableHead>
                    <TableHead>Aktueller Wert (µg/m³)</TableHead>
                    <TableHead>Grenzwert (µg/m³)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.airQualityData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.pollutant}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.limit}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-white text-xs ${
                          item.value <= item.limit ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {item.value <= item.limit ? 'Eingehalten' : 'Überschritten'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card className="bg-white border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Umweltauswirkungsanalyse</CardTitle>
              <CardDescription className="text-slate-600">Vergleich verschiedener Nachhaltigkeitsinitiativen</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100">
                    <TableHead className="text-slate-800">Initiative</TableHead>
                    <TableHead className="text-slate-800">CO2-Reduktion (Tonnen/Jahr)</TableHead>
                    <TableHead className="text-slate-800">Kosteneinsparungen (€/Jahr)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.impactData.map((item) => (
                    <TableRow key={item.initiative} className="border-b border-slate-200">
                      <TableCell className="text-slate-800">
                        <div className="flex items-center">
                          {item.icon && <item.icon className="mr-2 h-5 w-5 text-emerald-600" />}
                          {item.initiative}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-800">{formatNumber(item.co2Reduction)}</TableCell>
                      <TableCell className="text-slate-800">{formatNumber(item.costSavings)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="bg-white border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Gesamtauswirkung der Initiativen</CardTitle>
              <CardDescription className="text-slate-600">Kumulierte CO2-Reduktion und Kosteneinsparungen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Jährliche CO2-Reduktion</h3>
                  <div className="text-3xl font-bold text-emerald-600">
                    {formatNumber(data.impactData.reduce((sum, item) => sum + item.co2Reduction, 0))} Tonnen
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Jährliche Kosteneinsparungen</h3>
                  <div className="text-3xl font-bold text-emerald-600">
                    {formatNumber(data.impactData.reduce((sum, item) => sum + item.costSavings, 0))} €
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Szenarioanalyse</CardTitle>
              <CardDescription className="text-slate-600">Projektion der CO2-Emissionen basierend auf verschiedenen Maßnahmen</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-slate-800">Diese Sektion würde interaktive Tools zur Szenarioanalyse enthalten, mit denen Stadtplaner die Auswirkungen verschiedener Nachhaltigkeitsmaßnahmen simulieren können.</p>
              <p className="text-slate-800">Beispiele für Analyseoptionen:</p>
              <ul className="list-disc pl-6 text-slate-800">
                <li>Auswirkungen der Erhöhung des Radverkehrsanteils um 10%</li>
                <li>CO2-Einsparungen durch Umstellung auf 100% erneuerbare Energien in öffentlichen Gebäuden</li>
                <li>Effekte der Einführung einer Niedrigemissionszone im Stadtzentrum</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">Powered by ELKO Int. GmbH</p>
      </div>
    </div>
  )
}