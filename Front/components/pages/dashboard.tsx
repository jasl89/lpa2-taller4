'use client'

import { useEffect, useState } from 'react'
import { Users, Music, Heart, TrendingUp } from 'lucide-react'
import { usuariosService } from '@/services/usuarios'
import { cancionesService } from '@/services/canciones'
import { favoritosService } from '@/services/favoritos'
import { Cancion, FavoritoConDetalles } from '@/types'
import { formatDuration, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

export function Dashboard() {
  const [stats, setStats] = useState({ usuarios: 0, canciones: 0, favoritos: 0 })
  const [topCanciones, setTopCanciones] = useState<(Cancion & { favoritos: number })[]>([])
  const [topArtistas, setTopArtistas] = useState<{ artista: string; total: number }[]>([])
  const [actividadReciente, setActividadReciente] = useState<FavoritoConDetalles[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        
        const [usuarios, canciones, favoritos] = await Promise.all([
          usuariosService.getAll(0, 100),
          cancionesService.getAll(0, 100),
          favoritosService.getAll(0, 100),
        ])

        setStats({
          usuarios: usuarios.length,
          canciones: canciones.length,
          favoritos: favoritos.length,
        })

        const cancionesMap = new Map(canciones.map(c => [c.id, c]))
        const favoritosPorCancion = new Map<number, number>()
        
        favoritos.forEach(fav => {
          favoritosPorCancion.set(fav.cancion_id, (favoritosPorCancion.get(fav.cancion_id) || 0) + 1)
        })

        const topSongs = Array.from(favoritosPorCancion.entries())
          .map(([cancionId, count]) => ({
            ...cancionesMap.get(cancionId)!,
            favoritos: count,
          }))
          .sort((a, b) => b.favoritos - a.favoritos)
          .slice(0, 5)

        setTopCanciones(topSongs)

        const artistasMap = new Map<string, number>()
        canciones.forEach(cancion => {
          artistasMap.set(cancion.artista, (artistasMap.get(cancion.artista) || 0) + 1)
        })

        const topArtistsList = Array.from(artistasMap.entries())
          .map(([artista, total]) => ({ artista, total }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5)

        setTopArtistas(topArtistsList)

        const actividadRaw = await Promise.all(
          favoritos.slice(0, 5).map(async (fav) => {
            const cancion = cancionesMap.get(fav.cancion_id)
            if (cancion) {
              return {
                ...fav,
                cancion,
              }
            }
            return null
          })
        )
        
        setActividadReciente(actividadRaw.filter(Boolean) as FavoritoConDetalles[])
      } catch (error: any) {
        console.error('[Dashboard Error]', error)
        toast.error('Error al cargar el dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
          <div className="h-20 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-36 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {[1, 2].map(i => (
              <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-violet-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Vista general de la plataforma de música</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
            <div className="p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-12 h-12 opacity-90 group-hover:scale-110 transition-transform" />
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-semibold">Total</span>
                </div>
              </div>
              <p className="text-5xl font-bold mb-1">{stats.usuarios}</p>
              <p className="text-orange-100 text-sm font-medium">Usuarios Registrados</p>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
            <div className="p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Music className="w-12 h-12 opacity-90 group-hover:scale-110 transition-transform" />
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-semibold">Catálogo</span>
                </div>
              </div>
              <p className="text-5xl font-bold mb-1">{stats.canciones}</p>
              <p className="text-violet-100 text-sm font-medium">Canciones Disponibles</p>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-12 h-12 opacity-90 group-hover:scale-110 transition-transform" />
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-semibold">Me Gusta</span>
                </div>
              </div>
              <p className="text-5xl font-bold mb-1">{stats.favoritos}</p>
              <p className="text-pink-100 text-sm font-medium">Favoritos Totales</p>
            </div>
          </div>
        </div>

        {/* Top Songs and Artists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Top Songs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
              <div className="flex items-center gap-3 text-white">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-xl font-bold">Top 5 Canciones</h3>
              </div>
            </div>
            <div className="p-6">
              {topCanciones.length > 0 ? (
                <div className="space-y-3">
                  {topCanciones.map((cancion, index) => (
                    <div 
                      key={cancion.id} 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{cancion.titulo}</p>
                        <p className="text-sm text-gray-600 truncate">{cancion.artista}</p>
                        {cancion.genero && (
                          <span className="inline-block mt-1 text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                            {cancion.genero}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-lg">
                        <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                        <span className="font-bold text-rose-600 text-lg">{cancion.favoritos}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Music className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No hay canciones favoritas aún</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Artists */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-violet-500 to-violet-600 p-6">
              <div className="flex items-center gap-3 text-white">
                <Users className="w-6 h-6" />
                <h3 className="text-xl font-bold">Top 5 Artistas</h3>
              </div>
            </div>
            <div className="p-6">
              {topArtistas.length > 0 ? (
                <div className="space-y-3">
                  {topArtistas.map((artista, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-violet-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-full text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{artista.artista}</p>
                        <p className="text-sm text-gray-600">{artista.total} {artista.total === 1 ? 'canción' : 'canciones'}</p>
                      </div>
                      <div className="bg-violet-50 px-4 py-2 rounded-lg">
                        <Music className="w-5 h-5 text-violet-600" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No hay artistas aún</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <div className="flex items-center gap-3 text-white">
              <Heart className="w-6 h-6" />
              <h3 className="text-xl font-bold">Actividad Reciente</h3>
            </div>
          </div>
          <div className="p-6">
            {actividadReciente.length > 0 ? (
              <div className="space-y-3">
                {actividadReciente.map((actividad) => (
                  <div 
                    key={actividad.id} 
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full shadow-md flex-shrink-0">
                        <Heart className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {actividad.cancion.titulo}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {actividad.cancion.artista}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 sm:ml-auto">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                        {formatDate(actividad.fecha_agregado)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No hay actividad reciente</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
