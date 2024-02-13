using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PruebaTecnicaSeven.Models;
using PruebaTecnicaSeven.Util;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PruebaTecnicaSeven.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UsuarioController : ControllerBase
	{
		private SevenContext _sc;
		public IConfiguration _configuration;

		public UsuarioController(IConfiguration configuration, SevenContext sc)
		{
			_configuration = configuration;
			_sc = sc;
		}

		[HttpPost("IniciarSesion")]
		public ActionResult IniciarSesion([FromBody] Usuarios usuarios)
		{
			try
			{
				//Obtener clave encriptada
				var claveEncriptada = Criptografia.Encriptar(usuarios.Password);
				var usuarioExtension = _sc.Usuarios.SingleOrDefault(x => x.Usuario == usuarios.Usuario);
				if (usuarioExtension == null)
				{
					return StatusCode(StatusCodes.Status200OK, new { status = "fail", message = "Usuario o contraseña incorrectos" });
				}
				if (claveEncriptada != usuarioExtension.Password)
				{
					return StatusCode(StatusCodes.Status200OK, new { status = "fail", message = "Usuario o contraseña incorrectos" });
				}
				var jwt = _configuration.GetSection("Jwt").Get<Jwt>();
				var usuarioSerializado = Newtonsoft.Json.JsonConvert.SerializeObject(usuarioExtension);
				var claims = new[]
				{
					new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub, jwt.Subject),
					new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
					new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
					new Claim("user", usuarioSerializado)
				};
				var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.key));
				var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
				var token = new JwtSecurityToken(
					jwt.Issuer,
					jwt.Audience,
					claims,
					signingCredentials: singIn
				   );

				//Obtener IDUSUARIO

				return StatusCode(StatusCodes.Status200OK, new { status = "ok", key = new JwtSecurityTokenHandler().WriteToken(token) }); ;
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpGet]
		public ActionResult<Usuarios> ObtenerUsuarios()
		{
			try
			{
				var usuarios = _sc.Usuarios.Where(x=>x.Estado==1).ToList();
				return Ok(usuarios);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpGet("ObtenerUsuariosLibresProyecto/{id:int}")]
		public ActionResult<Usuarios> ObtenerUsuariosLibresProyecto(int id)
		{
			try
			{
				var usuarios = _sc.Usuarios
					.Where(x => !_sc.UsuarioProyecto.Any(up=>up.UsuarioId == x.Id && up.ProyectoId == id)).ToList();
				return Ok(usuarios);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpGet("{id:int}")]
		public ActionResult<Usuarios> ObtenerUsuario(int id)
		{
			try
			{
				var usuarios = _sc.Usuarios.Find(id);
				var usuarioRetorno = new Usuarios();
				usuarioRetorno.Id = usuarios.Id;
				usuarioRetorno.Usuario = usuarios.Usuario;
				usuarioRetorno.FechaCreacion = usuarios.FechaCreacion;
				usuarioRetorno.Estado = usuarios.Estado;
				usuarioRetorno.Password = Criptografia.Desencriptar(usuarios.Password);
				return Ok(usuarioRetorno);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		
		[HttpPost]
		public ActionResult CrearUsuario([FromBody] Usuarios usuarios)
		{
			
			try
			{
				if (usuarios == null)
				{
					return BadRequest(usuarios);
				}
				var usuarioBuscador = _sc.Usuarios.Where(x => x.Usuario == usuarios.Usuario).ToList();
				if (usuarioBuscador.Count() > 0)
				{
					return StatusCode(StatusCodes.Status200OK, "usuarioExiste");
				}
				Usuarios usuario = new Usuarios();
				usuario.Usuario = usuarios.Usuario;
				usuario.Password = Criptografia.Encriptar(usuarios.Password);
				usuario.FechaCreacion = DateTime.Now;
				usuario.Estado = 1;
				_sc.Add(usuario);
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Error");
			}
		}

		
		[HttpPut]
		public ActionResult<Usuarios> EditarUsuario([FromBody] Usuarios usuarios)
		{
			try
			{
				if (usuarios == null)
				{
					return BadRequest(usuarios);
				}
				
				
				var usuarioBuscador = _sc.Usuarios.Where(x => x.Usuario == usuarios.Usuario && x.Id != usuarios.Id).ToList();
				if (usuarioBuscador.Count() > 0)
				{
					return StatusCode(StatusCodes.Status200OK, "usuarioExiste");
				}
				var usuario = _sc.Usuarios.Where(x => x.Id == usuarios.Id).FirstOrDefault();
				usuario.Usuario = usuarios.Usuario;
				usuario.Estado = usuarios.Estado;
				usuario.Password = Criptografia.Encriptar(usuarios.Password);
				_sc.SaveChanges();
				return StatusCode(StatusCodes.Status200OK, "OK");
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Error");
			}
		}

		
		[HttpDelete("{id:int}")]
		public ActionResult EliminarUsuario(int id)
		{
			try
			{
				var usuario = _sc.Usuarios.Where(x => x.Id == id).FirstOrDefault();
				_sc.Remove(usuario);
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
