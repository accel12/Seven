
using Newtonsoft.Json;
using System.Security.Claims;

namespace PruebaTecnicaSeven.Models
{
	public class Jwt
	{
		public string key { get; set; }
		public string Issuer { get; set; }
		public string Audience { get; set; }
		public string Subject { get; set; }

		public static dynamic validarToken(ClaimsIdentity identity, int registro)
		{
			try
			{
				if (identity.Claims.Count() == 0)
				{
					return new
					{
						success = false,
						message = "Verificar si se envia un token valido",
						result = ""
					};
				}
				string usuarioSerializado = identity.Claims.FirstOrDefault(x => x.Type == "user").Value;

				Usuarios user = JsonConvert.DeserializeObject<Usuarios>(usuarioSerializado);

				return new
				{
					success = true,
					message = "exito",
					result = user
				};

			}
			catch (Exception ex)
			{
				return new
				{
					success = false,
					message = ex.Message,
					result = ""
				};
			}
		}
	}
}
