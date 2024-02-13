using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaSeven.Models;
using System.Net.NetworkInformation;
using System.Threading;

namespace PruebaTecnicaSeven.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ProyectosController : ControllerBase
	{
		private SevenContext _sc;

		public ProyectosController(SevenContext sc)
		{
			_sc = sc;
		}

		
		[HttpGet]
		[Route("ObtenerCantidadesProyectos")]
		public ActionResult ObtenerCantidadesProyectos()
		{
			var cantidades = _sc.Estado
				.GroupJoin(_sc.Proyectos,
				estado => estado.Id,
				proyecto => proyecto.Estado,
				(estado, proyecto) => new
				{
					Estado = estado.Nombre,
					Cantidad = proyecto.Count()
				})
				.OrderBy(x => x.Estado)
				.ToList();
			return StatusCode(StatusCodes.Status200OK, cantidades);
		}

		
		[HttpGet]
		[Route("ObtenerEstados")]
		public ActionResult ObtenerEstados()
		{
			try
			{
				var estados = _sc.Estado.ToList();
				return StatusCode(StatusCodes.Status200OK, estados);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpGet("ObtenerUsuariosVinculados/{idProyecto}")]
		public ActionResult ObtenerUsuariosVinculados(int idProyecto)
		{
			try
			{
				var usuarios = _sc.Usuarios.Join(_sc.UsuarioProyecto,
												usuario=>usuario.Id,
												usuarioProyecto=>usuarioProyecto.UsuarioId,
												(usuario, usuarioProyecto) => new
												{
													ProyectoId = usuarioProyecto.ProyectoId,
													ProyectoUsuarioId = usuarioProyecto.Id,
													usuario=usuario.Usuario,
												}).Where(x=>x.ProyectoId == idProyecto).ToList();
				return StatusCode(StatusCodes.Status200OK, usuarios);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpPost("AgregarUsuariosVinculados/{idProyecto}/{idUsuario}")]
		public ActionResult AgregarUsuariosVinculados(int idProyecto, int idUsuario)
		{
			try
			{
				UsuarioProyecto usuario = new UsuarioProyecto();
				usuario.ProyectoId = idProyecto;
				usuario.UsuarioId = idUsuario;
				_sc.Add(usuario);
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpDelete("EliminarUsuariosVinculados/{id}")]
		public ActionResult EliminarUsuariosVinculados(int id)
		{
			try
			{
				var usuario = _sc.UsuarioProyecto.Where(x => x.Id == id).FirstOrDefault();
				_sc.Remove(usuario);
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpGet("{idUser:int}/{page:int}/{tamanio:int}/{status:int}")]
		public ActionResult<Proyectos> ObtenerProyectos(int idUser, int page, int tamanio, int status)
		{
			try
			{
				var proyectos = _sc.Proyectos.Where(x => x.Estado == status).ToList();
				proyectos = proyectos.Skip((page - 1) * tamanio)
								.Take(tamanio)
								.ToList();
				return Ok(proyectos);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpGet]
		[Route("ObtenerProyectosCompleto")]
		public ActionResult ObtenerProyectosCompleto()
		{
			try
			{
				var proyectos = _sc.Proyectos.ToList();
				
				return Ok(proyectos);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpGet("{id:int}")]
		public ActionResult<Proyectos> ObtenerProyecto(int id)
		{
			try
			{
				var proyectos = _sc.Proyectos.Find(id);
				return Ok(proyectos);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpPost]
		public ActionResult<Proyectos> CrearProyecto([FromBody] Proyectos proyectos)
		{
			try
			{
				if (proyectos == null)
				{
					return BadRequest(proyectos);
				}
				var proyectoBuscador = _sc.Proyectos.Where(x => x.Nombre == proyectos.Nombre).ToList();
				if (proyectoBuscador.Count() > 0)
				{
					return StatusCode(StatusCodes.Status200OK, "ProyectoExiste");
				}
				Proyectos proyecto = new Proyectos();
				proyecto.Nombre = proyectos.Nombre;
				proyecto.FechaCreacion = DateTime.Now;
				proyecto.Estado = 1;
				_sc.Add(proyecto);
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Error");
			}
		}

		
		[HttpPut("{tipoAccion:int}")]
		public ActionResult<Proyectos> EditarProyecto([FromBody] Proyectos proyectos, int tipoAccion)
		{
			//1 editar, 2 eliminar
			try
			{
				if (proyectos == null)
				{
					return BadRequest(proyectos);
				}
				var proyecto = _sc.Proyectos.Where(x => x.Id == proyectos.Id).FirstOrDefault();
				if (tipoAccion == 2)
				{
					proyecto.Estado = 4;
					_sc.SaveChanges();
					return StatusCode(StatusCodes.Status200OK, "OK");
				}
				var proyectoBuscador = _sc.Proyectos.Where(x => x.Nombre == proyectos.Nombre && x.Id != proyectos.Id).ToList();
				if (proyectoBuscador.Count() > 0)
				{
					return StatusCode(StatusCodes.Status200OK, "ProyectoExiste");
				}
				
				proyecto.Nombre = proyectos.Nombre;
				proyecto.Estado = proyectos.Estado;
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Error");
			}
		}

		
		[HttpDelete("{id:int}")]
		public ActionResult<Proyectos> EliminarProyecto(int id)
		{
			//1 editar, 2 eliminar
			try
			{
				var proyecto = _sc.Proyectos.Where(x => x.Id == id).FirstOrDefault();
				_sc.Remove(proyecto);
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Error");
			}
		}
	}
}
