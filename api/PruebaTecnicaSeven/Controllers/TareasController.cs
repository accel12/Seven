using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PruebaTecnicaSeven.Models;

namespace PruebaTecnicaSeven.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TareasController : ControllerBase
	{
		private SevenContext _sc;
		private IMongoCollection<Comentario> _comentario;

		public TareasController(SevenContext sc, IComentarioSettings comentarioSettings)
		{
			_sc = sc;
			var client=new MongoClient(comentarioSettings.Server);
			var database = client.GetDatabase(comentarioSettings.Database);
			_comentario = database.GetCollection<Comentario>(comentarioSettings.Collection);
		}

		
		[HttpGet("{idUser:int}/{page:int}/{tamanio:int}/{status:int}")]
		public ActionResult<Proyectos> ObtenerTareas(int idUser, int page, int tamanio, int status)
		{
			try
			{
				var tareas = _sc.Tareas.Where(x => x.Estado == status).ToList();
				tareas = tareas.Skip((page - 1) * tamanio)
								.Take(tamanio)
								.ToList();
				return Ok(tareas);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpGet]
		[Route("ObtenerTareasCompleto/{id:int}")]
		public ActionResult ObtenerTareasCompleto(int id)
		{
			try
			{
				var proyectos = _sc.Tareas.Where(tarea=>tarea.IdProyecto == id).ToList();

				return Ok(proyectos);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpGet]
		[Route("ObtenerCantidadesTareas")]
		public ActionResult ObtenerCantidadesTareas()
		{
			var cantidades = _sc.Estado
				.GroupJoin(_sc.Tareas,
				estado => estado.Id,
				tarea => tarea.Estado,
				(estado, tarea) => new
				{
					Estado = estado.Nombre,
					Cantidad = tarea.Count()
				})
				.OrderBy(x => x.Estado)
				.ToList();
			return StatusCode(StatusCodes.Status200OK, cantidades);
		}

		
		[HttpGet("{id:int}")]
		public ActionResult<Proyectos> ObtenerTarea(int id)
		{
			try
			{
				var tareas = _sc.Tareas.Find(id);
				return Ok(tareas);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpPost]
		public ActionResult<Tareas> CrearTarea([FromBody] Tareas tareas)
		{
			try
			{
				if (tareas == null)
				{
					return BadRequest(tareas);
				}
				var tareaBuscador = _sc.Tareas.Where(x => x.Nombre == tareas.Nombre).ToList();
				if (tareaBuscador.Count() > 0)
				{
					return StatusCode(StatusCodes.Status200OK, "TareaExiste");
				}
				Tareas tarea = new Tareas();
				tarea.Nombre = tareas.Nombre;
				tarea.FechaCreacion = DateTime.Now;
				tarea.Estado = 1;
				tarea.IdProyecto = tareas.IdProyecto;
				_sc.Add(tarea);
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Error");
			}
		}

		
		[HttpPut]
		public ActionResult<Tareas> EditarTarea([FromBody] Tareas tareas)
		{
			try
			{
				if (tareas == null)
				{
					return BadRequest(tareas);
				}
				
	
				//var proyectoBuscador = _sc.Proyectos.Where(x => x.Nombre == tareas.Nombre).ToList();
				//if (proyectoBuscador.Count() > 0)
				//{
				//	return StatusCode(StatusCodes.Status200OK, "TareaExiste");
				//}
				var tarea = _sc.Tareas.Where(x => x.Id == tareas.Id).FirstOrDefault();
				tarea.Nombre = tareas.Nombre;
				tarea.Estado = tareas.Estado;
				tarea.IdProyecto = tareas.IdProyecto;
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Error");
			}
		}

		[HttpGet("ObtenerListaComentarios/{id:int}")]
		public ActionResult ObtenerListaComentarios(int id)
		{
			try
			{
				var comentarios = _comentario.Find(d => d.IdTarea==id).ToList();
				return Ok(comentarios);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpPost("AgregarComentario")]
		public ActionResult AgregarComentario([FromBody] Comentario comentario)
		{
			try
			{
				_comentario.InsertOne(comentario);
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpPut("EditarComentario")]
		public ActionResult EditarComentario([FromBody] Comentario comentario)
		{
			try
			{
				_comentario.ReplaceOne(c=>c.Id==comentario.Id,comentario);
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpDelete("EliminarComentario/{id}")]
		public ActionResult EliminarComentario(string id)
		{
			try
			{
				_comentario.DeleteOne(c => c.Id == id);
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpDelete("EliminarTarea/{id}")]
		public ActionResult EliminarTarea(int id)
		{
			try
			{
				var tarea = _sc.Tareas.Where(x => x.Id == id).FirstOrDefault();
				_sc.Remove(tarea);
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
