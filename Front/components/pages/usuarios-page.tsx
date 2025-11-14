'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, Mail, User, Calendar, Heart } from 'lucide-react'
import { usuariosService } from '@/services/usuarios'
import { Usuario } from '@/types'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { UsuarioForm } from '@/components/usuarios/usuario-form'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { FavoritosList } from '@/components/usuarios/favoritos-list'

export function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [showFavoritos, setShowFavoritos] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      const data = await usuariosService.getAll(0, 100)
      setUsuarios(data)
      setFilteredUsuarios(data)
    } catch (error) {
      console.error('[Fetch Usuarios Error]', error)
      toast.error('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  useEffect(() => {
    const filtered = usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsuarios(filtered)
  }, [searchTerm, usuarios])

  const handleSave = async (data: any) => {
    try {
      if (editingUsuario) {
        await usuariosService.update(editingUsuario.id, data)
        toast.success('Usuario actualizado correctamente')
      } else {
        await usuariosService.create(data)
        toast.success('Usuario creado correctamente')
      }
      setShowForm(false)
      setEditingUsuario(null)
      fetchUsuarios()
    } catch (error) {
      console.error('[Save Usuario Error]', error)
    }
  }

  const handleEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario)
    setShowForm(true)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await usuariosService.delete(deleteId)
      toast.success('Usuario eliminado correctamente')
      setDeleteId(null)
      fetchUsuarios()
    } catch (error) {
      console.error('[Delete Usuario Error]', error)
    }
  }

  const handleShowFavoritos = (usuarioId: number) => {
    setShowFavoritos(usuarioId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header con gradiente */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Gestión de Usuarios</h1>
              <p className="text-white/90 text-lg">
                Administra y gestiona los usuarios de la plataforma
              </p>
            </div>
            <button
              onClick={() => {
                setEditingUsuario(null)
                setShowForm(true)
              }}
              className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Nuevo Usuario
            </button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuarios por nombre o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Mostrando <span className="font-semibold text-purple-600">{filteredUsuarios.length}</span> de{' '}
            <span className="font-semibold text-purple-600">{usuarios.length}</span> usuarios
          </span>
        </div>
      </div>

      {/* Grid de usuarios con cards profesionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsuarios.map((usuario, index) => (
          <div
            key={usuario.id}
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards',
            }}
          >
            {/* Header de la card con gradiente */}
            <div className="h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -bottom-8 left-6">
                <div className="w-16 h-16 bg-white rounded-xl shadow-xl flex items-center justify-center border-4 border-white">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Contenido de la card */}
            <div className="px-6 pt-12 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{usuario.nombre}</h3>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-purple-500" />
                  <span className="text-sm truncate">{usuario.correo}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-pink-500" />
                  <span className="text-sm">{formatDate(usuario.fecha_registro)}</span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleShowFavoritos(usuario.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Favoritos</span>
                </button>
                <button
                  onClick={() => handleEdit(usuario)}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteId(usuario.id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado vacío */}
      {filteredUsuarios.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron usuarios</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm
              ? 'Intenta con otro término de búsqueda'
              : 'Comienza agregando tu primer usuario'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => {
                setEditingUsuario(null)
                setShowForm(true)
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Crear Primer Usuario
            </button>
          )}
        </div>
      )}

      {/* Formulario modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">
                {editingUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
            </div>
            <div className="p-6">
              <UsuarioForm
                usuario={editingUsuario}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false)
                  setEditingUsuario(null)
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Diálogo de confirmación */}
      {deleteId !== null && (
        <ConfirmDialog
          title="Eliminar Usuario"
          message="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* Modal de favoritos */}
      {showFavoritos !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Canciones Favoritas</h2>
                <button
                  onClick={() => setShowFavoritos(null)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <FavoritosList usuarioId={showFavoritos} onClose={() => setShowFavoritos(null)} />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
