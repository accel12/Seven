namespace PruebaTecnicaSeven.Models
{
	public class ComentarioSettings : IComentarioSettings
	{
		public string Server { get; set; }
		public string Database { get; set; }
		public string Collection { get; set; }
	}
	public interface IComentarioSettings
	{
		string Server { get; set; }
		string Database { get; set; }
		string Collection { get; set; }
	}
}
