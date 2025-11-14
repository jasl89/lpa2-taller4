'use client'

import { useEffect, useState } from 'react'
import { Users, Music, Heart, TrendingUp } from 'lucide-react'
import { usuariosService } from '@/services/usuarios'
import { cancionesService } from '@/services/canciones'
import { favoritosService } from '@/services/favoritos'
import { Cancion, FavoritoConDetalles, Usuario } from '@/types'
import { StatCard } from '@/components/ui/stat-card'
import { CardSkeleton, TableSkeleton } from '@/components/ui/skeleton'
import { formatDuration, formatDate } from '@/lib/utils'

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
        
        // Fetch all data in parallel
        const [usuarios, canciones, favoritos] = await Promise.all([
          usuariosService.getAll(0, 100),
          cancionesService.getAll(0, 100),
          favoritosService.getAll(0, 100),
        ])

        // Set stats
        setStats({
          usuarios: usuarios.length,
          canciones: canciones.length,
          favoritos: favoritos.length,
        })

        // Calculate top songs
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

        // Calculate top artists
        const artistasMap = new Map<string, number>()
        canciones.forEach(cancion => {
          artistasMap.set(cancion.artista, (artistasMap.get(cancion.artista) || 0) + 1)
        })

        const topArtistsList = Array.from(artistasMap.entries())
          .map(([artista, total]) => ({ artista, total }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5)

        setTopArtistas(topArtistsList)

        // Get recent activity
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
      } catch (error) {
        console.error('[Dashboard Error]', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <TableSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Usuarios" value={stats.usuarios} icon={Users} color="orange" />
        <StatCard label="Total Canciones" value={stats.canciones} icon={Music} color="violet" />
        <StatCard label="Total Favoritos" value={stats.favoritos} icon={Heart} color="blue" />
      </div>

      {/* Top Songs and Artists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Songs */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-orange-500" size={24} />
            <h3 className="text-lg font-bold">Top 5 Canciones</h3>
          </div>
          {topCanciones.length > 0 ? (
            <div className="space-y-3">
              {topCanciones.map((cancion, index) => (
                <div key={cancion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="font-bold text-orange-500 min-w-6">{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{cancion.titulo}</p>
                      <p className="text-sm text-gray-600 truncate">{cancion.artista}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-500">{cancion.favoritos}</p>
                    <p className="text-xs text-gray-600">favoritos</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No hay datos aún</p>
          )}
        </div>

        {/* Top Artists */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Music className="text-violet-500" size={24} />
            <h3 className="text-lg font-bold">Top 5 Artistas</h3>
          </div>
          {topArtistas.length > 0 ? (
            <div className="space-y-3">
              {topArtistas.map((artista, index) => (
                <div key={artista.artista} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-violet-500 min-w-6">{index + 1}</span>
                    <p className="font-medium text-gray-900">{artista.artista}</p>
                  </div>
                  <p className="font-bold text-violet-500">{artista.total}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No hay datos aún</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">Actividad Reciente</h3>
        {actividadReciente.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-gray-600">
                  <th className="text-left py-2">Canción</th>
                  <th className="text-left py-2">Artista</th>
                  <th className="text-left py-2">Duración</th>
                  <th className="text-left py-2">Fecha Agregada</th>
                </tr>
              </thead>
              <tbody>
                {actividadReciente.map((fav) => (
                  <tr key={fav.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{fav.cancion.titulo}</td>
                    <td className="py-3">{fav.cancion.artista}</td>
                    <td className="py-3">{formatDuration(fav.cancion.duracion)}</td>
                    <td className="py-3 text-gray-600">{formatDate(fav.fecha_agregado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No hay actividad reciente</p>
        )}
      </div>
    </div>
  )
}
